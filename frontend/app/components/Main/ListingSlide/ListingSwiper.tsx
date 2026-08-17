// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import style from "../Style.module.css";
import { Listing } from "@/app/store/useListingStore";
import SlideCardItem from "../components/SlideCardItem/SlideCardItem";

type PromoteSwiperProps = {
  date: Listing[];
};

export default function ListingSwiper({ date }: PromoteSwiperProps) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
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
          <SlideCardItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
