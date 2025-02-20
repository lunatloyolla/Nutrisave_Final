import {comentario} from "../models/comentarioModel.js"

class comentarioController {
    static async listarComentarios(req, res) {
        try {
            const listacomentarios = await comentario.find({});
            res.status(200).json(listacomentarios)
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro interno no servidor` })
        }
    }

    static async listarComentarioPorId(req, res) {
        try {
            const comentarioEncontrado = await comentario.findById(req.params.id);
            if (!comentarioEncontrado) {
                return res.status(404).json({ message: "Comentário não encontrado" });
            }
            const userEncontrado = await user.findById(comentarioEncontrado.user);
            const comentarioCompleto = { ...comentarioEncontrado._doc, user: { ...userEncontrado._doc } };
    
            res.status(200).json(comentarioCompleto);
        } catch (error) {
            res.status(500).json({ message: '${error.message} - Falha ao buscar comentário'});
        }
    }

    static async cadastrarComentario(req, res) {
        try {
            const novoComentario = await comentario.create(req.body);
            res.status(201).json({ message: "Comentário cadastrado com sucesso", comentario: novoComentario });
        } catch (erro) {
            res.status(500).json({ message: '${erro.message} - falha ao cadastrar comentário' });
        }
    }

    static async atualizarComentario(req, res) {
        try {
            const id = req.params.id
            await comentario.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: "comentario atualizado com sucesso" })
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na atualização` })
        }
    }

    static async excluirComentario(req, res) {
        try {
            const id = req.params.id
            await comentario.findByIdAndDelete(id)
            res.status(200).json({ message: "comentario excluído com sucesso" })
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na exclusão` })
        }
    }
    
}


export default comentarioController 