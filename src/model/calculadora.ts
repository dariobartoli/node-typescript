import mongoose from '../config/mongo'

const calculadoraSchema = new mongoose.Schema({
    numeroUno: Number,
    numeroDos: Number,
    operacion: String,
    resultado: Number,
}, {timestamps: true});

calculadoraSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt
      delete ret.updatedAt
    },
});

const CalculadoraModel = mongoose.model('Calculadora', calculadoraSchema)

export default CalculadoraModel

