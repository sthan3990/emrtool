// index.js 
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import customSchema from './schema/index.js';
import customResolvers from './resolver/index.js';
import { initFireClient } from './config/fireclient.js';
import { initFireAdmin } from './config/fireadmin.js';
import { Firestore } from 'firebase-admin/firestore';

// https://www.apollographql.com/docs/apollo-server/data/fetching-data/
// Define MyContext to include the Firestore instance
interface MyContext {
  token?: String,
  firestore: Firestore,
}


// Required logic for integrating with Express
const app = express();

// Use bodyParser middleware to parse JSON request bodies from the frontend
app.use(express.json());

initFireClient();
initFireAdmin();


// Enable CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: customSchema,
  resolvers: customResolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer })
  ],
});


// Ensure we wait for our server to start
await server.start();

app.use(

  '/graphql',

  cors<cors.CorsRequest>(),

  express.json(),

  expressMiddleware(server, {

    context: async ({ req }) => ({ 
      dataSources: {
        
      },
      token: req.headers.token 
    }),
  }),

);
// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/`);