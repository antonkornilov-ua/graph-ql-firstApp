import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInputObjectType } from 'graphql';
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

export { UserType, UserInputType };
