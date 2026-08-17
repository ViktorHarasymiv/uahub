import { AdSlot } from "../components/Ads/AdSlot";
import { FeaturedListings } from "../components/Ads/FeaturedListings";
import { PromoBanner } from "../components/Ads/PromoBanner";

import style from "./Style.module.css";

export default function RightSidebar() {
  return (
    <div className={style.sidebar}>
      <AdSlot />
      <AdSlot />
      <FeaturedListings />
      <PromoBanner />
    </div>
  );
}
