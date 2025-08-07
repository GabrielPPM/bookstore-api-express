import "dotenv/config"
import mongoose, {mongo} from "mongoose";

async function conectaNaDabase() {
	mongoose.connect(process.env.DB_CONNECTION_STRING);

	return mongoose.connection;
}

export default conectaNaDabase;
