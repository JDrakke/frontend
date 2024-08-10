const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User'); 
const Product = require('./src/models/Product'); 


dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    
    await User.create([
      { name: 'Juan Pérez', email: 'juan@example.com', password: 'contraseña123' },
      { name: 'Ana López', email: 'ana@example.com', password: 'contraseña456' }
    ]);

   
    await Product.create([
      { name: 'Producto 1', description: 'Descripción del producto 1', price: 100, image: 'imagen1.jpg' },
      { name: 'Producto 2', description: 'Descripción del producto 2', price: 200, image: 'imagen2.jpg' }
    ]);

    console.log('Datos insertados correctamente');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al insertar datos:', error);
    mongoose.connection.close();
  }
};

seedData();
