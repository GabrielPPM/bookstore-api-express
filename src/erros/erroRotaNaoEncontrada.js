import ErroBase from "./erroBase.js";

class ErroRotaNaoEncontrada extends ErroBase{
	constructor(message = "Rota não encontrada") {
		super(message, 404);
	}
}

export default ErroRotaNaoEncontrada;
