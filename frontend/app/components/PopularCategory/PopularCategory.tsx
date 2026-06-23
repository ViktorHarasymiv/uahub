"use client";

import style from "./Style.module.css";

import CategoryUA from "@/app/json/Categories_UA.json";
import CategoryPL from "@/app/json/Categories_PL.json";
import CategoryEN from "@/app/json/Categories_EN.json";

import Image from "next/image";
import Link from "next/link";
import { useI18nStore } from "@/app/store/i18nStore";

function PopularCategory() {
  const locale = useI18nStore((s) => s.locale);

  let category_list;

  switch (locale) {
    case "pl":
      category_list = CategoryPL;
      break;
    case "en":
      category_list = CategoryEN;
      break;
    default:
      category_list = CategoryUA;
  }

  return (
    <section id={style.popular}>
      <h2>Популярні категорії</h2>

      <ul className={style.list}>
        {category_list.map((cat) => (
          <li key={cat.id} className={style.item}>
            <Link href={`/category/${cat.slug}`}>
              <div
                className={style.icon_wrapper}
                style={{ backgroundColor: cat.background }}
              >
                <Image
                  src={`/icons/${cat.icon}.png`}
                  alt={cat.name}
                  className={style.icon}
                  width={32}
                  height={32}
                />
              </div>
              <p className={style.title}>{cat.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PopularCategory;
