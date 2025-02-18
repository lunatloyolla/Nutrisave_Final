import tabelaController from "./tabelaController.js";
import { alimento } from "../models/alimentoModel.js";
import receitaController from "./receitaController.js";
import { tabela } from "../models/tabelaModel.js";
import { receita } from "../models/receitaModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class alimentoController {
    static async listarAlimentos(req, res) {
        try {
            const listaAlimentos = await alimento.find({});
            res.status(200).json(listaAlimentos);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro interno no servidor` });
        }
    }

    static async listarAlimentoPorId(req, res) {
        try {
            const id = req.params.id;
            const alimentoEncontrado = await alimento.findById(id);
            res.status(200).json(alimentoEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição do alimento` });
        }
    }

    static async cadastrarAlimento(req, res) {
        const alimentos = req.body;

        try {
            const alimentosCriados = [];

            for (const novoAlimento of alimentos) {

                const tabelaId = new ObjectId(novoAlimento.tabela);
                const receitaId = new ObjectId(novoAlimento.receita);

                const tabelaExistente = await tabela.findById(tabelaId);
                const receitaExistente = await receita.findById(receitaId);

                if (!tabelaExistente || !receitaExistente) {
                    return res.status(404).json({ message: `Tabela ou receita não encontrada para o alimento: ${novoAlimento.nome}` });
                }


                const alimentoCompleto = {
                    ...novoAlimento,
                    tabela: tabelaExistente._id,
                    receita: receitaExistente._id
                };


                const alimentoCriado = await alimento.create(alimentoCompleto);
                alimentosCriados.push(alimentoCriado);
            }

            res.status(201).json({ message: "Alimentos criados com sucesso", alimentos: alimentosCriados });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao cadastrar alimentos` });
        }
    }

    static async atualizarAlimento(req, res) {
        try {
            const id = req.params.id;
            await alimento.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Alimento atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na atualização` });
        }
    }

    static async excluirAlimento(req, res) {
        try {
            const id = req.params.id;
            await alimento.findByIdAndDelete(id);
            res.status(200).json({ message: "Alimento excluído com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão` });
        }
    }
}

export default alimentoController;