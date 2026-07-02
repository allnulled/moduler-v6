module.exports = async function ({ assert, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;

  /*
  Firmas_de_export: {
    compilerV6.assertThrows(() => modulerV6._formatExportParameters([]), "Export no debería soportar firma: []", error => {
      return error.message === "ModulerV6.prototype.export cannot have 0 arguments";
    });
    compilerV6.assertThrows(() => modulerV6._formatExportParameters(["./file.js"]), "Export no debería soportar firma: [string]", error => {
      return error.message === "ModulerV6.prototype.export cannot have 1 argument only";
    });
    compilerV6.assertThrows(() => modulerV6._formatExportParameters([() => { }]), "Export no debería soportar firma: [function]", error => {
      return error.message === "ModulerV6.prototype.export cannot have 1 argument only";
    });
    compilerV6.assertDoesNotThrow(() => modulerV6._formatExportParameters(["#alias1", "./file.js"]), "Export sí debería soportar firma: [string, string]");
    compilerV6.assertDoesNotThrow(() => modulerV6._formatExportParameters(["#alias2", ["./file1.js", "./file2.js"]]), "Export sí debería soportar firma: [string, array]");
    compilerV6.assertDoesNotThrow(() => modulerV6._formatExportParameters(["#alias3", ["./file1.js", "./file2.js"], () => { }]), "Export sí debería soportar firma: [string, array, function]");
    compilerV6.assertDoesNotThrow(() => modulerV6._formatExportParameters(["#alias4", () => { }]), "Export sí debería soportar firma: [string, function]");
  }

  Firmas_de_import: {
    compilerV6.assertDoesNotThrow(() => modulerV6._formatImportParameters(["./file.js"]), "Import sí debería soportar firma: [string]");
    compilerV6.assertDoesNotThrow(() => modulerV6._formatImportParameters([["./f1.js", "./f2.js"]]), "Import sí debería soportar firma: [array]");
    compilerV6.assertDoesNotThrow(() => modulerV6._formatImportParameters([() => { }]), "Import sí debería soportar firma: [function]");
    compilerV6.assertThrows(() => modulerV6._formatImportParameters([]), "Import no debería soportar firma: []", error => {
      return error.message === "ModulerV6.prototype.import cannot have 0 arguments";
    });
    compilerV6.assertThrows(() => modulerV6._formatImportParameters(["#id1", "./file.js"]), "Import no debería soportar firma: [string, string]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });
    compilerV6.assertThrows(() => modulerV6._formatImportParameters(["#id2", ["./file1.js", "./file2.js"]]), "Import no debería soportar firma: [string, array]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });
    compilerV6.assertThrows(() => modulerV6._formatImportParameters(["#id3", ["./file1.js", "./file2.js"], () => { }]), "Import no debería soportar firma: [string, array, function]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });
    compilerV6.assertThrows(() => modulerV6._formatImportParameters(["#id4", () => { }]), "Import no debería soportar firma: [string, function]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });
  }
  //*/

  Tests_de_import: {
    Firma_1: {
      const output = modulerV6._formatImportParameters(["./file.js"]);
      compilerV6.assert(typeof output === "object", "Should return object from formatImportParameters([String]) (point 0)");
      compilerV6.assert(typeof output.file === "string", "Should return string from formatImportParameters([String]).file (point 1)");
    }
    Firma_2: {
      const output = modulerV6._formatImportParameters([() => 500]);
      compilerV6.assert(typeof output === "object", "Should return object from formatImportParameters([Function]) (point 0)");
      compilerV6.assert(typeof output.factory === "function", "Should return function from formatImportParameters([Function]).factory (point 1)");
    }
    Firma_3: {
      const output = modulerV6._formatImportParameters([["./file1.js", "./file2.js"]]);
      compilerV6.assert(typeof output === "object", "Should return object from formatImportParameters([Array]) (point 0)");
      compilerV6.assert(typeof output.dependencies === "object", "Should return object from formatImportParameters([Array]).dependencies (point 1)");
    }
    Firma_4: {
      const output = modulerV6._formatImportParameters([["./file1.js", "./file2.js"], (f1, f2) => { }]);
      compilerV6.assert(typeof output === "object", "Should return object from formatImportParameters([Array,Function]) (point 0)");
      compilerV6.assert(typeof output.dependencies === "object", "Should return object from formatImportParameters([Array,Function]).dependencies (point 1)");
      compilerV6.assert(typeof output.factory === "function", "Should return function from formatImportParameters([Array,Function]).factory (point 2)");
    }
  }

  Tests_de_export: {
    Firma_1: {
      const output = modulerV6._formatExportParameters(["#name1", "./file.js"]);
      compilerV6.assert(typeof output === "object", "Should return object from formatExportParameters([String,String]) (point 0)");
      compilerV6.assert(typeof output.id === "string", "Should return string from formatExportParameters([String,String]).id (point 1)");
      compilerV6.assert(typeof output.dependencies === "object", "Should return object from formatExportParameters([String,String]).dependencies (point 2)");
    }
    Firma_2: {
      const output = modulerV6._formatExportParameters(["#name2",() => 500]);
      compilerV6.assert(typeof output === "object", "Should return object from formatExportParameters([String,Function]) (point 0)");
      compilerV6.assert(typeof output.id === "string", "Should return string from formatExportParameters([String,String]).id (point 1)");
      compilerV6.assert(typeof output.factory === "function", "Should return function from formatExportParameters([String,Function]).factory (point 2)");
    }
    Firma_3: {
      const output = modulerV6._formatExportParameters(["#name3", ["./file1.js", "./file2.js"]]);
      compilerV6.assert(typeof output === "object", "Should return object from formatExportParameters([String,Array]) (point 0)");
      compilerV6.assert(typeof output.id === "string", "Should return string from formatExportParameters([String,Array]).id (point 1)");
      compilerV6.assert(typeof output.dependencies === "object", "Should return object from formatExportParameters([String,Array]).dependencies (point 2)");
    }
    Firma_4: {
      const output = modulerV6._formatExportParameters(["#name4", ["./file1.js", "./file2.js"], (f1, f2) => { }]);
      compilerV6.assert(typeof output === "object", "Should return object from formatExportParameters([String,Array,Function]) (point 0)");
      compilerV6.assert(typeof output.id === "string", "Should return string from formatExportParameters([String,Array,Function]).id (point 1)");
      compilerV6.assert(typeof output.dependencies === "object", "Should return object from formatExportParameters([String,Array,Function]).dependencies (point 2)");
      compilerV6.assert(typeof output.factory === "function", "Should return function from formatExportParameters([String,Array,Function]).factory (point 3)");
    }
  }

};