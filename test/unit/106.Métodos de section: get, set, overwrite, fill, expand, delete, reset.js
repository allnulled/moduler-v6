module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/106/main.js`);

  Set_y_get: {
    submoduler.section.set("x", 90);
    assert(90 === submoduler.section.get("x"), "SectionsManager.prototype.{set,get} no están haciendo bien (1)");
    submoduler.section.reset();
  }

  Has_y_initialize: {
    assert(false === submoduler.section.has("a"), "SectionsManager.prototype.has no está haciend bien (1)");
    submoduler.section.initialize("a", 80);
    assert(true === submoduler.section.has("a"), "SectionsManager.prototype.initialize no está haciend bien (2)");
    assert(80 === submoduler.section.get("a"), "SectionsManager.prototype.initialize no está haciend bien (3)");
    submoduler.section.initialize("a", 90);
    assert(80 === submoduler.section.get("a"), "SectionsManager.prototype.initialize no está haciend bien (4)");
    submoduler.section.reset();
  }

  Delete: {
    submoduler.section.initialize("a", 90);
    assert(90 === submoduler.section.get("a"), "SectionsManager.prototype.delete no está haciend bien (1)");
    submoduler.section.delete("a");
    assert(false === submoduler.section.has("a"), "SectionsManager.prototype.delete no está haciend bien (2)");
  }

  Fill: {
    submoduler.section.fill("una/seccion/random", {
      a: 1,
      b: 2,
      c: 3,
    });
    submoduler.section.fill("una/seccion/random", {
      a: 4,
      b: 5,
      c: 6,
      d: 7,
    });
    assert(1 === submoduler.section.get("una/seccion/random/a"), "SectionsManager.prototype.fill no está haciendo bien (1)");
    assert(2 === submoduler.section.get("una/seccion/random/b"), "SectionsManager.prototype.fill no está haciendo bien (2)");
    assert(3 === submoduler.section.get("una/seccion/random/c"), "SectionsManager.prototype.fill no está haciendo bien (3)");
    assert(7 === submoduler.section.get("una/seccion/random/d"), "SectionsManager.prototype.fill no está haciendo bien (4)");
    submoduler.section.reset();
  }

  Overwrite: {
    submoduler.section.overwrite("una/seccion/random", {
      a: 1,
      b: 2,
      c: 3,
    });
    submoduler.section.overwrite("una/seccion/random", {
      a: 4,
      b: 5,
      c: 6,
      d: 7,
    });
    assert(4 === submoduler.section.get("una/seccion/random/a"), "SectionsManager.prototype.overwrite no está haciendo bien (1)");
    assert(5 === submoduler.section.get("una/seccion/random/b"), "SectionsManager.prototype.overwrite no está haciendo bien (2)");
    assert(6 === submoduler.section.get("una/seccion/random/c"), "SectionsManager.prototype.overwrite no está haciendo bien (3)");
    assert(7 === submoduler.section.get("una/seccion/random/d"), "SectionsManager.prototype.overwrite no está haciendo bien (4)");
    submoduler.section.reset();
  }

  Expand: {
    let hasFailed = false;
    submoduler.section.expand("una/seccion/random", {
      a: 1,
      b: 2,
      c: 3,
    });
    try {
      submoduler.section.expand("una/seccion/random", {
        a: 4,
        d: 7,
      });
    } catch (error) {
      hasFailed = true;
    }
    assert(hasFailed === true, "SectionsManager.prototype.expand no está haciendo bien (0)");
    assert(1 === submoduler.section.get("una/seccion/random/a"), "SectionsManager.prototype.overwrite no está haciendo bien (1)");
    assert(2 === submoduler.section.get("una/seccion/random/b"), "SectionsManager.prototype.overwrite no está haciendo bien (2)");
    assert(3 === submoduler.section.get("una/seccion/random/c"), "SectionsManager.prototype.overwrite no está haciendo bien (3)");
    assert(false === submoduler.section.has("una/seccion/random/d"), "SectionsManager.prototype.overwrite no está haciendo bien (4)");
    submoduler.section.expand("una/seccion/random", {
      // Ahora no petará:
      // a: 4,
      d: 7,
    });
    assert(7 === submoduler.section.get("una/seccion/random/d"), "SectionsManager.prototype.overwrite no está haciendo bien (5)");
    submoduler.section.reset();
  }

  compilerV6._logger.log("Test 106 ok");

};