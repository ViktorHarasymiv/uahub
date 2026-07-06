import { useI18n } from "@/app/i18n/useI18n";
import { useModalStore } from "@/app/store/useModalStore";

import style from "../../../components/Header/Style.module.css";

import Button from "../../Button/Button";
import { useAuthStore } from "@/app/store/useAuthState";
import AsideNav from "@/app/components/Profile/AsideNav/AsideNav";

export default function Account() {
  const { messages } = useI18n();

  const openModal = useModalStore((s) => s.openModal);

  const isAuth = useAuthStore((s) => s.isAuth);

  const inlineStyle = {
    maxWidth: "100%",
    boxShadow: "none",
  };

  return (
    <>
      {isAuth ? (
        <AsideNav styles={inlineStyle} />
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
