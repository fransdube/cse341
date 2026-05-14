const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let database;

module.exports = {
  initDB: (callback) => {
    if (!uri) {
      console.error('MONGODB_URI is not defined in .env file');
      return callback(new Error('MONGODB_URI not defined'));
    }
    
    const client = new MongoClient(uri);
    
    client.connect()
      .then(() => {
        database = client.db('cse341');
        console.log('Successfully connected to MongoDB.');
        callback();
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        callback(err);
      });
  },
  getDB: () => database
};