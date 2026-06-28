/**
 * @name CompilerV6.Tracer.prototype.trace
 * @type 
 * @description 
 */
trace(message, args, spaceDiff = 0) {
  if (this.isTracing) {
    let output = ``;
    output += `[${this.stack.length}${spaceDiff === 1 ? "++" : spaceDiff === -1 ? "--" : ""}] `;
    output += this.compiler.name ? `[${this.compiler.name}] ` : `[mv6] `;
    output += `[${message}] `;
    output += `arguments: ${args.length}`;
    output = this.highlightIfMatched(output);
    output = this.indentByLevel(output);
    if (!this.matchesIgnorer(output)) {
      console.log(output);
    }
    if(this.isLogging) {
      this.compiler.log(CompilerV6.ansi.colors.stripAnsi(output));
    }
  }
}