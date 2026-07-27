import { useCategoriesStore } from "@/app/store/useCategoriesStore";

import DynamicField from "./DynamicField";
import StandardFields from "./StandardFields";

import NextBtn from "./NextBtn";

export default function StepFields() {
  const fields = useCategoriesStore((s) => s.selectedCategoryFields);

  const hasDynamicFields = fields && fields.length > 0;

  return (
    <div className="form_block">
      {/* BODY */}
      {hasDynamicFields ? (
        fields.map((field) => <DynamicField key={field.name} field={field} />)
      ) : (
        <StandardFields />
      )}

      {/* NEXT PAGE */}

      <NextBtn />
    </div>
  );
}
