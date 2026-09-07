/**
 * @name CompilerV6.Files.prototype.findByPattern
 * @type 
 * @description 
 */
async findByPattern(expressionBrute, basedir = process.cwd()) {
  const output = [];
  const reduceExpression = (someExpression) => {
    if(Array.isArray(someExpression)) return someExpression.map(subexpr => reduceExpression(subexpr, basedir));
    if(!someExpression.startsWith("!")) return this.compiler.normalizationOf(someExpression);
    return "!" + this.compiler.normalizationOf(someExpression.substr(1));
  };
  const expression = reduceExpression(expressionBrute);
  const isMatch = require("picomatch")(expression);
  const walk = async function(directory) {
    const entries = await require("fs").promises.readdir(directory, {
      withFileTypes: true
    });
    for(const entry of entries) {
      const filepath = require("path").join(directory, entry.name);
      if(isMatch(require("path").resolve(basedir, filepath))) {
        output.push(filepath);
      }
      if(entry.isDirectory()) {
        await walk(filepath);
        continue;
      }
    }
  }
  await walk(basedir);
  return output;
}