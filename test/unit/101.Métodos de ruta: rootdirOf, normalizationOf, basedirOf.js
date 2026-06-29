module.exports = async function ({ assert, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;

  const submodulerV6_1 = modulerV6.cloneForFile(`${__dirname}/../assets/unit/101/main.js`);

  Tests_de_basedirOf: {
    const out1 = submodulerV6_1.basedirOf("@/some/path.js");
    const out2 = submodulerV6_1.basedirOf("../some/path.js");
    const out3 = submodulerV6_1.basedirOf("./some/path.js");
    const out4 = submodulerV6_1.basedirOf("/some/path.js");
    const out5 = submodulerV6_1.basedirOf("some/path.js");
    const out6 = submodulerV6_1.basedirOf("C:/some/windows/absolute.js");
    const out7 = submodulerV6_1.basedirOf("C:/some/windows/absolute.js");
    const out8 = submodulerV6_1.basedirOf("//some/windows/absolute.js");
    const out9 = submodulerV6_1.basedirOf("//some/windows/absolute.js");
    const out10 = submodulerV6_1.basedirOf("http://whatever.com/so");
    // console.log({ out1, out2, out3, out4, out5, out6, out7, out8, out9, out10, });
    compilerV6.assert(out1.includes('/some/path.js'), "Path using basedirOf works (1)");
    compilerV6.assert(out2.includes('./some/path.js'), "Path using basedirOf works (2)");
    compilerV6.assert(out3.includes('./some/path.js'), "Path using basedirOf works (3)");
    compilerV6.assert(out4.includes('/some/path.js'), "Path using basedirOf works (4)");
    compilerV6.assert(out5.includes('some/path.js'), "Path using basedirOf works (5)");
    compilerV6.assert(out6.includes('C:/some/windows/absolute.js'), "Path using basedirOf works (6)");
    compilerV6.assert(out7.includes('C:/some/windows/absolute.js'), "Path using basedirOf works (7)");
    compilerV6.assert(out8.includes('//some/windows/absolute.js'), "Path using basedirOf works (8)");
    compilerV6.assert(out9.includes('//some/windows/absolute.js'), "Path using basedirOf works (9)");
    compilerV6.assert(out10.includes('http://whatever.com/so'), "Path using basedirOf works (10)");

  }

  Tests_de_rootdirOf: {
    const out1 = submodulerV6_1.rootdirOf("@/some/path.js");
    const out2 = submodulerV6_1.rootdirOf("../some/path.js");
    const out3 = submodulerV6_1.rootdirOf("./some/path.js");
    const out4 = submodulerV6_1.rootdirOf("/some/path.js");
    const out5 = submodulerV6_1.rootdirOf("some/path.js");
    const out6 = submodulerV6_1.rootdirOf("http://whatever.com/so");
    // console.log({ out1, out2, out3, out4, out5, out6 });
    compilerV6.assert(out1.includes('@/some/path.js'), `Paths using rootdirOf works (1)`);
    compilerV6.assert(out2.includes('@/test/assets/unit/101/some/path.js'), `Paths using rootdirOf works (2)`);
    compilerV6.assert(out3.includes('@/test/assets/unit/101/some/path.js'), `Paths using rootdirOf works (3)`);
    compilerV6.assert(out4.includes('/some/path.js'), `Paths using rootdirOf works (4)`);
    compilerV6.assert(out5.includes('some/path.js'), `Paths using rootdirOf works (5)`);
    compilerV6.assert(out6.includes('http://whatever.com/so'), `Paths using rootdirOf works (6)`);
  }

  Tests_de_normalizationOf: {
    const out1 = submodulerV6_1.normalizationOf("@/some/path.js");
    const out2 = submodulerV6_1.normalizationOf("../some/path.js");
    const out3 = submodulerV6_1.normalizationOf("./some/path.js");
    const out4 = submodulerV6_1.normalizationOf("/some/path.js");
    const out5 = submodulerV6_1.normalizationOf("some/path.js");
    const out6 = submodulerV6_1.normalizationOf("http://whatever.com/so");
    // console.log({ out1, out2, out3, out4, out5, out6 });
    compilerV6.assert(out1.includes('/some/path.js'), `Paths using normalizationOf works (1)`);
    compilerV6.assert(out2.includes('/test/assets/unit/101/some/path.js'), `Paths using normalizationOf works (2)`);
    compilerV6.assert(out3.includes('/test/assets/unit/101/some/path.js'), `Paths using normalizationOf works (3)`);
    compilerV6.assert(out4.includes('/some/path.js'), `Paths using normalizationOf works (4)`);
    compilerV6.assert(out5.includes('some/path.js'), `Paths using normalizationOf works (5)`);
    compilerV6.assert(out6.includes('http://whatever.com/so'), `Paths using normalizationOf works (6)`);
  }

};