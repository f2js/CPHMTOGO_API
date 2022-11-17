const connectionString = process.env.DB_URI;

module.exports = {
	mongodbMemoryServerOptions: {
		binary: {
			version: '4.0.3',
			skipMD5: true,
		},
		autoStart: false,
		instance: {},
		mongoURLEnvName: connectionString,
	},
};