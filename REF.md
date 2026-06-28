# Las firmas de $compiler.import y $compiler.export

- De `$compiler.import` hay:
   - `file:String`
   - `id:String`
   - `files:Array<String>`
   - `factory:Function`
   - `files:Array<String>,factory:Function`
- De `$compiler.export` hay:
   - `id:String,file:String`
   - `id:String,files:Array<String>`
   - `id:String,factory:Function`
   - `id:String,files:Array<String>,factory:Function`

## Firma de la factory de $compiler.import y $compiler.export

```js
$compiler.import(["./a.js","./b.js"], async function([ a, b ], { __filename, __dirname, local$compiler }) {
  return { a, b };
});
```

## Firma de $compiler.import

```js
// file:String
$compiler.import("./file.js");
// id:String
$compiler.import("Name 1");
// files:Array<String>
$compiler.import([
  "./file-1.js",
  "./file-2.js",
  "./file-3.js",
]);
// factory:Function
$compiler.import(async function() {
  return {};
});
// files:Array<String>,factory:Function
$compiler.import([
  "./file-1.js", 
  "./file-2.js", 
], async function([file1, file2]) {
  return { file1, file2 };
});
```

## Firma de $compiler.export

```js
// id:String,file:String
$compiler.export("Name 1", "./file.js");
// id:String,files:Array<String>
$compiler.export("Name 2", [
  "./file-1.js",
  "./file-2.js",
  "./file-3.js",
]);
// id:String,factory:Function
$compiler.export("Name 3", async function() {
  return {};
});
// id:String,files:Array<String>,factory:Function
$compiler.export("Name 4", [
  "./file-1.js", 
  "./file-2.js", 
], async function([file1, file2]) {
  return { file1, file2 };
});
```