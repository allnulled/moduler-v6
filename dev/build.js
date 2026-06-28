const fs = require("fs");
const path = require("path");
const rootdir = path.resolve(`${__dirname}/..`);
const rootrel = (subpath) => path.resolve(rootdir, subpath);
const beautifier = require(`${__dirname}/lib/beautify-js.js`);
const { minify } = require("terser");
const settings = {
  fulfillTemplate: options => `/**
 * @name ${options.name || ""}
 * @type ${options.type || ""}
 * @description ${options.description || ""}
 */
`,
};
const fromPathToDocsName = function(file) {
  return file.replace(/\.js$/g, "").replace(rootdir, "").replace(/^\//g, "").replace(/\//g, ".").replace(/^src\./g, "");
};
const ensureFileSync = function(file) {
  try {
    return require("fs").readFileSync(file, "utf8");
  } catch (error) {
    if(error.code === "ENOENT" && error.message.includes("'" + file + "'")) {
      return require("fs").writeFileSync(file, settings.fulfillTemplate({
        name: fromPathToDocsName(file),
      }));
    }
    throw error;
  }
};
let fileCounter = 0;
const reduceTemplate = function(file, dir) {
  const filepath = path.resolve(dir, file);
  const dirpath = path.dirname(filepath);
  console.log("Injecting file " + (fileCounter++) + ":", filepath);
  const template = ensureFileSync(filepath, "utf8");
  const source = template.replace(/\$inject\.source\("([^"]+)"\)|\/\*\=\"(((?!\*\/).)+)\*\//g, function(match, group1, group2) {
    if(match.startsWith("$inject.")) {
      return reduceTemplate(group1, dirpath);
    } else if(match.startsWith("/*=\"")) {
      let fileid = match.substr(3).trim();
      fileid = fileid.substring(0, fileid.length - 2);
      fileid = JSON.parse(fileid);
      return reduceTemplate(fileid, dirpath);
    } else {
      throw new Error("Yei: no good, eh?");
    }
  });
  return source;
};

const main = async function() {
  const sourceV6 = reduceTemplate("src/compiler-v6.js", rootdir);
  const beautifiedDistV6 = await minify(sourceV6, {
    compress: false,
    mangle: false,
    toplevel: true,
    format: {
      comments: true,
      beautify: true
    }
  });
  const compressedDistV6 = await minify(sourceV6, {
    compress: false,
    mangle: false,
    toplevel: true,
    format: {
      comments: false,
      beautify: true
    }
  });
  await Promise.all([
    fs.promises.writeFile(rootrel("dist/v6.dist.js"), beautifiedDistV6.code, "utf8"),
    fs.promises.writeFile(rootrel("dist/v6.min.dist.js"), compressedDistV6.code, "utf8"),
  ]);
};

module.exports = main();