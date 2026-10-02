import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "forest" | "lime" | "mint" | "subtle" | "dark";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "subtle",
  className = "",
  icon,
}) => {
  const variantStyles = {
    forest: "bg-[#0E3E2B]/10 text-[#0E3E2B] border-[#0E3E2B]/15",
    lime: "bg-[#A8DB36]/20 text-[#0E3E2B] border-[#A8DB36]/40",
    mint: "bg-[#EAF5EE] text-[#0E3E2B] border-[#A3D9B1]/50",
    subtle: "bg-white/80 text-[#53675B] border-[#ECEAE3]",
    dark: "bg-[#184632] text-[#A8DB36] border-white/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-normal tracking-wider uppercase border ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
