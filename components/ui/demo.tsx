import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <StaggerTestimonials />
    </div>
  );
};

export { DemoOne };

function DemoHeroGeometric() {
  return (
    <HeroGeometric badge="Kokonut UI" title1="Elevate Your" title2="Digital Vision" />
  )
}

export { DemoHeroGeometric }


