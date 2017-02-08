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
  const query = getProfileQuery(1 | doc._id);
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
    onSubmit: function({ profile }) {
      const mutation = getUpdateProfileQuery({ ...profile, userId: '1' });
      client.mutate({ mutation })
        .then(res => {
          if (res === 'success') {
            this.done();
          } else throw new Error("Wrong server response while saving mutation result");
        })
        .catch(err => { throw new Error(e); });
    },
  }
});
