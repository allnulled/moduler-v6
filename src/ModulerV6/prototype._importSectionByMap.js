/**
 * @name ModulerV6.prototype._importSectionByMap
 * @type 
 * @description 
 */
_importSectionByMap(sectionId, returnsOnMissing = undefined) {
  if(!this.settings.data?.sectionsMap) {
    return returnsOnMissing;
  }
  const originalMap = this.settings.data.sectionsMap;
  if(!(sectionId in originalMap)) {
    return returnsOnMissing;
  }
  const sectionPath = originalMap[sectionId];
  return this.import(sectionPath);
}