import express from 'express';
import { users, posts, likes } from './fakedb.js';
import { createHandler } from 'graphql-http/lib/use/express';
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInputObjectType,
} from 'graphql';

const app = express();

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
    },
});

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInputType',
    fields: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            users: {
                type: new GraphQLList(UserType),
                resolve: () => users,
            },
            user: {
                type: UserType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                },
                resolve: (parent, args) => users.find((item) => item.id === args.id),
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            updateUser: {
                type: UserType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                    userData: { type: UserInputType },
                },
                resolve: (parent, args) => {
                    const user = users.find((item) => item.id === args.id);
                    if (!user) return null;
                    if (args.userData.name) user.name = args.userData.name;
                    if (args.userData.email) user.email = args.userData.email;
                    return user;
                },
            },
        },
    }),
});

app.all('/graphql', createHandler({ schema }));

app.listen(3000);
