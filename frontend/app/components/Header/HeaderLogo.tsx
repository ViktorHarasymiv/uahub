import style from "./Style.module.css";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png";

export default function HeaderLogo() {
  return (
    <Link href="/" className={style.root_link}>
      <Image
        src={logo}
        alt="Дошка оголошень - Варшава"
        className="logo"
        title="Дошка оголошень - Варшава"
      />
    </Link>
  );
}
