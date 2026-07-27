import toast from "react-hot-toast";

import { createListing } from "@/app/lib/api/api";
import { useQuickAdStore } from "@/app/store/useQuickAdStore";
import Button from "@/app/ui/Button/Button";

export default function StepConfirm() {
  const {
    category,
    categoryName,
    subCategory,
    subCategoryName,
    fields,
    photos,
    contact,
    resetForm,
  } = useQuickAdStore();

  const handleSubmit = async () => {
    const formData = new FormData();

    if (category !== null) {
      formData.append("category", category);
    }

    if (subCategory !== null) {
      formData.append("subCategory", subCategory);
    }

    // contact — тут важливо, щоб у типах не було undefined
    if (contact.name) {
      formData.append("contact[name]", contact.name);
    }

    if (contact.phone) {
      formData.append("contact[phone]", contact.phone);
    }

    if (contact.email) {
      formData.append("contact[email]", contact.email);
    }

    // fields: Record<string, string | null | undefined>
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(`fields[${key}]`, String(value));
      }
    });

    // photos: (File | null | undefined)[]
    photos.forEach((file) => {
      if (file) {
        formData.append("photos", file);
      }
    });

    const res = await createListing(formData);

    if (res.status === 201) {
      toast.success("Оголошення успішно створено!");
      resetForm();
      // redirect...
    }
  };

  return (
    <div className="form_block">
      {/* BODY */}
      <div className="p-4 mt-6 bg-gray-100 rounded-lg border border-gray-300">
        {/* CATEGORY */}
        <div className="mb-4">
          <h4 className="font-medium">Категорія</h4>
          <p>
            Категорія: <strong>{categoryName || "—"}</strong>
          </p>
          <p>
            Ссилка: <strong>{category || "—"}</strong>
          </p>
        </div>

        {/* SUBCATEGORY */}
        <div className="mb-4">
          <h4 className="font-medium">Підкатегорія</h4>
          <p>
            Підкатегорія: <strong>{subCategoryName || "—"}</strong>
          </p>
          <p>
            Ссилка: <strong>{subCategory || "—"}</strong>
          </p>
        </div>

        {/* FIELDS */}
        <div className="mb-4">
          <h4 className="font-medium">Поля</h4>
          {Object.keys(fields).length === 0 ? (
            <p>—</p>
          ) : (
            <ul className="list-disc ml-5">
              {Object.entries(fields).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* PHOTOS */}
        <div className="mb-4">
          <h4 className="font-medium">Фото</h4>
          <p>
            Заповнено слотів:{" "}
            <strong>
              {photos.filter((p) => p !== null).length} / {photos.length}
            </strong>
          </p>

          <ul className="list-disc ml-5">
            {photos.map((p, i) => (
              <li key={i}>
                Слот {i + 1}: {p ? "Фото додано" : "Порожній"}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="mb-4">
          <h4 className="font-medium">Контакт</h4>
          <ul className="list-disc ml-5">
            <li>
              <strong>Імʼя:</strong> {contact.name || "—"}
            </li>
            <li>
              <strong>Телефон:</strong> {contact.phone || "—"}
            </li>
            <li>
              <strong>Email:</strong> {contact.email || "—"}
            </li>
          </ul>
        </div>
      </div>

      <Button action={handleSubmit} accent={true}>
        Опублікувати
      </Button>
    </div>
  );
}
