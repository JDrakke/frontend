
const bcrypt = require('bcryptjs');

const password = 'miContraseñaSegura'; 
const hash = '$2a$10$Raq9P6cmxgVa9OSij2eIm.mqTiyv0ID.xFbTbXR/OgYKRkhCgjfFq'; 

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error('Error comparing password:', err);
  } else {
    console.log('Password match:', result);
  }
});
