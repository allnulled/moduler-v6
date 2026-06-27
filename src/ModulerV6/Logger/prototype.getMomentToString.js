/**
 * @name ModulerV6.Logger.prototype.getMomentToString
 * @type 
 * @description 
 */
getMomentToString() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  const pad3 = n => String(n).padStart(3, "0");
  return (
    `${d.getFullYear()}-` +
    `${pad(d.getMonth() + 1)}-` +
    `${pad(d.getDate())} ` +
    `${pad(d.getHours())}:` +
    `${pad(d.getMinutes())}:` +
    `${pad(d.getSeconds())}.` +
    `${pad3(d.getMilliseconds())}`
  );
}