/**
 * @name DevBinaryV6.Utils.prototype.normalizeCliPropertyName
 * @type 
 * @description 
 */
normalizeCliPropertyName(k, aliasesMap) {
  if(k === "_") return k;
  if(k.startsWith("--")) {
    return k.replace(/^\-/g, "").replace(/\-./g, match => match.substr(1).toUpperCase());
  } else if(k.startsWith("-")) {
    return aliasesMap[k];
  } else throw new Error(`Demanded to normalize cli property name that does not start with «-» in the case of «${k}»`);
}