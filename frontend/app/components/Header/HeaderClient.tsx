"use client";

import { useScrollDirection } from "@/app/hook/useScrollDirection";

import style from "./Style.module.css";

import Navigation from "./Navigation";
import Action from "./Action";
import Top from "./Top";

import { useWindowWidth } from "../../hook/useWindowWidth";
import MobileNavigation from "./MobileNavigation";
import HeaderLogo from "./HeaderLogo";

export default function HeaderClient() {
  const direction = useScrollDirection();
  const device = useWindowWidth();

  return (
    <>
      {device > 768 ? (
        <header
          className={`${style.header} ${direction === "down" ? style.hide : style.show}`}
        >
          <Top />
          <div className={style.wrapper}>
            <HeaderLogo />
            <div className={style.navigation_wrapper}>
              <Navigation />
              <Action />
            </div>
          </div>
        </header>
      ) : (
        <MobileNavigation />
      )}
    </>
  );
}
