import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';

const app = express();

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

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
            hello: {
                type: GraphQLString,
                resolve: () => 'world',
            },
        },
    }),
});

app.all('/graphql', createHandler({ schema }));

app.listen(3000);
