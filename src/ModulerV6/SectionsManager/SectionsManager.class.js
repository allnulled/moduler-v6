class SectionsManager {

  constructor(root = {}) {
    this.root = root;
  }

  _resolve(path, create = false, commingFromMethod = "unknown") {
    const keys = path.split("/").filter(Boolean);
    const last = keys.pop();
    let obj = this.root;
    let counter = -1;
    for (const key of keys) {
      counter++;
      if ((obj[key] === null) || (!["object","function"].includes(typeof obj[key]))) {
        if (!create) {
          throw new Error(`Missing iterable intermediate property «${key}» at index «${counter}» of path «${path}» on «SectionsManager.prototype._resolve» called from method «SectionsManager.prototype.${commingFromMethod}»`);
        }
        obj[key] = {};
      }
      obj = obj[key];
    }
    return { obj, last };
  }

  get(path, defaultValue = Error) {
    const ref = this._resolve(path, false, "get");
    const { obj, last } = ref;
    if (!(last in obj)) {
      if (defaultValue === Error) throw new Error(`Could not find section property «${path}» on «SectionsManager.prototype.get»`);
      return defaultValue;
    }
    return obj[last];
  }

  set(path, value) {
    const ref = this._resolve(path, true, "set");
    return ref.obj[ref.last] = value;
  }

  extend(path, values = {}) {
    const ref = this._resolve(path, true, "extend");
    return Object.assign(ref.obj[ref.last] ??= {}, values);
  }

  fill(path, values = {}) {
    const ref = this._resolve(path, true, "fill");
    return ref.obj[ref.last] = Object.assign({}, values, ref.obj[ref.last] ??= {});
  }

  delete(path) {
    const ref = this._resolve(path, true, "delete");
    if(["object", "function"].includes(typeof ref.object)) {
      if(ref.object === null) {
        throw new Error(`Cannot delete property «${ref.last}» of a null value of path «${path}» on «SectionsManager.prototype.delete»`);
      } else if(ref.object instanceof Array) {
        ref.object.splice(ref.last, 1);
      } else {
        delete ref.obj[ref.last];
      }
    } else {
      throw new Error(`Cannot delete property «${ref.last}» of a type «${typeof ref.object}» of path «${path}» on «SectionsManager.prototype.delete»`);
    }
    return ref.obj[ref.last];
  }

  resetAll() {
    this.root = {};
    return this;
  }

}