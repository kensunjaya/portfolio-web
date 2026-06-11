'use client';

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Card = {
  year: string;
  title: string;
  description: string;
  thumbnail: string;
  width: number;
  height: number;
};

export const Experience = () => {
  const cards: Card[] = useMemo(() => ([
    {
      year: '2024',
      title: "Software Engineering Academy Participant at COMPFEST 16",
      description:
        "Selected as one of 20 individual participants among thousands of applicants in Indonesia. Participated in a 2-month software engineering bootcamp focused on Microservices, Clean Code, Clean Architecture, API, Design Patterns, CI/CD, and Security. Collaborated with a team of four to build Seatudy.",
      thumbnail: "/best-team-compfest.webp",
      width: 5184,
      height: 3456,
    },
    {
      year: '2024',
      title: "Awarded Best Team at COMPFEST 16",
      description:
        "My team won the Best Team award at COMPFEST 16 Graduation Night, recognized for our outstanding project ABILILINK. An application that connects people with disability to job opportunities.",
      thumbnail: "/best-case-study.webp",
      width: 1955,
      height: 1381,
    },
    {
      year: '2025',
      title: "3rd Place – AI Innovation Challenge 2025 at COMPFEST 17",
      description:
        "Achieved 3rd place out of 240+ teams at COMPFEST 17’s AI Innovation Challenge with 'HORUS AI'. An intelligent computer vision system that detects illegal parking in real time and notifies authorities for timely action.",
      thumbnail: "/aic.webp",
      width: 1555,
      height: 1036,
    },
    {
      year: '2025',
      title: "Front-End Development Class Mentor",
      description:
        "I mentored and delivered 13 online hands-on sessions covering front-end web development fundamentals. Taught topics including HTML, CSS, JavaScript, Git, Bootstrap, React, and Next.js, helping students build their own interactive web projects.",
      thumbnail: "/mentor.webp",
      width: 2292,
      height: 1365,
    },
    {
      year: '2025',
      title: "Top 10 Finalist of DOW Heroes of Innovation Program",
      description:
        "Achieved 6th position in the DOW Heroes of Innovation Program 2025 with a team project developing ReBio, an IoT-powered eco-enzyme monitoring system. The solution enables real-time tracking of eco-enzyme quality and conditions through a mobile application.",
      thumbnail: "/rebio-go-certificate.webp",
      width: 2000,
      height: 1125,
    }
  ]), []);

  return (
    <div className="py-20 px-6 sm:px-10 md:px-20 lg:px-30 flex flex-col items-center justify-center font-primary w-full max-w-6xl mx-auto" id="experience">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-header mb-16 text-center">
        Experience & Awards
      </h2>

      <div className="relative border-l-2 border-header/20 ml-4 md:ml-32 pl-8 md:pl-12 space-y-16 w-full">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex flex-col gap-4"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-secondary border-4 border-primary z-10" />

            {/* Year Label (Desktop) */}
            <div className="absolute -left-[110px] md:-left-[160px] top-0 text-lg md:text-xl font-bold text-secondary hidden sm:block w-20 text-right">
              {c.year}
            </div>

            {/* Year Label (Mobile) */}
            <div className="text-sm font-bold text-secondary sm:hidden">
              {c.year}
            </div>

            {/* Card Content & Image wrapper */}
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between w-full">
              <div className="flex-1 flex flex-col gap-3 max-w-2xl">
                <h3 className="text-xl md:text-2xl font-semibold text-header leading-tight">
                  {c.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-cfgray leading-relaxed font-inter">
                  {c.description}
                </p>
              </div>

              {/* Thumbnail Image */}
              <div className="w-full lg:w-[320px] xl:w-[400px] shrink-0 overflow-hidden rounded-xl border border-header/10 bg-black/20 hover:border-secondary/40 transition duration-300">
                <Image
                  src={c.thumbnail}
                  alt={c.title}
                  width={400}
                  height={Math.round(400 * c.height / c.width)}
                  style={{ height: "auto" }}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};