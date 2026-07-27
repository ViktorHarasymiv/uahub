"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import style from "./Style.module.css";

interface ListingSliderProps {
  photos: string[];
}

export default function ListingSlider({ photos }: ListingSliderProps) {
  if (!photos || photos.length === 0) {
    return <div className={style.noImage}>Немає фото</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      className={style.slider}
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index}>
          <img
            src={`http://localhost:1997${photo}`}
            alt={`photo ${index + 1}`}
            className={style.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
