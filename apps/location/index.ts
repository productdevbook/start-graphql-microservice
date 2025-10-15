import { createYoga, createSchema } from 'graphql-yoga';

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    location(id: ID!): Location
    locations: [Location!]!
    searchLocations(query: String!): [Location!]!
  }

  type Location {
    id: ID!
    name: String!
    address: String!
    city: String!
    country: String!
    latitude: Float
    longitude: Float
  }

  type Mutation {
    createLocation(
      name: String!
      address: String!
      city: String!
      country: String!
      latitude: Float
      longitude: Float
    ): Location!
    updateLocation(
      id: ID!
      name: String
      address: String
      city: String
      country: String
      latitude: Float
      longitude: Float
    ): Location!
    deleteLocation(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Location Service!',
    location: (_: any, { id }: { id: string }) => ({
      id,
      name: 'Sample Location',
      address: '123 Main St',
      city: 'Istanbul',
      country: 'Turkey',
      latitude: 41.0082,
      longitude: 28.9784,
    }),
    locations: () => [
      {
        id: '1',
        name: 'Istanbul Office',
        address: 'Levent, Istanbul',
        city: 'Istanbul',
        country: 'Turkey',
        latitude: 41.0082,
        longitude: 28.9784,
      },
      {
        id: '2',
        name: 'Ankara Office',
        address: 'Çankaya, Ankara',
        city: 'Ankara',
        country: 'Turkey',
        latitude: 39.9334,
        longitude: 32.8597,
      },
    ],
    searchLocations: (_: any, { query }: { query: string }) => [
      {
        id: '1',
        name: `${query} Location`,
        address: '123 Search St',
        city: 'Istanbul',
        country: 'Turkey',
        latitude: 41.0082,
        longitude: 28.9784,
      },
    ],
  },
  Mutation: {
    createLocation: (_: any, args: any) => ({
      id: Math.random().toString(36).substring(7),
      ...args,
    }),
    updateLocation: (_: any, { id, ...args }: any) => ({
      id,
      name: args.name || 'Updated Location',
      address: args.address || '123 Updated St',
      city: args.city || 'Istanbul',
      country: args.country || 'Turkey',
      latitude: args.latitude || 41.0082,
      longitude: args.longitude || 28.9784,
    }),
    deleteLocation: (_: any, { id }: { id: string }) => true,
  },
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: '/graphql',
  landingPage: true,
});

const server = Bun.serve({
  port: 4003,
  fetch: yoga,
});

console.log(`🚀 Location Service ready at http://localhost:${server.port}/graphql`);
