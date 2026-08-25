"use client";

import { useAuthStore } from "@/app/store/useAuthState";

import style from "./Style.module.css";
import GreetingBlock from "@/app/components/Profile/GreetingBlock/GreetingBlock";

export default function Profile() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className={style.main}>
      <GreetingBlock
        title={"Dzień dobry!"}
        subTitle={"Sprawdź, co dzisiaj dla Ciebie przygotowaliśmy."}
      />
      <div className={style.user_info_block}>{user?.email}</div>
    </div>
  );
}
