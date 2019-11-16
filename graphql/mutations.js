const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull
} = require('graphql');

const { PersonType } = require('./types');
const Person = require('../models/Person');

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addPerson: {
			type: PersonType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: GraphQLString },
				age: { type: GraphQLInt },
				occupation: { type: GraphQLString },
				company: { type: GraphQLString }
			},
			resolve(parentValue, { firstName, lastName, age, occupation, company }) {
				let person = new Person({
					firstName,
					lastName,
					age,
					occupation,
					company
				});
				return person.save().then(resp => {
					return resp;
				});
			}
		},
		updatePerson: {
			type: PersonType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: GraphQLString },
				age: { type: GraphQLInt },
				occupation: { type: GraphQLString },
				company: { type: GraphQLString }
			},
			resolve(
				parentValue,
				{ id, firstName, lastName, age, occupation, company }
			) {
				return Person.findOneAndUpdate(
					{ firstName: firstName },
					{ firstName, lastName, age, occupation, company },
					{ new: true }
				).then(resp => resp);
			}
		}
	}
});

module.exports = {
	Mutation
};
