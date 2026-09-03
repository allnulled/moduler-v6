/**
 * @name DevBinaryV6.Console.constructor
 * @type 
 * @description 
 */
constructor({ devbin, cloneOf = {}, profile = null }) {
  this.devbin = devbin;
  Object.assign(this, cloneOf);
  this.profile = profile;
}