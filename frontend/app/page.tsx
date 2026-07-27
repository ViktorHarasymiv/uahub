import Hero from "./components/Hero/Hero";
import PopularCategory from "./components/PopularCategory/PopularCategory";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="main_inside">
        <PopularCategory />
      </div>
    </>
  );
}
