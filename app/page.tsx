import HeroSection from "@/components/layout/HeroSection";
import ButtonArrowAnimate from "@/components/layout/ButtonArrowAnimate";
import ScrollFloat from "@/components/layout/ScrollFloat";

const Home = () => {
  return (
    <div className="flex flex-col gap-20 max-w-5xl w-full md:px-10 px-4 mx-auto">
      <HeroSection />

      <div className="mx-auto">
        <ButtonArrowAnimate string="About Me" />
      </div>

      <div className="h-100"></div>

      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
      >
        React Bits
      </ScrollFloat>
    </div>
  );
};

export default Home;
