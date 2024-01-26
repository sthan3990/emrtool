import { generateID } from '../utils/idgenerator.js';
const commentResolvers = {
    Query: {
        getComment: async (_, { id }, { firestore }) => {
            try {
                const commentSnapshot = await firestore.collection('comments').doc(id).get();
                const commentData = commentSnapshot.data();
                return commentData;
            }
            catch (error) {
                console.error('Error fetching comment:', error);
                throw new Error('Failed to fetch comment');
            }
        },
        getCommentsByPatientId: async (_, { patientId }, { firestore }) => {
            try {
                const commentsSnapshot = await firestore.collection('comments').where('patientId', '==', patientId).get();
                const commentsData = commentsSnapshot.docs.map(doc => doc.data());
                return commentsData;
            }
            catch (error) {
                console.error('Error fetching comments:', error);
                throw new Error('Failed to fetch comments');
            }
        },
    },
    Mutation: {
        addComment: async (_, { patientId, author, content, timestamp }, { firestore }) => {
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
            }
            catch (error) {
                console.error('Error adding comment:', error);
                throw new Error('Failed to add comment');
            }
        },
    },
};
export default commentResolvers;
