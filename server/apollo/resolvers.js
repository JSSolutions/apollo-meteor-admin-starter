import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';
import Posts from '../../collections/posts';

let postResolvers = SchemaBridge.resolvers(Posts.schema, 'Post');

// postResolvers.Post.title = (root, args, context) => {
//   return 'I\'m title';
// };


export const resolvers = {
  Query: {
    say(root, args, context) {
      console.log(root, args, context);
      return 'hello world';
    },
    posts() {
      return Posts.Posts.find().fetch();
    }
  },
  Post: postResolvers.Post,
};
