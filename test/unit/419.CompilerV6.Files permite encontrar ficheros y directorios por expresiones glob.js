module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = compilerV6.createAssertFunction() || assertLoudly;

  const found = await compilerV6.files.findByPattern([
    "@/dev/**",
  ]);

  const foundRoots = found.map(it => compilerV6.rootdirOf(it));
  
  assert(foundRoots.includes("@/dev/settings.js"), "Can find files by glob pattern (1)");
  assert(!foundRoots.includes("@/dev.sh"), "Can find files by glob pattern (2)");

  compilerV6._logger.log("Test 418 ok");
};