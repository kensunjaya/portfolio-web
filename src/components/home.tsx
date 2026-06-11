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
    <div className="h-screen flex items-center justify-center px-4 sm:px-10 md:px-20 lg:px-30" id="home">
      <div className="flex flex-col justify-center text-header">
        <div className="space-y-4 max-w-4xl">
          <TextRandomizerEffect words="KENNETH SUNJAYA" className="tracking-widest text-header text-2xl sm:text-5xl md:text-4xl font-bold" callback={(opacity: number) => { setOpacity(opacity); return opacity; }} />
          <div className="w-full max-w-[50rem]">
            <RoleAnimator />
          </div>
          <TextGenerateEffect font="font-inter" words={'"I build full-stack web and mobile applications with a focus on performance, scalability, and user experience."'} className="tracking-widest text-sm sm:text-base md:text-lg text-cfgray max-w-[50rem] mt-3" duration={0.2} delay={0.15} />
          <TechStackSlider className="mt-10 w-full max-w-[50rem]" style={{ opacity: techStackOpacity / 100 }} />
        </div>
      </div>
    </div>
  );
};
