import { defineQuery } from "nitro-graphql/utils/define";
import { mockOrganizations } from "./organizationStore";

export const data = defineQuery({
  getOrganization: (_parent, args) => {
    console.log(args)
    const organization = mockOrganizations.find(o => o.id === args.id);
    return organization || null;
  },
})
