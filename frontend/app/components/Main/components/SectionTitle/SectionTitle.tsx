import Image from "next/image";

import style from "./Style.module.css";

type SectionTitleProps = {
  title: string;
  icons: string; // шлях до зображення або URL
};

export default function SectionTitle({ title, icons }: SectionTitleProps) {
  return (
    <div className={style.title_block}>
      <Image
        src={icons}
        alt=""
        width={58}
        height={58}
        className={style.categories_logo}
      />
      <h2 className={style.title}>{title}</h2>
    </div>
  );
}
