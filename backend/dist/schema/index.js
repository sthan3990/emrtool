import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { patientSchema } from './patient.js';
import { userSchema } from './user.js';
import { commentSchema } from './comment.js';
const typeDefs = mergeTypeDefs([
    patientSchema,
    userSchema,
    commentSchema,
]);
const customSchema = makeExecutableSchema({ typeDefs });
export default customSchema;
