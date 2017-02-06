import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';

import Posts from '../../collections/posts';
import Users from '../../collections/users';

const postResolvers = SchemaBridge.resolvers(Posts.schema, 'Post');
const usersResolvers = SchemaBridge.resolvers(Users.usersSchema, 'User');

// postResolvers.Post.title = (root, args, context) => {
//   return 'I\'m title';
// };

// console.dir(usersResolvers);

export const resolvers = {
  Query: {
    say(root, args, context) {
      // console.log(root, args, context);
      return 'hello world';
    },
    posts() {
      return Posts.Posts.find().fetch();
    },
    users() {
      //console.log(Meteor.users.find().fetch());
      return Meteor.users.find().fetch();
    }
  },
  Post: postResolvers.Post,
  User: usersResolvers.User,
};
