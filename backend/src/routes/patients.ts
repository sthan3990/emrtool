// routes/patients.js

import express from 'express';
import { addPatient, getAllPatients, getPatientbyID, updatePatient, deletePatient } from '../middleware/patient.js';

const patientsRouter = express.Router();

// Route to view a specific patient
patientsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await getPatientbyID(id);
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Error fetching patient' });
  }
});

// Route to view all patients
patientsRouter.get('/patients', async (req, res) => {
  try{
  const patients = await getAllPatients();

  res.json(patients);
  }catch (error) {
    console.error('Error fetching all patients:', error);
    res.status(500).json({ error: 'Error fetching all patients' });
  }
});

// Route to add a new patient
patientsRouter.post('/register', async (req, res) => {
  try {
    const { birthday, email, gender, name } = req.body;
    const newPatient = await addPatient(birthday, email, gender, name);
    res.json(newPatient);
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ error: 'Error adding patient' });
  }
});

// Route to update a patient
patientsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { birthday, email, gender, name } = req.body;
    const updatedPatient = await updatePatient(id, birthday, email, gender, name);
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Error updating patient' });
  }
});

// Route to delete a patient
patientsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await deletePatient(id);
    res.json(deletedPatient);
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Error deleting patient' });
  }
});

export default patientsRouter;
