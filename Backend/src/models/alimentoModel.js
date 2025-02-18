import mongoose from "mongoose"
import { receitaSchema } from "./receitaModel.js"
import { tabelaSchema } from "./tabelaModel.js"

const alimentoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    receita: { type: mongoose.Schema.Types.ObjectId, ref: "receitas" },
    tabela: { type: mongoose.Schema.Types.ObjectId, ref: "tabelas" },
    imagem: { type: String, required: true }
}, { versionKey: false });

const alimento = mongoose.model("alimentos", alimentoSchema)

export { alimento, alimentoSchema } 