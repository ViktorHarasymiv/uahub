// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import ListingItem from "./ListingItem";

import style from "./Style.module.css";

export default function ListingSwiper({ date }) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      className={style.slider}
    >
      {date.map((item) => (
        <SwiperSlide key={item._id}>
          <ListingItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
