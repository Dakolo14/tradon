import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-[#A8DB36] text-[#0E3E2B] font-normal hover:bg-[#97CB2A] active:scale-[0.98] shadow-none border border-[#9DCF34]/50",
    secondary:
      "bg-white text-[#0E3E2B] font-normal hover:bg-[#F9FAF7] active:scale-[0.98] border border-[#ECEAE3]",
    dark:
      "bg-[#0E3E2B] text-white font-normal hover:bg-[#154E38] active:scale-[0.98] border border-[#0E3E2B]",
    outline:
      "bg-transparent text-[#0E3E2B] font-normal hover:bg-[#0E3E2B]/5 border border-[#0E3E2B]/20",
    ghost:
      "bg-transparent text-[#53675B] hover:text-[#0E3E2B] hover:bg-black/5 border border-transparent",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none tracking-normal font-normal ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
