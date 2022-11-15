const { MongoClient } = require("mongodb");

const connectionString = process.env.DB_URI;
const dbName = process.env.DB_NAME;
let mongoClient;

async function connect(callback) {
  await MongoClient.connect(connectionString, (err, client) => {
    mongoClient = client;
    callback();
  });
}

async function get() {
  return await mongoClient.db(dbName);
}

async function close() {
  await mongoClient.close();
}

module.exports = {
  connect,
  get,
  close,
};
