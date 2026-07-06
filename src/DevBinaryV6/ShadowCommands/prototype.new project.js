/**
 * @name DevBinaryV6.Hooks.prototype.new project
 * @type 
 * @description 
 */
"new project"(args, devbin) {
  // @TODO: completar el comando de crear nuevo proyecto
  const parameters = devbin.utils.formatCliArgs({
    from: {
      onFormat: devbin.constructor.Formatters.asString,
      default: false,
      alias: ["-f"],
      description: "Empty directory from which to start the new project"
    }
  }, args);
  console.log("Parameters:", parameters);
  console.log("Aqui hay que conseguir crear un proyecto compatible con DevBinaryV6 desde 0.");
}