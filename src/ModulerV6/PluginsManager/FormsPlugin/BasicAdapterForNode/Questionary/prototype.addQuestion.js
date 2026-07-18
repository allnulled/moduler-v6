/**
 * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode.prototype.addQuestion
 * @type 
 * @description 
 */
addQuestion(tokenOpener, tokenCloser) {
  const parameters = Function(`return (${tokenOpener.inner});`)();
  if (!Array.isArray(parameters) && (typeof parameters !== "object" || parameters === null)) {
    throw new Error("The opener comment must evaluate to an object or array.");
  }
  const byDefault = this.text.slice(tokenOpener.location[1], tokenCloser.location[0]);
  const location = [tokenOpener.location[0], tokenCloser.location[1]];
  this.questions.push({ parameters, byDefault, location });
}