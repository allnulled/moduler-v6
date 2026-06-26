#!/usr/bin/env node

const { readdir, readFile } = require("fs/promises");
const { join, relative } = require("path");

const dumpDirectory = async function(dir, root = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let finalText = "";
  const appendText = text => {
    finalText += text + "\n";
  };
  Iterating_entries:
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await dumpDirectory(fullPath, root);
    } else {
      const content = await readFile(fullPath, "utf8");
      if(!content.trim().length) {
        continue Iterating_entries;
      }
      appendText(``);
      appendText(`/// @file: ${relative(root, fullPath)}`);
      appendText(``);      
      try {
        appendText(content);
      } catch {
        appendText("<No es un fichero de texto>");
      }
    }
  }
  if(finalText.length) {
    console.log(finalText);
  }
  return finalText;
}

if(!(process.argv.length > 2)) throw new Error("Required command line parameter to «printTree»");

Promise.all(process.argv.splice(2).map(arg => {
  return dumpDirectory(arg);
}));