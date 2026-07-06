import Link from "next/link";

import Button from "@/app/ui/Button/Button";
import style from "./Style.module.css";

import { useI18n } from "@/app/i18n/useI18n";

import { useModalStore } from "@/app/store/useModalStore";
import { useAuthStore } from "@/app/store/useAuthState";

// ICONS

import { Icons } from "@/app/ui/Icons/icons";

function Action() {
  const { messages } = useI18n();

  const openModal = useModalStore((s) => s.openModal);

  const isAuth = useAuthStore((s) => s.isAuth);
  const logOut = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <>
      {isAuth ? (
        <ul className={style.action_wrapper}>
          <li className={style.user_block}>
            <Icons.user />
            <span>{user?.email}</span>

            {/* DROP NAVIGATION */}
            <div className={style.drop_user_nav}>
              <ul className={style.drop_user_list}>
                <li className={style.user_item}>{user?.email}</li>
                <li>
                  <Link href="/profile">Мій кабінет</Link>
                </li>
                <li>
                  <Icons.logout style={{ color: "var(--dark)" }} />
                  <Button action={logOut}>Вихід</Button>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <span className={style.line}></span>
          </li>
          <li>
            <Button accent={true}>
              <Icons.listing />
              {messages["navigation.add"]}
            </Button>
          </li>
          {/* <li>
            <Button
              styles={{
                backgroundColor: "transparent",
                color: "var(--white)",
              }}
              accent={true}
            >
              <GrWorkshop /> {messages["navigation.bisnes"]}
            </Button>
          </li> */}
        </ul>
      ) : (
        <ul className={style.action_wrapper}>
          <li className={style.nav_item}>
            <Button
              styles={{
                backgroundColor: "transparent",
                color: "var(--white)",
              }}
              accent={true}
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
            <Button accent={true} action={() => openModal("signUp")}>
              <span>{messages["navigation.signUp"]}</span>
            </Button>
          </li>
        </ul>
      )}
    </>
  );
}

export default Action;
