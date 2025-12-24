'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ExperienceCard } from "./ui/experience-card";
import { motion } from "framer-motion";

type Card = {
  year: number;
  title: string;
  description: string;
  thumbnail: string;
};


export const Experience = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cards: Card[] = useMemo(() => ([
    {
      year: 2024,
      title: "Software Engineering Academy Participant at COMPFEST 16",
      description:
      "Selected as one of 20 individual participants among thousands of applicants in Indonesia. Participated in a 2-month software engineering bootcamp focused on Microservices, Clean Code, Clean Architecture, API, Design Patterns, CI/CD, and Security. Collaborated with a team of four to build Seatudy.",
      thumbnail: "/best-team-compfest.webp",
    },
    {
      year: 2024,
      title: "Awarded Best Team at COMPFEST 16",
      description:
      "My team won the Best Team award at COMPFEST 16 Graduation Night, recognized for our outstanding project ABILILINK. An application that connects people with disability to job opportunities.",
      thumbnail: "/best-case-study.webp",
    },
    {
      year: 2025,
      title: "3rd Place – AI Innovation Challenge 2025 at COMPFEST 17",
      description:
        "Achieved 3rd place out of 240+ teams at COMPFEST 17’s AI Innovation Challenge with 'HORUS AI'. An intelligent computer vision system that detects illegal parking in real time and notifies authorities for timely action.",
      thumbnail: "/aic.webp",
    },
    {
      year: 2025,
      title: "Front-End Development Class Mentor",
      description:
        "I mentored and delivered 13 online hands-on sessions covering front-end web development fundamentals. Taught topics including HTML, CSS, JavaScript, Git, Bootstrap, React, and Next.js, helping students build their own interactive web projects.",
      thumbnail: "/mentor.webp",
    },
    {
      year: 2025,
      title: "Top 10 Finalist of DOW Heroes of Innovation Program",
      description:
        "Achieved 6th position in the DOW Heroes of Innovation Program 2025 with a team project developing ReBio, an IoT-powered eco-enzyme monitoring system. The solution enables real-time tracking of eco-enzyme quality and conditions through a mobile application.",
      thumbnail: "/rebio-go-certificate.webp",
    }
  ]), []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        });

        if (best!.target) {
          const idx = Number((best!.target as HTMLElement).dataset.index);
          if (idx !== activeIndex) {
            setActiveIndex(idx);
          }
        }
      },
      { root, threshold: thresholds }
    );

    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    cards.forEach((card) => {
      const img = new window.Image();
      img.src = card.thumbnail;
    });
  }, [cards]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-2 md:gap-10 xl:gap-20 font-primary [@media(max-width:400px)]:portrait:pl-10 [@media(max-width:400px)]:portrait:pr-5">
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-header">Experience & Awards</div>
      <div className={`flex items-center justify-center gap-5 xl:gap-15 landscape:flex-row portrait:flex-col`} id="experience">
        <div
          ref={scrollerRef}
          className={`
            flex flex-col [@media(min-width:400px)]:portrait:pl-10
            overflow-y-auto 
            scrollbar-hide
            max-h-[27rem]
            pr-2
            snap-y snap-mandatory 
            fade-mask
          `}>
          {cards.map((c, i) => (
            <div
              key={i}
              data-card
              data-index={i}
              id={`experience-card-${i}`}
              onClick={() => {
                const card = document.getElementById(`experience-card-${i}`);
                if (scrollerRef.current && card) {
                  scrollerRef.current.scrollTo({
                    top: card.offsetTop - scrollerRef.current.offsetTop,
                    behavior: "smooth",
                  });
                  setActiveIndex(i);
                }
              }}
              className={`
                flex
                snap-center
                transition-opacity duration-300
                will-change-[opacity,transform]
                ${i === 0 ? "pt-[0vh]" : i === cards.length - 1 ? "pb-[1.5vh]" : "py-5 lg:py-8 xl:py-10"}
                items-center
              `}
              style={{ opacity: activeIndex === i ? 1 : 0.3 }}
            >
              <ExperienceCard
                year={c.year}
                title={c.title}
                description={c.description}
                isActive={activeIndex === i}
                className={i === 0 ? "pt-5" : i === cards.length - 1 ? "pb-5" : ""}
              />
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[300px] h-[210px] md:w-[400px] md:h-[310px] lg:w-[450px] lg:h-[340px] xl:w-[550px] xl:h-[400px] flex items-center rounded-xl justify-center overflow-hidden"
        >
          {cards.map((card, i) => (
            <Image
              key={i}
              src={card.thumbnail}
              alt={`Experience ${i}`}
              width={550}
              height={0}
              onClick={() => {
                const nextIndex = (activeIndex + 1) % cards.length;
                const card = document.getElementById(`experience-card-${nextIndex}`);
                if (scrollerRef.current && card) {
                  scrollerRef.current.scrollTo({
                    top: card.offsetTop - scrollerRef.current.offsetTop,
                    behavior: "smooth",
                  });
                  setActiveIndex(nextIndex);
                }
              }}

              draggable={false}
              className={`rounded-xl absolute inset-0 transition-opacity duration-500 cursor-pointer
                ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};