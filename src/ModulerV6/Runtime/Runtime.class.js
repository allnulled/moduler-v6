class Runtime {
  /**
   * @name ModulerV6.Runtime.Runtime.class
   * @type 
   * @description 
   */
  constructor(owner) {
    // this.owner = owner;
  }
  static onLoaded = ModulerV6.createResolvable();
  cache = {
    isLoaded: false
  };
  get env() {
    return ModulerV6.globalInstance.settings.data?.env || "unknown";
  }
  get isDev() {
    if(typeof this.cache.isDev === "boolean") return this.cache.isDev;
    if(ModulerV6.globalInstance.settings.data?.env) return this.cache.isDev = ModulerV6.globalInstance.settings.data?.env === "dev";
  }
  get isTest() {
    if(typeof this.cache.isTest === "boolean") return this.cache.isTest;
    if(ModulerV6.globalInstance.settings.data?.env) return this.cache.isTest = ModulerV6.globalInstance.settings.data?.env === "test";
  }
  get isProd() {
    if(typeof this.cache.isProd === "boolean") return this.cache.isProd;
    if(ModulerV6.globalInstance.settings.data?.env) return this.cache.isProd = ModulerV6.globalInstance.settings.data?.env === "prod";
  }
  get isBrowser() {
    if(typeof this.cache.isBrowser === "boolean") return this.cache.isBrowser;
    return this.cache.isBrowser = (typeof window !== "undefined") && (typeof window.location !== "undefined");
  }
  get isNodejs() {
    if(typeof this.cache.isNodejs === "boolean") return this.cache.isNodejs;
    return this.cache.isNodejs = (typeof require !== "undefined") && (typeof __dirname !== "undefined");
  }
  get hasCompilerV6() {
    return typeof CompilerV6 !== "undefined";
  }
  get hasDevBinaryV6() {
    return typeof DevBinaryV6 !== "undefined";
  }
  get getRootdir() {
    return ModulerV6.globalInstance.rootdir;
  }
  get getBasedir() {
    return ModulerV6.globalInstance.basedir;
  }
  get moduler() {
    return ModulerV6.globalInstance;
  }
  get compiler() {
    return CompilerV6.globalInstance;
  }
  get devbin() {
    return DevBinaryV6.globalInstance;
  }
  isInRefrescador() {
    throw new Error("Not supported yet");
  }
  isInModule(someModuler) {
    throw new Error("Not supported yet");
  }
  load() {
    if(this.cache.isLoaded) {
      return this.cache.isLoaded;
    }
    return Promise.all([
      ModulerV6.globalInstance.settings.load(),
    ]).then(output => {
      this.cache.isLoaded = output;
      return this;
    });
  }
  static load() {
    if(this.globalInstance.cache.isLoaded) {
      return this.globalInstance;
    }
    return this.globalInstance.load();
  }
  static globalInstance = new this();
  static {
    // Con esto conseguimos cargar los settings en tanto que ModulerV6.globalInstance esté listo
    (async () => {
      await ModulerV6.onLoaded.promise;
      await Runtime.load();
      Runtime.onLoaded.resolve();
    })();
  }
}