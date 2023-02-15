import { buildSchema, GraphQLSchema, printSchema } from 'graphql';

export function processSchema(schema: GraphQLSchema): GraphQLSchema {
  return buildSchema(printSchema(schema).replace(/\!( )?\=/g, '='), {
    assumeValid: true,
    assumeValidSDL: true,
  });
}
