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
    profile(_, args, context) {
      console.log('resolver called');
      if (context && context.userId) {
        return db.models.profile.findOne({ where: args })
      }
    }
  },
  Mutation: {
    updateProfile(_, { params: { userId, ...profileData } }) {
      console.log('mutation called');
      return db.models.profile.update(profileData, { where: { userId } })
        .then((numUpdated) => {
          if (numUpdated) {
            return "success"
          }
        });
    },
  },
  Profile: usersResolvers.User,
};
