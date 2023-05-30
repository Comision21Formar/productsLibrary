const Producto = function (id, nombre, marca, precio, descuento) {
  this.id = id;
  this.nombre = nombre;
  this.marca = marca;
  this.precio = precio;
  this.descuento = descuento;
  this.stock = true;
};

module.exports = Producto;
