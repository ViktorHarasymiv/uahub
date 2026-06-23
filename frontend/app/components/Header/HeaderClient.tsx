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

export default function HeaderClient() {
  const direction = useScrollDirection();

  const device = useWindowWidth();

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
          <ul className={style.mobile_nav_list}>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Seurch</a>
            </li>
            <li>
              <a href="">Ofers</a>
            </li>
            <li>
              <a href="">Konto</a>
            </li>
            <li>
              <a href="">Menu</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
