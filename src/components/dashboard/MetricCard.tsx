"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useAppearance } from "@/context/AppearanceContext";

interface MetricCardProps {
  title: string;
  value: string;
  subText?: React.ReactNode;
  icon: React.ReactNode;
  iconBgColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subText,
  icon,
  iconBgColor = "rgba(14,62,43,0.05)",
  trend,
}) => {
  const { tokens, config } = useAppearance();
  const isDark = config.theme === "dark";

  return (
    <div
      style={{
        backgroundColor: tokens.bgCard,
        border: `1px solid ${tokens.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        boxShadow: "none",
      }}
      className="p-4 sm:p-6 rounded-2xl"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: tokens.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {title}
        </span>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: isDark ? "rgba(255,255,255,0.07)" : iconBgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span
            style={{ fontWeight: 700, color: tokens.textPrimary, letterSpacing: "-0.02em" }}
            className="text-2xl sm:text-[30px]"
          >
            {value}
          </span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
          {trend && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                color: trend.isPositive ? "#10B981" : "#EF4444",
                fontWeight: 600,
              }}
            >
              {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trend.value}
            </span>
          )}
          {subText && (
            <span style={{ color: tokens.textSecondary, fontWeight: 500 }}>
              {subText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
