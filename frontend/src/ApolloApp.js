import React, {Component} from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from "./App";


// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

const ApolloApp = AppComponent => (
	<ApolloProvider client={client}>
		<AppComponent />
	</ApolloProvider>
);


export default ApolloApp(App);
