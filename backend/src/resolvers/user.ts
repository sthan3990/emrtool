// /src/resolvers/user.ts
import { Resolvers } from '../types';

const userResolvers: Resolvers = {
  Query: {
    getUser: async (_, { id }, { firestore }) => {
      // Implement logic to fetch user by ID from Firestore
    },
  },
  Mutation: {
    addUser: async (_, { username, password, role }, { firestore }) => {
      // Implement logic to add a new user to Firestore
    },
  },
};

export default userResolvers;
