/**
 * @name CompilerV6.prototype._extractMarkdownTableOfContents
 * @type 
 * @description 
 */
_extractMarkdownTableOfContents(text, asMarkdown = false) {
  const entries = [];
  const slugCounters = {};
  const lines = text.split(/\r?\n/);

  let insideCodeBlock = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      insideCodeBlock = !insideCodeBlock;
      continue;
    }

    if (insideCodeBlock) {
      continue;
    }

    const match = line.match(/^\s*(#{1,6})\s+(.+?)\s*#*\s*$/);

    if (!match) {
      continue;
    }

    const level = match[1].length-1;
    const title = match[2].trim();

    let slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/<[^>]*>/g, "")
      .replace(/[`*_~]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    if (slugCounters[slug] === undefined) {
      slugCounters[slug] = 0;
    } else {
      slugCounters[slug]++;
      slug += "-" + slugCounters[slug];
    }

    entries.push({
      level,
      title,
      slug
    });
  }

  if (!asMarkdown) {
    return entries;
  }

  const minLevel = entries.length ? Math.min(...entries.map(it => it.level)) : 0;

  return entries.map(it => {
    return `${"  ".repeat(Math.max(0, it.level - minLevel))}- ${this._toMarkdownLink(it.title)}`;
  }).join("\n");
  
}