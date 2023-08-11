require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const { MONGO_URI } = process.env.MONGO_URI;

const connectToDatabase = () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true,
    }, () => {
      logger.log('Mongoose is Connected.');
    });
  } catch (err) {
    logger.log(`Could not connect:  ${err}`);
  }
  const dbConnection = mongoose.connection;

  dbConnection.on('error', (err) => {
    logger.log(`Connection Error: ${err}`);
  });

  dbConnection.once('open', () => {
    logger.log('Connected to DB!');
  });
};

module.exports = { connectToDatabase };
