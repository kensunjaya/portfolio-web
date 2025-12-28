'use client';
import React, { useEffect } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { SideBar } from "@/components/sidebar";
import { handleScrollTo } from "@/lib/utilfunctions";
import { Project } from "@/components/project";
import { Experience } from "@/components/experience";
import { ContactSection } from "@/components/contact";
import { HomeSection } from "@/components/home";
import { ViewCVButton } from "@/components/ui/curriculum-vitae";
import { SocialMediaLinks } from "@/components/ui/social-media";
import { useTailwindBreakpoint } from "@/components/hooks/breakpoint";
import { FaAnglesDown } from "react-icons/fa6";
import { ThemeChanger } from "@/components/ui/theme-changer";
import { useTheme } from "@/components/context/theme-context";

function Home() {
  const [scrollIconOpacity, setScrollIconOpacity] = React.useState(0);
  const handleScroll = () => {
    setScrollIconOpacity(80 - window.scrollY);
  };

  const { breakpoint } = useTailwindBreakpoint();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="w-full min-h-screen overflow-hidden landscape:px-30">
      {
        isDarkMode ? <Spotlight height={breakpoint == 'xs' ? 850 : breakpoint == 'md' ? 1000 : breakpoint == 'lg' ? 1200 : 1380} />
        : <Spotlight height={breakpoint == 'xs' ? 850 : breakpoint == 'md' ? 1000 : breakpoint == 'lg' ? 1200 : 1380}
        gradientFirst = "radial-gradient(68.54% 68.72% at 60.02% 31.46%, hsla(30, 50%, 70%, .08) 0, hsla(30, 45%, 50%, .02) 50%, hsla(30, 40%, 35%, 0) 80%)"
        gradientSecond = "radial-gradient(50% 50% at 50% 60%, hsla(30, 55%, 75%, .06) 0, hsla(30, 45%, 45%, .02) 80%, transparent 100%)"
        gradientThird = "radial-gradient(50% 50% at 50% 60%, hsla(30, 50%, 70%, .04) 0, hsla(30, 40%, 35%, .02) 80%, transparent 100%)" />
      }
      
      <SocialMediaLinks />
      <ViewCVButton />
      <ThemeChanger />
      <SideBar />
      {scrollIconOpacity > 0 && (
        <div className="fixed flex flex-col justify-end items-center bottom-[50px] left-0 right-0 space-y-3 transition duration-200 z-999 text-header" style={{ opacity: scrollIconOpacity / 100 }}>
          <div className="select-none text-xs">Scroll</div>
          <FaAnglesDown
            className="animate-pulse transition text-2xl cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#project1");
            }}
          />
        </div>
      )}
      <HomeSection />

      <Project
        title={'Chroma War'}
        description={"A fast-paced two-player chain reaction strategy game. Challenge friends online or test your skills against a smart AI opponent!"}
        imageUrl={"/chroma-war.webp"}
        logo={"/chroma_war_logo.webp"}
        link={"https://chroma-war.vercel.app"}
        number={1}
        breakpoint={breakpoint}
        techstacks={['Next.js', 'TypeScript', 'Node.js', 'Socket.io']}
        project_story_path={"/projects/chroma-war"}
      />

      <Project
        title={'NExT Sudoku'}
        description={"A modern take on the classic Sudoku puzzle, featuring a puzzle generation algorithm that creates unique puzzles for endless gameplay."}
        imageUrl={"/next-sudoku.webp"}
        logo={"/next_sudoku_logo.webp"}
        link={"https://next-sudoku-web.vercel.app"}
        number={2}
        breakpoint={breakpoint}
        techstacks={['Next.js', 'TypeScript', 'Node.js', 'AWS']}
        project_story_path={"/projects/next-sudoku"}
      />

      <Project
        title={'SEATUDY'}
        description={"An online learning platform that is designed to enhance the learning experience through materials and resources tailored to individual student needs."}
        imageUrl={"/seatudy.webp"}
        logo={"/seatudy_logo.webp"}
        link={"https://github.com/Filbert88/seatudy"}
        number={3}
        breakpoint={breakpoint}
        techstacks={['Next.js', 'TypeScript', 'PostgreSQL', 'Express', 'Figma']}
        project_story_path={"/projects/seatudy"}  
      />

      <Project
        title={'HORUS AI'}
        description={"An intelligent real-time system that detects illegal parking behavior from live traffic camera feeds by analyzing driver actions and intent, rather than just identifying parked vehicles."}
        imageUrl={"/horus-ai-preview.webp"}
        logo={"/horus_logo.webp"}
        link={"https://horusintelligence.vercel.app/"}
        number={4}
        breakpoint={breakpoint}
        techstacks={['Next.js', 'GCP', 'YOLO', 'Flask', 'Firebase', 'Vertex AI']}
        project_story_path={"/projects/horus-ai"}  
      />

      <Experience />
      <ContactSection />
    </main>
  );
}

export default Home;