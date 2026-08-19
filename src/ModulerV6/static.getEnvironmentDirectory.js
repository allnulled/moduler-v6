/**
 * @name ModulerV6.getEnvironmentDirectory
 * @type 
 * @description 
 */
static getEnvironmentDirectory() {
  if (this.isBrowser) {
    Apply_github_io_configurations_if_so: {
      const projectName = this.isGithubIo();
      if(projectName) return `${window.location.origin}/${projectName}`;
    }
    return window.location.origin;
  } else {
    return process.cwd();
  }
}