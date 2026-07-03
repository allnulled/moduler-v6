module.exports = async function ({ assert: assertLoudly, utils, compilerV6 }) {

  const { moduler: modulerV6 } = compilerV6;
  const assert = modulerV6.createAssertFunction();
  const submoduler = modulerV6.cloneForFile(`${__dirname}/../assets/unit/104/main.js`);

  assert(typeof submoduler.css === "object", "Moduler should contain .css property as object");

  Add_file_and_expect_recursion: {
    await submoduler.css.add(["./main.css"]);
  }

  Test_de_css_manager: {
    assert(typeof submoduler.css.sheets === "object", "CssManager is not behaving as expected (2)");
    assert(typeof submoduler.css.sheets === "object", "CssManager is not behaving as expected (3)");
  }

  let outputCss = undefined;
  Persist_synchronization: {
    outputCss = submoduler.css.synchronize();
    assert(typeof outputCss === "string", "CssManager.prototype.synchronize is not behaving as expected (1)");
    await require("fs").promises.unlink(submoduler.normalizationOf("./main.dist.css"));
    await require("fs").promises.writeFile(submoduler.normalizationOf("./main.dist.css"), outputCss, "utf8");
  }
  Test_output_by_distribution_source: {
    const positions = [];
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/reset/section-1.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/reset/section-2.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/reset/reset.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/framework/section-1.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/framework/section-2.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/framework/framework.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/custom/section-1.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/custom/section-2.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/custom/custom.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/plugins/section-1.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/plugins/section-2.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/plugins/plugins.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/theme-1/section-1.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/theme-1/section-2.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/styles/theme-1/theme-1.css"*/'));
    positions.push(outputCss.indexOf('/*!file:"@/test/assets/unit/104/main.css"*/'));
    for(let index=0; index<positions.length; index++) {
      const curr = positions[index];
      Check_previous:
      if(index !== 0) {
        assert(curr > positions[index-1], `CssManager is not compiling required source on index ${index} that should be greater than its previous index ${index-1}`);
      }
      Check_next:
      if(index !== (positions.length-1)) {
        assert(curr < positions[index+1], `CssManager is not compiling required source on index ${index} that should be lower than its next index ${index+1}`);
      }
    }
  }

  compilerV6._logger.log("Test 104 ok");

};