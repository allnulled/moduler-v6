/**
 * @name DevBinaryV6.Utils.prototype.countSubstringOcurrencesAtStart
 * @type 
 * @description 
 */
countSubstringOcurrencesAtStart(text, subtext) {
  let param = text;
  let counter = 0;
  while(param.startsWith(subtext)) {
    counter++;
    param = param.substr(subtext.length);
  }
  return counter;
}