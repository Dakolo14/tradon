import React from "react";
import Image from "next/image";

interface TradonLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export const TradonLogo: React.FC<TradonLogoProps> = ({
  className = "",
  variant = "dark",
}) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <Image
        src="/logo-frame.png"
        alt="tradon"
        width={196}
        height={50}
        priority
        className={`object-contain w-[196px] h-[50px] ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
      />
    </div>
  );
};
