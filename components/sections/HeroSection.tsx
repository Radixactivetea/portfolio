import { heroData } from "@/data/homePage";

const HeroSection = () => {
  return (
    <div className="text-center">
      <h1 className="text-primary mb-4">{heroData.title}</h1>
      <h5 className="max-w-2xl mx-auto mb-8 font-normal text-muted">
        {heroData.description}
      </h5>
    </div>
  );
};

export default HeroSection;
