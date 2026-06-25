/**
 * @name ModulerV6.prototype._tokenizeText
 * @type 
 * @description 
 */
_tokenizeText(compilationFile, compilationProcess) {
  this._traceIn("_tokenizeText", arguments);
  this._assert(typeof compilationProcess === "object", "Parameter «compilationProcess» must be object on «ModulerV6.prototype._tokenizeText»");
  this._assert(typeof compilationProcess.resource === "string", "Parameter «compilationProcess.resource» must be string on «ModulerV6.prototype._tokenizeText»");
  this._assert(typeof compilationFile === "object", "Parameter «compilationFile» must be object on «ModulerV6.prototype._tokenizeText»");
  this._assert(typeof compilationFile.source === "string", "Parameter «compilationFile.source» must be string on «ModulerV6.prototype._tokenizeText»");
  this._assert(typeof compilationFile.extension === "string", "Parameter «compilationFile.extension» must be string on «ModulerV6.prototype._tokenizeText»");
  let out = undefined;
  if(compilationFile.extension === "js") {
    out = this._parser.forJs.parse(compilationFile.source);
  } else if(compilationFile.extension === "css") {
    out = this._parser.forCss.parse(compilationFile.source);
  } else if(compilationFile.extension === "md") {
    out = this._parser.forMd.parse(compilationFile.source);
  } else {
    throw new Error(`File extension cannot be tokenized: «${compilationFile.resource}»`);
  }
  delete out.text;
  compilationFile.tokenization = out;
  // 
  this._traceOut("_tokenizeText", arguments);
  return out;
}