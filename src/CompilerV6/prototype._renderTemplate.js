/**
 * @name CompilerV6.prototype._renderTemplate
 * @type 
 * @description 
 */
async _renderTemplate(templateSource, argsBrute = {}) {
  const { tokens } = this._parser.forTemplateComments.parse(templateSource);
  if (!tokens.length) {
    return templateSource;
  }
  const args = Object.assign({}, argsBrute);
  const code = ["const __out=[];\nconst print = function(...x) {\n  return __out.push(...x);\n};"];
  let cursor = 0;
  for (const token of tokens) {
    if (cursor < token.location[0]) code.push(`__out.push(${JSON.stringify(templateSource.slice(cursor, token.location[0]))});`);
    if (token.type === "/*%") code.push(token.inner);
    else if (token.type === "/*%=") code.push(`__out.push(await (${token.inner}));`);
    // @CAUTION: ChatGPT puso aquí + 1 en vez de + 0 y se nos estaba comiendo 1 caracter
    // @CAUTION: puede que el error venga del text-parser-v1
    cursor = token.location[1] + 0;
  }
  if (cursor < templateSource.length) code.push(`__out.push(${JSON.stringify(templateSource.slice(cursor))});`);
  code.push("return __out.join('');");
  const templateCallback = new (async function () { }).constructor(...Object.keys(args), code.join(""));
  const templateResult = await templateCallback.call(this, ...Object.values(args));
  return templateResult;
}