// /src/resolvers/index.ts
import patientResolvers from "./patient.js";
import userResolvers from "./user.js";
import commentResolvers from "./comment.js";
// Combine all resolvers
const customResolvers = [patientResolvers, userResolvers, commentResolvers];
export default customResolvers;
