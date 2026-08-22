class Tracer {
  /*@injects:"./static.create.js"*/
  /*@injects:"./constructor.js"*/
  /*@injects:"./trace.js"*/
  static create(...args) {
    return new this(...args);
  }
  constructor(id = null, parent = null) {
    this.level = 0;
    if(parent) Object.assign(this, parent);
    this.id = id || ('mv6-' + ModulerV6._getRandomString(5));
  }
  trace = Object.assign((method) => {
    console.log(`[·] [${this.id}] [${this.level}] [=] ${method}`);
  }, {
    in: (method) => {
      console.log(`[·] [${this.id}] [${++this.level}] [+] ${method}`);

    },
    out: (method) => {
      console.log(`[·] [${this.id}] [${--this.level}] [-] ${method}`);

    },
    error: (method, error) => {
      console.log(`[!] [${this.id}] [${this.level}] [!] ${method}`, error);

    }
  });
  subtracer(id) {

  }
}