// /src/resolvers/comment.ts
import { Resolvers } from '../types';

const commentResolvers: Resolvers = {
  Query: {
    getComment: async (_, { id }, { firestore }) => {
      // Implement logic to fetch comment by ID from Firestore
    },
  },
  Mutation: {
    addComment: async (_, { fileId, author, content, timestamp }, { firestore }) => {
      // Implement logic to add a new comment to Firestore
    },
  },
};

export default commentResolvers;
