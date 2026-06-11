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
  const { orientation } = useTailwindBreakpoint();
  const { isDarkMode } = useTheme();
  return (
    <div className="flex flex-col items-center w-full h-fit font-light">
      <AuroraBackground />
      <GridBackground />
      <SideBar />
      <ThemeChanger />
      <motion.div 
        className="sm:w-fit p-5 lg:w-[850px] py-25"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {
          orientation === "landscape" ? <TextRandomizerEffect className="text-4xl text-header font-semibold whitespace-nowrap" words="The Dev's Story Behind Chroma War" delay={40} /> : <h1 className="text-4xl font-semibold">The Dev&apos;s Story Behind Chroma War</h1>
        }
        <div className="flex mt-5 mb-3 text-cfgray text-sm items-center">
          <FaRegClock />
          <span className="ml-2">5 min read</span>
          <span className="ml-auto">12 June 2025</span>
        </div>
        <hr className="py-2 text-secondary" />
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>It all started one evening at my friend’s dorm. There were four of us hanging out when someone suggested playing a game on my iPad called <strong>“1 2 3 4 Player Games.”</strong> The game had dozens of fun mini-games, but we eventually stumbled upon one mode called <strong>Color Wars</strong>.</p>
          <p>Color Wars was a simple yet brilliant chain reaction strategy game where players took turns placing dots that could “burst” and take over their opponent’s territory. After a few rounds, I began to notice the pattern behind the mechanics. As someone who loves strategy games—especially ones that are easy to pick up but hard to master—I was instantly hooked. And then an idea struck me:</p>
          <blockquote className="italic">{'“What if I could create my own version of this game? One that didn’t require everyone to be huddled around a single iPad, but could instead be played solo against an AI or even with friends online, across different devices, just through a browser?”'}</blockquote>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">The Development Begins</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>The first step was to develop the main game logic—the chain reaction itself. To my surprise, the recursion turned out to be pretty straightforward. Within five minutes I figured it out, and in about thirty minutes of coding, I had a working prototype.</p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/chroma-war-prototype.webp" alt="Chroma War First Ever Working Prototype" width={600} height={338} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">The First Iteration of Working Prototype of Chroma War</p>
          </div>
          <p>Next came the animations. I wanted to add a satisfying “burst” effect when a cell reached four dots. Using <strong>TailwindCSS</strong> for styling and <strong>Framer Motion</strong> for the animation, I was able to make it come alive. It wasn’t easy as I was still new to Framer Motion and was juggling my 4th-semester final projects at the time. After several days, I finally got it right.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Versus AI Mode</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>The next challenge was creating an AI opponent. At first, I thought: why not use an LLM? So I hooked up Google <strong>Gemini 2.5 Flash</strong> (free API) and tried to let it play the game by feeding it prompts. At first, it felt surprisingly workable. But very quickly I ran into problems:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2">The model often gave invalid moves, so I had to implement a fallback random move.</li>
            <li className="pl-2">Lowering the temperature made the output more valid but also less creative.</li>
            <li className="pl-2">Most importantly, the AI played poorly. So poorly, in fact, that my friend who didn&apos;t even know the rules.. beat it flawlessly on her very first try.</li>
          </ul>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Discovering Minimax Algorithm</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>One day, while scrolling through social media, I stumbled upon an article about the history of <strong>chess engines</strong>. It covered everything from Alan Turing’s 1951 concepts, to IBM’s Deep Blue, to modern neural network approaches. One keyword stood out to me: <strong>Minimax</strong>.</p>
          <p>Minimax is a classic decision-making algorithm used in countless games. It works by simulating all possible moves and counter-moves, then choosing the path that minimizes the worst-case scenario while maximizing the potential gain. I realized this was exactly what my game needed.</p>
          <p>Implementing it wasn’t trivial, but after two days, I got it running—and the difference was night and day. Even at just 5 levels deep, the AI could play with near-optimal strategy. Now the AI could actually challenge players. To make the game even more engaging, I set up three difficulty modes:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2"><strong>Easy:</strong> The AI uses Minimax with a depth of 1.</li>
            <li className="pl-2"><strong>Medium:</strong> The AI uses Minimax with a depth of 3.</li>
            <li className="pl-2"><strong>Hard:</strong> The AI uses Minimax with a depth of 5.</li>
          </ul>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Naming the Game</h2>
        <div className="flex flex-col gap-5 text-lg text-cfgray">
          <p>I decided to call my project <Link href="https://chroma-war.vercel.app" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>Chroma War</Link>.</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2"><strong>Chroma</strong> represents the colors battling for dominance.</li>
            <li className="pl-2"><strong>War</strong> represents the strategic conflict at the heart of the gameplay.</li>
          </ul>
        </div>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Multiplayer and Beyond</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>With the Versus AI mode complete, the game was halfway done. The next step was enabling multiplayer. I used <strong>WebSockets (Socket.IO)</strong> for real-time communication and <strong>Node.js</strong> as the backend. This allowed players to connect and play against each other from anywhere—no longer tied to a single device.</p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/chroma-war-final.webp" alt="Chroma War Final Preview" width={600} height={420} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">Final Preview of Chroma War</p>
          </div>
          <p>What started as a casual gaming night with friends turned into one of my most exciting projects yet. Along the way, I learned about recursion, animations, AI algorithms, and real-time networking. But more than that, I discovered how a small spark of inspiration—born from laughter in a dorm could grow into a full-fledged strategy game that others can enjoy.</p>
        </section>
        <div className="flex mt-5 lg:mt-10 text-cfgray">
          <button onClick={() => handleScrollTo("")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer animate-pulse hover:text-secondary">
            <FaAngleDoubleUp />
            <span className="ml-2">Back to Top</span>
          </button>
          <button onClick={() => navigator.push("/projects/next-sudoku")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer ml-auto hover:text-secondary">
            <FaAngleRight />
            <span className="ml-2">Next Article</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}