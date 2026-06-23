import Button from "@/app/ui/Button/Button";

import style from "./Style.module.css";

import { GrWorkshop } from "react-icons/gr";
import { useI18n } from "@/app/i18n/useI18n";

import { useModalStore } from "@/app/store/useModalStore";
import { useAuthStore } from "@/app/store/useAuthState";

function Action() {
  const { messages } = useI18n();

  const openModal = useModalStore((s) => s.openModal);

  const isAuth = useAuthStore((s) => s.isAuth);
  const user = useAuthStore((s) => s.user);

  return (
    <>
      {isAuth ? (
        <ul className={style.action_wrapper}>
          <li>{user?.email}</li>
          <li>
            <Button accent={true}>
              <GrWorkshop />
              {messages["navigation.add"]}
            </Button>
          </li>
          <li>
            <span className={style.line}></span>
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
