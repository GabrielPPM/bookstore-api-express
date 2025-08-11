import mongoose from "mongoose";

function controladorDeErros(error, req, res, next) {
	if (error instanceof mongoose.Error.CastError) {
		res.status(400).json({
			error: `Um ou mais dados fornecidos estão incorretos`,
		});
	} else {
		res.status(500).json({ err: "Erro interno do servidor" });
	}
}

export default controladorDeErros;
