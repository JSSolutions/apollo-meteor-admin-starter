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
      if (context && context.userId) {
        return db.models.profile.findOne({ where: args })
      }
    }
  },
  Mutation: {
    updateProfile(_, { params: { ...profileData } }) {
      return db.models.profile.upsert(profileData)
        .then(() => 'success')
        .catch(err => { throw new Error(err); })
    },
  },
  Profile: usersResolvers.User,
};
