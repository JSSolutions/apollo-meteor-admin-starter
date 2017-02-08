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

const getUpdateProfileQuery = (profileData) => {
  let stringQuery = '{';
  Object.keys(profileData).forEach(k => {
    if(profileData[k]) {
      stringQuery += `${k}: "${profileData[k]}", `;
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
      if (profile.birthday) {
        profile.birthday = Date.parse(profile.birthday);
      }
      newDoc.profile = profile;
      reactiveUserDoc.set(newDoc);
    })
    .catch(e => { throw new Error(e) });
};

export const updateProfile = (profile, userId, done) => {
  const mutation = getUpdateProfileQuery({ ...profile, userId });
  client.mutate({ mutation, refetchQueries: [{ query: getProfileQuery(userId)}] })
    .then(res => {
      if (res && res.data && res.data.updateProfile === 'success') {
        done();
      } else throw new Error("Wrong server response while saving mutation result");
    })
    .catch(err => { throw new Error(err); });
};
