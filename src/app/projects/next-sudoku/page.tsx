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

export default function NextSudoku() {
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
          orientation === "landscape" ? <TextRandomizerEffect className="text-4xl text-header font-semibold whitespace-nowrap" words="A Journey of NExT Sudoku Creation" delay={40} /> : <h1 className="text-4xl font-semibold">A Journey of NExT Sudoku Creation</h1>
        }
        <div className="flex mt-5 mb-3 text-cfgray text-sm items-center">
          <FaRegClock />
          <span className="ml-2">4 min read</span>
          <span className="ml-auto">06 November 2023</span>
        </div>
        <hr className="py-2 text-secondary" />
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>I’ve always enjoyed brain-teasing games, and Sudoku has been one of my favorites to play in my leisure time. Back in November 2023, during my first semester, my lecturer gave us a final project: <strong><i>“Create a game in C that runs on the command line interface.”</i></strong></p>
          <p>Immediately, I knew what I wanted to build... A Sudoku game! It seemed simple enough, and I thought I could finish it in just a few days. I started by writing a program that could print a 9×9 grid, complete with borders separating each 3×3 block. That part was straightforward.</p>
          <p>The real challenge, however, was puzzle generation. At the time, I had heard about the backtracking algorithm but wasn’t familiar with recursion yet. With final exams approaching and time running short, I went with a simpler but less efficient brute force method. The idea was:</p>
          <ul className="list-disc space-y-2 ml-6">
            <li className="pl-2">Generate the diagonal 3×3 subgrids (since they can be filled randomly while staying valid).</li>
            <li className="pl-2">Fill the rest of the grid with random numbers.</li>
            <li className="pl-2">If any cell couldn’t be filled with a valid number, restart from step 2.</li>
            <li className="pl-2">Once a valid puzzle was generated, randomly hide some numbers to create the playable Sudoku.</li>
          </ul>
          <p>The method worked… but it was painfully slow. Sometimes it took over a minute just to generate a puzzle. Still, it was enough to submit and pass <Link href="https://github.com/kensunjaya/sudoku" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>my project</Link>, and I moved on.</p>
          <div className="flex flex-col h-fit items-center">
            <Image src="/sudoku-cli.webp" alt="Sudoku CLI" width={600} height={338} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">Sudoku on Command Line Interface</p>
          </div>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Rediscovering Sudoku</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>Fast forward to 2025, now in my 4th semester. One day in class, I noticed some of my classmates playing Sudoku on their phones. Out of curiosity, I downloaded one too, but quickly got frustrated. Every few moves, an ad would pop up, breaking the flow of the game. I could turn off internet connectivity to block the ads, but then I’d miss important notifications.</p>
          <p>That’s when I remembered: <i>didn’t I build a Sudoku game two years ago?</i> Sure, it only ran in the command line and had a clunky brute force generator, but maybe I could remake it as a modern, ad-free Sudoku web app.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">The Rebuild</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>That very evening, at 9 PM, I launched my VS Code and started coding. This time, I decided to learn and properly implement the <strong>backtracking algorithm</strong>.</p>
          <p>To my surprise, it worked beautifully. Unlike the brute force method, backtracking didn’t restart from scratch whenever it hit a dead end. Instead, it simply “backtracked” one step, trying alternative numbers until the puzzle was solved. The difference was night and day, puzzles generated in <strong>less than 0.5 seconds</strong>, so fast the loading felt instant.</p>
          <p>By 3 AM, the main logic was done, the game was playable, and I even had a responsive UI built with <strong>Next.js</strong>.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Early Feedback</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>The next morning, I shared the game with my friends. They loved it and gave me lots of positive feedback. Many of them suggested adding a high score system so players could compete based on solving time and difficulty.</p>
          <p>Encouraged, I spent that same day building one. I chose <strong>MongoDB Atlas</strong> for the backend since I wanted to try it out after working with Firebase before. After a few hours of coding, the leaderboard was live. Soon enough, the high score list was filled with my friends’ names as they tried to outdo each other.</p>
        </section>
        <h2 className="pt-8 pb-5 text-3xl font-semibold">Migrating to AWS</h2>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>A few weeks later, another final project came along: this time, we had to build something that used an AWS service. I decided to extend my Sudoku project by migrating the leaderboard from MongoDB Atlas to <Link href="https://aws.amazon.com/dynamodb/" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>AWS DynamoDB.</Link></p>
          <p>After some tweaking, the migration worked and the difference in performance was noticeable. DynamoDB handled reads and writes faster than MongoDB, making the leaderboard even smoother.</p>
          <div className="flex flex-col h-fit items-center pb-5">
            <Image src="/next-sudoku-preview.webp" alt="NExT Sudoku" width={600} height={338} style={{ height: "auto" }} />
            <p className="text-center text-sm mt-3">Final Release of NExT Sudoku</p>
          </div>
        </section>
        <section className="flex flex-col gap-5 text-lg text-cfgray">
          <p>What began as a simple C project with a brute force algorithm in 2023 evolved into a full-stack web app in 2025 with a sleek UI, fast puzzle generation using backtracking, a competitive leaderboard, and integration with AWS DynamoDB.</p>
          <p>That project is now called <Link href="https://next-sudoku-web.vercel.app/" target="_blank" className={`${isDarkMode ? "text-blue-300" : "text-blue-500"} underline`}>NExT Sudoku</Link>, a nod to both its Next.js foundation and the idea of taking Sudoku to the next level.</p>
        </section>
        <div className="flex mt-5 lg:mt-10 text-cfgray">
          <button onClick={() => handleScrollTo("")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer animate-pulse hover:text-secondary">
            <FaAngleDoubleUp />
            <span className="ml-2">Back to Top</span>
          </button>
          <button onClick={() => navigator.push("/projects/seatudy")} className="flex items-center hover:-translate-y-1 transition duration-300 cursor-pointer ml-auto hover:text-secondary">
            <FaAngleRight />
            <span className="ml-2">Next Article</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}