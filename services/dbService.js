const { MongoClient } = require('mongodb');

const url = 'mongodb://root:password@localhost:27017';
const client = new MongoClient(url);
const dbName = 'robot_stores';

const connectToDB = async () => {
  console.log('services.dbService.connectToDB()');
  await client.connect();
  console.log(`MongoDB client is connected.`);
  const db = client.db(dbName);
  console.log(`Database is ${db.databaseName}.`);
  return db;
}

module.exports.connectToDB = connectToDB;
