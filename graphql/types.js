const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull
} = require('graphql');

const Person = new GraphQLObjectType({
	name: 'Person',
	fields: () => ({
		id: { type: GraphQLString },
		firstName: { type: new GraphQLNonNull(GraphQLString) },
		lastName: { type: GraphQLString },
		age: { type: GraphQLInt },
		occupation: { type: GraphQLString },
		company: { type: GraphQLString }
	})
});

module.exports = {
	PersonType: Person
};
