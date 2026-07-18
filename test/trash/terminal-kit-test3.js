const child_process = require("child_process");
const path = require("path");
const os = require("os");
const term = require("terminal-kit").terminal;

const filename = path.join(os.tmpdir(),`questionary-${process.pid}.txt`);

child_process.spawnSync("vim", [filename], {
    stdio: "inherit"
});