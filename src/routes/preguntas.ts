import express from 'express'
const router = express.Router()
import {crearPregunta, responderPregunta, getPreguntas, getPreguntaConRespuestas} from '../controllers/preguntas'
import {preguntaValidation, respuestaValidation} from '../middlewares/preguntas'

router.post('/pregunta', preguntaValidation, crearPregunta)
router.post('/respuesta', respuestaValidation, responderPregunta)
router.get('/', getPreguntas)
router.get('/:id', getPreguntaConRespuestas)

export default router