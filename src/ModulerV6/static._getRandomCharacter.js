/**
 * @name ModulerV6.static._getRandomCharacter
 * @type 
 * @description 
 */
static _getRandomCharacter(alphabet = this._alphabet) {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}