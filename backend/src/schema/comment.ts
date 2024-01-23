// /src/schema/comment.ts
import { gql } from 'apollo-server-express';

const commentSchema = gql`
  type Comment {
    id: ID!
    file: File!
    author: String!
    content: String!
    timestamp: String!
  }

  extend type Query {
    getComment(id: ID!): Comment
  }

  extend type Mutation {
    addComment(fileId: ID!, author: String!, content: String!, timestamp: String!): Comment
  }
`;

export default commentSchema;
