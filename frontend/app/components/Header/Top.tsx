"use client";

import { useLocationStore } from "@/app/store/useLocationStore";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import style from "./Style.module.css";
import { Icons } from "@/app/ui/Icons/icons";

const Top = () => {
  const { location } = useLocationStore();
  return (
    <div className={`${style.top_wrapper} top_header`}>
      <div className={style.top_link_wrapper}>
        <ul className={style.top_link_list}>
          {location && (
            <li>
              <Icons.location />
              {location}
            </li>
          )}
        </ul>
      </div>
      <LangSwitcher />
    </div>
  );
};

export default Top;
