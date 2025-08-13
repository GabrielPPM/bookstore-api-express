import "dotenv/config";
import express from "express";
import conectaNaDabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import controladorDeErros from "./middleware/controladorDeErros.js";

const conexao = await conectaNaDabase();
conexao.on("error", (err) => {
	console.error("Erro de conexão", err);
});
conexao.once("open", () => {
	console.log("Conexão com o banco realizada com sucesso!");
});

const app = express();
routes(app);

app.use((error, req, res, next) => {
	controladorDeErros(error, req, res, next)
});

export default app;
