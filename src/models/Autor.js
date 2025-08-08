import mongoose from "mongoose";

const AutorSchema = new mongoose.Schema(
	{
		id: { type: mongoose.Schema.Types.ObjectId },
		nome: { type: String, required: true },
		nacionalidade: { type: String },
	},
	{ versionKey: false }
);

const autor = mongoose.model("autores", AutorSchema);

export default { autor, AutorSchema };
