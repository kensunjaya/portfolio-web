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
import { GridBackground } from "@/components/ui/grid-background";
import { AuroraBackground } from "@/components/ui/aurora-bg";
 
export default function ChromaWar() {
  const navigator = useRouter();
  const { breakpoint, orientation } = useTailwindBreakpoint();
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
          orientation === "landscape" ? <TextRandomizerEffect className="text-4xl text-header font-semibold" words="From Idea to Podium: The Story of HORUS AI" delay={40} /> : <h1 className="text-4xl font-semibold">From Idea to Podium: The Story of HORUS AI</h1>
        }
        <div className="flex mt-5 mb-3 text-cfgray text-sm items-center">
          <FaRegClock />
          <span className="ml-2">5 min read</span>
          <span className="ml-auto">01 October 2025</span>
        </div>
        <hr className="py-2 text-secondary" />
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>It was the semester break in July 2025 when I received an invitation from a friend to join their team for the <strong>AI Innovation Challenge</strong>, part of <strong>COMPFEST 17</strong>, the biggest student-led IT event in Indonesia.</p>
          <p>The problem statement was urbanization and smart cities. After some brainstorming, one of my teammates proposed an idea:</p>
          <blockquote>{'“Illegal parking is a huge contributor to traffic congestion in Jakarta and Bandung. What if we build a computer vision system to automatically detect illegal parking and assist city officers?”'}</blockquote>
          <p>It sounded promising, so we decided to pursue it. Over the next few weeks, we worked tirelessly on the project, which we named <Link href="https://horusintelligence.vercel.app/" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>HORUS AI</Link>.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Building the Core</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>Our first challenge was finding the right dataset and model. We decided on <strong>YOLOv11 Nano</strong> for vehicle detection, combined with <strong>DeepSORT</strong> for object tracking. The plan was simple: if a car didn’t move for five minutes, flag it as illegally parked.</p>
          <p>But there was a problem: YOLO’s bounding boxes jittered, making stationary cars look like they were moving. I suggested a solution:</p>
          <blockquote>{'“Why not apply a threshold using Euclidean distance, checking differences every few frames?”'}</blockquote>
          <p>It worked. The timer stabilized, and we could now reliably track idle vehicles.</p>
          <div className="flex flex-col h-fit items-center">
            <video src="/yolo-demo.webm" autoPlay loop muted width={600} height={338} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">YOLOv11 + DeepSORT inference on live camera feed located at Quang Trung street, Vietnam</p>
          </div>
          <p>Of course, not every idle vehicle is illegally parked. Drivers could be waiting in their cars. To reduce false positives, we added another layer: a driver-exit detection model. Using <strong>EfficientNetB0 + LSTM</strong>, we trained the system to recognize when a driver leaves their vehicle, signaling a true parking event.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Adding Location Based Urgency Scoring</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>We wanted our system to do more than just detection. Using <strong>OpenStreetMap APIs</strong>, we added a <strong>Geospatial Urgency Score</strong>. A car blocking a hospital entrance? High urgency. Parked near a school? Immediate priority.</p>
          <p>Then, we integrated a <strong>Large Language Model (Gemini 1.5 flash)</strong> to generate recommendations for enforcement actions. For example:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2">Low urgency → send a warning.</li>
            <li className="pl-2">High urgency (e.g., near a hospital) → recommend towing.</li>
          </ul>
          <div className="flex flex-col h-fit items-center">
            <Image src="/urgency-scoring.webp" alt="Urgency Scoring" width={800} height={245} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">Urgency Scoring System Overview</p>
          </div>
          <p>This way, enforcement officers wouldn’t just see detections. They’d also get actionable insights.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Sleepless Nights at the Café</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>One week before the preliminary deadline, our team camped at a café, coding and training models day and night. It was exhausting, but we managed to deploy our system on Google Cloud Platform, using the $300 credit provided by COMPFEST.</p>
          <p>Two weeks later, the results came in: from <strong>over 240+ teams, we were selected as a Top 8 Finalist.</strong></p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/aic-finalist.webp" alt="AIC Finalist" width={600} height={430} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">AIC Finalists, taken from COMPFEST&apos;s instagram feed.</p>
          </div>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">The Finals</h2>
        <div className="flex flex-col gap-5 text-lg text-cfgray">
          <p>The final round consisted of two mentoring sessions followed by live pitching.</p>
          <p><strong>Mentoring 1</strong> revealed our biggest issue: performance. Our website was slow because the inference backend and data fetcher service ran on the same GCP instance, causing CPU and memory overload. On top of that, our inference was running on CPU instead of GPU—too sluggish for real-time.</p>
          <p>Upgrading to GPU on Google Cloud Run wasn’t possible, and using Google Compute Engine with GPU would exceed our credits. That’s when I proposed a scrappy solution:</p>
          <blockquote>{'“Why not run the inference server on my home PC with a decent GPU (NVIDIA GeForce RTX 3070), then expose it via a TCP tunneling service?”'}</blockquote>
          <p>We tried it with <Link href="https://pinggy.io/" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>Pinggy</Link>, and the results were incredible, delivering <strong>10x smoother performance</strong> than GCP. The only risk was that my PC and internet needed to stay up 24/7. Luckily, it held strong all the way to the finals.</p>
        </div>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Final Pitching Day</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>On September 28, 2025, at Universitas Indonesia’s Faculty of Computer Science, the top teams gathered for live pitching. We waited nervously as each team presented behind closed doors. At 11:20 AM, our turn came.</p>
          <p>We delivered our pitch smoothly, <Link href="https://www.canva.com/design/DAGz3zuNGH8/3dTK0INVA9St5pyJfg5FlA/view?utm_content=DAGz3zuNGH8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc4058c463f" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>demonstrating</Link> HORUS AI’s ability to detect illegal parking, score urgency, and recommend enforcement actions. The jury asked tough questions, but we answered confidently. Walking out of the room, we felt relief and a quiet hope.</p>
          <p>That evening, during the Awarding Night, we sat anxiously in the packed convention hall. When the announcer finally called out: <strong>“3rd Place Winner: BananaChoco”</strong></p>
          <p>We erupted in joy. Not only did we win <strong>3rd Place</strong> among 240+ teams, we also received the <strong>Best Audience Award</strong> for the project that received the most votes from the audience.</p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/aic.webp" alt="Awarding Night AIC" width={600} height={400} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">Awarding Night Session, 3rd Place - Team BananaChoco</p>
          </div>
        </section>
        <section className="flex flex-col gap-5 text-lg text-cfgray pt-8">
          <p>From late-night coding marathons to sleepless debugging sessions, from technical setbacks to creative solutions, the journey of HORUS AI was one of the most intense and rewarding experiences of my academic life.</p>
          <p>HORUS AI showed me the true value of teamwork, persistence, and creative problem-solving. It wasn’t just about building an AI. It was about learning how to turn an idea into a working system under real-world pressure.</p>
          <p>And standing on that stage, holding the award, I knew every second of effort was worth it.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Honorable Mention</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>The journey of HORUS AI wouldn’t have been possible without my amazing teammates:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2"><Link href="https://www.linkedin.com/in/michael-wijaya-a42616292/" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`} target="_blank">Michael Wijaya</Link> as System Designer</li>
            <li className="pl-2"><Link href="https://www.linkedin.com/in/vincentius-jacob-922b56302/" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`} target="_blank">Vincentius Jacob Gunawan</Link> as Team Leader, ML Engineer</li>
          </ul>
          <p>Working alongside <strong>Michael</strong> and <strong>Vincent</strong> was one of the highlights of this competition. The countless hours of brainstorming, late-night debugging, and shared excitement when things finally clicked are memories I’ll always cherish.</p>
          <div className="flex flex-col h-fit items-center">
            <div className="relative w-full max-w-2xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/MSJCIRx8O3s?si=OZI_FO0G71db_Ore"
                title="YouTube video player"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-sm mt-3">Our demonstration video, used for preliminary round</p>
          </div>
        </section>
        <div className="flex mt-5 lg:mt-10 text-cfgray">
          <button onClick={() => handleScrollTo("")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer animate-pulse hover:text-secondary">
            <FaAngleDoubleUp />
            <span className="ml-2">Back to Top</span>
          </button>
          <button onClick={() => navigator.push("/projects/chroma-war")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer ml-auto hover:text-secondary">
            <FaAngleRight />
            <span className="ml-2">Next Article</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}