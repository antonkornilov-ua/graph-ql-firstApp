import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInputObjectType } from 'graphql';


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

export { PostType, PostCreateType };
