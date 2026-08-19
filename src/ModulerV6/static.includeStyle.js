/**
 * @name ModulerV6.static.includeStyle
 * @type 
 * @description 
 */
static includeStyle = Object.assign((src) => {
  this.assert(this.isBrowser, `ModulerV6.includeStyle cannot include styles in environments that are not browser and so file «${src}» cannot be loaded`);
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = src;
    link.onload = () => resolve();
    link.onerror = (error) => reject(error);
    document.head.appendChild(link);
  });
}, {
  try: (...args) => this.trify(this.includeStyle, ...args),
});