// src/resolver/user.ts

import { getFirestore } from 'firebase-admin/firestore';
import { generateID } from '../utils/idgenerator.js';

const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) => {
      try {
        const db = getFirestore();
        const userSnapshot = await db.collection('users').doc(id).get();
        const userData = userSnapshot.data();
        return userData;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching user data");
      }
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      { username, password, role }: { username: string; password: string; role: string },
    ) => {
      try {
        const db = getFirestore();

        const userId = generateID(); // Generate the ID for the new user
        const newUser = { id: userId, username, password, role }; // Ensure 'id' field is assigned
        await db.collection('users').doc(userId).set(newUser); // Set document with generated ID
        return newUser;
      } catch (error) {
        console.error(error);
        throw new Error("Error adding user");
      }
    },
    updateUser: async (
      _: any,
      { id, username, password, role }: { id: string; username: string; password: string; role: string },
    ) => {
      try {
        const db = getFirestore();
        const userRef = db.collection('users').doc(id);
        const updatedUserData = { username, password, role };
        await userRef.set(updatedUserData, { merge: true });
        return updatedUserData;
      } catch (error) {
        console.error(error);
        throw new Error("Error updating user");
      }
    },
    deleteUser: async (
      _: any,
      { id }: { id: string },
    ) => {
      try {
        const db = getFirestore();
        const userRef = db.collection('users').doc(id);
        const deletedUser = await userRef.get();
        await userRef.delete();
        return deletedUser.data();
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting user");
      }
    },
  },
};

export default userResolvers;
