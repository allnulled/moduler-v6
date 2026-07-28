module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/109/main.js`);

  await submoduler.export("#seccion/uno", () => 1);
  await submoduler.export("#seccion/dos", () => 2);
  await submoduler.export("#seccion/tres", () => 3);
  const output1 = await submoduler.import("#seccion/uno");
  const output2 = await submoduler.import([
    "#seccion/dos",
    "#seccion/tres",
  ]);
  assert(output1 === 1, "Can import sections by sharp symbol and dependencies parameter (1)");
  assert(output2[0] === 2, "Can import sections by sharp symbol and dependencies parameter (2)");
  assert(output2[1] === 3, "Can import sections by sharp symbol and dependencies parameter (3)");
  
  const output3 = await submoduler.export("#seccion/cuatro", [
    "#seccion/uno",
    "#seccion/dos",
    "#seccion/tres",
  ], ([uno,dos,tres]) => {
    return { uno, dos, tres, cuatro: 4 };
  });
  assert(output3.uno === 1, "Can import sections by sharp symbol and dependencies parameter using moduler.export (4)");
  assert(output3.dos === 2, "Can import sections by sharp symbol and dependencies parameter using moduler.export (5)");
  assert(output3.tres === 3, "Can import sections by sharp symbol and dependencies parameter using moduler.export (6)");
  assert(output3.cuatro === 4, "Can import sections by sharp symbol and dependencies parameter using moduler.export (7)");

  compilerV6._logger.log("Test 109 ok");

};