# Las firmas de $moduler.import y $moduler.export

- De `$moduler.import` hay:
   - `file:String`
   - `id:String`
   - `files:Array<String>`
   - `factory:Function`
   - `files:Array<String>,factory:Function`
- De `$moduler.export` hay:
   - `id:String,file:String`
   - `id:String,files:Array<String>`
   - `id:String,factory:Function`
   - `id:String,files:Array<String>,factory:Function`

## Firma de la factory de $moduler.import y $moduler.export

```js
$moduler.import(["./a.js","./b.js"], async function([ a, b ], { __filename, __dirname, local$compiler }) {
  return { a, b };
});
```

## Firma de $moduler.import

```js
// file:String
$moduler.import("./file.js");
// id:String
$moduler.import("Name 1");
// files:Array<String>
$moduler.import([
  "./file-1.js",
  "./file-2.js",
  "./file-3.js",
]);
// factory:Function
$moduler.import(async function() {
  return {};
});
// files:Array<String>,factory:Function
$moduler.import([
  "./file-1.js", 
  "./file-2.js", 
], async function([file1, file2]) {
  return { file1, file2 };
});
```

## Firma de $moduler.export

```js
// id:String,file:String
$moduler.export("Name 1", "./file.js");
// id:String,files:Array<String>
$moduler.export("Name 2", [
  "./file-1.js",
  "./file-2.js",
  "./file-3.js",
]);
// id:String,factory:Function
$moduler.export("Name 3", async function() {
  return {};
});
// id:String,files:Array<String>,factory:Function
$moduler.export("Name 4", [
  "./file-1.js", 
  "./file-2.js", 
], async function([file1, file2]) {
  return { file1, file2 };
});
```