/**
 * @name CompilerV6.prototype._renderSourceAsTemplate
 * @type 
 * @description 
 */
async _renderSourceAsTemplate(compilationFile, compilationProcess) {
  if(!compilationFile.resource.endsWith(".js")) {
    return "ok:1:no js file so no template";
  }
  if(compilationProcess.disableTemplates) {
    return "ok:2:disabled templates";
  }
  compilationFile.compilation.js = compilationFile.source = await this._renderTemplate(compilationFile.source, {
    compilationFile,
    compilationProcess,
    $compiler: this,
  });
  // console.log(compilationFile);
}