const { MongoClient } = require("mongodb");
const mongoose = require("mongoose")
const {mongo} = require("mongoose")

const connectionString = process.env.DB_URI;
const dbName = process.env.DB_NAME;
let mongoClient;

function connect(){
	mongoose.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}

async function get(){
	mongoClient = await mongoose.connection.getClient()
	return await mongoClient.db(dbName);
}

async function close(){
	await mongoose.connection.close();
}

module.exports = {
	connect,
	get,
	close
};



