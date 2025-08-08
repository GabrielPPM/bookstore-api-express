import livro from "../models/livro.js";

class LivroController {
	static async listarLivros(req, res) {
		try {
			const listaLivros = await livro.find({});
			res.status(200).json(listaLivros);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async listarLivroPorId(req, res) {
		try {
			const id = req.params.id;
			const livroEncontrado = await livro.findById(id);
			res.status(200).json(livroEncontrado);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async cadastrarLivro(req, res) {
		try {
			const novoLivro = await livro.create(req.body);
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
