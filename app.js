import express from 'express';
import { users, posts, likes } from './fakedb.js';
import { v4 as uuid } from 'uuid';
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
// User types
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
// Post types
const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
    },
});
const PostCreateType = new GraphQLInputObjectType({
    name: 'PostCreateType',
    fields: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
    },
});

// Schema
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
            posts: {
                type: new GraphQLList(PostType),
                resolve: () => posts,
            },
            post: {
                type: PostType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                },
                resolve: (parent, args) => posts.find((item) => item.id === args.id),
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
            deletePost: {
                type: PostType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                },
                resolve: (parent, args) => {
                    const index = posts.findIndex((item) => item.id === args.id);
                    if (index === -1) return null;
                    const postToDelete = posts[index];
                    posts.splice(index, 1);
                    return postToDelete;
                },
            },
            createPost: {
                type: PostType,
                args: {
                    postData: { type: new GraphQLNonNull(PostCreateType) },
                },
                resolve: (parent, args) => {
                    args.postData.id = uuid();
                    posts.push(args.postData);
                    return args.postData;
                },
            },
        },
    }),
});

app.all('/graphql', createHandler({ schema }));

app.listen(3000);
