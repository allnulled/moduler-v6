/**
 * @name ModulerV6.static.trify
 * @type 
 * @description 
 */
async trify(callback, ...args) {
  try {
    return await callback(...args);
  } catch (error) {
    return null;
  }
}