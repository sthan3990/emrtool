// /src/resolvers/patientResolver.ts
import { getFirestore } from 'firebase-admin/firestore';
import { generateID } from '../utils/idgenerator.js';

const patientResolvers = {
  Query: {
    getPatientByName: async (
      _: any,
      { patientName }: { patientName: string },
    ) => {
      try {
        const db = getFirestore();
        const patientsRef = db.collection('patients');
        const querySnapshot = await patientsRef.where('name', '==', patientName).get();

        if (querySnapshot.empty) {

          throw new Error('Patient not found');

        } else {
          const patientsData = [];
          querySnapshot.forEach((doc) => {
            patientsData.push(doc.data());
          });
          return patientsData;
        }
      } catch (Error) {
        console.error(Error);
        throw new Error("Error fetching patient data");
      }
    },
    getPatientById: async (
      _: any,
      { patientId }: { patientId: string },
    ) => {
      try {
        const db = getFirestore();

        const patientRef = db.collection('patients').doc(patientId);
        const patientDoc = await patientRef.get();

        if (!patientDoc.exists) {
          throw new Error('Patient not found');
        }
        const patientData = patientDoc.data();
        return patientData;
      } catch (Error) {
        console.error(Error);
        throw new Error("Error fetching patient data");
      }
    },
    getAllPatients: async (
      _: any,
      __: any,
      { dataSources }: any,
    ) => {
      try {
        const db = getFirestore();
        const patientsRef = db.collection('patients');
        const querySnapshot = await patientsRef.get();
        const patientsData = [];
        querySnapshot.forEach((doc) => {
          patientsData.push(doc.data());
        });

        return patientsData;
      } catch (Error) {
        console.error(Error);
        throw new Error("Error fetching patient data");
      }
    },
  },
  Mutation: {
    addPatient: async (
      _: any,
      { birthday, email, gender, name }: {
        birthday: string;
        email: string;
        gender: string;
        name: string;
      },
    ) => {
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

      } catch (Error) {
        console.error(Error);
        throw new Error("Error adding patient");
      }
    },
    updatePatient: async (
      _: any,
      { patientId, birthday, email, gender, name }: {
        patientId: string;
        birthday: string;
        email: string;
        gender: string;
        name: string;
      },
    ) => {
      try {
        const db = getFirestore();
        const patientRef = db.collection('patients').doc(patientId);
        await patientRef.update({
          birthday,
          email,
          gender,
          name
        });
        return patientRef
      } catch (Error) {
        console.error(Error);
        throw new Error("Error updating patient");
      }
    },
    deletePatient: async (
      _: any,
      { patientId }: { patientId: string },
    ) => {
      try {
        const db = getFirestore();
        const patientRef = db.collection('patients').doc(patientId);
        const patientDoc = await patientRef.get();

        if (!patientDoc.exists) {
          throw new Error('Patient not found');
        }

        await patientRef.delete();

        return patientRef;
      } catch (Error) {
        console.error(Error);
        throw new Error("Error deleting patient");
      }
    },
  },
};

export default patientResolvers;
