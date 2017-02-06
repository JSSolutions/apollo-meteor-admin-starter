import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import Posts from '../../collections/posts';
import Users from '../../collections/users';

const bridgeSchema = SchemaBridge.schema(Posts.schema, 'Post');
const userSchema = SchemaBridge.schema(Users.usersSchema, 'User');

export const typeDefs = `
type Query {
  say: String,
  posts: [Post],
  users: [User]
}

schema {
  query: Query
}
${bridgeSchema}

${userSchema}
`;
