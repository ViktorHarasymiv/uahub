// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import style from "./Style.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

// import required modules
import { Grid, Navigation } from "swiper/modules";
import PromoteItem from "./PromoteItem";
import { Listing } from "@/app/store/useListingStore";

type PromoteSwiperProps = {
  date: Listing[];
};

export default function PromoteSwiper({ date }: PromoteSwiperProps) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      grid={{
        rows: 2,
      }}
      modules={[Grid, Navigation]}
      navigation={true}
      className={style.slider}
      breakpoints={{
        320: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },

        768: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 30,
        },
      }}
    >
      {date.map((item) => (
        <SwiperSlide key={item._id}>
          <PromoteItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
