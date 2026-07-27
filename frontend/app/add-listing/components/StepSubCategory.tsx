import { useQuickAdStore } from "@/app/store/useQuickAdStore";
import { useCategoriesStore } from "@/app/store/useCategoriesStore";

import style from "./Style.module.css";

import { Category } from "@/app/types/category";

export default function StepCategory() {
  const { setCategory, setStep } = useQuickAdStore();
  const subcategories = useCategoriesStore((s) => s.subcategories);

  const setSelectedCategoryFields = useCategoriesStore(
    (s) => s.setSelectedCategoryFields,
  );

  const handleSubcategoryClick = (sub: Category) => {
    setCategory(sub.slug, sub.name);
    setSelectedCategoryFields(sub.fields);
    setStep(2);
  };

  return (
    <div className="form_block">
      <h3>Оберіть підкатегорію категорію</h3>

      {subcategories.length > 0 && (
        <div className={style.category_wrapper}>
          {subcategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => handleSubcategoryClick(sub)}
              className="tag_button"
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
