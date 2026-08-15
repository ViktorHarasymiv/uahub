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

export default function PromoteSwiper({ date }) {
  return (
    <Swiper
      slidesPerView={4}
      grid={{
        rows: 2,
      }}
      spaceBetween={30}
      modules={[Grid, Navigation]}
      navigation={true}
      className={style.slider}
    >
      {date.map((item) => (
        <SwiperSlide key={item._id}>
          <PromoteItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
