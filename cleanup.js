const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', async () => {
  console.log('Conectado a la base de datos');

  try {
    console.log('Eliminando datos...');
    
    await db.db.collection('users').deleteMany({});
    console.log('Datos eliminados correctamente');
  } catch (error) {
    console.error('Error al eliminar datos:', error);
  } finally {
    mongoose.connection.close();
  }
});
