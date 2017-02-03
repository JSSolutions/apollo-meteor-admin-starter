import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';

const client = new ApolloClient(meteorClientConfig());

console.log(client);
