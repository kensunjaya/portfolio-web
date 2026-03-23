'use client';
import { useState } from "react";
import { RoleAnimator } from "./role-animator";
import { TechStackSlider } from "./ui/techstack-slider";
import { TextGenerateEffect } from "./ui/text-generation.effect";
import { TextRandomizerEffect } from "./ui/text-randomizer";

export const HomeSection = () => {
  const [techStackOpacity, setTechStackOpacity] = useState(0);

  const setOpacity = (opacity: number) => {
    setTechStackOpacity(opacity);
  };

  return (
    <div className="h-screen landscape:px-30 scale-42 landscape:sm:scale-80 landscape:md:scale-100 [@media(min-width:400px)]:portrait:scale-48  [@media(min-width:600px)]:portrait:scale-62" id="home">
      <div className="flex flex-col items-center justify-center h-full text-header text-4xl">
        <div className="space-y-4">
          <TextRandomizerEffect words="KENNETH SUNJAYA" className="tracking-widest text-header text-5xl md:text-4xl" callback={(opacity: number) => { setOpacity(opacity); return opacity; }} />
          <div className="min-w-[50rem]">
            <RoleAnimator />
          </div>
          <TextGenerateEffect font="font-inter" words={'"I build full-stack web and mobile applications with a focus on performance, scalability, and user experience."'} className="tracking-widest text-[32px] sm:text-md md:text-lg text-cfgray max-w-[50rem]" duration={0.2} delay={0.15} />
          <TechStackSlider className="mt-10" style={{ opacity: techStackOpacity / 100 }} />
        </div>
      </div>
    </div>
  );
};
