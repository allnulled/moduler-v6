$moduler.import([
  "./file1.js",
  "./file2.js"
], (f1, f2) => {
  return { f1, f2 };
})