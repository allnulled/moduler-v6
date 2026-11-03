static {
  Hook_filesystem_writtings: {

    const fs = require("fs");
    const path = require("path");

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

    function shouldTrace(args, operation) {
      if (!FS_DEBUG.enabled) return false;

      if(FS_DEBUG.onlyPersistors) {
        if(![
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
      if (string.length <= maxLength) return string;

      const available = (maxLength*2) - 3;
      const start = Math.ceil(available / 2);
      const end = Math.floor(available / 2);

      return `${string.slice(0, start)}...${string.slice(-end)}`;
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
        trace(`fs.${method}`, args);
        return original.apply(this, args);
      };
    }

    // ------------------------------------------------------------
    // 6. PATCH STREAM / OTHER ACCESS
    // ------------------------------------------------------------

    console.log("[FS DEBUG] Global filesystem interceptor activated.");


  }
}