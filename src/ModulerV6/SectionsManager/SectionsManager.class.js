class SectionsManager {

  constructor(root = {}) {
    this.root = root;
  }

  _assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  _isPropertoid(it) {
    return ["object", "function"].includes(typeof it);
  }

  isNull(it) {
    return it === null;
  }

  _hasKey(obj, prop) {
    return prop in obj;
  }

  _splitPropertyPath(path) {
    return path.split("/").filter(Boolean);
  }

  _getPropertyAndHolder(path, throwOnMissing = true, commingFromMethod = "_getPropertyAndHolder") {
    const keys = this._splitPropertyPath(path);
    const last = keys.pop();
    let obj = this.root;
    let counter = -1;
    for (const key of keys) {
      counter++;
      if (this.isNull(obj[key]) || !this._isPropertoid(obj[key])) {
        if (throwOnMissing) {
          throw new Error(`Missing iterable intermediate property «${key}» at index «${counter}» of path «${path}» on «SectionsManager.prototype._getPropertyAndHolder called from method «SectionsManager.prototype.${commingFromMethod}»`);
        }
        obj[key] = {};
      }
      obj = obj[key];
    }
    return { obj, last };
  }

  has(path) {
    // @DESCRIPTION: devuelve true si está definida la ruta de propiedad, false si no
    const ref = this._getPropertyAndHolder(path, false, "has");
    if(!this._isPropertoid(ref.obj)) return false;
    return ref.last in ref.obj;
  }

  get(path, defaultValue = Error) {
    // @DESCRIPTION: o devuelve el valor, o el valor por defecto, que en caso de ser Error, lanza un error, que es la conducta por defecto.
    const ref = this._getPropertyAndHolder(path, false, "get");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.get»`);
    if (!this._hasKey(ref.obj, ref.last)) {
      if (defaultValue === Error) throw new Error(`Could not find section property «${ref.last}» in path «${path}» on «SectionsManager.prototype.get»`);
      return defaultValue;
    }
    return ref.obj[ref.last];
  }

  set(path, value) {
    // @DESCRIPTION: sobreescribe la propiedad de la ruta con el valor
    const ref = this._getPropertyAndHolder(path, false, "set");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.set»`);
    return ref.obj[ref.last] = value;
  }

  initialize(path, value) {
    // @DESCRIPTION: rellena la propiedad de la ruta con el valor si está sin definir o en su defecto devuelve la definición anterior
    const ref = this._getPropertyAndHolder(path, false, "initialize");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.initialize»`);
    if (this._hasKey(ref.obj, ref.last)) return ref.obj[ref.last];
    return ref.obj[ref.last] = value;
  }

  overwrite(path, values = {}) {
    // @DESCRIPTION: sobreescribe las propiedades de la ruta (objeto o función) con las propiedades del valor
    const ref = this._getPropertyAndHolder(path, false, "overwrite");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.overwrite»`);
    return Object.assign(ref.obj[ref.last] ??= {}, values);
  }

  fill(path, values = {}) {
    // @DESCRIPTION: rellena las propiedades de la ruta (objeto o función) con las propiedades del valor, e ignora la propiedad en caso de colisión
    const ref = this._getPropertyAndHolder(path, false, "fill");
    this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.fill»`);
    return ref.obj[ref.last] = Object.assign({}, values, ref.obj[ref.last] ??= {});
  }

  expand(path, values = {}) {
    // @DESCRIPTION: rellena las propiedades de la ruta (objeto o función) con las propiedades del valor, y lanza error en caso de colisión
    const ref = this._getPropertyAndHolder(path, false, "expand");
    Initialize_if_it_is_empty: {
      this._assert(this._isPropertoid(ref.obj), `Could not access last property «${ref.last}» in path «${path}» because its holder is not «object» or «function» but «${typeof ref.obj}» on «SectionsManager.prototype.expand»`);
      if (!this._hasKey(ref.obj, ref.last)) {
        ref.obj[ref.last] = {};
      }
    }
    Check_it_has_no_common_properties_before_overwriting: {
      this._assert(this._isPropertoid(ref.obj[ref.last]), `Could not expand last property «${ref.last}» in path «${path}» with more properties because the previous value is of type «${typeof ref.obj[ref.last]}» on «SectionsManager.prototype.expand»`);
      const val = ref.obj[ref.last];
      for (let prop in values) {
        this._assert(!this._hasKey(val, prop), `Property «${prop}» under path «${path}» cannot be expanded because it is already initialized on «SectionsManager.prototype.expand»`);
      }
    }
    Overwrite: {
      return Object.assign(ref.obj[ref.last], values);
    }
  }

  delete(path) {
    // @DESCRIPTION: elimina 1 propiedad de un objeto o 
    const ref = this._getPropertyAndHolder(path, false, "delete");
    if (["object", "function"].includes(typeof ref.obj)) {
      if (ref.obj === null) {
        throw new Error(`Cannot delete property «${ref.last}» of a null value of path «${path}» on «SectionsManager.prototype.delete»`);
      } else if (ref.obj instanceof Array) {
        ref.obj.splice(ref.last, 1);
      } else {
        delete ref.obj[ref.last];
      }
    } else {
      throw new Error(`Cannot delete property «${ref.last}» of a holder of type «${typeof ref.obj}» of path «${path}» on «SectionsManager.prototype.delete»`);
    }
    return ref.obj[ref.last];
  }

  reset() {
    this.root = {};
    return this;
  }

}