// src/resolver/user.ts
import { generateID } from '../utils/idgenerator.js';
const userResolvers = {
    Query: {
        getUser: async (_, { id }, { firestore }) => {
            try {
                const userSnapshot = await firestore.collection('users').doc(id).get();
                const userData = userSnapshot.data();
                return userData;
            }
            catch (error) {
                console.error(error);
                throw new Error("Error fetching user data");
            }
        },
    },
    Mutation: {
        addUser: async (_, { username, password, role }, { firestore }) => {
            try {
                const userId = generateID(); // Generate the ID for the new user
                const newUser = { id: userId, username, password, role }; // Ensure 'id' field is assigned
                await firestore.collection('users').doc(userId).set(newUser); // Set document with generated ID
                return newUser;
            }
            catch (error) {
                console.error(error);
                throw new Error("Error adding user");
            }
        },
        updateUser: async (_, { id, username, password, role }, { firestore }) => {
            try {
                const userRef = firestore.collection('users').doc(id);
                const updatedUserData = { username, password, role };
                await userRef.set(updatedUserData, { merge: true });
                return updatedUserData;
            }
            catch (error) {
                console.error(error);
                throw new Error("Error updating user");
            }
        },
        deleteUser: async (_, { id }, { firestore }) => {
            try {
                const userRef = firestore.collection('users').doc(id);
                const deletedUser = await userRef.get();
                await userRef.delete();
                return deletedUser.data();
            }
            catch (error) {
                console.error(error);
                throw new Error("Error deleting user");
            }
        },
    },
};
export default userResolvers;
