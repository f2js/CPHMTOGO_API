// Set .env file as the very first thing
require('dotenv').config({ path: './config.env' })
const dbConnection = require('./Services/DBConnection')

const app = require('./app')
const https = require('https')

const port = process.env.API_PORT

dbConnection.connect();

if (process.env.NODE_ENV == 'development') {
			app.listen(port, () => {
				console.log(`App running locally without sslOptions on port ${port}`)
	})
} else {

		https.createServer(sslOptions, app).listen(port, () => {
			console.log(`App running on port ${port}`)
		})

}