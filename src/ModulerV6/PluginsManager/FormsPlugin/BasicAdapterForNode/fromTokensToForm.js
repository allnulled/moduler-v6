async function(parsification) {
  /**
   * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode.fromTokensToForm
   * @type 
   * @description 
   */
  this._validateParsification(parsification);
  const questionary = this._compileTokensIntoQuestionary(parsification);
  const answers = await questionary.start();
  return answers;
}