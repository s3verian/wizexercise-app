const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Environment variables for MongoDB connection:
const MONGO_HOST = process.env.MONGO_HOST; // e.g., MongoDB public IP from Terraform
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB   = process.env.MONGO_DB || 'admin';
const MONGO_USER = process.env.MONGO_USER || 'admin';
const MONGO_PASS = process.env.MONGO_PASS || 'AdminPass123';

// Build the MongoDB connection URI with authentication
const uri = `mongodb://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASS)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_DB}`;

let dbClient;

async function connectToMongo() {
  try {
    dbClient = new MongoClient(uri);
    await dbClient.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

app.get('/', (req, res) => {
  res.send('Hello from WizExercise Node/Express App!');
});

// Route to read and return the contents of wizexercise.txt
app.get('/read-text', (req, res) => {
  const fs = require('fs');
  fs.readFile('wizexercise.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading wizexercise.txt');
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  connectToMongo();
});
