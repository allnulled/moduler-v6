/**
 * @name ModulerV6.static.createResolvable
 * @type 
 * @description 
 */
static createResolvable() {
  let promise, resolve, reject;
  promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  })
  return { promise, resolve, reject };
}