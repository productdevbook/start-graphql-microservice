import { createYoga, createSchema } from 'graphql-yoga';

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    organization(id: ID!): Organization
    organizations: [Organization!]!
  }

  type Organization {
    id: ID!
    name: String!
    description: String
    createdAt: String!
  }

  type Mutation {
    createOrganization(name: String!, description: String): Organization!
    updateOrganization(id: ID!, name: String, description: String): Organization!
    deleteOrganization(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Organization Service!',
    organization: (_: any, { id }: { id: string }) => ({
      id,
      name: 'Sample Organization',
      description: 'A sample organization',
      createdAt: new Date().toISOString(),
    }),
    organizations: () => [
      {
        id: '1',
        name: 'Organization 1',
        description: 'First organization',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Organization 2',
        description: 'Second organization',
        createdAt: new Date().toISOString(),
      },
    ],
  },
  Mutation: {
    createOrganization: (_: any, { name, description }: { name: string; description?: string }) => ({
      id: Math.random().toString(36).substring(7),
      name,
      description,
      createdAt: new Date().toISOString(),
    }),
    updateOrganization: (_: any, { id, name, description }: { id: string; name?: string; description?: string }) => ({
      id,
      name: name || 'Updated Organization',
      description,
      createdAt: new Date().toISOString(),
    }),
    deleteOrganization: (_: any, { id }: { id: string }) => true,
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
  port: 4002,
  fetch: yoga,
});

console.log(`🚀 Organization Service ready at http://localhost:${server.port}/graphql`);
