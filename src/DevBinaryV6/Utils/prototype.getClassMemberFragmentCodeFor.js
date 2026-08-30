/**
 * @name DevBinaryV6.Utils.prototype.getClassMemberFragmentCodeFor
 * @type 
 * @description 
 */
getClassMemberFragmentCodeFor(content, member) {
  let output = content;
  Indent_source: {
    output = this.neutralizeIndentation(output);
    output = output.split(/\n/g).map(line => `  ${line}`).join("\n");
  }
  return output;
}