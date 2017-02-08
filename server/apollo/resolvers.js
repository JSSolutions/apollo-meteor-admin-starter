import SchemaBridge from 'meteor/kuip:schema-graphql-bridge';

import db from './connectors';
import Users from '../../collections/users';

const usersResolvers = SchemaBridge.resolvers(Users.profileSchema, 'User');

export const resolvers = {
  Query: {
    profile(_, args, context) {
      if (!isAdmin(context)) throw new Error('Not authorized') ;
      return db.models.profile.findOne({ where: args })
    }
  },
  Mutation: {
    updateProfile(_, { params: { ...profileData } }, context) {
      if (!isAdmin(context)) throw new Error('Not authorized') ;
      return db.models.profile.upsert(setNull(profileData))
        .then(() => 'success')
        .catch(err => { throw new Error(err); })
    },
  },
  Profile: usersResolvers.User,
};

function isAdmin(context) {
  const  roles = context && context.user && context.user.roles;
  return roles && !!~roles.indexOf('admin');
}

function setNull(profileData) {
  const dataWithNull = { ...profileData };
  Object.keys(dataWithNull).forEach(k => {
    dataWithNull[k] = dataWithNull[k] === ''
      ? null
      : dataWithNull[k];
  });
  return dataWithNull;
}
