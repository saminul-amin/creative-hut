import Banner from "../components/Banner";
import HowItWorks from "../components/HowItWorks";
import NewsLetter from "../components/NewsLetter";
import StatsCounter from "../components/StatsCounter";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedFreelancers from "./FeaturedFreelancers";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedFreelancers />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <StatsCounter />
      <NewsLetter />
    </div>
  );
}
