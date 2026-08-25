import Link from "next/link";

import { usePathname } from "next/navigation";
import { useI18nStore } from "@/app/store/i18nStore";
import AccountNav_PL from "@/app/json/AccountNav_PL";
import AccountNav_EN from "@/app/json/AccountNav_EN";
import AccountNav_UA from "@/app/json/AccountNav_UA";

import { Icons } from "@/app/ui/Icons/icons";

import AccountNavBusiness_PL from "@/app/json/AccountNavBusiness_PL";
import AccountNavBusiness_EN from "@/app/json/AccountNavBusiness_EN";
import AccountNavBusiness_UA from "@/app/json/AccountNavBusiness_UA";
import { User } from "@/app/types/auth";

import style from "./Style.module.css";

interface componentsProps {
  user: User | null;
}

export default function DynamicLinksSetup({ user }: componentsProps) {
  const pathname = usePathname();
  const locale = useI18nStore((s) => s.locale);

  let nav;
  const isBusiness = user?.accountType === "business";

  switch (locale) {
    case "pl":
      nav = isBusiness ? AccountNavBusiness_PL : AccountNav_PL;
      break;
    case "en":
      nav = isBusiness ? AccountNavBusiness_EN : AccountNav_EN;
      break;
    default:
      nav = isBusiness ? AccountNavBusiness_UA : AccountNav_UA;
  }
  return (
    <nav className={style.nav_list}>
      {/* MY PANEL */}
      <Link
        href={"/konto"}
        className={`${style.link}
                  ${pathname === "/konto" ? "active_link" : ""}
                `}
      >
        <Icons.home />
        Панель користувача
      </Link>
      {/* DYNAMIC LINKS */}
      {nav.map((item) => {
        const Icon = Icons[item.icon];

        const active =
          item.href === "/profile"
            ? pathname === "/profile"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${style.link}
                ${active ? "active_link" : ""}
              `}
          >
            <Icon className="icon" />
            {item.label}
          </Link>
        );
      })}
      {/* SETUP */}
      <Link
        href={"/konto/ustawienia"}
        className={`${style.link}
                  ${pathname === "/konto/ustawienia" ? "active_link" : ""}
                `}
      >
        <Icons.settings />
        Налаштування акаунта
      </Link>
    </nav>
  );
}
