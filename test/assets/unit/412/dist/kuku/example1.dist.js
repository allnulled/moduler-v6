module.exports = $moduler.lockFiles([
"@/src/kuku/Database.js",
  "@/src/kuku/Server.js",
  "@/src/kuku/Utils.js"
]).until(Promise.fromCollection({
Database: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/kuku/Database.js", arguments[0], (function() {
    module.exports = class Database { static version = "1.0.2" };
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/kuku/Database.js")),
Server: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/kuku/Server.js", arguments[0], (function() {
    module.exports = class Server { static version = "1.0.1" };
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/kuku/Server.js")),
Utils: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/kuku/Utils.js", arguments[0], (function() {
    module.exports = class Utils { static version = "1.0.3" };
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/kuku/Utils.js")),
 }));