
import HeroSection from "../../pages/Home/HeroSection";
import FeaturedEvents from "../../pages/Home/FeaturedEvents";
import Categories from "../../pages/Home/Categories";
import WhyCampusFest from "../../components/sections/home/WhyCampusFest";
import Testimonials from "../../pages/Home/Testimonials";
import CTASection from "../../components/sections/home/CTASection";

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedEvents />
      <Categories />
      <WhyCampusFest />
      <Testimonials />
      <CTASection />
    </>
  );
}

export default Home;