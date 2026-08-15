import Hero from "./components/Hero/Hero";
import ListingSlide from "./components/Main/ListingSlide/ListingSlide";
import PromoteSlide from "./components/Main/PromoteSlide/PromoteSlide";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="main_inside">
        <PromoteSlide />
        <ListingSlide />
      </div>
    </>
  );
}
