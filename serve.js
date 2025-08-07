import app from "./src/app.js";

const PORT = 3000;

const rotas = {
	"/": "Cursos de Express API",
	"/livros": "Estou na rota  livros",
	"/autores": "Estou na rota autores  ",
};

app.listen(PORT, () => {
	console.log("Servidor escutando!");
});
