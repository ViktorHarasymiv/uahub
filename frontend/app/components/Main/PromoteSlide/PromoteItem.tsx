import style from "./Style.module.css";

import Banner from "@/public/image/offerzone.webp";

export default function PromoteItem({ item }: any) {
  const photo = item.photos?.[0]
    ? `http://localhost:1997${item.photos[0]}`
    : Banner.src;

  return (
    <div className={style.card}>
      <div className={style.imageWrapper}>
        <img src={photo} alt={item.fields.title} />
      </div>

      <div className={style.content}>
        <h3 className={style.title}>{item.fields.title}</h3>

        {item.price && <p className={style.price}>{item.price} zł</p>}

        <p className={style.location}>{item.fields.location}</p>
      </div>
    </div>
  );
}
