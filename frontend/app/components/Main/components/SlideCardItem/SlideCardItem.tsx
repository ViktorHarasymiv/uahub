import { Listing } from "@/app/store/useListingStore";
import style from "./Style.module.css";

import Link from "next/link";

import Banner from "@/public/image/offerzone.webp";
import { Icons } from "@/app/ui/Icons/icons";
import { useI18n } from "@/app/i18n/useI18n";
import { formatDateTime } from "@/app/config/formatDateTime";
import { formatJobSalary } from "@/app/config/formatJobSalary";

import ComAvatar from "@/public/com_avatar.png";

type PromoteSwiperProps = {
  item: Listing;
};

export default function SlideCardItem({ item }: PromoteSwiperProps) {
  const { messages } = useI18n();

  const photo = item.photos?.[0]
    ? `http://localhost:1997${item.photos[0]}`
    : Banner.src;

  const { date } = formatDateTime("2026-07-26T20:24:12.090+00:00");
  const formattedSalary = formatJobSalary(item.fields);

  return (
    <Link href={`/offers/${item._id}`} className={style.card}>
      <div className={style.imageWrapper}>
        <img src={photo} alt={item.fields.title} />
      </div>

      <div className={style.content}>
        <div className={style.top_card_path}>
          <div className={style.company_logo_block}>
            <img
              src={ComAvatar.src}
              alt="company logo"
              width={65}
              height={65}
              className={style.company_logo}
            />
          </div>
          <h3 className={style.title}>{item.fields.title}</h3>
          <p className={style.price}>{formattedSalary}</p>
        </div>

        <div className={style.info_block}>
          <div className={style.location}>
            <Icons.location />
            {item.fields.location}
          </div>

          <div className={style.time_block}>
            <div>
              <Icons.time />
              <span className={style.time_title}>{messages["card.time"]}</span>
              <span>{date}</span>
            </div>
            <div>
              <Icons.view />
              View
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
