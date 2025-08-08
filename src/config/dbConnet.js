import mongoose, { mongo } from "mongoose";

async function conectaNaDabase() {
	mongoose.connect(
	);

	return mongoose.connection;
}

export default conectaNaDabase;
