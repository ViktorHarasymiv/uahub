import { create } from "zustand";

type ModalType = "signIn" | "signUp" | "filters" | null;

interface ModalState {
  open: boolean;
  type: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  type: null,

  openModal: (type) => set({ open: true, type }),
  closeModal: () => set({ open: false, type: null }),
}));
