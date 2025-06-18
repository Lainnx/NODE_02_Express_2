// funciones mayores para arrays: MAP, FILTER, REDUCE

const arrayOriginal = [1,2,3,4,5,6];

// map -> hacer algun tipo de operación sobre todos los elementos del original
// devuelve un array con tantos elementos como el original pero con los elementos modificados de algún modo
// arrayInicial.map(item_que_devuelve => accion)
const arrayMap = arrayOriginal.map(numero => numero*2)
console.log(arrayOriginal, arrayMap);

//filter -> filtra segun una condicion
// devuelve otro array con los elementos filtrados
// arrayInicial.filter(item_que_devuelve => condicion)
const arrayFilter = arrayOriginal.filter(numero => numero%2==0)
console.log(arrayOriginal, arrayFilter);
//reduce -> devuelve el resultado de una operación aplicada a todos los valores del array original
// arrayInicial.reduce((acumulador, item) => operación a realizar)
// este devuelve un resultado no un array
const resultadoReduce = arrayOriginal.reduce((acumulador, numero) => acumulador + numero)   // el acumulador empieza siendo 0, deveulve acumulador al final

//las 3 dan otro array (el original no se modifica)
