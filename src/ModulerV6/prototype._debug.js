/**
 * @name ModulerV6.prototype._debug
 * @type 
 * @description 
 */
_debug(...list) {
  for(let index=0; index<list.length; index++) {
    const item = list[index];
    console.log(this.constructor.ansi.colors.style("yellow,bold,underline").text(`[debug] parameter ${index}:`), item);
  }
}