/**
 * @name DevBinaryV6.Utils.prototype.installNpmDependencies
 * @type 
 * @description 
 */
async installNpmDependencies(files, rootdir = this.devbin.moduler.rootdir) {
  const { exec } = require("child_process");
  const { promisify } = require("util");
  const execAsync = promisify(exec);
  const command = "npm install" + (files ? ` ${files.join(" ")}` : "");
  const { stdout, stderr } = await execAsync(command, { cwd: rootdir });
  if(stderr) throw stderr;
  return stdout;
}
