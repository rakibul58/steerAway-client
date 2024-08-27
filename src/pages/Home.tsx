import Featured from "@/components/Home/Featured";
import Hero from "@/components/Home/Hero";
import Testimonials from "@/components/Home/Testimonials";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;