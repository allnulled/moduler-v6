/**
 * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode.Questionary.prototype.formatType
 * @type 
 * @description 
 */
formatType(answer, qType) {
  if (qType in this.supportedFormats) {
    return this.supportedFormats[qType].format(answer);
  }
  return answer;
} 