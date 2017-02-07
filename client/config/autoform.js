import gql from 'graphql-tag';
import client from './apollo';
import { ReactiveVar } from 'meteor/reactive-var';

const getProfileQuery = (userId) => gql`
{
  profile(userId: "${userId}") {
    firstName
  }
}
`;

const reactiveUserDoc = new ReactiveVar({}, (oldValue, newValue) => {
  return _.isEqual(oldValue, newValue)
});

const fetchProfile = (doc) => {
  const query = getProfileQuery(1 | doc._id);
  const newDoc = { ...doc };
  client.query({ query })
    .then(({ data }) => {
      newDoc.profile = data.profile;
      reactiveUserDoc.set(newDoc);
    });
};

AutoForm.hooks( {
  adminUpdateUser: {
    docToForm (doc) {
      fetchProfile(doc);
      return reactiveUserDoc.get();
    },
  }
});
