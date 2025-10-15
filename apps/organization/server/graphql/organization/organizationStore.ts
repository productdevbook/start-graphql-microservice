// Mock organization database - replace with actual database
export const mockOrganizations: Array<{
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}> = [
  {
    id: '1',
    name: 'Acme Corporation',
    description: 'A leading technology company',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Tech Innovators Inc',
    description: 'Building the future of software',
    createdAt: new Date().toISOString(),
  },
];
