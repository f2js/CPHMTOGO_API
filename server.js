// Set .env file as the very first thing
const fs = require("fs");
require("dotenv").config({ path: "./.env" });

const dbConnection = require('./Services/DBConnection')

const app = require('./app')


const port = process.env.API_PORT

dbConnection.connect();

	app.listen(port, () => {
		console.log(`App running locally without sslOptions on port ${port}`)
	})
