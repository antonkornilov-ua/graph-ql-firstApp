import {
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';
import { users } from '../../fakedb.js';

import { UserInputType, UserType } from './type.js';
export default {
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
};
