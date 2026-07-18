/**
 * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode.prototype.extendTerminalKit
 * @type 
 * @description 
 */
extendTerminalKit(term) {
  if (!term.turnOff) term.turnOff = function () {
    this.grabInput(false);
    this.applicationKeypad(false);
    this.fullscreen(false);
    this.hideCursor(false);
  };
  if (!term.turnOn) term.turnOn = function () {
    this.grabInput(true);
    this.applicationKeypad(true);
    this.fullscreen(true);
    this.hideCursor(true);
  };
}