_findStringOrArrayEnd(source, position) {
  // @CHATGPT-MADE:
  let i = position;
  while(i < source.length) {
    // 1. Espacios
    while(/\s/.test(source[i])) i++;
    // 2. String
    if(source[i] === '"') {
      i = this._findStringEnd(source, i);
    } else if(source[i] === "[") {
      // 3. Array de strings
      i++;
      while(true) {
        while(/\s/.test(source[i])) i++;
        if(source[i] === "]") {
          i++;
          break;
        }
        if(source[i] !== '"') {
          return i;
        }
        i = this._findStringEnd(source, i);
        while(/\s/.test(source[i])) i++;
        if(source[i] === ",") {
          i++;
          continue;
        }
        if(source[i] === "]") {
          i++;
          break;
        }
        return i;
      }
    } else {
      // 4. Ya no es string ni array
      return i;
    }
    // 5. Después del argumento
    while(/\s/.test(source[i])) i++;
    if(source[i] === ",") {
      i++;
      continue;
    }
    return i;
  }
  return i;
}