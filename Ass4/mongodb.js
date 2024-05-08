const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const database = 'student';

const dbConnect = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(database);
    return db.collection('profile');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = dbConnect;
