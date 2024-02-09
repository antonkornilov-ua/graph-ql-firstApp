
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { PostMutations, PostQueries } from './post/index.js';
import { UserQueries, UserMutations } from './user/index.js';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            ...UserQueries,
            ...PostQueries,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            ...UserMutations,
            ...PostMutations,
        },
    }),
});
