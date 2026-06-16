"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/theme-context";

const PARALLAX_FACTOR = 0.3;

export function GridBackground() {
  const { isDarkMode } = useTheme();
  const [offsetY, setOffsetY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setOffsetY(window.scrollY * PARALLAX_FACTOR);
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed z-[-100] flex h-screen w-full items-center justify-center pointer-events-none inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:36px_36px]",
          isDarkMode ? "[background-image:radial-gradient(#404040_1px,transparent_1px)]" : "[background-image:radial-gradient(#adadad_1px,transparent_1px)]",
        )}
        style={{ backgroundPositionY: `-${offsetY}px` }}
      />
    </div>
  );
}
