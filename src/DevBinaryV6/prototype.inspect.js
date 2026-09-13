/**
 * @name DevBinaryV6.prototype.inspect
 * @type 
 * @description 
 */
inspect(obj) {
  const properties = new Map();
  for (let target = obj; target; target = Object.getPrototypeOf(target)) {
    for (const key of Reflect.ownKeys(target)) {
      if (!properties.has(key)) {
        const descriptor = Object.getOwnPropertyDescriptor(target, key);
        properties.set(key, {
          type: "value" in descriptor
            ? typeof descriptor.value
            : descriptor.get && descriptor.set
              ? "get/set"
              : descriptor.get
                ? "getter"
                : "setter",
          descriptor,
          owner: target
        });
      }
    }
  }
  console.log(properties);
  return Object.fromEntries(properties);
}