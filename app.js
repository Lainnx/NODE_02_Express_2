const path = require("node:path");
const express = require("express");

const app = express();

process.loadEnvFile();
const PORT = process.env.PORT || 8888;

const jsonData = require("./ventas.json");
const { json } = require("node:stream/consumers");
// console.log(jsonData);

app.get("/", (req, res) => res.send("Hello World!"));

// /api
app.get("/api", (req, res) => {

    // query
//   console.table(req.query);
    // /api?year=2024&pais=Italia
  if (req.query.year && req.query.year == "desc" && req.query.pais == "asc") {
    let json1 = jsonData.sort((a, b) => a.pais.localeCompare(b.pais, "es-ES", { numeric: true }))
    let json2 = json1.sort((a, b) => b.anyo - a.anyo)
    
    return res.json(json2);
  } else if (req.query.year && req.query.year == "desc") {
    return res.json(jsonData.sort((a, b) => b.anyo - a.anyo));
  }

  res.json(jsonData);
});

// "/api/paises"-> de cada pais el total de las ventas de cada uno
// [{"pais": "Italia", "ventas_totales": 2500}, {"pais": "Francia", "ventas_totales": 3000}]
app.get("/api/paises",(req,res)=>{
    const resultado = []    //array
    const ventaPorPais = {} // objeto

    for (let i=0;i<jsonData.length;i++){
        const pais = jsonData[i].pais   // clave se llama pais en datos
        const venta = jsonData[i].venta

    if(!ventaPorPais[pais]){ // si no hay nada en ventaPorPais (la primera vez que interactua, añadimos el primer valor)
        ventaPorPais[pais] = 0  // aqui solo entra la primera vez que encuentra el pais
    
    }
    ventaPorPais[pais] += venta
    }
    // console.log(ventaPorPais);
    // for (clave in objeto) // for in para objetos
    for(clave in ventaPorPais){
        resultado.push({
            "pais": clave,
            "ventas_totales": ventaPorPais[clave]
        })
    }
    if(resultado.length==0) return res.json({"respuesta": "No hay datosen este momento"})   // se puede return o else, pero esto es o una o la otra

    res.json(resultado) //  esto da por pantalla el json con el resultado
})

// "api/paises/Italia" -> que deveuelva los datos solo de italia
app.get("/api/paises/:nombrePais", (req,res)=>{
    console.table(req.params);
    const nombrePais = req.params.nombrePais.toLocaleLowerCase()    // el que se escribe en la url
    const resultado = []
    for(objeto of jsonData){ //  for of para arrays
        let pais = objeto["pais"].toLocaleLowerCase()// dentro del if no se puede poruqe no se puede poner funciones dentro del lado izquierdo de la comparacion
        if(pais == nombrePais){
            resultado.push(objeto) // si pais esta en el objeto añadimos objeto a array
        }
    }

    // el mismo for con filter
    const resultadoFilter = jsonData.filter(objeto => objeto.pais.toLocaleLowerCase() == nombrePais)    // en comparaciones si se puede toLowerCase a la izquierda del =
    if(resultado.length==0) return res.json({"respuesta": "No hay datos en este momento"}) 
    res.json(resultado)
    console.log(resultadoFilter);
})

app.get("/api/year/:year", (req,res)=>{
    const year = req.params.year // aqui el nombre despues de :, o directamente abajo
    const resultado =[]

    const resultadoFilter2 = jsonData.filter(objeto => objeto.anyo == year)
    if(resultadoFilter2.length==0) return res.json({"respuesta": "No hay datos en este momento"}) 
    res.json(resultadoFilter2)
    // console.log(resultadoFilter2);
})


app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);