import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLList,
} from 'graphql';
import { UserType } from '../user/type.js';
import { users, likes } from '../../fakedb.js';

const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        user: {
            type: new GraphQLNonNull(UserType),
            resolve: (parent) => users.find((user) => user.id === parent.userId),
        },
        likedBy: {
            type: new GraphQLList(UserType),
            resolve: (parent) =>
                users.filter((user) =>
                    likes
                        .filter((like) => like.postId === parent.id)
                        .map((like) => like.userId)
                        .includes(user.id)
                ),
        },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
    }),
});
const PostCreateType = new GraphQLInputObjectType({
    name: 'PostCreateType',
    fields: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
    },
});

export { PostType, PostCreateType };
