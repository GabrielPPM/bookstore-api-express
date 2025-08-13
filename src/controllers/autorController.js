import { autor } from "../models/index.js";
import mongoose from "mongoose";
import ErroRotaNaoEncontrada from "../erros/erroRotaNaoEncontrada.js";

class AutorController {
	static async listarAutores(req, res, next) {
		try {
			const autores = await autor.find({});
			res.status(200).json({ content: autores });
		} catch (err) {
			next(err);
		}
	}

	static async cadastrarAutor(req, res, next) {
		try {
			const dadosDoAutor = await autor.create(req.body);
			res.status(201).json({
				message: `Autor cadastrado com sucesso`,
				content: dadosDoAutor,
			});
		} catch (err) {
			next(err);
		}
	}
	static async listarAutorPorId(req, res, next) {
		try {
			const id = req.params.id;
			const dadosDoAutor = await autor.findById(id);
			if (dadosDoAutor != null) {
				res.status(200).json({ content: dadosDoAutor });
			} else {
				next(
					new ErroRotaNaoEncontrada(
						"O ID do autor não foi encontrado"
					)
				);
			}
		} catch (err) {
			next(err);
		}
	}

	static async atualizarAutor(req, res, next) {
		try {
			const id = req.params.id;
			const dadosDoAutor = await autor.findByIdAndUpdate(id, req.body);

			res.status(200).json({
				message: `Dados do autor atualizados com sucesso`,
				content: dadosDoAutor,
			});
		} catch (err) {
			if (err instanceof mongoose.Error.CastError) {
				next(
					new ErroRotaNaoEncontrada(
						"O ID do autor não foi encontrado"
					)
				);
			} else {
				next(err);
			}
		}
	}

	static async removerAutor(req, res, next) {
		try {
			const id = req.params.id;
			await autor.findByIdAndDelete(id);
			res.status(204).send("Deletado com sucesso");
		} catch (err) {
			next(err);
		}
	}
}

export default AutorController;
