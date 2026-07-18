function(parsification) {
  /**
   * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode._compileTokensIntoQuestionary
   * @type 
   * @description 
   */
    const { text, tokens } = parsification;
    const questionary = new this.Questionary(text);
    for (let index = 0; index < tokens.length; index += 2) {
      const token = tokens[index];
      const closer = tokens[index + 1];
      questionary.addQuestion(token, closer);
    }
    return questionary;
  }