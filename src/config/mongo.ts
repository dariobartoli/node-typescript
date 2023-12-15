import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoUri = (process.env.NODE_ENV === 'test') ? process.env.MONGO_URI + 'TEST' : process.env.MONGO_URI
if (!mongoUri) {
    throw new Error('La variable MONGO_URI no está definida en el archivo .env');
}

console.log(mongoUri);



mongoose.connect(mongoUri)
    .then(() => {
        console.log('Conexión exitosa con la base de datos.');
    })
    .catch((error) => {
        console.error('Error de conexión:', error);
    });
    
export default mongoose;
