import Link from "next/link";

import Button from "@/app/ui/Button/Button";
import style from "./Style.module.css";

import { useI18n } from "@/app/i18n/useI18n";

import { useModalStore } from "@/app/store/useModalStore";
import { useAuthStore } from "@/app/store/useAuthState";

// ICONS

import { Icons } from "@/app/ui/Icons/icons";
import { usePathname } from "next/navigation";
import { useI18nStore } from "@/app/store/i18nStore";
import AccountNav_PL from "@/app/json/AccountNav_PL";
import AccountNav_EN from "@/app/json/AccountNav_EN";
import AccountNav_UA from "@/app/json/AccountNav_UA";
import { useState } from "react";

function Action() {
  const { messages } = useI18n();

  const openModal = useModalStore((s) => s.openModal);

  const isAuth = useAuthStore((s) => s.isAuth);
  const logOut = useAuthStore((s) => s.logout);

  const user = useAuthStore((s) => s.user);

  const [dropUp, setDropUp] = useState(false);

  const firstLetter = (user?.lastName || "").slice(0, 1) + ".";
  const userId = (user?._id || "").slice(0, 8);

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
    <>
      {isAuth ? (
        <ul className={style.action_wrapper}>
          <li
            className={`${style.user_block} ${style.nav_item}`}
            onMouseEnter={() => setDropUp(true)}
            onMouseLeave={() => setDropUp(false)}
          >
            <div className={style.user_info}>
              {user?.photoUrl ? (
                <img
                  src={`http://localhost:1997${user?.photoUrl}`}
                  alt=""
                  className={style.avatar}
                />
              ) : (
                <Icons.user />
              )}

              <div className={style.user_name}>
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${firstLetter}`
                  : `User: ${userId}`}
              </div>

              {dropUp ? (
                <Icons.chevronUp
                  style={{
                    strokeWidth: "3px",
                    marginRight: "0px",
                  }}
                />
              ) : (
                <Icons.chevronDown
                  style={{ strokeWidth: "3px", marginRight: "0px" }}
                />
              )}
            </div>

            {/* DROP NAVIGATION */}
            <nav className={style.drop_user_nav}>
              <ul className={style.drop_user_list}>
                <li className={style.drop_user_block}>{user?.email}</li>
                <li className={style.drop_nav}>
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
                </li>
                <li className={style.drop_logout_block}>
                  <Icons.logout style={{ color: "var(--dark)" }} />
                  <button onClick={logOut} style={{ padding: "0px" }}>
                    Вихід
                  </button>
                </li>
              </ul>
            </nav>
          </li>
          <li>
            <span className={style.line}></span>
          </li>
          <li className={style.nav_item}>
            <Link href={"/add-listing"} className={style.user_link}>
              <Icons.listing />
              {messages["navigation.add"]}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={style.action_wrapper}>
          <li className={style.nav_item}>
            <Button
              styles={{
                backgroundColor: "transparent",
              }}
              action={() => openModal("signIn")}
            >
              <span>{messages["navigation.signIn"]}</span>
            </Button>
          </li>
          {/* DECOR */}
          <li>
            <span className={style.line}></span>
          </li>
          {/* DECOR */}
          <li className={style.nav_item}>
            <Button action={() => openModal("signUp")}>
              <span>{messages["navigation.signUp"]}</span>
            </Button>
          </li>
        </ul>
      )}
    </>
  );
}

export default Action;
