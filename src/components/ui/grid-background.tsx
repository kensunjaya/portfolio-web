import { cn } from "@/lib/utils";
import React from "react";
import { useTheme } from "../context/theme-context";

export function GridBackground() {
  const { isDarkMode } = useTheme();
  return (
    <div className="fixed z-[-100] flex h-screen w-full items-center justify-center pointer-events-none inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:36px_36px]",
          isDarkMode ? "[background-image:radial-gradient(#404040_1px,transparent_1px)]" : "[background-image:radial-gradient(#adadad_1px,transparent_1px)]",
        )}
      />
      </div>
  );
}
