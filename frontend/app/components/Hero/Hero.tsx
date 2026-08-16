import Image from "next/image";

import style from "./Style.module.css";

import Baner from "@/public/image/new_banner_desktop_2x.webp";

export default function Hero() {
  return (
    <div className="container">
      <section className={style.hero_section}>
        <h1 className={style.hero_title}>
          Znajdź wymarzoną pracę dla siebie <br />
          <span className="accent">88 061</span> ofert pracy od najlepszych
          pracodawców
        </h1>
        <div className={style.hero_baner}>
          <Image src={Baner} alt="Baner" className={style.baner_image} />
        </div>
      </section>
    </div>
  );
}
