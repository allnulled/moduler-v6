/**
 * @name DevBinaryV6.Utils.static.removeNullPropertiesFromObject
 * @type 
 * @description 
 */
static removeNullPropertiesFromObject(obj) {
  const output = {};
  for(let prop in obj) {
    const val = obj[prop];
    if(val !== null) {
      output[prop] = val;
    } else {
      console.log("Removed: " + prop, val);
    }
  }
  return output;
}