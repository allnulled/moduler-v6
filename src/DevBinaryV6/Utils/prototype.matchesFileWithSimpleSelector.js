/**
 * @name DevBinaryV6.Utils.prototype.matchesFileWithSimpleSelector
 * @type 
 * @description 
 */
matchesFileWithSimpleSelector(filepath, selectors = []) {
  this.assert(Array.isArray(selectors), "Parameter «selectors» must be array on «DevBinaryV6.Utils.prototype.matchesFileWithSimpleSelector»");
  return selectors.some((selector, index) => {
    this.assert(typeof selector === "string", `All selectors must be strings but on index «${index}» there is a «${typeof selector}»`);
    if (selector.startsWith("^")) {
      return filepath.startsWith(selector.slice(1));
    }
    return filepath.includes(selector);
  });
}