import express from 'express';
import { users } from './fakedb.js';
import { createHandler } from 'graphql-http/lib/use/express';

const app = express();

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            users: {
                type: new GraphQLList(GraphQLString),
                resolve: () => users,
            },
            user: {
                type: GraphQLString,
                args: {
                    name: { type: GraphQLString },
                },
                resolve: (parent, args) => users.find((item) => item === args.name),
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            updateUser: {
                type: GraphQLString,
                args: {
                    oldName: { type: GraphQLString },
                    newName: { type: GraphQLString },
                },
                resolve: (parent, args) => {
                    const index = users.indexOf(args.oldName);
                    if (index === -1) return null;
                    users[ index ] = args.newName;
                    return args.newName
                }
            },
        },
    }),
});

app.all('/graphql', createHandler({ schema }));

app.listen(3000);
