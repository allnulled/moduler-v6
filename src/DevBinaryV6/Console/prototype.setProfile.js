/**
 * @name DevBinaryV6.Console.prototype.setProfile
 * @type 
 * @description 
 */
setProfile(profile) {
  return this.constructor.create({ parent: this, profile });
}