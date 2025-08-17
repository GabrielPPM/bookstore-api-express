import {livro} from "../models/index.js";
import {autor} from "../models/index.js";
import mongoose from "mongoose";
import ErroRotaNaoEncontrada from "../erros/erroRotaNaoEncontrada.js";
import ErroDeRequisicao from "../erros/erroDeRequisicao.js";

mongoose.set("debug", true);

class LivroController {
	static async listarLivros(req, res, next) {
		try {
			const buscaLivros = livro.find();
			req.resultado = buscaLivros;
			next();
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

	static async listarLivroPorFiltro(req, res, next) {
		try {
			const {editora, titulo, nomeDoAutor, minPaginas, maxPaginas} =
				req.query;

			const busca = {};
			let livrosEncontrados;

			if (editora) busca.editora = {$regex: editora, $options: "i"};
			if (titulo) busca.titulo = {$regex: titulo, $options: "i"};
			if (minPaginas && maxPaginas) {
				busca.paginas = {
					$gte: minPaginas,
					$lte: maxPaginas,
				};
			} else if (minPaginas) busca.paginas = {$gte: minPaginas};
			else if (maxPaginas) busca.paginas = {$lte: maxPaginas};

			if (nomeDoAutor) {
				const dadosDoAutor = await autor.find({
					nome: {$regex: nomeDoAutor, $options: "i"},
				});
				if (dadosDoAutor != null) {
					busca.autor = dadosDoAutor;
					livrosEncontrados = livro.find(busca);

					req.resultado = livrosEncontrados;
					next();
				} else {
					res.status(200).send([]);
				}
			} else {
				livrosEncontrados = livro.find(busca);
				req.resultado = livrosEncontrados;
				next();
			}
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
				autor: {...dadosDoAutor._doc},
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
