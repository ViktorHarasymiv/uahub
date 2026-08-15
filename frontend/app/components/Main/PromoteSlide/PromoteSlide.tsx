"use client";

import SectionTitle from "../components/SectionTitle/SectionTitle";
import { useI18n } from "@/app/i18n/useI18n";
import { useListingsStore } from "@/app/store/useListingStore";

import Icon from "@/public/icons/categories/promote.png";
import PromoteSwiper from "./PromoteSwiper";
export default function PromoteSlide() {
  const { messages } = useI18n();

  const { listings } = useListingsStore();
  return (
    <section>
      <div className="container">
        <SectionTitle title={messages["section.promote"]} icons={Icon.src} />
        <PromoteSwiper date={listings} />
      </div>
    </section>
  );
}
