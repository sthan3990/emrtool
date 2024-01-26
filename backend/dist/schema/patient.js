export const patientSchema = `
  type Patient {
    id: ID!
    birthday: String!
    email: String!
    gender: String!
    name: String!
  }

  type Query {
    getPatientById(id: String): Patient
    getPatientByName(name: String): Patient
    getAllPatients: [Patient]
  }

  type Mutation {
    addPatient(
      id: String
      birthday: String
      email: String
      gender: String
      name: String
    ): Patient

    updatePatient(
      id: String
      birthday: String
      email: String
      gender: String
      name: String
    ): Patient

    deletePatient(patientId: String): Patient
  }
`;
