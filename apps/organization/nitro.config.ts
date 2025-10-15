import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "standard",
  modules: ["nitro-graphql"],
  graphql: {
    framework: "graphql-yoga",
    federation: {
      enabled: true,
    }
  }
});
