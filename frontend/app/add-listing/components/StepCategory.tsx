import toast from "react-hot-toast";
import { useQuickAdStore } from "@/app/store/useQuickAdStore";
import { useCategoriesStore } from "@/app/store/useCategoriesStore";
import style from "./Style.module.css";

import { Category } from "@/app/types/category";
import { useState } from "react";
import StepHeader from "./StepHeader";

export default function StepCategory() {
  const [hasFields, setHasField] = useState<boolean | null>(null);
  const {
    categoryName,
    subCategoryName,
    setCategory,
    setSubCategory,
    setStep,
  } = useQuickAdStore();

  const categoriesData = useCategoriesStore((s) => s.categories);
  const subcategories = useCategoriesStore((s) => s.subcategories);

  const loadSubcategories = useCategoriesStore((s) => s.loadSubcategories);

  const setSelectedCategoryFields = useCategoriesStore(
    (s) => s.setSelectedCategoryFields,
  );

  const handleCategoryClick = async (cat: Category) => {
    const hasSubs = await loadSubcategories(cat.slug);

    setHasField(hasSubs);

    if (!hasSubs) {
      // Кінцева категорія
      setCategory(cat.slug, cat.name);

      setSelectedCategoryFields(cat.fields);
      setStep(2);
    } else {
      // Категорія має підкатегорії
      setCategory(cat.slug, cat.name); // ← важливо
      setSubCategory(null, null); // ← важливо
      setSelectedCategoryFields([]); // ← важливо
      setStep(1);

      toast(`Виберіть підкатегорію для "${cat.name}"`);
    }
  };

  const handleSubcategoryClick = (sub: Category) => {
    setSubCategory(sub.slug, sub.name);
    setSelectedCategoryFields(sub.fields);
    setStep(2);
  };

  return (
    <div className="form_block">
      {/* BODY */}
      <div className={style.category_wrapper}>
        {!hasFields
          ? categoriesData.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryClick(cat)}
                className="tag_button"
              >
                {cat.name}
              </button>
            ))
          : subcategories.length > 0 && (
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
    </div>
  );
}
