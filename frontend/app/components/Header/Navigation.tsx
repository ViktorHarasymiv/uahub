import Link from "next/link";

import Navigation_UA from "@/app/json/Navigation_UA.json";
import Navigation_EN from "@/app/json/Navigation_EN.json";
import Navigation_PL from "@/app/json/Navigation_PL.json";

import style from "./Style.module.css";
import { NavItem } from "@/app/types/navigation";
import { useI18nStore } from "@/app/store/i18nStore";

function Navigation() {
  const locale = useI18nStore((s) => s.locale);

  let navigation_list: NavItem[];

  switch (locale) {
    case "pl":
      navigation_list = Navigation_PL;
      break;
    case "en":
      navigation_list = Navigation_EN;
      break;
    default:
      navigation_list = Navigation_UA;
  }

  return (
    <nav className={style.nav_wrapper}>
      <ul className={style.nav_list}>
        {navigation_list.map((item) => {
          return (
            <li key={item.id} className={style.nav_item}>
              <Link href={`${item.path}`}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
