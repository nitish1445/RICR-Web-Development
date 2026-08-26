import Hero from "../components/home/Hero";
import PopularRestaurants from "../components/home/PopularRestaurants";
import TrendingFood from "../components/home/HowItWorks";
import PartnerSection from "../components/home/PartnerSection";

const Home = () => {
  return (
    <>
      <Hero />
      <PopularRestaurants />
      <TrendingFood />
      <PartnerSection />
    </>
  );
};

export default Home;
