// store/modalStore.ts
import { create } from "zustand";

type Modal = "home" | "offers" | "account" | "menu" | null;

interface ModalState {
  modal: Modal;
  open: (m: Modal) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modal: null,
  open: (m) => set({ modal: m }),
  close: () => set({ modal: null }),
}));
