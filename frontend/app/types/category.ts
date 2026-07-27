export interface CategoryField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  options?: string[];
  required: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string | null;
  parent: string | null;
  fields: CategoryField[];
  createdAt: string;
  updatedAt: string;
}
