// middleware/user.ts

import userResolvers from '../resolver/user'; 

// Function to fetch a user by ID
export const getUser = async (id: string) => {
  try {
    const userData = await userResolvers.Query.getUser(null, { id });
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }
};

// Function to add a new user
export const addUser = async (username: string, password: string, role: string) => {
  try {
    const newUser = await userResolvers.Mutation.addUser(null, { username, password, role });
    return newUser;
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Error adding user');
  }
};

// Function to update a user
export const updateUser = async (id: string, username: string, password: string, role: string) => {
  try {
    const updatedUser = await userResolvers.Mutation.updateUser(null, { id, username, password, role });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
};

// Function to delete a user
export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await userResolvers.Mutation.deleteUser(null, { id } );
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
};
