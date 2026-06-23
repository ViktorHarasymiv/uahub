export type NavItem = {
  id: number;
  label: string;
  path: string;
  children?: NavItem[];
};
