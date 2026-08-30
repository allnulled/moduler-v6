/**
 * @name DevBinaryV6.Utils.prototype.neutralizeIndentation
 * @type 
 * @description 
 */
neutralizeIndentation(input) {
  const lines = input.split(/\n/g);
  // omite primera línea al contar
  const minIndentation = Math.min(...lines.concat([]).splice(1).map(line => this.countSubstringOcurrencesAtStart(line, "  ")));
  const removableIndentation = "  ".repeat(minIndentation);
  // omite primera línea al reemplazar
  const output = lines.map((line, index) => {
    return ((!removableIndentation.length) || (index === 0)) ? line : line.replace(removableIndentation, "");
  }).join("\n");
  console.log(input, output);
  return output;
}