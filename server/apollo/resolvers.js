import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';

import db from './connectors';
import Users from '../../collections/users';

const usersResolvers = SchemaBridge.resolvers(Users.profileSchema, 'User');

// postResolvers.Post.title = (root, args, context) => {
//   return 'I\'m title';
// };

// console.dir(usersResolvers);

export const resolvers = {
  Query: {
    profile(_, args) {
      return db.models.profile.findOne({ where: args })
    }
  },
  Profile: usersResolvers.User,
};
