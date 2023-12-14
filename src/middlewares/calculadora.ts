import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

export const dataValidation = (req: Request, res:Response, next:NextFunction) => {
    const schema = Joi.object({
        numeroUno: Joi.number()
            .required(),
        numeroDos: Joi.number()
        .required(),
        operacion: Joi.string()
        .min(3)
        .max(15)
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