"use client";
import footerSections from "@/app/json/Footer/Navigation.json";
import style from "./Style.module.css";

import Link from "next/link";

function Footer() {
  return (
    <footer>
      <nav className={style.footer_nav}>
        {footerSections.map((section) => (
          <div key={section.title} className={style.nav_wrapper}>
            <h4 className={style.title}>{section.title}</h4>
            <ul className={style.nav_list}>
              {section.items.map((item) => (
                <li key={item}>
                  <Link href={item} className={style.link}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </footer>
  );
}

export default Footer;
