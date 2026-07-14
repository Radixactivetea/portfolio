import HeroSection from "@/components/sections/HeroSection";
import ButtonArrowAnimate from "@/components/effects/ButtonArrowAnimate";
import ScrollFloat from "@/components/effects/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import Carousel from "@/components/ui/Carousel ";
import AboutPreview from "@/components/sections/AboutPreview";

const featureProjects = [
  {
    src: "https://picsum.photos/1024/576",
    alt: "Starlight AR Shop",
    title: "Starlight Pottery AR Store",
    description: "Starlight AR Shop integrates a simple AR feature for specific products, allowing users to visualize them in real-world environments.",
    link: "/projects/mission-network",
  },
  {
    src: "https://picsum.photos/1024/576",
    alt: "Portfolio site",
    title: "Portfolio Site",
    description: "A Next.js portfolio with GSAP-driven entrance sequences and asset-based loading.",
  }
]

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
        <div className="flex flex-col gap-20 w-full items-center">
          <HeroSection />

          <ButtonArrowAnimate string="About Me" />

          <Carousel
            className="max-w-5xl mx-auto"
            items={featureProjects}
          />
        </div>
      </AnimatedContent>

      <AboutPreview />


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
