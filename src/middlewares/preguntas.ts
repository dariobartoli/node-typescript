import Joi from 'joi'
import { Request, Response, NextFunction } from 'express';


export const preguntaValidation = (req: Request, res:Response, next:NextFunction) => {
    const schema = Joi.object({
        pregunta: Joi.string()
            .min(3)
            .max(30)
            .required(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        res.status(404).json({message: validationResult.error.details[0].message})
        console.error(validationResult.error.details);
    }else{
    //console.log('Data is valid');
        next()
    }
}

export const respuestaValidation = (req: Request, res:Response, next:NextFunction) => {
    const schema = Joi.object({
        respuesta: Joi.alternatives().try(
            Joi.string().alphanum().min(3).max(30),
            Joi.number()
        ).required(),
        id: Joi.string()
            .required(),
    })
    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
        res.status(404).json({message: validationResult.error.details[0].message})
        console.error(validationResult.error.details);
    }else{
    //console.log('Data is valid');
        next()
    }
}