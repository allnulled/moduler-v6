/**
 * @name DevBinaryV6.static.1.Nodejs_fs_hooks
 * @type 
 * @description 
 */

Nodejs_fs_hooks: {

  //break Nodejs_fs_hooks;

  const fs = require("fs");
  const path = require("path");

  // ------------------------------------------------------------
  // 0. COUNTER
  // ------------------------------------------------------------

  const Filesystem_counter = {
    fileReads: {},
    fileWrites: {},
    dirReads: {},
    dirWrites: {},

    selfPrint: function () {
      
      const totals = {
        fileReads: 0,
        fileWrites: 0,
        dirReads: 0,
        dirWrites: 0,
      };

      for (const category in totals) {
        for (const path in Filesystem_counter[category]) {
          totals[category] += Filesystem_counter[category][path];
        }
      }

      const totalReads = totals.fileReads + totals.dirReads;
      const totalWrites = totals.fileWrites + totals.dirWrites;

      // console.log(Filesystem_counter);

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
  };

  // ------------------------------------------------------------
  // 1. CONFIGURATION
  // ------------------------------------------------------------

  const FS_DEBUG = {
    enabled: true,
    onlyDist: false,
    onlyTarget: false,
    onlyPersistors: true,
    target: path.resolve("dist/src/external/compiler-v6.entry.js"),
    showStack: true,
    showArguments: true,
  };

  // ------------------------------------------------------------
  // 2. HELPERS
  // ------------------------------------------------------------

  function normalizePath(value) {
    if (typeof value === "string") return path.resolve(value);
    if (Buffer.isBuffer(value)) return path.resolve(value.toString());
    if (value instanceof URL) return path.resolve(value.pathname);
    return value;
  }

  function countFileOperation(counter, value) {
    const file = normalizePath(value);

    if (typeof file !== "string") return;

    if (!counter[file]) counter[file] = 0;
    counter[file]++;
  }

  function countFilesystemOperation(operation, args) {
    const method = operation.split(".").pop().replace(/Sync$/, "");
    const options = args[1];

    // ------------------------------------------------------------
    // 1. DIRECTORY READS
    // ------------------------------------------------------------

    if (["opendir", "readdir"].includes(method)) {
      countFileOperation(Filesystem_counter.dirReads, args[0]);
      return;
    }

    // ------------------------------------------------------------
    // 2. DIRECTORY WRITES
    // ------------------------------------------------------------

    if (["mkdir", "rmdir"].includes(method)) {
      countFileOperation(Filesystem_counter.dirWrites, args[0]);
      return;
    }

    if (method === "rm" && options && options.recursive) {
      countFileOperation(Filesystem_counter.dirWrites, args[0]);
      return;
    }

    // ------------------------------------------------------------
    // 3. FILE READS
    // ------------------------------------------------------------

    const readMethods = [
      "access",
      "lstat",
      "readFile",
      "readlink",
      "realpath",
      "stat",
      "createReadStream",
    ];

    if (readMethods.includes(method)) {
      countFileOperation(Filesystem_counter.fileReads, args[0]);
    }

    // ------------------------------------------------------------
    // 4. FILE WRITES
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
      "createWriteStream",
    ];

    if (writeMethods.includes(method)) {
      countFileOperation(Filesystem_counter.fileWrites, args[0]);
    }

    // ------------------------------------------------------------
    // 5. OPEN
    // ------------------------------------------------------------

    if (method === "open") {
      const flags = args[1] || "r";
      let read = false;
      let write = false;

      if (typeof flags === "string") {
        read = flags.startsWith("r") || flags.includes("+");
        write = !flags.startsWith("r") || flags.includes("+");
      } else {
        const constants = fs.constants;

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
        countFileOperation(Filesystem_counter.fileReads, args[0]);
      }

      if (write) {
        countFileOperation(Filesystem_counter.fileWrites, args[0]);
      }
    }

    // ------------------------------------------------------------
    // 6. COPY
    // ------------------------------------------------------------

    if (["copyFile", "cp"].includes(method)) {
      countFileOperation(Filesystem_counter.fileReads, args[0]);

      if (method === "cp" && options && options.recursive) {
        countFileOperation(Filesystem_counter.dirWrites, args[1]);
      } else {
        countFileOperation(Filesystem_counter.fileWrites, args[1]);
      }
    }

    // ------------------------------------------------------------
    // 7. RENAME
    // ------------------------------------------------------------

    if (method === "rename") {
      countFileOperation(Filesystem_counter.fileWrites, args[0]);
      countFileOperation(Filesystem_counter.fileWrites, args[1]);
    }

    // ------------------------------------------------------------
    // 8. LINKS
    // ------------------------------------------------------------

    if (method === "link" || method === "symlink") {
      countFileOperation(Filesystem_counter.fileWrites, args[1]);
    }
  }

  function shouldTrace(args, operation) {
    if (!FS_DEBUG.enabled) return false;

    if (FS_DEBUG.onlyPersistors) {
      if (![
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
        // "utimes",
        "writeFile",
      ].includes(operation.replace("fs.", "").replace("promises.", ""))) return false;
    }

    const paths = args
      .filter(arg => typeof arg === "string" || Buffer.isBuffer(arg) || arg instanceof URL)
      .map(normalizePath);

    if (FS_DEBUG.onlyTarget) {
      return paths.some(file => file === FS_DEBUG.target);
    }

    if (FS_DEBUG.onlyDist) {
      return paths.some(file => file.includes(`${path.sep}dist${path.sep}`));
    }

    return true;
  }

  function truncateMiddle(string, maxLength = 20) {
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

  function trace(operation, args) {
    if (!shouldTrace(args, operation)) return;

    const argsString = `[fs.debug] Calling method ${operation}(${[...args].map((arg, index) => {
      let out = "";
      out += `@${index}:${typeof arg}`;
      if (typeof arg === "string") {
        out += `=${truncateMiddle(arg, 40)}`;
      }
      return out;
    }).join(", ")})`

    if (FS_DEBUG.showStack) {
      console.trace(argsString);
    } else {
      console.log(argsString);
    }

  }

  // ------------------------------------------------------------
  // 3. PATCH CALLBACK / SYNC METHODS
  // ------------------------------------------------------------

  const methods = [
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
    "writeFile",
  ];

  for (const method of methods) {
    for (const suffix of ["", "Sync"]) {
      const name = `${method}${suffix}`;
      const original = fs[name];

      if (typeof original !== "function") continue;

      fs[name] = function (...args) {
        countFilesystemOperation(`fs.${name}`, args);
        trace(`fs.${name}`, args);
        return original.apply(this, args);
      };
    }
  }

  // ------------------------------------------------------------
  // 4. PATCH PROMISE METHODS
  // ------------------------------------------------------------

  for (const method of methods) {
    const original = fs.promises[method];

    if (typeof original !== "function") continue;

    fs.promises[method] = function (...args) {
      countFilesystemOperation(`fs.promises.${method}`, args);
      trace(`fs.promises.${method}`, args);
      return original.apply(this, args);
    };
  }

  // ------------------------------------------------------------
  // 5. PATCH STREAMS
  // ------------------------------------------------------------

  for (const method of ["createReadStream", "createWriteStream"]) {
    const original = fs[method];

    fs[method] = function (...args) {
      countFilesystemOperation(`fs.${method}`, args);
      trace(`fs.${method}`, args);
      return original.apply(this, args);
    };
  }

  // ------------------------------------------------------------
  // 6. PATCH STREAM / OTHER ACCESS
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // 7. HOOK EXIT PROCESS TO PRINT FINAL STATE
  // ------------------------------------------------------------

  process.on("exit", function () {
    Filesystem_counter.selfPrint();
  });
}