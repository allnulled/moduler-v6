module.exports = $moduler.lockFiles([
"@/src/ejemplo/Database.js",
  "@/src/ejemplo/Server.js",
  "@/src/ejemplo/Utils.js"
]).until(Promise.fromCollection({
Database: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/ejemplo/Database.js", arguments[0], (function() {
    module.exports = class Database { static version = "1.0.2" };
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/ejemplo/Database.js")),
Server: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/ejemplo/Server.js", arguments[0], (function() {
    module.exports = class Server { static version = "1.0.1" };
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/ejemplo/Server.js")),
Utils: (function({ module, exports }) {
  return $moduler.releaseFile("@/src/ejemplo/Utils.js", arguments[0], (function() {
    module.exports = class Utils { static version = "1.0.3" };
  }).call(this));
}).call(this, $moduler.reserveFile("@/src/ejemplo/Utils.js")),
 }));