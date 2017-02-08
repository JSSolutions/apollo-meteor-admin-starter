import queries from './apollo-queries';

AutoForm.hooks( {
  adminUpdateUser: {
    docToForm (doc) {
      queries.fetchProfile(doc);
      return queries.reactiveUserDoc.get();
    },
    onSubmit: function({ profile }, updateDoc, { _id }) {
      const done = this.done;
      queries.updateProfile(profile, _id, done);
    },
  }
});
