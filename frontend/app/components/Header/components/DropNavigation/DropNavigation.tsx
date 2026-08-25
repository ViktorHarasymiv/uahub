import Link from "next/link";

import style from "../../Style.module.css";

import { useConfirmStore } from "@/app/store/useConfirmStore";
import { useI18n } from "@/app/i18n/useI18n";
import { useAuthStore } from "@/app/store/useAuthState";
import { Icons } from "@/app/ui/Icons/icons";
import { User } from "@/app/types/auth";
import DynamicLinksSetup from "@/app/components/DynamicLinksSetup/DynamicLinksSetup";

interface DropNavigationProps {
  user: User | null;
}

export default function DropNavigation({ user }: DropNavigationProps) {
  const { messages } = useI18n();
  const logOut = useAuthStore((s) => s.logout);

  if (!user) return null;

  return (
    <nav className={style.drop_user_nav}>
      <ul className={style.drop_user_list}>
        <DynamicLinksSetup user={user} />
        <li className={style.drop_logout_block}>
          <Icons.logout />
          <button
            onClick={() =>
              useConfirmStore.getState().show({
                description: messages["confirm.description.account"],
                onConfirm: logOut,
              })
            }
          >
            Вийти з системи
          </button>
        </li>
      </ul>
    </nav>
  );
}
