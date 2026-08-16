/**
 * @name CompilerV6.prototype._toMarkdownLink
 * @type 
 * @description 
 */
_toMarkdownLink(title) {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return `[${title}](#${slug})`;
}