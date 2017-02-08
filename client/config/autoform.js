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

const reactiveUserDoc = new ReactiveVar({}, (oldValue, newValue) => {
  return _.isEqual(oldValue, newValue)
});

const fetchProfile = (doc) => {
  console.log('fetchProfile called ');
  const query = getProfileQuery(doc._id);
  const newDoc = { ...doc };
  client.query({ query, pollInterval: 10000 })
    .then(({ data }) => {
      newDoc.profile = data.profile;
      console.log(data.profile);
      reactiveUserDoc.set(newDoc);
    })
    .catch(e => { throw new Error(e) });
};

AutoForm.hooks( {
  adminUpdateUser: {
    docToForm (doc) {
      fetchProfile(doc);
      return reactiveUserDoc.get();
    },
    onSubmit: function({ profile }, updateDoc, { _id }) {
      const mutation = getUpdateProfileQuery({ ...profile, userId: _id });
      client.mutate({ mutation, refetchQueries: [{ query: getProfileQuery(_id)}] })
        .then(res => {
          if (res && res.data && res.data.updateProfile === 'success') {
            this.done();
          } else throw new Error("Wrong server response while saving mutation result");
        })
        .catch(err => { throw new Error(err); });
    },
  }
});
