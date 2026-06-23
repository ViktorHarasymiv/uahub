"use client";

import Image from "next/image";
import Link from "next/link";

import { useScrollDirection } from "@/app/hook/useScrollDirection";

import style from "./Style.module.css";
import logo from "@/public/logo.png";

import Navigation from "./Navigation";
import Action from "./Action";
import Top from "./Top";

import { useWindowWidth } from "../../hook/useWindowWidth";
import { useModalStore } from "@/app/store/modalStore";

export default function HeaderClient() {
  const direction = useScrollDirection();
  const device = useWindowWidth();

  const open = useModalStore((s) => s.open);

  return (
    <header
      className={`${device > 768 ? style.header : style.header_mobile} ${
        direction === "down" ? style.hide : style.show
      }`}
    >
      {device > 768 ? (
        <>
          <Top />
          <div className={style.wrapper}>
            <Link href="/" className={style.root_link}>
              <Image
                src={logo}
                alt="Дошка оголошень - Варшава"
                className="logo"
                title="Дошка оголошень - Варшава"
              />
            </Link>
            <div className={style.navigation_wrapper}>
              <Navigation />
              <Action />
            </div>
          </div>
        </>
      ) : (
        <nav className={style.mobile_nav}>
          <div className={style.mobile_nav_list}>
            <button onClick={() => open("home")}>Home</button>
            <button onClick={() => open("search")}>Search</button>
            <button onClick={() => open("offers")}>Offers</button>
            <button onClick={() => open("account")}>Account</button>
          </div>
        </nav>
      )}
    </header>
  );
}
