/**
 * @name ModulerV6.Tracer.prototype.trace
 * @type 
 * @description 
 */
trace = Object.assign((method) => {
  console.log(`[·] [${this.id}] [${this.level}] [=] ${method}`);
}, {
  in: (method) => {
    this.level++;
    if(this.isTracing) console.log(`[·] [${this.id}] [${this.level}] [+] ${method}`);
  },
  out: (method) => {
    this.level--;
    if(this.isTracing) console.log(`[·] [${this.id}] [${this.level}] [-] ${method}`);
  },
  error: (method, error, levelDiff = 0) => {
    this.level += levelDiff;
    if(this.isTracing) console.log(`[!] [${this.id}] [${this.level}] [!] ${method}`, error);
  },
  errorHandler: (method, levelDiff) => {
    return (error) => this.trace.error(method, error, levelDiff);
  }
});