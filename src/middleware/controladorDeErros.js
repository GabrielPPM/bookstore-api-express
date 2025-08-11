import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import ErroDeRequisicao from "../erros/erroDeRequisicao.js";
import ErroDeValidacao from "../erros/erroDeValidacao.js";

function controladorDeErros(error, req, res, next) {
	console.error("ERRO: ", error);

	if (error instanceof mongoose.Error.CastError) {
		new ErroDeRequisicao().enviarResposta(res);
	} else if (error instanceof mongoose.Error.ValidationError) {
		const mensagensDeErro = Object.values(error.errors)
		.map((erro) => erro.message)
		.join();

		//Um ou mais campos não passaram pela validação
		new ErroDeValidacao().enviarResposta(res);
	} else {
		new ErroBase().enviarResposta(res);
	}
}

export default controladorDeErros;
