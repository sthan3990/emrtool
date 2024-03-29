 // middleware/patient.js

import { getFirestore } from 'firebase-admin/firestore';
import { generateID } from '../utils/idgenerator.js';

export const addPatient = async (birthday: string, email: string, gender: string, name: string) => {
  try {
    const db = getFirestore();
    let patientId = generateID();
    const patientRef = db.collection('patients').doc(patientId);
    await patientRef.set({
      patientId,
      birthday,
      email,
      gender,
      name
    });
    return patientRef;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw new Error("Error adding patient");
  }
};

export const getPatientbyID = async (patientId: string) => {
  try {
    const db = getFirestore();
    const patientRef = db.collection('patients').doc(patientId);
    const patientDoc = await patientRef.get();

    if (!patientDoc.exists) {
      throw new Error('Patient not found');
    }

    return patientDoc.data();
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw new Error('Error fetching patient');
  }
};


export const getAllPatients = async () => {
  try {
    const db = getFirestore();
    const patientsRef = db.collection('patients');
    const querySnapshot = await patientsRef.get();

    if (querySnapshot.empty) {
      throw new Error('No patients found');
    }

    const patientsData: any[] = [];
    querySnapshot.forEach((doc) => {
      patientsData.push(doc.data());
    });

    return patientsData;
    
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw new Error('Error fetching patient');
  }
};

export const updatePatient = async (patientId: string, birthday: string, email: string, gender: string, name: string) => {
  try {
    const db = getFirestore();
    const patientRef = db.collection('patients').doc(patientId);
    await patientRef.update({
      birthday,
      email,
      gender,
      name
    });
    return patientRef;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw new Error("Error updating patient");
  }
};

export const deletePatient = async (patientId: string) => {
  try {
    const db = getFirestore();
    const patientRef = db.collection('patients').doc(patientId);
    const patientDoc = await patientRef.get();

    if (!patientDoc.exists) {
      throw new Error('Patient not found');
    }

    await patientRef.delete();

    return patientRef;
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw new Error("Error deleting patient");
  }
};
