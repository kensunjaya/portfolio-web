import { handleScrollTo } from "@/lib/utilfunctions";
import Image from "next/image";
import { useTailwindBreakpoint } from "./hooks/breakpoint";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./context/theme-context";

export const SideBar = () => {
  const { orientation } = useTailwindBreakpoint();
  const { isDarkMode } = useTheme();
  const project_pathnames = ["/projects/chroma-war", "/projects/seatudy", "/projects/next-sudoku", "/projects/horus-ai"];
  const pathname = usePathname();
  const navigation = useRouter();
  return (
    <nav className="fixed top-5 text-cfgray md:top-10 left-0 md:left-5 lg:left-10 h-0 w-16 bg-transparent flex flex-col items-center justify-between z-[999] scale-60 md:scale-100">
      <div className="flex flex-col items-center space-y-45">
        <Image
          src={isDarkMode ? "/logo.svg" : "/logolight.svg"}
          alt="Logo"
          width={48}
          height={48}
          onClick={() => {
            if (window.location.pathname !== "/") {
              navigation.push("/");
            }
            else {
              handleScrollTo("");
            }
          }}
          style={{ cursor: "pointer" }}
        />
        {(((orientation === "landscape") || (orientation === "portrait" && pathname !== "/send-message")) && !(orientation === "portrait" && project_pathnames.includes(pathname))) && (
          <div className="rotate-270 space-x-5">
            {[
              { label: "CONTACT", id: "#contact" },
              { label: "EXPERIENCE", id: "#experience" },
              { label: "PROJECTS", id: "#project1" },
            ].map(({ label, id }) => (
              <a
                key={label}
                href={id}
                className="relative px-2 py-1 overflow-hidden group"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== "/") {
                    navigation.push("/" + id); 
                    return;
                  }
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
                }}
              >
                <span className="relative text-header z-10 group-hover:text-secondary transition-colors duration-300">
                  {label}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
