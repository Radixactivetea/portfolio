import HeroSection from "@/components/sections/HeroSection";
import ButtonArrowAnimate from "@/components/effects/ButtonArrowAnimate";
import ScrollFloat from "@/components/effects/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";

const Home = () => {
  return (
    <div className="flex flex-col gap-20 max-w-5xl w-full md:px-10 px-4 mx-auto">
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0}
      >
        <div className="flex flex-col gap-20 w-full">
          <HeroSection />
          <div className="mx-auto">
            <ButtonArrowAnimate string="About Me" />
          </div>
        </div>
      </AnimatedContent>

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
