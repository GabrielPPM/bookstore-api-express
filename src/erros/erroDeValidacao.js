import ErroDeRequisicao from "./erroDeRequisicao.js";

class ErroDeValidacao extends ErroDeRequisicao {
	constructor(error) {
		const mensagensDeErro = Object.values(error.errors)
			.map((erro) => erro.message)
			.join();
		super(mensagensDeErro);
	}
}

export default ErroDeValidacao;
