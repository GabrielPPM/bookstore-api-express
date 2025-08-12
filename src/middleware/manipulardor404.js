import ErroRotaNaoEncontrada from "../erros/erroRotaNaoEncontrada.js";

function manipulador404(req, res, next) {
	const erro404 = new ErroRotaNaoEncontrada();
	next(erro404);
}

export default manipulador404;
