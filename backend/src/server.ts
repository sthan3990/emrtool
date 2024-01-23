import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { isUserAuthenticated } from './auth/middleware';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require('./config/firebaseServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Load GraphQL schema and resolvers
const typesArray = loadFilesSync(path.join(__dirname, './src/schema'));
const resolversArray = loadFilesSync(path.join(__dirname, './src/resolvers'));

// Merge schema and resolvers
const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Apply middleware for authentication
const schemaWithMiddleware = applyMiddleware(schema, isUserAuthenticated);

// Create Apollo Server
const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => {
    // Get the authenticated user from the request
    const user = req.user;
    return { user, admin, firestore: admin.firestore() };
  },
});

// Create Express app
const app = express();

// Apply Apollo Server middleware to Express app
server.applyMiddleware({ app });

// Define the port for the server
const PORT = process.env.PORT || 4000;

// Start the server
app.listen({ port: PORT }, () => {
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
});
