/**
 * @name ModulerV6.prototype.import
 * @type 
 * @description 
 */
import(...signature) {
  let filepath, dependencies;
  const parameters = this._formatImportParameters(signature);
  const {
    id: _id = null,
    file: _file = null,
    dependencies: _dependencies = null,
    factory: _factory = null,
  } = parameters;
  Resolve_by_id: {
    if (_id) {
      // Si tiene id, devuelve el id por huevos:
      this.assert(this.section.has(_id), `No section named «${_id}» on «ModulerV6.prototype.import»`);
      return this.section.get(_id);
    }
  }
  Resolve_by_file: {
    if (_file) {
      // Si tiene file, o devuelve el file cacheado, o lo cachea y lo devuelve:
      filepath = this.normalizationOf(_file);
      if (filepath in this.modules) {
        return this.modules[filepath];
      }
      return this._importFile(filepath);
    }
  }
  Resolve_by_dependencies: {
    if (_dependencies && _dependencies.length) {
      // Si tiene dependencies, las carga:
      dependencies = Promise.all(_dependencies.map(dependency => {
        // @NOTESE: Diuuuuuu a fondískiuts aquí hay inyéections fuli si no hay algún assert impidiéndolo por otro lao
        return this._importFile(dependency);
      }));
      if(!_factory) {
        return dependencies;
      }
    }
  }
  Resolve_by_factory: {
    if (_factory && dependencies) {
      return dependencies.then(resolvedDependencies => this._importFactory(_factory, resolvedDependencies));
    } else if (_factory && !dependencies) {
      return this._importFactory(_factory, []);
    } else if (dependencies) {
      return dependencies;
    } else {
      throw new Error("This error should never happen by design (8210)");
    }
  }
  throw new Error("This error should never happen by design (4993)");
}