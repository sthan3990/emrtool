// routes/users.js

import express from 'express';
import { getUser, addUser, updateUser, deleteUser } from '../middleware/user.js'
import bcrypt from "bcrypt";

const router = express.Router();

// Route to get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Route to add a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // encrypt the password
    const saltRounds = 5;
    const hashedPassword = bcrypt.hashSync(process.env.BCRYPT_HASH, saltRounds);

    const newUser = await addUser(username, hashedPassword, role);
    res.json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Error adding user' });
  }
});

// Route to update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;

    // encrypt the password
    const saltRounds = 5;
    const hashedPassword = bcrypt.hashSync(process.env.BCRYPT_HASH, saltRounds);

    const updatedUser = await updateUser(id, username, hashedPassword, role);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Route to delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

export default router;
