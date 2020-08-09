const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList
} = require('graphql');

const PersonType = require('./types');
const Person = require('../models/Person');

/**
 * This is the rootQuery for GraphQL. For now it defines the following queries:
 * 1. persons     : For getting all the persons
 * 2. person (firstName) : For getting a particular person by his first name
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		persons: {
			type: new GraphQLList(PersonType),
			args: {},
			resolve(parentValue, args) {
				return Person.find({}).then(resp => {
					return resp;
				});
			}
		},
		person: {
			type: PersonType,
			args: { firstName: { type: new GraphQLNonNull(GraphQLString) } },
			resolve(parentValue, args) {
				return Person.findOne({ firstName: args.firstName }).then(resp => {
					return resp;
				});
			}
		}
	}
});

module.exports = {
	RootQuery
};
