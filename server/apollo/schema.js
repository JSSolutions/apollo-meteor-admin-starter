import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import Posts from '../../collections/posts';

const bridgeSchema = SchemaBridge.schema(Posts.schema, 'Post');
export default bridgeSchema;

export const typeDefs = `
type Query {
  say: String,
  posts: [Post]
}

schema {
  query: Query
}
`;
