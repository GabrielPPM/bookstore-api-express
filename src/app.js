import "dotenv/config";
import express from "express";
import conectaNaDabase from "./config/dbConnect.js";
import livro from "./models/livro.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
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
	controladorDeErros(error)
});

export default app;
