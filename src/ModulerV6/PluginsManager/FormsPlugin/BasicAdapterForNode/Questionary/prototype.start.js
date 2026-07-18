/**
 * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode.prototype.start
 * @type 
 * @description 
 */
async start() {

  const answers = await this.solveQuestionary();

  console.log(answers);

}