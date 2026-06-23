"use client";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import style from "./Style.module.css";

const Top = () => {
  return (
    <div className={`${style.top_wrapper} top_header`}>
      <LangSwitcher />
    </div>
  );
};

export default Top;
