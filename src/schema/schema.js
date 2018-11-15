import { gql } from 'apollo-server-express';

const schema = gql`
	type Person {
		name: String!,
		dateofbirth: String!
	}
	
	type Query {
		getPerson(id: Int!): Person,
		getPersons: [Person],
	}
	
	type Mutation {
		createPerson: Boolean!,
		updatePerson: Boolean!,
		deletePerson: Boolean!,
	}
`;

export default schema;