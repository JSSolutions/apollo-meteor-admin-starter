import queries from './apollo-queries';

AutoForm.hooks( {
  adminUpdateUser: {
    docToForm (doc) {
      return queries.fetchProfile(doc);
    },
    onSubmit: function(insertDoc, updateDoc, { _id }) {
      const done = this.done;
      queries.updateProfile(insertDoc, updateDoc, _id, done);
    },
  }
});
