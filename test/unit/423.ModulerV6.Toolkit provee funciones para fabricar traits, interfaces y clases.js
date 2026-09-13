module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const devbinOne = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/423`);

  const assertThrows = (...args) => devbinOne.tester.assertThrows(...args);
  const assertDoesNotThrow = (...args) => devbinOne.tester.assertDoesNotThrow(...args);

  const { moduler } = devbinOne;

  const { ClassSkiller } = moduler.constructor;

  const MixedInterface1 = ClassSkiller.mixInterfaces([{
    static: {
      staticAction1: function () {
        return "static action 1";
      },
      staticAction2: function () {
        return "static action 2";
      },
    },
    prototype: {
      protoAction1: function () {
        return "prototype action 1";
      },
      protoAction2: function () {
        return "prototype action 2";
      },
    },
    signatures: {},
  }, {
    static: {
      staticAction3: function () {
        return "static action 3";
      },
      staticAction4: function () {
        return "static action 4";
      },
    },
    prototype: {
      protoAction3: function () {
        return "prototype action 3";
      },
      protoAction4: function () {
        return "prototype action 4";
      },
    },
    signatures: {},
  }, {
    static: {
      staticAction5: function () {
        return "static action 5";
      },
      staticAction6: function () {
        return "static action 6";
      },
      get staticCollection3() {
        return ["staticAction5", "staticAction6"];
      },
      set staticallyCommunicable(v) {
        this.staticallyCommunicated = v;
      }
    },
    prototype: {
      protoAction5: function () {
        return "prototype action 5";
      },
      protoAction6: function () {
        return "prototype action 6";
      },
      get protoCollection3() {
        return ["protoAction5", "protoAction6"];
      },
      set protoCommunicable(v) {
        this.protoCommunicated = v;
      }
    },
    signatures: {},
  }]);

  assert(typeof MixedInterface1 === "object", "Fallo nº1: el return del mixInterfaces");
  assert(typeof MixedInterface1.static === "object", "Fallo nº2: la interfaz que devuelve mixInterfaces debe ser una interfaz con su static y prototype");
  assert(typeof MixedInterface1.prototype === "object", "Fallo nº3");
  assert(typeof MixedInterface1.static.staticAction1 === "function", "Fallo nº4: los métodos estáticos");
  assert(typeof MixedInterface1.static.staticAction2 === "function", "Fallo nº5");
  assert(typeof MixedInterface1.static.staticAction3 === "function", "Fallo nº6");
  assert(typeof MixedInterface1.static.staticAction4 === "function", "Fallo nº7");
  assert(typeof MixedInterface1.static.staticAction5 === "function", "Fallo nº8");
  assert(typeof MixedInterface1.static.staticAction6 === "function", "Fallo nº9");
  assert(typeof MixedInterface1.prototype.protoAction1 === "function", "Fallo nº10: los métodos prototipo");
  assert(typeof MixedInterface1.prototype.protoAction2 === "function", "Fallo nº11");
  assert(typeof MixedInterface1.prototype.protoAction3 === "function", "Fallo nº12");
  assert(typeof MixedInterface1.prototype.protoAction4 === "function", "Fallo nº13");
  assert(typeof MixedInterface1.prototype.protoAction5 === "function", "Fallo nº14");
  assert(typeof MixedInterface1.prototype.protoAction6 === "function", "Fallo nº15");

  const ExtraInterface1 = {
    static: {},
    prototype: {},
  }

  class BasicInterface1 {
    static {
      ClassSkiller.addInterfaces(this, [
        MixedInterface1,
        ExtraInterface1,
      ]);
    }
  };

  await assertDoesNotThrow("Puede aplicar interfaces con getters y setters en clases", () => {
    const bint1 = new BasicInterface1();
    Los_metodos_estaticos: {
      BasicInterface1.staticAction1();
      BasicInterface1.staticAction2();
      BasicInterface1.staticAction3();
      BasicInterface1.staticAction4();
      BasicInterface1.staticAction5();
      BasicInterface1.staticAction6();
    }
    Los_metodos_prototipo: {
      bint1.protoAction1();
      bint1.protoAction2();
      bint1.protoAction3();
      bint1.protoAction4();
      bint1.protoAction5();
      bint1.protoAction6();
    }
    El_getter_prototipo: {
      assert(bint1.protoCollection3[0] === "protoAction5", "Fallo nº16: los getters del prototipo");
      assert(bint1.protoCollection3[1] === "protoAction6", "Fallo nº17");
    }
    El_getter_estatico: {
      assert(bint1.constructor.staticCollection3[0] === "staticAction5", "Fallo nº16: los getters del estático");
      assert(bint1.constructor.staticCollection3[1] === "staticAction6", "Fallo nº18");
    }
    El_setter_prototipo: {
      assert(typeof bint1.protoCommunicated === "undefined", "Fallo nº19");
      bint1.protoCommunicable = "OK";
      assert(bint1.protoCommunicated === "OK", "Fallo nº20 los setters del prototipo");
    }
    El_setter_estatico: {
      assert(typeof bint1.constructor.staticallyCommunicated === "undefined", "Fallo nº21");
      bint1.constructor.staticallyCommunicable = "OK";
      assert(bint1.constructor.staticallyCommunicated === "OK", "Fallo nº22: los setters del estático");
    }
  });


  await assertThrows("ClassSkiller.mixInterfaces no puede sobreescribir métodos sin overridables especificado", () => {
    ClassSkiller.mixInterfaces([{
      static: {
        a: 900,
      }
    }, {
      static: {
        a: 1000,
      }
    }]);
  });

  await assertDoesNotThrow("ClassSkiller.mixInterfaces sí puede sobreescribir métodos con overridables especificado", () => {
    ClassSkiller.mixInterfaces([{
      static: {
        a: 900,
      }
    }, {
      static: {
        a: 1000,
      }
    }], {
      overridables: ["a"]
    });
  });

  Los_metodos_frendli: {
    const trait1 = ClassSkiller.makeTrait([{
      one: 1,
    }, {
      get two() {
        return 2;
      }
    }, {
      three() {
        return this.one + this.two;
      }
    }]);
    assert(trait1.one === 1, "ClassSkiller.makeTrait puede mezclar propiedades (1)");
    assert(trait1.two === 2, "ClassSkiller.makeTrait puede mezclar getters (2)");
    assert(trait1.three() === 3, "ClassSkiller.makeTrait puede mezclar métodos (3)");

    const interface1 = ClassSkiller.makeInterface([{
      prototype: trait1,
      static: {
        intfc1: 1,
      }
    }, {
      prototype: {
        four: 4,
        five() {
          return 5;
        },
        get six() {
          return 6;
        }
      },
      static: {
        get abc() {
          return "ok";
        },
        intfc2: 2,
      }
    }]);
    assert(interface1.prototype.one === 1, "ClassSkiller.makeInterface puede mezclar propiedades (11)");
    assert(interface1.prototype.two === 2, "ClassSkiller.makeInterface puede mezclar getters (12)");
    assert(interface1.prototype.three() === 3, "ClassSkiller.makeInterface puede mezclar métodos (13)");
    assert(interface1.prototype.four === 4, "ClassSkiller.makeInterface puede mezclar métodos (14)");
    assert(interface1.prototype.five() === 5, "ClassSkiller.makeInterface puede mezclar métodos (15)");
    assert(interface1.prototype.six === 6, "ClassSkiller.makeInterface puede mezclar métodos (16)");
    assert(interface1.static.abc === "ok", "ClassSkiller.makeInterface puede mezclar métodos (17)");
    assert(interface1.static.intfc1 === 1, "ClassSkiller.makeInterface puede mezclar métodos (18)");
    assert(interface1.static.intfc2 === 2, "ClassSkiller.makeInterface puede mezclar métodos (19)");

    const class1 = ClassSkiller.makeClass([
      interface1,
      {
        prototype: {
          other: 90,
          get hi() {
            return "hi";
          },
        },
        static: {
          infer: 80,
        }
      }
    ]);

    const instanceOfClass1 = new class1();
    assert(instanceOfClass1.one === 1, "ClassSkiller.makeClass puede mezclar propiedades (31)");
    assert(instanceOfClass1.two === 2, "ClassSkiller.makeClass puede mezclar getters (32)");
    assert(instanceOfClass1.three() === 3, "ClassSkiller.makeClass puede mezclar métodos (33)");
    assert(instanceOfClass1.four === 4, "ClassSkiller.makeClass puede mezclar métodos (34)");
    assert(instanceOfClass1.five() === 5, "ClassSkiller.makeClass puede mezclar métodos (35)");
    assert(instanceOfClass1.six === 6, "ClassSkiller.makeClass puede mezclar métodos (36)");
    assert(instanceOfClass1.other === 90, "ClassSkiller.makeClass puede mezclar métodos (36.2)");
    assert(instanceOfClass1.hi === "hi", "ClassSkiller.makeClass puede mezclar métodos (36.3)");
    assert(class1.abc === "ok", "ClassSkiller.makeClass puede mezclar métodos (37)");
    assert(class1.intfc1 === 1, "ClassSkiller.makeClass puede mezclar métodos (38)");
    assert(class1.intfc2 === 2, "ClassSkiller.makeClass puede mezclar métodos (39)");
    assert(class1.infer === 80, "ClassSkiller.makeClass puede mezclar métodos (30)");

  }

  Los_shortcuts_en_el_moduler: {
    const t1 = compilerV6.moduler.toolkit.makeTrait([{
      a:1,
    }, {
      get b() {
        return 2;
      }
    }, {
      c() {
        return 3;
      }
    }]);
    assert(t1.a === 1, "$moduler.utils.makeTrait está disponible y funciona como ClassSkiller lo haría (1)");
    assert(t1.b === 2, "$moduler.utils.makeTrait está disponible y funciona como ClassSkiller lo haría (2)");
    assert(t1.c() === 3, "$moduler.utils.makeTrait está disponible y funciona como ClassSkiller lo haría (3)");
  }

  compilerV6._logger.log("Test 423 ok");
};