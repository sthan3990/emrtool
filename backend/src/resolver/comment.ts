import { Firestore } from 'firebase-admin/firestore';
import { generateID } from '../utils/idgenerator.js';

interface Context {
  firestore: Firestore;
}

const commentResolvers = {
  Query: {
    getComment: async (_: any, { id }: { id: string }, { firestore }: Context) => {
      try {
        const commentSnapshot = await firestore.collection('comments').doc(id).get();
        const commentData = commentSnapshot.data();
        return commentData;
      } catch (error) {
        console.error('Error fetching comment:', error);
        throw new Error('Failed to fetch comment');
      }
    },
    getCommentsByPatientId: async (_: any, { patientId }: { patientId: string }, { firestore }: Context) => {
      try {
        const commentsSnapshot = await firestore.collection('comments').where('patientId', '==', patientId).get();
        const commentsData = commentsSnapshot.docs.map(doc => doc.data());
        return commentsData;
      } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error('Failed to fetch comments');
      }
    },
  },
  Mutation: {
    addComment: async (
      _: any,
      { patientId, author, content, timestamp }: { patientId: string; author: string; content: string; timestamp: string },
      { firestore }: Context
    ) => {
      try {
        const id = generateID(); // Generate the ID for the comment
        const newComment = {
          id,
          patientId,
          author,
          content,
          timestamp,
        };

        const addCommentResponse = await firestore.collection('comments').add(newComment);

        // Retrieve the added comment data from the Firestore snapshot
        const addedCommentSnapshot = await addCommentResponse.get();
        const addedCommentData = addedCommentSnapshot.data();

        return addedCommentData;
      } catch (error) {
        console.error('Error adding comment:', error);
        throw new Error('Failed to add comment');
      }
    },
  },
};

export default commentResolvers;
