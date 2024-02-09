import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { UserType } from './type.js';
import {users} from '../../fakedb.js'

export default {
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
};
