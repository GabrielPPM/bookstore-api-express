import mongoose, { mongo } from "mongoose";

async function conectaNaDabase() {
	mongoose.connect(
		"mongodb+srv://admin:admin123@cluster0.uiugiyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	);

	return mongoose.connection;
}

export default conectaNaDabase;
