import { useEffect, useRef, useState } from "react";
import { TextGenerateEffect } from "./ui/text-generation.effect";
import { AnimatePresence, motion } from "framer-motion"

export const RoleAnimator = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1)); 
    }, 2000);
    return () => clearTimeout(timeout);
  }, [index]);

  if (index === 0) {
    return (
      <TextGenerateEffect words="Software Engineer." className="text-7xl text-header" />
    );
  } else {
    return (
      <RotateWords />
    );
  }
};

 
const RotateWords = ({
  firstWord = ["Software", "Software", "Front-End", "Mobile"],
  secondWord = ["Engineer.", "Developer.", "Developer.", "Developer."],
  translateX = [0, 40, -120, 0]
}: {
  firstWord?: string[];
  secondWord?: string[];
  translateX?: number[];
}) => {
  const [index, setIndex] = useState(0);
  const initialRender = useRef(true);

  useEffect(() => {
    initialRender.current = false;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % firstWord.length);
    }, 2500);
    return () => clearInterval(id);
  }, [firstWord.length]);

  // helpers
  const prevIndex = (index - 1 + firstWord.length) % firstWord.length;
  const nextIndex = (index + 1) % firstWord.length;

  const prevText = firstWord[prevIndex];
  const nextText = firstWord[nextIndex];
  const prevWords = secondWord[(index - 1 + secondWord.length) % secondWord.length];
  const nextWords = secondWord[(index + 1) % secondWord.length];

  // derived flags
  const animateFirstTextEnter = !initialRender.current && firstWord[index] !== prevText;
  const animateFirstTextExit = nextText !== firstWord[index];
  const animateSecondTextEnter = !initialRender.current && secondWord[index] !== prevWords;
  const animateSecondTextExit = nextWords !== secondWord[index];


  return (
    <div className="text-7xl font-medium tracking-wide leading-snug flex">
      <AnimatePresence mode="wait">
        <motion.p
          key={firstWord[index] + index}
          initial={{ opacity: animateFirstTextEnter ? 0 : 1, y: animateFirstTextEnter ? -40 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: animateFirstTextExit ? 0 : 1, y: animateFirstTextExit ? 40 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {firstWord[index]}
        </motion.p>
      </AnimatePresence>

      <div>&nbsp;</div>

      <AnimatePresence mode="wait">
        <motion.p
          key={secondWord[index] + index}
          initial={{
            opacity: animateSecondTextEnter ? 0 : 1,
            y: animateSecondTextEnter ? -40 : 0,
            x: 0,
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: animateSecondTextExit ? 0 : 1,
            y: animateSecondTextExit ? 40 : 0,
            x: translateX[index],
          }}
          transition={{ duration: 0.4 }}
        >
          {secondWord[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
