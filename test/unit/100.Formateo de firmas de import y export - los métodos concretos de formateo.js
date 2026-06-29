module.exports = async function ({ assert, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;

  Firmas_de_export: {
    
    compilerV6._assertThrows(() => modulerV6._formatExportParameters([]), "Export no debería soportar firma: []", error => {
      return error.message === "ModulerV6.prototype.export cannot have 0 arguments";
    });

    compilerV6._assertThrows(() => modulerV6._formatExportParameters(["./file.js"]), "Export no debería soportar firma: [string]", error => {
      return error.message === "ModulerV6.prototype.export cannot have 1 argument only";
    });

    compilerV6._assertThrows(() => modulerV6._formatExportParameters([() => { }]), "Export no debería soportar firma: [function]", error => {
      return error.message === "ModulerV6.prototype.export cannot have 1 argument only";
    });

    compilerV6._assertDoesNotThrow(() => modulerV6._formatExportParameters(["name", "./file.js"]), "Export sí debería soportar firma: [string, string]");
    compilerV6._assertDoesNotThrow(() => modulerV6._formatExportParameters(["name", ["./file1.js", "./file2.js"]]), "Export sí debería soportar firma: [string, array]");
    compilerV6._assertDoesNotThrow(() => modulerV6._formatExportParameters(["name", ["./file1.js", "./file2.js"], () => { }]), "Export sí debería soportar firma: [string, array, function]");
    compilerV6._assertDoesNotThrow(() => modulerV6._formatExportParameters(["name", () => { }]), "Export sí debería soportar firma: [string, function]");
  
  }

  Firmas_de_import: {
    
    compilerV6._assertDoesNotThrow(() => modulerV6._formatImportParameters(["./file.js"]), "Import sí debería soportar firma: [string]");
    compilerV6._assertDoesNotThrow(() => modulerV6._formatImportParameters([["./f1.js","./f2.js"]]), "Import sí debería soportar firma: [array]");
    compilerV6._assertDoesNotThrow(() => modulerV6._formatImportParameters([() => {}]), "Import sí debería soportar firma: [function]");

    compilerV6._assertThrows(() => modulerV6._formatImportParameters([]), "Import no debería soportar firma: []", error => {
      return error.message === "ModulerV6.prototype.import cannot have 0 arguments";
    });
    
    compilerV6._assertThrows(() => modulerV6._formatImportParameters(["name", "./file.js"]), "Import no debería soportar firma: [string, string]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });
    compilerV6._assertThrows(() => modulerV6._formatImportParameters(["name", ["./file1.js", "./file2.js"]]), "Import no debería soportar firma: [string, array]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });
    compilerV6._assertThrows(() => modulerV6._formatImportParameters(["name", ["./file1.js", "./file2.js"], () => { }]), "Import no debería soportar firma: [string, array, function]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });
    compilerV6._assertThrows(() => modulerV6._formatImportParameters(["name", () => { }]), "Import no debería soportar firma: [string, function]", error => {
      return error.message.startsWith("ModulerV6.prototype.import");
    });

  }

};