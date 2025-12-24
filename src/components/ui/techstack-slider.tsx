"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTailwindBreakpoint } from "../hooks/breakpoint";

export const TechStackSlider = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const { orientation } = useTailwindBreakpoint();

  const [size, setSize] = useState(40);
  const gap = 20; // px for Tailwind's space-x-6
  const speed = 0.45; // px per frame

  const initialTechstacks = [
    { src: "/techstacks/kotlin.svg", alt: "kotlin" },
    { src: "/techstacks/flutter.svg", alt: "flutter" },
    { src: "/techstacks/react.svg", alt: "react" },
    { src: "/techstacks/nextjs.svg", alt: "nextjs" },
    { src: "/techstacks/nodejs.svg", alt: "nodejs" },
    { src: "/techstacks/typescript.svg", alt: "typescript" },
    { src: "/techstacks/python.svg", alt: "python" },
    { src: "/techstacks/c++.svg", alt: "c++" },
    { src: "/techstacks/git.svg", alt: "git" },
    { src: "/techstacks/firebase.svg", alt: "firebase" },
    { src: "/techstacks/postgresql.svg", alt: "postgresql" },
    { src: "/techstacks/tailwindcss.svg", alt: "tailwindcss" },
  ];

  const [techstacks, setTechstacks] = useState(initialTechstacks);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setOffset((prev) => {
        const newOffset = prev + speed;
        const firstItem = containerRef.current?.children[0] as HTMLElement;

        if (firstItem && newOffset >= firstItem.offsetWidth + gap) {
          setTechstacks((prevStacks) => {
            const [first, ...rest] = prevStacks;
            return [...rest, first];
          });
          return 0;
        }
        return newOffset;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (orientation === "landscape") {
      setSize(40);
    } else {
      setSize(60);
    }

  }, [orientation]);

  return (
    <div className={`overflow-hidden transition pb-1 fade-mask-horizontal ${orientation === "landscape" ? "w-full" : "max-w-[48rem]"} ${className}`} style={style}>
      <div
        ref={containerRef}
        className="flex space-x-5 mx-5"
        style={{
          transform: `translateX(-${offset}px)`,
          willChange: "transform",
        }}
      >
        {techstacks.map((tech, index) => (
          <Image
            key={tech.alt}
            src={tech.src}
            alt={tech.alt}
            width={size}
            height={size}
            style={{ objectFit: "contain", opacity: index === 0 ? 1 - offset / gap : index === initialTechstacks.length - 1 ? offset / gap : 1 }}
          />
        ))}
      </div>
    </div>
  );
};
