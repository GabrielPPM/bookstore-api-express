import livro from "../models/livro.js";
import {autor} from "../models/Autor.js";

class LivroController {
	static async listarLivros(req, res) {
		try {
			const listaLivros = await livro.find({});
			res.status(200).json(listaLivros);
		} catch (err) {
			res.status(500).json({error: err.message});
		}
	}

	static async listarLivroPorId(req, res) {
		try {
			const id = req.params.id;
			const livroEncontrado = await livro.findById(id);
			res.status(200).json(livroEncontrado);
		} catch (err) {
			res.status(500).json({error: err.message});
		}
	}

	static async listarLivroPorEditora(req, res) {
		try {
			const editora = req.query.editora;
			const livrosEncontrados = await livro.find({editora: editora});
			res.status(200).json({content: livrosEncontrados})
		} catch (err) {
			res.status(500).json(`${err} - Erro ao procurar pelo livro`)
		}
	}

	static async cadastrarLivro(req, res) {
		try {
			const dadosDoLivro = await req.body;
			const dadosDoAutor = await autor.findById(dadosDoLivro.autor);
			const novoLivro = await livro.create({
				...dadosDoLivro,
				autor: {...dadosDoAutor._doc},
			});
			res.status(201).json({
				message: "Livro adicionado com sucesso",
				livro: novoLivro,
			});
		} catch (err) {
			res.status(500).json({
				error: `${err.message} - falha ao cadastar livro`,
			});
		}
	}

	static async atualizarLivro(req, res) {
		try {
			const id = req.params.id;
			await livro.findByIdAndUpdate(id, req.body);
			res.status(200).json({
				message: "O livro foi atualizado com sucesso",
			});
		} catch (err) {
			res.status(500).json({
				error: `${err.message} - falha ao atualizar o livro`,
			});
		}
	}

	static async removerLivro(req, res) {
		try {
			const id = req.params.id;
			await livro.findByIdAndDelete(id);
			res.status(204).json({
				message: "O livro foi removido com sucesso",
			});
		} catch (err) {
			res.status(500).json({
				error: `${err.message} - falha ao remover o livro`,
			});
		}
	}
}

export default LivroController;
