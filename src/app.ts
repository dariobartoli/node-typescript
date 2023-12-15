import express  from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())

import preguntasRouter from './routes/preguntas'
import calculadoraRouter from './routes/calculadora'

app.use('/preguntas', preguntasRouter)
app.use('/calculadora', calculadoraRouter)

export default app