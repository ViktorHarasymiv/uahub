import { useQuickAdStore } from "@/app/store/useQuickAdStore";
import { useCategoriesStore } from "@/app/store/useCategoriesStore";

import style from "./Style.module.css";

import { Category } from "@/app/types/category";

export default function StepCategory() {
  const { setCategory, setStep } = useQuickAdStore();

  const categoriesData = useCategoriesStore((s) => s.categories);
  const subcategories = useCategoriesStore((s) => s.subcategories);

  const loadSubcategories = useCategoriesStore((s) => s.loadSubcategories);

  const setSelectedCategoryFields = useCategoriesStore(
    (s) => s.setSelectedCategoryFields,
  );

  const handleSubcategoryClick = (sub: Category) => {
    setCategory(sub.slug);
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
