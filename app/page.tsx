import HeroSection from "@/components/sections/HeroSection";
import ButtonArrowAnimate from "@/components/effects/ButtonArrowAnimate";
import ScrollFloat from "@/components/effects/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import Carousel, { CarouselItem } from "@/components/ui/Carousel ";
import AboutPreview from "@/components/sections/AboutPreview";
import { projects, Project } from "@/data/projects";
import WhatIDo from "@/components/sections/WhatIDo";

const projectHref = (slug: string) => `/projects/${slug}`;

function toCarouselItems(projects: readonly Project[]): CarouselItem[] {
  return projects.map((project) => ({
    src: project.thumbnail,
    alt: project.name,
    title: project.name,
    description: project.shortDescription,
    link: projectHref(project.slug)
  }));
}

const Home = () => {
  return (
    <div className="flex flex-col gap-30 max-w-5xl w-full md:px-10 px-4 mx-auto">
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

          <ButtonArrowAnimate string="About Me" href="/about"/>

          <Carousel
            className="max-w-5xl mx-auto"
            items={toCarouselItems(projects)}
          />
        </div>
      </AnimatedContent>

      <AboutPreview />

      <WhatIDo />
    </div>
  );
};

export default Home;
