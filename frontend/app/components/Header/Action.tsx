import { useState } from "react";
import Link from "next/link";

import Button from "@/app/ui/Button/Button";
import style from "./Style.module.css";

import { useI18n } from "@/app/i18n/useI18n";

import { useModalStore } from "@/app/store/useModalStore";
import { useAuthStore } from "@/app/store/useAuthState";

// ICONS

import { Icons } from "@/app/ui/Icons/icons";
import DropNavigation from "./components/DropNavigation/DropNavigation";

function Action() {
  const { messages } = useI18n();

  const openModal = useModalStore((s) => s.openModal);

  const isAuth = useAuthStore((s) => s.isAuth);

  const user = useAuthStore((s) => s.user);

  const [dropUp, setDropUp] = useState(false);

  const firstLetter = (user?.lastName || "").slice(0, 1) + ".";
  const userId = (user?._id || "").slice(0, 8);

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
            <DropNavigation user={user} />
          </li>
          {/* DECOR */}
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
          {/* SIGN IN */}
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
          {/* SIGN UP */}
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
