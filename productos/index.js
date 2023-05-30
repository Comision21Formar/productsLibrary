const {leerJSON,escribirJSON} = require('../data');
const Producto = require('./Producto');

module.exports = {
  productos : leerJSON(),
  listar: function (productos = this.productos) {
    console.log("\n***************LISTA DE PRODUCTOS *****************\n".yellow);
    productos.forEach(({id, nombre, marca, precio, stock},i) => {
        console.log(
          `${id} - ${nombre} ${marca} $${precio} | ${stock ? 'OK' : 'SIN STOCK'}`
        );
    });
    console.log("\n***************************************************\n".yellow);

    return null
  },
  agregar : function(nombre,marca,precio,descuento){
    let productos = this.productos;
    let ultimoId = productos[productos.length - 1] ? productos[productos.length - 1].id : 0;
    
    let nuevoProducto = new Producto(ultimoId + 1,nombre,marca,precio,descuento);

    productos.push(nuevoProducto)
    
    escribirJSON(productos)

    return `El producto "${nuevoProducto.nombre} | ${nuevoProducto.marca}"  se registró satisfactoriamente`
  },
  filtrar : function(categoria){
    //const productosFiltrados = this.productos.filter(producto => producto.marca === marca);
    const productosFiltrados = this.productos.filter(producto => producto.categoria === categoria.toLowerCase());
    return productosFiltrados
  },
  editar : function(id){

    const productoAModificar = this.productos.find(producto => producto.id === id);

    if(!productoAModificar){
      return `Mmmmm, 404 NOT FOUND`
    }

    const {nombre, marca} = productoAModificar;
    const productosModificados =  this.productos.map(producto => {
      
      if(producto.id === id){
        producto.stock = !producto.stock
      }
      
      return producto
    })

    escribirJSON(productosModificados);

    return `El producto "${nombre} | ${marca}" se modificó satisfactoriamente`
  },
  buscar : function(nombre){
    const producto = this.productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase())
    return producto
  }
};
