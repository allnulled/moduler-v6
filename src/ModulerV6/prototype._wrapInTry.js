/**
 * @name ModulerV6.prototype._wrapInTry
 * @type 
 * @description 
 */
_wrapInTry(source, parameters = {}, file = null) {
  let js = "";
  js += `try {\n`;
  js += `  ${source}\n`;
  js += `} catch(error) {\n`;
  js += `  console.error("Injection source failed somewhere:", ${JSON.stringify(source)});\n`;
  js += `  console.error("Injection parameters:", ${JSON.stringify(Object.keys(parameters).map(id => id + ":" + typeof parameters[id]))});\n`;
  if(file !== null) {
    js += `  console.error("Injected file:", ${JSON.stringify(file)});\n`;
  }
  js += `  console.error("Injection failed:", error);\n`;
  js += `}`;
  return js;
}