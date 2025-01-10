import BestValue from "@/components/Home/BestValue";
import Featured from "@/components/Home/Featured";
import Hero from "@/components/Home/Hero";
import Newsletter from "@/components/Home/Newsletter";
import Testimonials from "@/components/Home/Testimonials";
import TopRated from "@/components/Home/TopRated";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Featured />
      <Newsletter />
      <TopRated />
      <BestValue />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;