import { defineMutation } from "nitro-graphql/utils/define";
import { mockOrganizations } from "./organizationStore";

export const data = defineMutation({
  createOrganization: (_parent: unknown, args: { input: { name: string; description?: string } }) => {
    const newOrganization = {
      id: String(mockOrganizations.length + 1),
      name: args.input.name,
      description: args.input.description,
      createdAt: new Date().toISOString(),
    };

    mockOrganizations.push(newOrganization);
    return newOrganization;
  },
})
