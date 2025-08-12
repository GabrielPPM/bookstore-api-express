import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import ErroDeRequisicao from "../erros/erroDeRequisicao.js";
import ErroDeValidacao from "../erros/erroDeValidacao.js";
import ErroRotaNaoEncontrada from "../erros/erroRotaNaoEncontrada.js";

function controladorDeErros(error, req, res, next) {
	if (error instanceof mongoose.Error.CastError) {
		new ErroDeRequisicao().enviarResposta(res);
	} else if (error instanceof mongoose.Error.ValidationError) {
		new ErroDeValidacao(error).enviarResposta(res);
	} else if (error instanceof ErroRotaNaoEncontrada){
		error.enviarResposta(res)
	} else {
		new ErroBase().enviarResposta(res);
	}
}

export default controladorDeErros;
