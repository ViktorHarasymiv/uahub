import { create } from "zustand";

interface ConfirmConfig {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  open?: boolean;
  onConfirm: () => void;
}

interface ConfirmState {
  open: boolean;
  config: ConfirmConfig | null;
  show: (config: ConfirmConfig) => void;
  hide: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  open: false,
  config: null,

  show: (config) => {
    document.body.style.overflow = "hidden";
    set({ open: true, config });
  },

  hide: () => {
    document.body.style.overflow = "";
    set({ open: false, config: null });
  },
}));
