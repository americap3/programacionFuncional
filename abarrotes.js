const fs = require('fs');

class productoInfo {
    constructor(clave, descripcion, precio, clasificacion, existencia, existenciaMin, existenciaMax) {
      this.clave = clave;
      this.descripcion = descripcion;
      this.precio = precio;
      this.clasificacion = clasificacion;
      this.existencia = existencia;
      this.existenciaMin = existenciaMin;
      this.existenciaMax = existenciaMax;
    }
  }
  
  class DAO {
    constructor() {
      this.productos = [];
    }
  
    cargarDatos(archivo) {
      const infoArchivo = fs.readFileSync(archivo, 'utf-8');
      const rens = infoArchivo.split('\n');
      const productos = rens.map(ren => {
        const pos = ren.split(',');
        const producto = new productoInfo(pos[0], pos[1], parseFloat(pos[2]), pos[3], parseInt(pos[4]), parseInt(pos[5]), parseInt(pos[6]));
        return producto;
      });
      this.productos = productos;
    }
    
  
    // Número de productos con existencia mayor a 20
    problema1() {
      return this.productos.filter(p => p.existencia > 20).length;
    }
  
    // Número de productos con existencia menos a 15
    problema2() {
      return this.productos.filter(p => p.existencia <15).length;
    }
  
    // Lista de productos con la misma clasificación y precio mayor 15.50
    problema3(clasificacion) {
      return this.productos.filter(p => p.clasificacion ==clasificacion && p.precio > 15.50);
    }
  
    // Lista de productos con precio mayor a 20.30 y menor a 45.00
    problema4() {
      return this.productos.filter(p =>p.precio > 20.30 && p.precio < 45.00);
    }
  
    // Número de productos agrupados por su clasificación
    problema5() {
      let agpd = {};
      this.productos.forEach(p => {
        if (!agpd[p.clasificacion]) {
          agpd[p.clasificacion]= 0;
        }
        agpd[p.clasificacion]++;
      });
      return agpd;
    }
  }

const dao = new DAO();
dao.cargarDatos('productos.txt'); 


console.log(`Número de productos con existencia mayor a 20: ${dao.problema1()}`);
console.log(`Número de productos con existencia menor a 15: ${dao.problema2()}`); 
console.log("------ Lista de productos con la misma clasificación y precio mayor 15.50 ------")
console.log(dao.problema3());
console.log("------ Lista de productos con precio mayor a 20.30 y menor a 45.00 ------ ")
console.log(dao.problema4());
console.log("------ Número de productos agrupados por su clasificación ------");
console.log(dao.problema5());

