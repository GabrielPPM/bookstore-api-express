import "dotenv/config";
import express from "express";
import conectaNaDabase from "./config/dbConnect.js";
import livro from "./models/livro.js";
import routes from "./routes/index.js"

const conexao = await conectaNaDabase();
conexao.on("error", (err) => {
	console.error("Erro de conexão", err);
});
conexao.once("open", () => {
	console.log("Conexão com o banco realizada com sucesso!");
});

const app = express();
routes(app);

app.delete("/livros/:id", (req, res) => {
	const index = buscaLivro(req.params.id);
	livros.splice(index, 1);
	res.status(200).json(livros);
});

export default app;
