/**
 * @name CompilerV6.prototype._debug
 * @type 
 * @description 
 */
_debug(...list) {
  for(let index=0; index<list.length; index++) {
    const item = list[index];
    let output = item;
    try {
      output = JSON.stringify(item, null, 2);
    } catch (error) {
      // @OK
      console.warn(error);
    }
    console.log(this.constructor.ansi.colors.style("yellow,bold,underline").text(`[debug] parameter ${index}:`), output);
  }
  return list[0];
}