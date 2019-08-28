const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList
} = require('graphql');
const axios = require('axios');

// const { db } = require('../server');
const { Person } = require('./types');

/**
 * This is the rootQuery for GraphQL. For now it defines the following queries:
 * 1. persons     : For getting all the persons
 * 2. person (id) : For getting a particular person by his id
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		persons: {
			type: new GraphQLList(Person),
			args: {},
			resolve(parentValue, args) {
				return axios
					.get('http://localhost:3000/persons')
					.then(resp => resp.data)
					.catch(err => console.log(err));
			}
		},
		person: {
			type: Person,
			args: { id: { type: new GraphQLNonNull(GraphQLString) } },
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/persons/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});

module.exports = {
	RootQuery
};
