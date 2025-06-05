
export interface Recipient {
  name: string;
  email: string;
  ngoType: string;
}

export const NGO_TYPES = [
  'education',
  'women-empowerment',
  'wildlife',
  'community-service',
  'health-and-wellness',
  'disaster-management',
  'other'
] as const;

export type NGOType = typeof NGO_TYPES[number];
