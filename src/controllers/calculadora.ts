import CalculadoraModel from "../model/calculadora";
import { Request, Response} from 'express';

export const operacion = async(req:Request, res:Response) => {
    try {
        interface RequestBody {
            numeroUno: number;
            numeroDos: number;
            operacion: string;
        }
        const {numeroUno, numeroDos, operacion}: RequestBody = req.body
        const sumar = /\bsum\S*\b/i;
        const restar = /\bres\S*\b/i;
        const dividir = /\bdiv\S*\b/i;
        const multiplicar = /\bmul\S*\b/i;
        let resultado = 0
        let op = ""
        if(sumar.test(operacion)){
            op = "sumar"
            resultado = parseFloat((numeroUno + numeroDos).toFixed(2))
        }else if(multiplicar.test(operacion)){
            op = "multiplicar"
            resultado = parseFloat((numeroUno * numeroDos).toFixed(2))
        }else if(dividir.test(operacion)){
            op = "dividir"
            if(numeroDos === 0){
                throw new Error("no es posible dividir por cero")
            }
            resultado = parseFloat((numeroUno / numeroDos).toFixed(2))
        }else if(restar.test(operacion)){
            op = "restar"
            resultado = parseFloat((numeroUno - numeroDos).toFixed(2))
        }else throw new Error("No encuentro la operacion solicitada")
        const nuevaOperacion =  new CalculadoraModel({numeroUno, numeroDos, operacion:op, resultado})
        await nuevaOperacion.save()
        return res.status(201).json({ message: `El resultado de ${op} ${numeroUno} con ${numeroDos} es: ${resultado}`, resultado});
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message});
    }
}

export const resultados = async(req:Request, res:Response) => {
    try {
        const calculos = await CalculadoraModel.find()
        return res.status(200).json({ message: "Lista de calculos =>", registro: calculos});
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message});
    }
}
