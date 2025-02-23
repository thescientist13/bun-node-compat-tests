import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "apollo-server-express";
import gql from "graphql-tag";

const typeDef = gql`
type Query {
  name: String
  age: Int
}
`
const resolver = {
  Query: {
    user: () => {
      return [{
        name: "Hello World",
        age: 33
      }]
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeDef],
  resolver: [resolver]
});

const server = new ApolloServer({
  schema,
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "light",
    },
  },
});

server.listen().then((server) => {
  console.log(`GraphQLServer started at ${server.url}`);
});