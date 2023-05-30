console.clear();
const argv = require("process").argv;
const moduloProductos = require("./productos");
require('colors');

const comando = argv[2];
let respuesta;

switch (comando) {
  case "listar":
    moduloProductos.listar();
    break;
  case "agregar":
    let nombre = argv[3];
    let marca = argv[4];
    let precio = +argv[5];
    let descuento = +argv[6] || 0;

    if ([nombre, marca, precio].includes(undefined)) {
      console.log("ERROR: Todos los datos obligatorios".red);
      break;
    }

    if ([precio, descuento].includes(NaN)) {
      console.log("ERROR: El precio o el descuento son inválidos".red);
      break;
    }

    if(moduloProductos.buscar(nombre)){
      console.log("ERROR: El ya existe en la base de datos");
      break
    }

    respuesta = moduloProductos.agregar(nombre, marca, precio, descuento);

    console.log(respuesta);

    break;
  case "filtrar":
    let categorias = ["comercial","escolar","artistica"];
    if(!categorias.includes(argv[3].toLowerCase())){
      console.log("ERROR: Categoría inexistente. Seleccione una de las siguientes: comercial|escolar|artistica".red);
      break
    }
    respuesta = moduloProductos.filtrar(argv[3]);
    moduloProductos.listar(respuesta);
    break;

  case "editar":
    respuesta = moduloProductos.editar(+argv[3]);
    //moduloProductos.listar(respuesta);
    console.log(respuesta.green);
    break;

  default:
    break;
}
