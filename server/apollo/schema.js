import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import Users from '../../collections/users';

const profileSchema = SchemaBridge.schema(Users.profileSchema, 'Profile');

export const typeDefs = `
type Query {
  profile (userId: String): Profile,
}

schema {
  query: Query
}

${profileSchema}
`;
