"use client";
import { SideBar } from "@/components/sidebar";
import { Spotlight } from "@/components/ui/spotlight"
import { TextRandomizerEffect } from "@/components/ui/text-randomizer";
import { handleScrollTo } from "@/lib/utilfunctions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaAngleDoubleUp, FaAngleRight } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useTailwindBreakpoint } from "@/components/hooks/breakpoint";
import { ThemeChanger } from "@/components/ui/theme-changer";
import { useTheme } from "@/components/context/theme-context";
import { AuroraBackground } from "@/components/ui/aurora-bg";
import { GridBackground } from "@/components/ui/grid-background";

export default function Seatudy() {
  const navigator = useRouter();
  const { orientation } = useTailwindBreakpoint();
  const { isDarkMode } = useTheme();
  return (
    <div className="flex flex-col items-center w-full h-fit font-light overflow-x-hidden">
      <AuroraBackground />
      <GridBackground />
      <SideBar />
      <ThemeChanger />
      <motion.div 
        className="w-full max-w-[850px] p-5 py-25"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {
          orientation === "landscape" ? <TextRandomizerEffect className="text-4xl text-header font-semibold" words="The Story Behind SEATUDY" delay={40} /> : <h1 className="text-4xl font-semibold">The Story Behind SEATUDY</h1>
        }
        <div className="flex mt-5 mb-3 text-cfgray text-sm items-center">
          <FaRegClock />
          <span className="ml-2">5 min read</span>
          <span className="ml-auto">18 June 2024</span>
        </div>
        <hr className="py-2 text-secondary" />
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>It was a quiet morning during my 2nd semester break. While scrolling through Instagram, I stumbled upon a post promoting the <strong>Software Engineering Academy by COMPFEST</strong>. It is the largest annual technology event in Indonesia, organized by University of Indonesia (UI).</p>
          <p>I was immediately interested. The Academy promised <strong>two months of intensive learning about software engineering best practices</strong>. But first, there was a recruitment challenge: build a full-stack online appointment platform for a fictional salon called <Link href="https://kensunjaya.github.io/SEA-Salon/" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>SEA Salon</Link>.</p>
          <p>The requirements were clear:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2">A working frontend and backend.</li>
            <li className="pl-2">Two account modes: admin and customer.</li>
            <li className="pl-2">Fully functional appointment booking features.</li>
          </ul>
          <p>I committed myself fully to the task. For three days straight, I coded and refined the platform. Using <strong>React + Vite</strong> for the frontend and <strong>Firebase</strong> for the backend, I built a fully working solution. When I finally submitted it, I felt both nervous and proud.</p>
          <p>Two weeks later, I received the email that changed everything: I passed the technical test and the interview, securing one of just <strong>20 seats</strong> in the Software Engineering Academy, selected from thousands of applicants.</p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/sea-email.webp" alt="Email of Acceptance" width={600} height={218} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">The Email of Acceptance (translated from Bahasa Indonesia to English)</p>
          </div>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Entering the Academy</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>The bootcamp kicked off with advanced topics: <strong>Microservices, Clean Code, Clean Architecture, APIs, Design Patterns, CI/CD, and Software Security</strong>. But beyond lectures, we were also assigned a hands-on project.</p>
          <p>In teams of four, each with a mentor, we were tasked with building an online learning platform called <Link href="https://seatudy-real.vercel.app/popular-courses" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>SEATUDY</Link>. The challenge was not just to code but to:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2">Plan the architecture.</li>
            <li className="pl-2">Apply clean code and design patterns.</li>
            <li className="pl-2">Implement CI/CD pipelines.</li>
            <li className="pl-2">Ensure security and scalability.</li>
          </ul>
          <p>After dividing responsibilities, I was assigned as the Frontend Developer with additional minor backend tasks. We decided to build the frontend with <strong>Next.js</strong> and use <strong>PostgreSQL</strong> for structured user and course data. For media files (like course materials), we chose <strong>Cloudinary</strong> (free but limited). The database was hosted on <strong>Aiven</strong>.</p>
          <p>We followed the <strong>Agile framework</strong>, holding <strong>daily standups</strong> and <strong>evening engineering syncs</strong> at 8 PM. Communication was key. We constantly shared progress, blockers, and solutions.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Developing SEATUDY</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>Development was challenging. APIs often didn’t behave as expected, database queries broke, and integrations sometimes failed. But every problem became an opportunity for collaboration. Each day, we tackled issues together, supporting one another to keep moving forward.</p>
          <p>Two days before the deadline, we began <strong>User Acceptance Testing (UAT)</strong>. That’s when disaster struck:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2">Bugs surfaced.</li>
            <li className="pl-2">Server errors popped up.</li>
            <li className="pl-2">Files uploaded to Cloudinary became inaccessible from the site.</li>
          </ul>
          <p>We barely slept for those last two days, debugging and fixing issues nonstop. By the morning of the deadline, we were exhausted, but SEATUDY was ready.</p>
          <p>On presentation day, everything came together. We deployed the frontend on Vercel, the backend and database on Aiven, and <Link href="https://drive.google.com/file/d/1lzcoztaus4hk5dPZLngFIRMratDwJKrR/view?usp=sharing" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>showcased</Link> the platform to the jury. The response was overwhelmingly positive. They were especially impressed by our UI/UX design and how well we executed under pressure.</p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/online-pitching.webp" alt="Online Pitching of SEATUDY" width={800} height={385} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">The Presentation of SEATUDY Held Online</p>
          </div>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Beyond SEATUDY</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>While SEATUDY was the highlight, the Academy journey wasn’t over yet. For the final stage, participants from different divisions: User Experience, Product Management, Data Science, and Software Engineering were grouped into cross-functional teams of ten.</p>
          <p>Our challenge: design a solution to help people with disabilities find meaningful employment. Unemployment rates for people with disabilities in Indonesia remain disproportionately high, and we were determined to build something impactful.</p>
          <p>After several brainstorming sessions, we came up with <Link href="https://drive.google.com/file/d/1EPV72UQob9s_dqTMMIG-OYO_tFSSRwqK/view?usp=sharing" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>ABILILINK</Link>, a platform that connects people with disabilities to job opportunities. Beyond job listings, the platform would also provide access to essential courses to help users upskill. I contributed by creating the use case diagrams and system design for the application.</p>
          <p>At the COMPFEST 16 Graduation Night, held at University of Indonesia’s Faculty of Computer Science, we presented ABILILINK to the jury. To our delight, the project received strong appreciation, and when it was time to announce the winner, our team was named Best Case Study Team. Walking up to the stage with my teammates to receive our certificates and take photos was a moment I’ll never forget.</p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/compfest-graduation-night.webp" alt="Graduation Night" width={800} height={369} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">The Pitching of ABILILINK at University of Indonesia</p>
          </div>
          <p>The SEATUDY journey was more than just building an online learning platform. It was about teamwork, problem-solving, and growth. From sleepless nights debugging to standing proudly on stage at COMPFEST, the experience taught me how to collaborate effectively, think architecturally, and deliver under pressure. It was one of the most transformative experiences of my academic life—and SEATUDY will always be a reminder of the power of teamwork and perseverance.</p>
        </section>
        <div className="flex mt-5 lg:mt-10 text-cfgray">
          <button onClick={() => handleScrollTo("")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer animate-pulse hover:text-secondary">
            <FaAngleDoubleUp />
            <span className="ml-2">Back to Top</span>
          </button>
          <button onClick={() => navigator.push("/projects/horus-ai")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer ml-auto hover:text-secondary">
            <FaAngleRight />
            <span className="ml-2">Next Article</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}