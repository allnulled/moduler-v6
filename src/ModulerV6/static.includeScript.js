/**
 * @name ModulerV6.static.includeScript
 * @type 
 * @description 
 */
static includeScript = Object.assign((src) => {
  this.assert(this.isBrowser, `ModulerV6.includeScript cannot include scripts in environments that are not browser and so file «${src}» cannot be loaded`);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
}, {
  try: (...args) => this.trify(this.includeScript, ...args),
});