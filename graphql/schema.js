const { GraphQLSchema } = require("graphql");

const { RootQuery } = require("./rootQuery");
const { Mutation } = require("./mutations");

module.exports = new GraphQLSchema({
  mutation: Mutation,
  query: RootQuery
});
