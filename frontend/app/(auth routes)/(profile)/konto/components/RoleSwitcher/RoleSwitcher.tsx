"use client";

import Switcher from "@/app/ui/Switcher/Switcher";
import { useConfirmStore } from "@/app/store/useConfirmStore";
import { switchAccountType } from "@/app/lib/api/api";
import { useAuthStore } from "@/app/store/useAuthState";

interface RoleSwitcherProps {
  checked?: boolean;
  onChange: (value: boolean) => void;
}

export default function RoleSwitcher({ onChange }: RoleSwitcherProps) {
  const { user, fetchData } = useAuthStore();
  const { show } = useConfirmStore();

  const handleToggle = (value: boolean) => {
    console.log(value);

    show({
      title: "Potwierdź zmianę",
      description: "Czy na pewno chcesz zmienić ustawienie?",
      confirmText: "Potwierdź",
      cancelText: "Anuluj",
      onConfirm: () => {
        handleConfirm(value);
      },
    });
  };

  const handleConfirm = async (value: boolean) => {
    const newType = value ? "business" : "private";

    const updated = await switchAccountType(newType);

    if (updated) {
      onChange(value);
      fetchData();
    }
  };

  if (!user) return;

  return (
    <Switcher
      checked={user.accountType == "business"}
      onChange={handleToggle}
    />
  );
}
