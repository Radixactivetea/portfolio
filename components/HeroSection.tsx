import portfolio from "@/data/portfolio.json"; // Adjust the path based on your project structure

const HeroSection = () => {
  return (
    <div className="text-center">
      <h1 className="text-primary mb-4">{portfolio.hero.title}</h1>
      <h5 className="max-w-2xl mx-auto mb-8 font-normal text-muted">
        {portfolio.hero.description}
      </h5>
    </div>
  );
};

export default HeroSection;
