import style from "./Style.module.css";

import Banner from "@/public/image/offerzone.webp";

export default function ListingItem({ item }: any) {
  const photo = item.photos?.[0]
    ? `http://localhost:1997${item.photos[0]}`
    : Banner.src;

  return (
    <div className={style.card}>
      <img className={style.image_board} src={photo} alt={item.fields.title} />
      <h3>{item.fields.title}</h3>
      <p>{item.fields.location}</p>
    </div>
  );
}
