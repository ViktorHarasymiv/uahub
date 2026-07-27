import { CategoryField } from "@/app/types/category";
import DynamicField from "./DynamicField";

export default function StandardFields() {
  const defaultFields: CategoryField[] = [
    {
      name: "title",
      label: "Заголовок",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Опис",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      label: "Ціна",
      type: "number",
      required: false,
    },
  ];

  return (
    <>
      {defaultFields.map((field) => (
        <DynamicField key={field.name} field={field} />
      ))}
    </>
  );
}
