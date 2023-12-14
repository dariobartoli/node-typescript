import express from 'express'
const router = express.Router()
import {operacion, resultados} from '../controllers/calculadora'
import { dataValidation } from '../middlewares/calculadora'

router.post('/', dataValidation, operacion)
router.get('/', resultados)

export default router