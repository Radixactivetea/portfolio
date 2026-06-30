import HeroSection from "@/components/layout/HeroSection";
import ButtonArrowAnimate from "@/components/layout/ButtonArrowAnimate";

const Home = () => {
  return (
    <div className="flex flex-col gap-20 max-w-5xl w-full md:px-10 px-4 mx-auto">
      <HeroSection />

      <div className="mx-auto">
        <ButtonArrowAnimate string="About Me" />
      </div>
    </div>
  );
};

export default Home;
