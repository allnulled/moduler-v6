/**
 * Unifica los argumentos parseados de la CLI.
 *
 * args:
 * {
 *   _: ["param1", "param2"],
 *   "--option": ["a", "b"],
 *   "-o": ["c"]
 * }
 *
 * definition:
 * {
 *   option: {
 *     alias: ["-o"],
 *     onFormat(list) {
 *       return list[list.length - 1];
 *     },
 *     description: "..."
 *   }
 * }
 */
formatCliArgs(definition = false, argsBrute = process.argv) {
  // Si no hay definición simplemente devolvemos una copia.
  this.assert(typeof definition === "object", "Parameter «definition» must be object on «DevBinaryV6.Utils.prototype.formatCliArgs»");
  Validate_arguments: {
    this.assert(typeof argsBrute === "object", "Parameter «args» must be object on «DevBinary.Utils.prototype.formatCliArgs»");
    this.assert(argsBrute !== null, "Parameter «args» cannot be null on «DevBinary.Utils.prototype.formatCliArgs»");
  }
  let args, result, usedKeys;
  Initialize_args: {
    args = Array.isArray(argsBrute) ? this.parseCliArgs(argsBrute) : argsBrute;
  }
  result = {};
  Initialize_positionals: {
    result._ = args ? args._ : [];
  }
  usedKeys = new Set(["_"]);
  Iterating_definition_entries:
  for (const [name, config] of Object.entries(definition)) {
    const longKey = "--" + name;
    const aliases = config.alias || [];
    const sources = [];
    if (longKey in args) {
      sources.push({
        key: longKey,
        value: args[longKey]
      });
    }
    Iterating_aliases:
    for (const alias of aliases) {
      if (alias in args) {
        sources.push({
          key: alias,
          value: args[alias]
        });
      }
    }
    // Si aparecen varias fuentes distintas, es ambiguo.
    if (sources.length > 1) {
      throw new Error(`Option "${name}" was specified multiple times (${sources.map(v => v.key).join(", ")}).`);
    }
    if (sources.length === 0) {
      if("default" in config) {
        result[name] = config.default;
      }
      continue Iterating_definition_entries;
    }
    usedKeys.add(longKey);
    for (const alias of aliases) {
      usedKeys.add(alias);
    }
    let value = sources[0].value;
    if (typeof config.onFormat === "function") {
      value = config.onFormat.call(this, [...value]);
    }
    result[name] = value;
  }
  // Detectar opciones desconocidas
  Iterating_keys:
  for (const key of Object.keys(args)) {
    if (usedKeys.has(key)) {
      continue Iterating_keys;
    }
    if (key.startsWith("-")) {
      throw new Error(`Unknown option "${key}".`);
    }
    result[key] = args[key];
  }
  return result;
}