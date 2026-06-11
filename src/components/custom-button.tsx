import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

const CustomButton = ({ onClick, children, type="button", nofill=false, textColor, disabled=false, className, fillColor, backgroundColor }: { onClick?: () => void; children: ReactNode; type?: "button" | "submit"; nofill?: boolean; disabled?: boolean; className?: string; fillColor?: string; backgroundColor?: string; textColor?: string }) => {
  const [fillingWidth, setFillingWidth] = useState(0);
  const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { width } = event.currentTarget.getBoundingClientRect();
    setFillingWidth(width);
  };
  return (
    <motion.button
      className={`text-sm pr-2 md:text-md [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] lg:text-lg ${!className && "font-semibold"} transition cursor-pointer min-w-[14rem] min-h-[3rem] relative overflow-hidden ${nofill ? "bg-transparent text-header hover:text-secondary" : `${textColor ? textColor : "text-primary"} ${backgroundColor ? backgroundColor : "bg-secondary"}`} ${className}`}
      type={type}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.05 }}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={() => setFillingWidth(0)}
      disabled={disabled}
    >
      <div
        className={`absolute left-0 top-0 h-full ${fillColor ? fillColor : "bg-secondary-hover"} transition-all duration-300 z-0`}
        style={{
          width: fillingWidth > 0 && !nofill ? `${fillingWidth}px` : "0px",
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10 px-4">{children}</div>
    </motion.button>
  );
};

export default CustomButton;
