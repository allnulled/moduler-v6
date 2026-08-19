/**
 * @name ModulerV6.static.updateAllHtmlLinks
 * @type 
 * @description 
 */
static updateAllHtmlLinks() {
  if (!this.isBrowser) {
    console.error("[!] ModulerV6.updateAllHtmlLinks can only be used in browser");
    return -2;
  }
  const allAnchors = document.body.querySelectorAll("a");
  console.log(`[*] ModulerV6 found ${allAnchors.length} anchors to update its link`);
  allAnchors.forEach(el => {
    const dataHref = el.getAttribute("data-mv6-href");
    if (dataHref?.startsWith("@/")) {
      el.setAttribute("href", $moduler.normalizationOf(dataHref));
    }
  });
}