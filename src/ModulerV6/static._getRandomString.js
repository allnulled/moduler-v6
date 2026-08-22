/**
 * @name ModulerV6.static._getRandomString
 * @type 
 * @description 
 */
static _getRandomString(len = 10) {
  let out = "";
  while(out.length < len) {
    out += this._getRandomCharacter();
  }
  return out;
}