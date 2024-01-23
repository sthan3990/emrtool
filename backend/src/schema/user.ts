// /src/schema/user.ts
import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    role: UserRole!
  }

  enum UserRole {
    ADMIN
    DOCTOR
    CLINIC_ASSISTANT
  }

  extend type Query {
    getUser(id: ID!): User
  }

  extend type Mutation {
    addUser(username: String!, password: String!, role: UserRole!): User
  }
`;

export default userSchema;
