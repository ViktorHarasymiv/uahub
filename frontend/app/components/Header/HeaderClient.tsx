"use client";

import { useParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { useScrollDirection } from "@/app/hook/useScrollDirection";

import style from "./Style.module.css";
import logo from "@/public/logo.png";

import Navigation from "./Navigation";
import Action from "./Action";
import Top from "./Top";

export default function HeaderClient() {
  const direction = useScrollDirection();
  const { locale } = useParams();

  return (
    <header
      className={`${style.header} ${
        direction === "down" ? style.hide : style.show
      }`}
    >
      <Top />
      <div className={style.wrapper}>
        <Link href={`/${locale}`} className={style.root_link}>
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
    </header>
  );
}
