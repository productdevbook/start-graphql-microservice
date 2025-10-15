# start-graphql-microservice

A GraphQL microservices starter project with Federation support. Built with Bun and Nitro.

## Project Structure

This monorepo contains independent GraphQL microservices that can work together:

- **apps/auth** - User authentication service (port 3000)
- **apps/organization** - Organization management service (port 3001)

Each microservice supports the GraphQL Federation protocol and can be composed through a gateway.

## Installation

```bash
bun install
```

## Development

```bash
# Run all services
bun run dev

# Run only auth service
bun run dev:auth

# Run only organization service
bun run dev:organization
```

## Accessing GraphQL APIs

When services are running:

- Auth API: http://localhost:3000/api/graphql
- Organization API: http://localhost:3001/api/graphql

Each endpoint includes a GraphQL Playground.

## Adding a New Microservice

1. Create a new folder in `apps/`
2. Enable GraphQL module and federation in `nitro.config.ts`:
   ```typescript
   export default defineNitroConfig({
     preset: "standard",
     modules: ["nitro-graphql"],
     graphql: {
       framework: "graphql-yoga",
       federation: { enabled: true }
     }
   })
   ```
3. Create your GraphQL schema as `server/graphql/{entity}/{entity}.graphql`
4. Add resolvers using `defineQuery()` and `defineMutation()`

## Technologies

- **Bun** - Runtime and package manager
- **Nitro** - Server framework
- **GraphQL Yoga** - GraphQL server
- **nitro-graphql** - GraphQL integration for Nitro
- **Apollo Federation** - Microservice federation

## Production Build

```bash
# Build all services
bun run build

# Build a single service (in service folder)
cd apps/auth
bun run build
```

Build outputs are created in the `.output/` folder and can be deployed to any platform using [Nitro deployment presets](https://v3.nitro.build/deploy).
