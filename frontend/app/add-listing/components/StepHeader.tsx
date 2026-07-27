import { useQuickAdStore } from "@/app/store/useQuickAdStore";
import { Icons } from "@/app/ui/Icons/icons";

import style from "./Style.module.css";

export default function StepHeader() {
  const { step, categoryName, subCategoryName } = useQuickAdStore();

  const titles: Record<number, string> = {
    1: "Виберіть категорію",
    2: "Основна інформація",
    3: "Додайте фото",
    4: "Контактна інформація",
    5: "Підтвердження оголошення",
  };
  return (
    <div className={style.step_header}>
      <h3>{titles[step]}</h3>
      {categoryName && (
        <h4 className={style.clumb}>
          Ваш вибір: {categoryName}
          {subCategoryName && (
            <>
              <Icons.moveRight style={{ marginRight: 0 }} /> {subCategoryName}
            </>
          )}
        </h4>
      )}
    </div>
  );
}
