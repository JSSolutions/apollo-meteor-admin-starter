import gql from 'graphql-tag';
import client from './apollo';

const getProfileQuery = (userId) => gql`
{
  profile(userId: "${userId}") {
    firstName
  }
}
`;

AutoForm.hooks( {
  adminUpdateUser: {
    docToForm (doc) {
      const userId = doc._id;
      const query = getProfileQuery(1 | userId);
      const user =  client.query({ query })
        .then(({ data }) => {
          console.log(data);
          doc.profile = data.profile;
          return doc
          //addProfileData(newDoc, schema, true);
        });
      return doc
    },
  }
});


// AutoForm.hooks( {
//   adminUpdateUser: {
//     docToForm: function addProfileData (doc, schema, isFulfilled) {
//       console.log(isFulfilled);
//       if (isFulfilled) {
//         console.log('fulfilled!', doc)
//         return doc
//       }
//       const userId = doc._id;
//       const query = getProfileQuery(1 | userId);
//       console.log(query);
//       const users = client.query({ query })
//         .then(({ data }) => {
//           const newDoc = { ...doc };
//           newDoc.profile = data.profile;
//           addProfileData(newDoc, schema, true);
//         });
//       return users;
//     },
//   }
// });
