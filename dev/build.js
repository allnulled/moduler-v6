const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);
const rootdir = path.resolve(`${__dirname}/..`);
const rootrel = (subpath) => path.resolve(rootdir, subpath);
const { minify } = require("terser");
const settings = {
  printInjections: 1,
  fulfillTemplate: options => `/**
 * @name ${options.name || ""}
 * @type ${options.type || ""}
 * @description ${options.description || ""}
 */
`,
};
const fromPathToDocsName = function (file) {
  return file.replace(/\.js$/g, "").replace(rootdir, "").replace(/^\//g, "").replace(/\//g, ".").replace(/^src\./g, "");
};
const ensureFileSync = function (file) {
  try {
    return require("fs").readFileSync(file, "utf8");
  } catch (error) {
    if (error.code === "ENOENT" && error.message.includes("'" + file + "'")) {
      return require("fs").writeFileSync(file, settings.fulfillTemplate({
        name: fromPathToDocsName(file),
      }));
    }
    throw error;
  }
};
let fileCounter = 0;
const reduceTemplate = function (file, dir) {
  const filepath = path.resolve(dir, file);
  const dirpath = path.dirname(filepath);
  fileCounter++;
  if (settings.printInjections) {
    console.log("Injecting file " + (fileCounter) + ":", filepath);
  }
  const template = ensureFileSync(filepath, "utf8");
  const source = template.replace(/\$inject\.source\("([^"]+)"\)|\/\*\=\"(((?!\*\/).)+)\*\//g, function (match, group1, group2) {
    if (match.startsWith("$inject.")) {
      return reduceTemplate(group1, dirpath);
    } else if (match.startsWith("/*=\"")) {
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

const compileFile = async function ({ src: src1, dist, distMin }) {
  const sourceV6 = reduceTemplate(src1, rootdir);
  const src2 = src1.indexOf("src/") === 0 ? src1.replace("src/", "src-tmp/") : src1;
  const src2Absolute = rootrel(src2);
  if (src2.startsWith("src-tmp/")) {
    await fs.promises.writeFile(src2Absolute, sourceV6, "utf8");
  }
  const beautifiedDistV6 = await minify({ [src2Absolute]: sourceV6 }, {
    compress: false,
    mangle: false,
    toplevel: true,
    format: {
      comments: false, // Esta es la única cambiada
      beautify: true
    }
  });
  const compressedDistV6 = await minify({ [src2Absolute]: sourceV6 }, {
    compress: true,
    mangle: true,
    toplevel: true,
    format: {
      comments: false,
      beautify: false,
    }
  });
  await Promise.all([
    fs.promises.writeFile(rootrel(dist), beautifiedDistV6.code, "utf8"),
    fs.promises.writeFile(rootrel(distMin), compressedDistV6.code, "utf8"),
  ]);
};

const main = async function () {
  Compilacion_principal: {
    await Promise.all([
      compileFile({
        src: "src/compiler-v6.js",
        dist: "dist/compiler-v6.dist.js",
        distMin: "dist/compiler-v6.min.dist.js",
      }),
      compileFile({
        src: "src/moduler-v6.js",
        dist: "dist/moduler-v6.dist.js",
        distMin: "dist/moduler-v6.min.dist.js",
      }),
      compileFile({
        src: "src/dev-binary-v6.js",
        dist: "dist/dev-binary-v6.dist.js",
        distMin: "dist/dev-binary-v6.min.dist.js",
      }),
      fs.promises.copyFile(rootrel("src/dev-binary-v6.bin.js"), rootrel("dist/dev-binary-v6.bin.dist.js")),
    ]);
  }
  Tareas_secundarias: {
    try {
      await Promise.all([
        // Cambiar permisos a binario para ser ejecutable desde cmd en Linux al menos:
        fs.chmodSync(rootrel("dist/dev-binary-v6.bin.dist.js"), 0o755),
        // Exportar core del proyecto base devbin a directorio paralelo del proyecto base devbin:
        (async () => {
          const dir = path.resolve(`${rootdir}/../moduler-v6-starter`);
          const dirSrc = JSON.stringify(dir);
          const cmdCommand = `devbin ensure core --from ${dirSrc}`;
          await execAsync(cmdCommand, { cwd: dir });
        })(),
      ]);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(`[*] Total of ${fileCounter} injections`);
  console.log(`[*] Successfully built all ModulerV6 APIs collection`);
};

module.exports = main();