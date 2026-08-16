/**
 * @name CompilerV6.prototype._unifyCompilationMarkdown
 * @type 
 * @description 
 */
_unifyCompilationMarkdown(compilationFile, compilationProcess) {
  let output, tabulation = 0;
  Unify_parts: {
    output = compilationFile.mdUnification.slice().reverse().map(it => {
      if (typeof it === "string") {
        return it;
      }
      Calculate_tabulation: {
        if (typeof it.tabulation === "number") {
          tabulation += it.tabulation;
        } else if (typeof it.tabulation === "string") {
          tabulation = parseInt(it.tabulation.substr(1));
        }
      }
      let indentedBody = it.body;
      Indent_body_titles: {
        if (it.titleIndentation) {
          indentedBody = indentedBody.replace(/(^|\n)\#/g, "\n#" + ("#".repeat(it.titleIndentation)));
        }
      }
      let finalText;
      Set_final_text: {
        finalText = it.prefix + ("   ".repeat(tabulation)) + indentedBody;
      }
      return finalText;
    }).join("");
  }
  Inject_table_of_contents: {
    const pos = output.indexOf("{{ Table of contents }}");
    if(pos === -1) break Inject_table_of_contents;
    // @TODO: un ._extractMarkdownTableOfContents
    const toc = this._extractMarkdownTableOfContents(output, true);
    output = output.replace("{{ Table of contents }}", toc);
  }
  Export_unification: {
    compilationFile.compilation.md += output;
  }
  Export_unification_to_parent_compilation: {
    if (compilationFile.parentCompilation) {
      this._prependToParentCompilationFile(compilationFile.parentCompilation, output, "md", false);
    }
  }
}