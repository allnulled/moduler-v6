/**
 * @name ModulerV6.PluginsManager.FormsPlugin.static.BasicEnvironmentalAdapter
 * @type 
 * @description 
 */
static BasicEnvironmentalAdapter = {
  fromTokensToForm: function(...args) {
    if(typeof window !== "undefined") {
      return FormsPlugin.BasicAdapterForBrowser.fromTokensToForm(...args);
    }
    return FormsPlugin.BasicAdapterForNode.fromTokensToForm(...args);
  } 
}