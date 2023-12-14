import express  from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())

try {
    app.listen(process.env.PORT, function(){
        console.log(`La app está montada en el puerto: ${process.env.PORT}`);
    })
} catch (error) {
    console.log("ha ocurrido en error al montar la aplicacion "+error);
}

import preguntasRouter from './routes/preguntas'
import calculadoraRouter from './routes/calculadora'

app.use('/preguntas', preguntasRouter)
app.use('/calculadora', calculadoraRouter)