"use client";
import { useListingsStore } from "@/app/store/useListingStore";
import SectionTitle from "../components/SectionTitle/SectionTitle";

import Icon from "@/public/icons/categories/job-offer.png";
import { useI18n } from "@/app/i18n/useI18n";
import ListingSwiper from "./ListingSwiper";

export default function ListingSlide() {
  const { messages } = useI18n();

  const { listings } = useListingsStore();

  return (
    <section>
      <div className="container">
        <SectionTitle title={messages["section.title"]} icons={Icon.src} />
        <ListingSwiper date={listings} />
      </div>
    </section>
  );
}
