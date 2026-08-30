/**
 * @name ModulerV6.static.1
 * @type 
 * @description 
 */
static {
  Promise_polyfills: {
    if (typeof Promise.fromObject !== "function") {
      Promise.fromObject = async function (map) {
        const output = {};
        const keys = Object.keys(map);
        const list = await Promise.all(Object.values(map));
        for(let index=0; index<keys.length; index++) {
          const key = keys[index];
          output[key] = list[index];
        }
        return output;
      };
    }
    if (typeof Promise.fromCollection !== "function") {
      Promise.fromCollection = async function (collection) {
        ModulerV6.assert(typeof collection === "object", `Method «Promise.fromCollection» only accepts object or array as first argument but «${typeof collection}» was found instead`);
        return Array.isArray(collection) ? Promise.all(collection) : Promise.fromObject(collection);
      };
    }
  }
}