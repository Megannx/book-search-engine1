const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is required to load environment variables

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('🌍 MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
