import ErroBase from "./erroBase.js";

class ErroDeRequisicao extends ErroBase {
	constructor(message = "Um ou mais dados fornecidos estão incorretos") {
		super(message, 400);
	}
}

export default ErroDeRequisicao;
