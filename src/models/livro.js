import mongoose from "mongoose";
import { AutorSchema } from "./Autor.js"

const livroSchema = new mongoose.Schema(
	{
		id: { type: mongoose.Schema.Types.ObjectId },
		titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
		editora: { type: String },
		preco: { type: Number },
		paginas: { type: Number },
		autor: AutorSchema,
	},
	{ versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
