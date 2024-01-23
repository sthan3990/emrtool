// /src/schema/patient.ts
import { gql } from 'apollo-server-express';

const patientSchema = gql`
  type Patient {
    id: ID!
    name: String!
    dateOfBirth: String!
    gender: String!
    files: [File]!
  }

  extend type Query {
    getPatient(id: ID!): Patient
    getPatients: [Patient]
  }

  extend type Mutation {
    addPatient(name: String!, dateOfBirth: String!, gender: String!): Patient
  }
`;

export default patientSchema;
