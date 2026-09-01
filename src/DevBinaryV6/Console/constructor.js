/**
 * @name DevBinaryV6.Console.constructor
 * @type 
 * @description 
 */
constructor({ devbin, parent = {}, profile = null }) {
  this.devbin = devbin;
  Object.assign(this, parent);
  this.profile = profile;
}