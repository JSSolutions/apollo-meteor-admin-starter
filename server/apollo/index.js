import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import bridgeSchema, { typeDefs } from './schema';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs: typeDefs + bridgeSchema,
  resolvers,
});

createApolloServer({
  schema,
});
