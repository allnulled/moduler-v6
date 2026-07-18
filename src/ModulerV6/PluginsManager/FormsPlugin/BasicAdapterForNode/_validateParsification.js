function(parsification) {
  /**
   * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode._validateParsification
   * @type 
   * @description 
   */
  const { tokens } = parsification;
  let opened = 0;
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    if (token.type === "/*=¿") {
      if (opened !== 0) {
        throw new Error(`Opening embedded form field when the previous one is not closed on method «FormsPlugin.BasicAdapterForNode._validateParsification» on text «${token.text}»`)
      }
      opened = 1;
    } else if (token.type === "/*?*/") {
      if (opened !== 1) {
        throw new Error(`Closing embedded form field when the previous one is not opened on method «FormsPlugin.BasicAdapterForNode._validateParsification» on text «${token.text}»`)
      }
      opened = 0;
    }
  }
  if (opened !== 0) {
    throw new Error(`Some embedded form field was not closed on method «FormsPlugin.BasicAdapterForNode._validateParsification»`);
  }
}