/**
 * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode.Questionary.prototype.supportedFormats
 * @type 
 * @description 
 */
supportedFormats = {
  boolean: {
    format: (value) => {
      const lowValue = value.toLowerCase().trim();
      if (["true", "1", "yes", "y"].includes(lowValue)) {
        return true;
      } else if (["false", "0", "no", "n"].includes(lowValue)) {
        return false;
      }
      throw new Error("Boolean must be one of: «true/1/yes/y/false/0/no/n»");
    },
  },
  number: {
    format: (value) => {
      const formatted = parseFloat(value.trim());
      if (Number.isNaN(formatted)) {
        throw new Error("Number must be a valid parseable number");
      }
      return formatted;
    }
  },
  integer: {
    format: (value) => {
      const formatted = parseInt(value.trim());
      if (Number.isNaN(formatted)) {
        throw new Error("Integer must be a valid parseable number and also integer");
      }
      return formatted;
    }
  }
};