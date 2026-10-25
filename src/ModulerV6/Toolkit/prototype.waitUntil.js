/**
 * @name ModulerV6.Toolkit.prototype.waitUntil
 * @type 
 * @description 
 */
waitUntil(callback, timeout = 10) {
  return new Promise(async done => {
    while(callback()) {
      await new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    };
    done();
  });
}