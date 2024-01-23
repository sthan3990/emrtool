// /src/schema/index.ts
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import patientSchema from './patient';
import fileSchema from './file';
import commentSchema from './comment';
import userSchema from './user';

const typeDefs = mergeTypeDefs([
  patientSchema,
  fileSchema,
  commentSchema,
  userSchema,
]);

const schema = makeExecutableSchema({ typeDefs });

export default schema;
