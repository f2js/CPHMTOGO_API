
const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")

let connectionString = process.env.DB_URI;
const dbName = process.env.DB_NAME;
let mongoClient;

async function connect(){
	if (process.env.NODE_ENV === 'test') {
		console.log("RUNNING TEST IN MEMORY DB")
		mongoServer = await MongoMemoryServer.create();
		connectionString =  await mongoServer.getUri();
	}
	try{
		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
	});
	}catch(e) {
		console.log("Error: ", e);
		console.log("Error connecting to the database")
	}
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



