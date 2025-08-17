import ErroDeRequisicao from "../erros/erroDeRequisicao.js";

async function paginar(req, res, next) {
	try {
		const {limite = 5, pagina = 1, ordenacao = "_id:1"} = req.query;

		let [ordenarPor, ordem] = ordenacao.split(":");

		const resultado = req.resultado;

		if (limite > 0 && pagina > 0) {
			const resultadoPaginado = await resultado
				.find()
				.sort({[ordenarPor]: parseInt(ordem)})
				.skip((pagina - 1) * 5)
				.limit(limite)
				.exec();
			res.status(200).json(resultadoPaginado);
		} else {
			next(new ErroDeRequisicao());
		}
	} catch (error) {
		next(error);
	}
}

export default paginar;
