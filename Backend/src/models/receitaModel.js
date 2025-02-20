import mongoose, { mongo } from "mongoose"

const receitaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    link: { type: String, required: true },
    imagem: { type: String, required: true },
    salva: { type: Boolean, default: false }, 
  }, { versionKey: false });

const receita = mongoose.model("receitass", receitaSchema)

export { receita, receitaSchema }