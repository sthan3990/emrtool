export const commentSchema = `
  type Comment {
    id: ID!
    patientId: ID!
    author: String!
    content: String!
    timestamp: String!
    # Reference the patient type
    patient: Patient
  }

  type Query {
    getComment(id: ID!): Comment
    getCommentsByPatientId(patientId: ID!): [Comment]
  }

  type Mutation {
    addComment(patientId: ID!, author: String!, content: String!, timestamp: String!): Comment
  }
`;
