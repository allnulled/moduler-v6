const defaultOptions = {};
return function(optionsInput = {}) {
  const options = Object.assign({
    name: /*=¿{type:"string",description:"Nombre de la persona"}*/"Someone"/*?*/,
    age: /*=¿{type:"integer",description:"Edad de la persona (número)"}*/87/*?*/,
    city: /*=¿{type:"string",description:"Ciudad de la persona"}*/"Somewhere"/*?*/,
    sex: /*=¿{type:"boolean",description:"Sexo de la persona (booleano)"}*/false/*?*/,
  }, optionsInput);
  console.log(`Hi, you are ${options.name}, from ${options.city}, and you are ${options.age}. And you say you ${options.sex ? '' : 'do not '}have sex, right?`);
}