"use client";

import Link from "next/link";
import style from "./Style.module.css";

import { useAuthStore } from "@/app/store/useAuthState";
import { usePathname } from "next/navigation";
import { useI18nStore } from "@/app/store/i18nStore";

import AccountNav_PL from "@/app/json/AccountNav_PL";
import AccountNav_EN from "@/app/json/AccountNav_EN";
import AccountNav_UA from "@/app/json/AccountNav_UA";

import { Icons } from "@/app/ui/Icons/icons";

type AsideNavProps = {
  styles?: object;
};

export default function AsideNav({ styles }: AsideNavProps) {
  const user = useAuthStore((s) => s.user);

  const pathname = usePathname();
  const locale = useI18nStore((s) => s.locale);

  let nav;

  switch (locale) {
    case "pl":
      nav = AccountNav_PL;
      break;
    case "en":
      nav = AccountNav_EN;
      break;
    default:
      nav = AccountNav_UA;
  }

  return (
    <aside className={style.aside_block} style={styles}>
      <div className={style.profile_pulpit_block}>
        <div className="avatar_block">
          {user?.photoUrl ? (
            <img
              src={`http://localhost:1997${user.photoUrl}`}
              className="avatar"
            />
          ) : (
            "A"
          )}
        </div>
        <div className={style.user_info}>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <p>{user?.email}</p>
        </div>
      </div>
      <nav className={style.nav_list}>
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
      </nav>
    </aside>
  );
}
