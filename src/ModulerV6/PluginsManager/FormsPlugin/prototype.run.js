/**
 * @name ModulerV6.PluginsManager.FormsPlugin.prototype.run
 * @type 
 * @description 
 */
async run(file) {
  const targetPath = this.moduler.normalizationOf(file);
  const targetRootdir = this.moduler.rootdirOf(targetPath);
  const targetSource = await this.moduler._readPath(targetPath);
  const targetParsification = this.moduler.parser.forEmbeddedForms.parse(targetSource);
  return await this.adapter.fromTokensToForm(targetParsification);
}