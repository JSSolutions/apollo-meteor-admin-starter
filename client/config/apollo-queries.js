import gql from 'graphql-tag';
import client from './apollo';
import { ReactiveVar } from 'meteor/reactive-var';

const getProfileQuery = (userId) => gql`
{
  profile(userId: "${userId}") {
    firstName
    lastName
    picture
    birthday
    bio
    location
    country
  }
}
`;

const getUpdateProfileQuery = (profileData, updateDoc) => {
  let stringQuery = '{';
  const allValues = { ...profileData, ...getRemoveFiedls(updateDoc) };
  Object.keys(allValues).forEach(k => {
    if(allValues[k] || allValues[k] === '') {
      stringQuery += `${k}: "${allValues[k]}", `;
    }
  });
  stringQuery += '}';
  return gql`
  mutation {
    updateProfile(params: ${stringQuery})
  }
  `;
};

export const reactiveUserDoc = new ReactiveVar({}, (oldValue, newValue) => {
  return _.isEqual(oldValue, newValue)
});

export const fetchProfile = (doc) => {
  const query = getProfileQuery(doc._id);
  const newDoc = { ...doc };
  client.query({ query, pollInterval: 10000 })
    .then(({ data: { profile } }) => {
      if (profile && profile.birthday) {
        profile.birthday = Date.parse(profile.birthday);
      }
      newDoc.profile = profile;
      reactiveUserDoc.set(newDoc);
    })
    .catch(e => { throw new Error(e) });
  return reactiveUserDoc.get();
};

export const updateProfile = ({ profile }, updateDoc, userId, done) => {
  const mutation = getUpdateProfileQuery({ ...profile, userId }, updateDoc);
  client.mutate({ mutation, refetchQueries: [{ query: getProfileQuery(userId)}] })
    .then(res => {
      if (res && res.data && res.data.updateProfile === 'success') {
        done();
      } else throw new Error("Wrong server response while saving mutation result");
    })
    .catch(err => { throw new Error(err); });
};

function getRemoveFiedls({$unset}) {
  return Object.keys($unset)
    .filter(k => !!~k.indexOf('profile.') && !~k.indexOf('.birthday'))
    .reduce((removeObject, k) => {
      const key = k.slice(k.indexOf('.') + 1);
      return {...removeObject, [key]: ''};
    }, {})
}
