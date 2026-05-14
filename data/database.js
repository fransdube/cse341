// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let database;

module.exports = {
  initDB: (callback) => {
    if (!uri) {
      console.error('MONGODB_URI is not defined in environment variables');
      return callback(new Error('MONGODB_URI not defined'));
    }
    
    console.log('Attempting to connect to MongoDB...');
    
    // Add explicit TLS options
    const client = new MongoClient(uri, {
      tls: true,
      tlsAllowInvalidCertificates: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
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