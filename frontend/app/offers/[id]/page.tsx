"use client";

import { use, useEffect } from "react";

import { useListingsStore } from "@/app/store/useListingStore";
import Loader from "@/app/ui/Loader/Loader";
import { incrementListingView } from "@/app/lib/api/api";

interface OfferPageProps {
  params: Promise<{ id: string }>;
}

export default function OfferPage({ params }: OfferPageProps) {
  const { id } = use(params);

  const { currentListing, getListingById, loading } = useListingsStore();

  useEffect(() => {
    getListingById(id);
    incrementListingView(id);
  }, [id]);

  if (loading || !currentListing) return <Loader />;

  console.log(currentListing);

  return (
    <section>
      <h1>{currentListing.fields?.title}</h1>
      <img src={`http://localhost:1997${currentListing.photos[0]}`} alt="" />
      {/* решта полів */}
    </section>
  );
}
