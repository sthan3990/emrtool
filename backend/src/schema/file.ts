// /src/schema/file.ts
import { gql } from 'apollo-server-express';

const fileSchema = gql`
  type File {
    id: ID!
    patient: Patient!
    fileType: String!
    comments: [Comment]!
  }

  extend type Query {
    getFile(id: ID!): File
    getFilesByPatient(patientId: ID!): [File]
  }

  extend type Mutation {
    addFile(patientId: ID!, fileType: String!): File
  }
`;

export default fileSchema;
