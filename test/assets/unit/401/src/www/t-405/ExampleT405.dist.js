module.exports = class ExampleT405 {
  /**
   * - Esto con indentación 0 [caso de js a md mediante multiline markdown comment]
   */
  constructor(base, options = {}) {
    ///@: - Caso de js inyecta js que mete multiline markdown comment
    ///@+: - Indentación +1
    ///@+: - Indentación +1
    ///@+: - Indentación +1
    ///@-: - Indentación -1
    ///@-: - Indentación -1
    ///@-: - Indentación -1
    this.propiedad1 = 500;
  }
};
