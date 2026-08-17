import { getAllListings } from "../lib/api/api";
import Loader from "../ui/Loader/Loader";
import ListingCard from "./ListingCard";

import style from "./Style.module.css";

export default async function ListingsPage() {
  const listings = await getAllListings();

  if (!listings) return <Loader />;

  return (
    <div className={style.wrapper}>
      {listings.map((item: any) => (
        <ListingCard key={item._id} item={item} />
      ))}
    </div>
  );
}
