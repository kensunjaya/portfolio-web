'use client';

import { handleScrollTo } from "@/lib/utilfunctions";
import Image from "next/image";
import { useTailwindBreakpoint } from "./hooks/breakpoint";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./context/theme-context";

export const SideBar = () => {
  const { orientation } = useTailwindBreakpoint();
  const { isDarkMode } = useTheme();
  const pathname = usePathname();
  const navigation = useRouter();

  const handleLogoClick = () => {
    if (pathname !== "/") {
      navigation.push("/");
    } else {
      handleScrollTo("");
    }
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (id === "cv") {
      e.preventDefault();
      window.open("https://drive.google.com/file/d/1FK6_qN6HIfVV9YIiNEB3ayr-irGcylff/view?usp=sharing", "_blank");
      return;
    }
    if (pathname !== "/") {
      // Let standard HTML link navigation work natively to cross pages
      return;
    }
    e.preventDefault();
    if (id === "#project1") {
      const currentHash = window.location.hash;
      if (currentHash === "#project1") {
        handleScrollTo("#project2");
      } else if (currentHash === "#project2") {
        handleScrollTo("#project3");
      } else if (currentHash === "#project3") {
        handleScrollTo("#project4");
      } else {
        handleScrollTo("#project1"); // default start
      }
      return;
    }
    if (id === "#experience" && orientation === "portrait") {
      handleScrollTo(id);
      return;
    }
    handleScrollTo(id);
  };

  return (
    <>
      {/* Desktop Sidebar (Landscape / Medium+ Screens) */}
      <nav className="fixed top-5 text-cfgray md:top-10 left-0 md:left-5 lg:left-10 h-0 w-16 bg-transparent hidden md:flex flex-col items-center justify-between z-[999] md:scale-100">
        <div className="flex flex-col items-center space-y-45">
          <Image
            src={isDarkMode ? "/logo.svg" : "/logolight.svg"}
            alt="Logo"
            width={48}
            height={48}
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="rotate-270 space-x-5">
            {[
              { label: "CONTACT", id: "#contact" },
              { label: "EXPERIENCE", id: "#experience" },
              { label: "PROJECTS", id: "#project1" },
            ].map(({ label, id }) => (
              <a
                key={label}
                href={pathname === "/" ? id : "/" + id}
                className="relative px-2 py-1 overflow-hidden group"
                onClick={(e) => handleNavClick(e, id)}
              >
                <span className="relative text-header z-10 group-hover:text-secondary transition-colors duration-300">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Top Navbar (Portrait / Small Screens) */}
      <nav className="fixed top-4 left-4 right-4 z-[999] flex md:hidden items-center justify-between px-5 py-3 rounded-full border border-header/10 bg-primary/85 backdrop-blur-md shadow-lg text-cfgray">
        <Image
          src={isDarkMode ? "/logo.svg" : "/logolight.svg"}
          alt="Logo"
          width={32}
          height={32}
          onClick={handleLogoClick}
          className="cursor-pointer active:scale-95 transition-transform duration-300"
        />
        <div className="flex items-center space-x-3">
          {[
            { label: "PROJECTS", id: "#project1" },
            { label: "EXPERIENCE", id: "#experience" },
            { label: "CONTACT", id: "#contact" },
            { label: "CV", id: "cv" },
          ].map(({ label, id }) => (
            <a
              key={label}
              href={id === "cv" ? "https://drive.google.com/file/d/1FK6_qN6HIfVV9YIiNEB3ayr-irGcylff/view?usp=sharing" : (pathname === "/" ? id : "/" + id)}
              target={id === "cv" ? "_blank" : undefined}
              onClick={(e) => handleNavClick(e, id)}
              className="text-[11px] sm:text-xs tracking-wider font-bold text-header hover:text-secondary active:text-secondary transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};
