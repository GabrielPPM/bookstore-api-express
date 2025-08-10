import express from "express";
import {autor} from "../models/Autor.js";

class AutorController {
	static async listarAutores(req, res) {
		try {
			const autores = await autor.find({});
			res.status(200).json({content: autores});
		} catch (err) {
			res.status(500).json({
				error: `${err.message} - não foi possível listar autores`,
			});
		}
	}

	static async cadastrarAutor(req, res) {
		try {
			const autor = await autor.create(req.body);
			res.status(201).json({
				message: `Autor cadastrado com sucesso`,
				content: autor,
			});
		} catch (err) {
			res.status(500).json({
				error: `${err.message} - Não foi possível cadastrar o autor`,
			});
		}
	}
	static async listarAutorPorId(req, res) {
		try {
			const id = req.params.id;
			const autor = await autor.findById(id);
			res.status(200).json({content: autor});
		} catch (err) {
			res.status(500).json({
				error: `${err} - Não foi possível encontrar os dados do autor`,
			});
		}
	}

	static async atualizarAutor(req, res) {
		try {
			const id = req.params.id;
			const autor = await autor.findByIdAndUpdate(id, req.body);
			res.status(200).json({
				message: `Dados do autor atualizados com sucesso`,
				content: autor,
			});
		} catch (err) {
			res.status(500).json({
				error: `${err} - Não foi possível atualizar os dados do autor`,
			});
		}
	}

	static async removerAutor(req, res) {
		try {
			const id = req.params.id;
			await autor.findByIdAndDelete(id);
			res.status(204).send("Deletado com sucesso");
		} catch (err) {
			res.status(500).json({
				error: `${err.message} - Não foi possível remover o autor`,
			});
		}
	}
}

export default AutorController;
