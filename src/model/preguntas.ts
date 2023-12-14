import mongoose from '../config/mongo'

const preguntasSchema = new mongoose.Schema({
    preguntas: String,
    respuestas: Array,
}, {timestamps: true});

preguntasSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt
      delete ret.updatedAt
    },
  });

const PreguntasModel = mongoose.model('Preguntas', preguntasSchema);

export default PreguntasModel