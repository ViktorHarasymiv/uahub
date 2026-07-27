import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FieldValue = string | number | boolean | null;
export type FieldsMap = Record<string, FieldValue>;

export interface ContactInfo {
  name?: string;
  phone?: string;
  email?: string;
}

export interface QuickAdState {
  step: number;

  category: string | null;
  categoryName: string | null; // ← додано

  subCategory: string | null;
  subCategoryName: string | null; // ← додано

  fields: FieldsMap;
  photos: Array<File | null>;
  contact: ContactInfo;
  draftId: string | null;

  setStep: (step: number) => void;
  setCategory: (slug: string, name: string) => void; // ← оновлено
  setSubCategory: (slug: string | null, name: string | null) => void; // ← оновлено
  updateField: (name: string, value: FieldValue) => void;

  addPhotoToSlot: (slotIndex: number, file: File) => void;
  removePhotoFromSlot: (slotIndex: number) => void;
  swapPhotos: (from: number, to: number) => void;

  updateContact: (data: Partial<ContactInfo>) => void;
  resetForm: () => void;
}

export const useQuickAdStore = create<QuickAdState>()(
  persist(
    (set) => ({
      step: 1,

      category: null,
      categoryName: null,

      subCategory: null,
      subCategoryName: null,

      fields: {},
      photos: [null, null, null, null, null, null, null, null],

      contact: {
        name: "",
        phone: "",
        email: "",
      },

      draftId: null,

      setStep: (step) => set({ step }),

      setCategory: (slug, name) =>
        set((state) => {
          // Якщо категорія змінилась → очищаємо форму
          if (state.category && state.category !== slug) {
            return {
              category: slug,
              categoryName: name,

              subCategory: null,
              subCategoryName: null,

              step: 2,
              fields: {},
              photos: [null, null, null, null, null, null],
              contact: {},
            };
          }

          return {
            category: slug,
            categoryName: name,
            step: 2,
          };
        }),

      setSubCategory: (slug, name) =>
        set((state) => {
          // Якщо підкатегорія змінилась → очищаємо форму
          if (state.subCategory && state.subCategory !== slug) {
            return {
              subCategory: slug,
              subCategoryName: name,

              step: 2,
              fields: {},
              photos: [null, null, null, null, null, null],
              contact: {},
            };
          }

          return {
            subCategory: slug,
            subCategoryName: name,
            step: 2,
          };
        }),

      updateField: (name, value) =>
        set((state) => ({
          fields: { ...state.fields, [name]: value },
        })),

      addPhotoToSlot: (slotIndex, file) =>
        set((state) => {
          const updated = [...state.photos];
          updated[slotIndex] = file;
          return { photos: updated };
        }),

      removePhotoFromSlot: (slotIndex) =>
        set((state) => {
          const updated = [...state.photos];
          updated[slotIndex] = null;
          return { photos: updated };
        }),

      swapPhotos: (from, to) =>
        set((state) => {
          const updated = [...state.photos];
          const temp = updated[from];
          updated[from] = updated[to];
          updated[to] = temp;
          return { photos: updated };
        }),

      updateContact: (data) =>
        set((state) => ({
          contact: { ...state.contact, ...data },
        })),

      resetForm: () =>
        set(() => {
          localStorage.removeItem("quick-ad-draft");

          return {
            step: 1,
            category: null,
            categoryName: null,

            subCategory: null,
            subCategoryName: null,

            fields: {},
            photos: [null, null, null, null, null, null],
            contact: {},
            draftId: null,
          };
        }),
    }),
    {
      name: "quick-ad-draft",

      partialize: (state) => ({
        step: state.step,
        category: state.category,
        categoryName: state.categoryName,

        subCategory: state.subCategory,
        subCategoryName: state.subCategoryName,

        fields: state.fields,
        contact: state.contact,
        draftId: state.draftId,
      }),
    },
  ),
);
