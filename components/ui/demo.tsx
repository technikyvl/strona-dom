import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import React, { useState, useEffect } from "react";
import { TextEffect } from "@/components/ui/text-effect";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <StaggerTestimonials />
    </div>
  );
};

export { DemoOne };

// Extra demos for TextEffect if needed
export function TextEffectPerChar() {
  return (
    <TextEffect per='char' preset='fade'>
      Animate your ideas with motion-primitives
    </TextEffect>
  );
}


