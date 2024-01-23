// /src/resolvers/patient.ts
import { Resolvers } from '../types';

const patientResolvers: Resolvers = {
  Query: {
    getPatient: async (_, { id }, { firestore }) => {
      // Implement logic to fetch patient by ID from Firestore
    },
    getPatients: async (_, __, { firestore }) => {
      // Implement logic to fetch all patients from Firestore
    },
  },
  Mutation: {
    addPatient: async (_, { name, dateOfBirth, gender }, { firestore }) => {
      // Implement logic to add a new patient to Firestore
    },
  },
};

export default patientResolvers;
