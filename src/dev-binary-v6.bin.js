#!/usr/bin/env node

require(`${__dirname}/dev-binary-v6.dist.js`);

module.exports = DevBinaryV6.fromRootDirectoryOf(process.cwd()).then(devbinInstance => {
  return devbinInstance.selfDispatch();
});