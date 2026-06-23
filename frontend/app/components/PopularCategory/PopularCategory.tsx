"use client";

import { useParams } from "next/navigation";
import style from "./Style.module.css";

import CategoryUA from "@/app/json/Categories_UA.json";
import CategoryPL from "@/app/json/Categories_PL.json";

import Image from "next/image";
import Link from "next/link";

function PopularCategory() {
  const { locale } = useParams();

  const categories = locale === "pl" ? CategoryPL : CategoryUA;

  return (
    <section id={style.popular}>
      <h2>Популярні категорії</h2>

      <ul className={style.list}>
        {categories.map((cat) => (
          <li key={cat.id} className={style.item}>
            <Link href={`/${locale}/category/${cat.slug}`}>
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
