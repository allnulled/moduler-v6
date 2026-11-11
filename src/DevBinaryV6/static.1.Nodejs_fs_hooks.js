/**
 * @name DevBinaryV6.static.1.Nodejs_fs_hooks
 * @type
 * @description Instrumentación global del módulo Node.js fs.
 */

Nodejs_fs_hooks: {

  // ------------------------------------------------------------
  // 0. CLASS
  // ------------------------------------------------------------

  class FilesystemHooks {

    // ------------------------------------------------------------
    // 1. PRIVATE PROPERTIES
    // ------------------------------------------------------------

    fs = require("fs");
    path = require("path");
    patches = [];
    exitHandler = null;

    // ------------------------------------------------------------
    // 2. PUBLIC PROPERTIES
    // ------------------------------------------------------------

    constructor(options = {}) {

      this.configurations = Object.assign({
        enabled: true,
        onlyDist: false,
        onlyTarget: false,
        onlyPersistors: true,
        target: this.path.resolve("dist/src/external/compiler-v6.entry.js"),
        showStack: true,
        showArguments: true
      }, options.configurations || {});

      this.counter = {
        fileReads: {},
        fileWrites: {},
        dirReads: {},
        dirWrites: {},
        selfPrint: () => this.printCounter()
      };

      this.methods = [
        "access",
        "appendFile",
        "chmod",
        "chown",
        "copyFile",
        "cp",
        "lchmod",
        "lchown",
        "link",
        "lstat",
        "mkdir",
        "mkdtemp",
        "open",
        "opendir",
        "readFile",
        "readdir",
        "readlink",
        "realpath",
        "rename",
        "rmdir",
        "rm",
        "stat",
        "symlink",
        "truncate",
        "unlink",
        "utimes",
        "writeFile"
      ];

      this.streamMethods = [
        "createReadStream",
        "createWriteStream"
      ];

      this.isInstalled = false;

      if (options.autoInstall !== false) {
        this.install();
      }
    }

    // ------------------------------------------------------------
    // 3. INSTALLATION
    // ------------------------------------------------------------

    install() {
      if (this.isInstalled) return this;

      // ------------------------------------------------------------
      // 3.1. CALLBACK / SYNC METHODS
      // ------------------------------------------------------------

      for (const method of this.methods) {
        for (const suffix of ["", "Sync"]) {
          const name = `${method}${suffix}`;

          this.patchMethod(
            this.fs,
            name,
            `fs.${name}`
          );
        }
      }

      // ------------------------------------------------------------
      // 3.2. PROMISE METHODS
      // ------------------------------------------------------------

      for (const method of this.methods) {
        this.patchMethod(
          this.fs.promises,
          method,
          `fs.promises.${method}`
        );
      }

      // ------------------------------------------------------------
      // 3.3. STREAM METHODS
      // ------------------------------------------------------------

      for (const method of this.streamMethods) {
        this.patchMethod(
          this.fs,
          method,
          `fs.${method}`
        );
      }

      // ------------------------------------------------------------
      // 3.4. EXIT HANDLER
      // ------------------------------------------------------------

      this.exitHandler = () => {
        this.printCounter();
      };

      process.on("exit", this.exitHandler);

      this.isInstalled = true;
      return this;
    }

    uninstall() {
      if (!this.isInstalled) return this;

      // ------------------------------------------------------------
      // 3.5. RESTORE ORIGINAL METHODS
      // ------------------------------------------------------------

      for (let index = this.patches.length - 1; index >= 0; index--) {
        const patch = this.patches[index];

        if (patch.target[patch.name] === patch.wrapper) {
          patch.target[patch.name] = patch.original;
        }
      }

      this.patches = [];

      // ------------------------------------------------------------
      // 3.6. REMOVE EXIT HANDLER
      // ------------------------------------------------------------

      if (this.exitHandler) {
        process.removeListener("exit", this.exitHandler);
        this.exitHandler = null;
      }

      this.isInstalled = false;
      return this;
    }

    // ------------------------------------------------------------
    // 4. PATCHING
    // ------------------------------------------------------------

    patchMethod(target, name, operation) {
      const original = target[name];

      if (typeof original !== "function") return false;

      const self = this;

      const wrapper = function (...args) {
        self.countFilesystemOperation(operation, args);
        self.trace(operation, args);

        return original.apply(this, args);
      };

      target[name] = wrapper;

      this.patches.push({
        target,
        name,
        original,
        wrapper
      });

      return true;
    }

    // ------------------------------------------------------------
    // 5. PATH HELPERS
    // ------------------------------------------------------------

    normalizePath(value) {
      if (typeof value === "string") {
        return this.path.resolve(value);
      }

      if (Buffer.isBuffer(value)) {
        return this.path.resolve(value.toString());
      }

      if (value instanceof URL) {
        return this.path.resolve(value.pathname);
      }

      return value;
    }

    countFileOperation(counter, value) {
      const file = this.normalizePath(value);

      if (typeof file !== "string") return;

      if (!counter[file]) counter[file] = 0;
      counter[file]++;
    }

    // ------------------------------------------------------------
    // 6. FILESYSTEM COUNTER
    // ------------------------------------------------------------

    countFilesystemOperation(operation, args) {
      const method = operation.split(".").pop().replace(/Sync$/, "");
      const options = args[1];

      // ------------------------------------------------------------
      // 6.1. DIRECTORY READS
      // ------------------------------------------------------------

      if (["opendir", "readdir"].includes(method)) {
        this.countFileOperation(this.counter.dirReads, args[0]);
        return;
      }

      // ------------------------------------------------------------
      // 6.2. DIRECTORY WRITES
      // ------------------------------------------------------------

      if (["mkdir", "rmdir"].includes(method)) {
        this.countFileOperation(this.counter.dirWrites, args[0]);
        return;
      }

      if (method === "rm" && options && options.recursive) {
        this.countFileOperation(this.counter.dirWrites, args[0]);
        return;
      }

      // ------------------------------------------------------------
      // 6.3. FILE READS
      // ------------------------------------------------------------

      const readMethods = [
        "access",
        "lstat",
        "readFile",
        "readlink",
        "realpath",
        "stat",
        "createReadStream"
      ];

      if (readMethods.includes(method)) {
        this.countFileOperation(this.counter.fileReads, args[0]);
      }

      // ------------------------------------------------------------
      // 6.4. FILE WRITES
      // ------------------------------------------------------------

      const writeMethods = [
        "appendFile",
        "chmod",
        "chown",
        "lchmod",
        "lchown",
        "truncate",
        "unlink",
        "utimes",
        "writeFile",
        "createWriteStream"
      ];

      if (writeMethods.includes(method)) {
        this.countFileOperation(this.counter.fileWrites, args[0]);
      }

      // ------------------------------------------------------------
      // 6.5. OPEN
      // ------------------------------------------------------------

      if (method === "open") {
        const flags = args[1] || "r";
        let read = false;
        let write = false;

        if (typeof flags === "string") {
          read = flags.startsWith("r") || flags.includes("+");
          write = !flags.startsWith("r") || flags.includes("+");
        } else {
          const constants = this.fs.constants;

          read = !(flags & constants.O_WRONLY);

          write = !!(flags & (
            constants.O_WRONLY |
            constants.O_RDWR |
            constants.O_CREAT |
            constants.O_TRUNC |
            constants.O_APPEND
          ));
        }

        if (read) {
          this.countFileOperation(this.counter.fileReads, args[0]);
        }

        if (write) {
          this.countFileOperation(this.counter.fileWrites, args[0]);
        }
      }

      // ------------------------------------------------------------
      // 6.6. COPY
      // ------------------------------------------------------------

      if (["copyFile", "cp"].includes(method)) {
        this.countFileOperation(this.counter.fileReads, args[0]);

        if (method === "cp" && options && options.recursive) {
          this.countFileOperation(this.counter.dirWrites, args[1]);
        } else {
          this.countFileOperation(this.counter.fileWrites, args[1]);
        }
      }

      // ------------------------------------------------------------
      // 6.7. RENAME
      // ------------------------------------------------------------

      if (method === "rename") {
        this.countFileOperation(this.counter.fileWrites, args[0]);
        this.countFileOperation(this.counter.fileWrites, args[1]);
      }

      // ------------------------------------------------------------
      // 6.8. LINKS
      // ------------------------------------------------------------

      if (method === "link" || method === "symlink") {
        this.countFileOperation(this.counter.fileWrites, args[1]);
      }
    }

    // ------------------------------------------------------------
    // 7. DEBUG FILTERS
    // ------------------------------------------------------------

    shouldTrace(args, operation) {
      if (!this.configurations.enabled) return false;

      if (this.configurations.onlyPersistors) {
        const persistors = [
          "appendFile",
          "chmod",
          "chown",
          "copyFile",
          "cp",
          "lchmod",
          "lchown",
          "link",
          "mkdir",
          "mkdtemp",
          "rename",
          "rmdir",
          "rm",
          "symlink",
          "truncate",
          "unlink",
          "writeFile"
        ];

        const method = operation
          .replace("fs.", "")
          .replace("promises.", "");

        if (!persistors.includes(method)) return false;
      }

      const paths = args
        .filter(arg =>
          typeof arg === "string" ||
          Buffer.isBuffer(arg) ||
          arg instanceof URL
        )
        .map(arg => this.normalizePath(arg));

      if (this.configurations.onlyTarget) {
        return paths.some(file => file === this.configurations.target);
      }

      if (this.configurations.onlyDist) {
        return paths.some(file =>
          file.includes(`${this.path.sep}dist${this.path.sep}`)
        );
      }

      return true;
    }

    // ------------------------------------------------------------
    // 8. STRING HELPERS
    // ------------------------------------------------------------

    truncateMiddle(string, maxLength = 20) {
      let output, start, end;

      Truncation: {
        if (string.length <= maxLength) {
          output = string;
          break Truncation;
        }

        const available = (maxLength * 2) - 3;

        start = Math.ceil(available / 2);
        end = Math.floor(available / 2);

        output = `${string.slice(0, start)}...${string.slice(-end)}`;
      }

      return output.replace(/\n/g, "\\n");
    }

    // ------------------------------------------------------------
    // 9. TRACE
    // ------------------------------------------------------------

    trace(operation, args) {
      if (!this.shouldTrace(args, operation)) return;

      const argsString = `[fs.debug] Calling method ${operation}(${[...args].map((arg, index) => {
        let out = "";

        out += `@${index}:${typeof arg}`;

        if (typeof arg === "string") {
          out += `=${this.truncateMiddle(arg, 40)}`;
        }

        return out;
      }).join(", ")})`;

      if (this.configurations.showStack) {
        console.trace(argsString);
      } else {
        console.log(argsString);
      }
    }

    // ------------------------------------------------------------
    // 10. COUNTER REPORT
    // ------------------------------------------------------------

    printCounter() {
      const totals = {
        fileReads: 0,
        fileWrites: 0,
        dirReads: 0,
        dirWrites: 0
      };

      for (const category in totals) {
        for (const file in this.counter[category]) {
          totals[category] += this.counter[category][file];
        }
      }

      const totalReads = totals.fileReads + totals.dirReads;
      const totalWrites = totals.fileWrites + totals.dirWrites;

      console.log(`[------------------------------]`);
      console.log(`[Process finished: ${process.pid}]`);
      console.log(`[*] Files read: ${totals.fileReads}`);
      console.log(`[*] Files written: ${totals.fileWrites}`);
      console.log(`[*] Directories read: ${totals.dirReads}`);
      console.log(`[*] Directories written: ${totals.dirWrites}`);
      console.log(`[*] Total reads: ${totalReads}`);
      console.log(`[*] Total writes: ${totalWrites}`);
      console.log(`[*] Total operations: ${totalReads + totalWrites}`);
    }
  }

  // ------------------------------------------------------------
  // 11. GLOBAL INSTANCE
  // ------------------------------------------------------------

  this.filesystemHooks = new FilesystemHooks({
    configurations: {
      enabled: false,
    },
  });

}