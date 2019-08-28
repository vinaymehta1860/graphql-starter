const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull
} = require('graphql');
const axios = require('axios');
const { Person } = require('./types');

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addPerson: {
			type: Person,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: GraphQLString },
				age: { type: GraphQLInt },
				occupation: { type: GraphQLString },
				company: { type: GraphQLString }
			},
			resolve(parentValue, { firstName, lastName, age, occupation, company }) {
				return axios
					.post(`http://localhost:3000/persons`, {
						firstName,
						lastName,
						age,
						occupation,
						company
					})
					.then(resp => resp.data);
			}
		},
		updatePerson: {
			type: Person,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				age: { type: GraphQLInt },
				occupation: { type: GraphQLString },
				company: { type: GraphQLString }
			},
			resolve(
				parentValue,
				{ id, firstName, lastName, age, occupation, company }
			) {
				return axios
					.patch(`http://localhost:3000/persons/${id}`, {
						firstName,
						lastName,
						age,
						occupation,
						company
					})
					.then(resp => resp.data);
			}
		}
	}
});

module.exports = {
	Mutation
};
