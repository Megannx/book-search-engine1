// Import dependencies and modules
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const routes = require('./routes');
const { typeDefs, resolvers } = require('./models');
const authMiddleware = require('./utils/auth');
require('dotenv').config();

// Initialize Express app and define the port
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// MongoDB connection URI
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://megawomp21:whi46224@cluster0.7cpdu.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0';

// Start Apollo Server and MongoDB connection
async function startApolloServer() {
  try {
    // Connect to MongoDB (removed deprecated options)
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Start Apollo Server
    await server.start();
    server.applyMiddleware({ app });

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Serve static assets if in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    }

    // Apply RESTful API routes
    app.use(routes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`🌍 Server is running on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Start the server setup
startApolloServer();
