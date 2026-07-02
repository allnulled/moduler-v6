$moduler.import([
  "./signatures/file1.js",
  "./signatures/file2.js"
], (f1, f2) => {
  return { f1, f2 };
})