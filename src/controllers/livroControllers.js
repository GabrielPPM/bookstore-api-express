import livro from "../models/livro.js";
import { autor } from "../models/Autor.js";
import ErroRotaNaoEncontrada from "../erros/erroRotaNaoEncontrada.js";
import mongoose from "mongoose";

class LivroController {
	static async listarLivros(req, res, next) {
		try {
			const listaLivros = await livro.find({});
			res.status(200).json(listaLivros);
		} catch (err) {
			next(err);
		}
	}

	static async listarLivroPorId(req, res, next) {
		try {
			const id = req.params.id;
			const livroEncontrado = await livro.findById(id);
			if (livroEncontrado != null) {
				res.status(200).json(livroEncontrado);
			} else {
				next(
					new ErroRotaNaoEncontrada(
						"O ID do livro não foi encontrado"
					)
				);
			}
		} catch (err) {
			next(err);
		}
	}

	static async listarLivroPorEditora(req, res, next) {
		try {
			const editora = req.query.editora;
			const livrosEncontrados = await livro.find({ editora: editora });
			res.status(200).json({ content: livrosEncontrados });
		} catch (err) {
			next(err);
		}
	}

	static async cadastrarLivro(req, res, next) {
		try {
			const dadosDoLivro = await req.body;
			const dadosDoAutor = await autor.findById(dadosDoLivro.autor);
			const novoLivro = await livro.create({
				...dadosDoLivro,
				autor: { ...dadosDoAutor._doc },
			});
			res.status(201).json({
				message: "Livro adicionado com sucesso",
				livro: novoLivro,
			});
		} catch (err) {
			next(err);
		}
	}

	static async atualizarLivro(req, res, next) {
		try {
			const id = req.params.id;
			await livro.findByIdAndUpdate(id, req.body);
			res.status(200).json({
				message: "O livro foi atualizado com sucesso",
			});
		} catch (err) {
			if (err instanceof mongoose.Error.CastError) {
				next(
					new ErroRotaNaoEncontrada(
						"O ID do livro não foi encontrado"
					)
				);
			} else {
				next(err);
			}
		}
	}

	static async removerLivro(req, res, next) {
		try {
			const id = req.params.id;
			await livro.findByIdAndDelete(id);
			res.status(204).json({
				message: "O livro foi removido com sucesso",
			});
		} catch (err) {
			next(err);
		}
	}
}

export default LivroController;
