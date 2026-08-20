import { Listing } from "../store/useListingStore";
import ListingSlider from "./ListingSlider";
import styles from "./Style.module.css";

interface ListingCardProps {
  item: Listing;
}

export default function ListingCard({ item }: ListingCardProps) {
  return (
    <div className={styles.card}>
      {/* SLIDER */}
      <ListingSlider photos={item.photos} />

      {/* CONTENT */}
      <div className={styles.content}>
        <h3 className={styles.title}>{item.fields?.title}</h3>

        {item.fields?.price && (
          <p className={styles.price}>{item.fields.price} zł</p>
        )}

        {item.fields?.location && (
          <p className={styles.location}>{item.fields.location}</p>
        )}

        <p className={styles.category}>
          Категорія: {item.subCategory || item.category}
        </p>

        {/* Extra fields */}
        <div className={styles.extra}>
          {Object.entries(item.fields).map(([key, value]) => {
            if (["title", "location", "price"].includes(key)) return null;
            return (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            );
          })}
        </div>

        {/* Contact */}
        <div className={styles.contact}>
          <p>
            <strong>Контакт:</strong> {item.contact?.name || "—"}
          </p>
          <p>{item.contact?.phone}</p>
          <p>{item.contact?.email}</p>
        </div>
      </div>
    </div>
  );
}
