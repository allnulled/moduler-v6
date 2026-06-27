class Logger {
  /**
   * @name ModulerV6.Logger.Logger.class
   * @type 
   * @description 
   */
  static fromFile(file) {
    return new this({ file });
  }
  static Manager = class LoggerManager {
    static fromDirectory(basedir) {
      return new this(basedir);
    }
    constructor(basedir) {
      this.basedir = basedir;
      this.selected = "default";
      this.subloggers = {
        default: new Logger({ file: require("path").resolve(basedir, "default.txt") }),
      };
    }
    get current() {
      return this.subloggers[this.selected];
    }
    addLogger(id) {
      this.subloggers[id] = new Logger({ file: require("path").resolve(this.basedir, id + ".txt") });
    }
    has(id) {
      return id in this.subloggers;
    }
    into(id) {
      if(!this.has(id)) {
        this.addLogger(id);
      }
      return this.subloggers[id];
    }
    select(id = false) {
      if(id === false) {
        if(!this.has(this.selected)) {
          this.addLogger(this.selected);
        }
        return this.subloggers[this.selected];
      }
      if(!this.has(id)) {
        this.addLogger(this.selected);
      }
      this.selected = id;
      return this.select();
    }
    resetFile(...args) {
      if(!this.has(this.selected)) {
        this.addLogger(this.selected);
      }
      return this.subloggers[this.selected].resetFile(...args);
    }
    log(...args) {
      if(!this.has(this.selected)) {
        this.addLogger(this.selected);
      }
      return this.subloggers[this.selected].log(...args);
    }
  }
  static create(...args) {
    return new this(...args);
  }
  static defaultOptions = {
    console: true,
  };
  constructor(options, moduler) {
    this.options = Object.assign({}, this.constructor.defaultOptions, options);
    this.moduler = moduler;
    this.startedAt = new Date();
    this.lastLogAt = new Date();
  }
  resetFile(...args) {
    return require("fs").promises.writeFile(this.options.file, "", "utf8").then(() => {
      this.startedAt = new Date();
      this.lastLogAt = new Date();
      return this.log(...args);
    });
  }
  getTimeOffset() {
    return "+" + ((new Date()).getTime() - this.startedAt.getTime());
  }
  getLastLogOffset() {
    return "+" + ((new Date()).getTime() - this.lastLogAt.getTime());
  }
  log(...args) {
    const line = this.stringifySafe({
      "@": this.getMomentToString(),
      "#": this.getTimeOffset(),
      "##": this.getLastLogOffset(),
      "*": args,
    }) + "\n";
    if(this.options.console) {
      console.log(line);
    }
    this.lastLogAt = new Date();
    if(this.options.file) {
      return require("fs").promises.appendFile(this.options.file, line, "utf8").catch(console.error);
    }
  }
  setOption(id, value) {
    this.options[id] = value;
    return this;
  }
  getMomentToString() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    const pad3 = n => String(n).padStart(3, "0");
    return (
      `${d.getFullYear()}-` +
      `${pad(d.getMonth() + 1)}-` +
      `${pad(d.getDate())} ` +
      `${pad(d.getHours())}:` +
      `${pad(d.getMinutes())}:` +
      `${pad(d.getSeconds())}.` +
      `${pad3(d.getMilliseconds())}`
    );
  }
  stringifySafe(value) {
    const seen = new WeakSet();
    return JSON.stringify(value, (key, val) => {
      if (typeof val === "bigint") {
        return `${val}n`;
      }
      if (typeof val === "function") {
        return `[Function ${val.name || "anonymous"}]`;
      }
      if (val instanceof Error) {
        return {
          name: val.name,
          message: val.message,
          stack: val.stack
        };
      }
      if (typeof val === "object" && val !== null) {
        if (seen.has(val)) {
          return "[Circular]";
        }
        seen.add(val);
      }
      return val;
    }, 0);
  }
}