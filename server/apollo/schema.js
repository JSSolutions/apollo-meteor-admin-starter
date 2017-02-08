import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import Users from '../../collections/users';

const profileSchema = SchemaBridge.schema(Users.profileSchema, 'Profile');

export const typeDefs = `
type Query {
  profile (userId: String): Profile,
}


${profileSchema}

input ProfileData {
  userId: String!
  picture: String
  firstName: String
  lastName: String
  birthday: String
  bio: String
  location: String
  country: String
}

type Mutation {
  updateProfile (
    params: ProfileData!
  ): String
}

schema {
  query: Query
  mutation: Mutation
}
`;
