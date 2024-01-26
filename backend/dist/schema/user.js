export const userSchema = `
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

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    addUser(username: String!, password: String!, role: UserRole!): User
    updateUser(id: ID!, username: String!, password: String!, role: UserRole!): User
    deleteUser(id: ID!): User
  }
`;
