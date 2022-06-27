const mongoose = require('mongoose');
const { COLLECTION_NAME } = require('./constants');

const connectionString = `mongodb://localhost:27017/${COLLECTION_NAME}`;

exports.initializeDatabase = () => mongoose.connect(connectionString);