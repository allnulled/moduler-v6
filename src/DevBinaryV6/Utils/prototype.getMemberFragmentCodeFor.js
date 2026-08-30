/**
 * @name DevBinaryV6.Utils.prototype.getMemberFragmentCodeFor
 * @type 
 * @description 
 */
getMemberFragmentCodeFor(content, member) {
  let output = content;
  Deindent_source: {
    output = this.neutralizeIndentation(output);
  }
  return output;
}