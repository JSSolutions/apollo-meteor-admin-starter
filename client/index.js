import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import Schemas from '../collections/_schemas';

const client = new ApolloClient(meteorClientConfig());

console.log(Schemas);
