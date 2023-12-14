import PreguntasModel from "../model/preguntas";
import { Request, Response } from 'express'; // Importa los tipos de Request y Response de Express si los estás utilizando

export const crearPregunta = async(req:Request, res:Response) => {
    try {
        const pregunta = req.body.pregunta
        const newPregunta = {
            preguntas: pregunta,
        }
        const nuevaPregunta = new PreguntasModel(newPregunta)
        await nuevaPregunta.save()
        return res.status(201).json({ message: "se ha creado una nueva pregunta", nuevaPregunta});
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message});
    }
}

export const responderPregunta = async(req:Request, res:Response) => {
    try {
        const {id, respuesta} =  req.body
        const pregunta = await PreguntasModel.findById(id)
        const preguntas = pregunta?.preguntas
        pregunta?.respuestas.push(respuesta)
        await pregunta?.save()
        return res.status(201).json({ message: "se ha respondido a la pregunta =>", preguntas, respuesta});
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message});
    }
}

export const getPreguntas = async(req:Request, res:Response) => {
    try {
        const preguntas = await PreguntasModel.find();
        return res.status(200).json({ message: "Preguntas: ", preguntas });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message});
    }
}

export const getPreguntaConRespuestas = async(req:Request, res:Response) => {
    try {
        const id = req.params.id
        const pregunta = await PreguntasModel.findById(id)
        const preguntaNombre = pregunta?.preguntas
        const respuestas = pregunta?.respuestas
        return res.status(200).json({pregunta: preguntaNombre, respuestas});
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message});
    }
}
