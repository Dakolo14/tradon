"use client";

import React from "react";
import { Sparkles, Lightbulb, X, Check } from "lucide-react";

export interface OnboardingTooltipProps {
  badge?: string;
  title?: string;
  content: string;
  tip?: string;
  arrowAlign?: "left" | "right" | "center";
  onClose: () => void;
  onGotIt?: () => void;
  onNext?: () => void;
  onBack?: () => void;
  step?: number;
  totalSteps?: number;
}

export const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  badge = "PAGE GUIDE",
  title,
  content,
  tip,
  arrowAlign = "left",
  onClose,
  onGotIt,
  onNext,
  onBack,
  step,
  totalSteps,
}) => {
  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "-6px",
    width: "12px",
    height: "12px",
    backgroundColor: "#0E3E2B",
    transform: "rotate(45deg)",
    borderTop: "1px solid rgba(163,255,0,0.3)",
    borderLeft: "1px solid rgba(163,255,0,0.3)",
    ...(arrowAlign === "left"
      ? { left: "28px" }
      : arrowAlign === "right"
      ? { right: "24px" }
      : { left: "50%", marginLeft: "-6px" }),
  };

  return (
    <div
      style={{
        backgroundColor: "#0E3E2B", // Brand deep green
        borderRadius: "16px",
        padding: "18px 20px",
        color: "#FFFFFF",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        boxShadow: "0 20px 35px -8px rgba(14, 62, 43, 0.4), 0 10px 18px -6px rgba(0, 0, 0, 0.25)",
        zIndex: 1000,
        border: "1px solid rgba(163, 255, 0, 0.25)",
        animation: "fadeScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="fixed top-[68px] inset-x-3 max-w-[360px] mx-auto md:absolute md:top-[calc(100%+14px)] md:inset-x-auto md:left-0 md:w-[360px] md:mx-0"
    >
      {/* Tooltip Arrow (Desktop only) */}
      <div style={arrowStyle} className="hidden md:block" />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Header with Badge and Close */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                backgroundColor: "rgba(163, 255, 0, 0.15)",
                color: "#A3FF00",
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Sparkles size={11} />
              {step && totalSteps ? `Step ${step} of ${totalSteps}` : badge}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close guide"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.6)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              transition: "color 0.2s ease",
            }}
            className="hover:text-white hover:bg-white/10"
          >
            <X size={15} />
          </button>
        </div>

        {/* Title */}
        {title && (
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 6px 0",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h3>
        )}

        {/* Body content */}
        <p
          style={{
            fontSize: "13px",
            lineHeight: "1.55",
            color: "rgba(255, 255, 255, 0.85)",
            margin: "0 0 14px 0",
            fontWeight: 400,
          }}
        >
          {content}
        </p>

        {/* Key Action / Tip box */}
        {tip && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              borderRadius: "10px",
              padding: "9px 12px",
              marginBottom: "16px",
              borderLeft: "3px solid #A3FF00",
            }}
          >
            <Lightbulb size={14} color="#A3FF00" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p
              style={{
                fontSize: "11.5px",
                color: "rgba(255, 255, 255, 0.9)",
                margin: 0,
                lineHeight: "1.45",
              }}
            >
              <strong style={{ color: "#A3FF00" }}>Tip:</strong> {tip}
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "4px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
            Shown once per page
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {onBack && (
              <button
                onClick={onBack}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "6px 10px",
                }}
                className="hover:text-white transition-colors"
              >
                Back
              </button>
            )}

            <button
              onClick={onGotIt || onNext || onClose}
              style={{
                backgroundColor: "#A3FF00",
                color: "#0E3E2B",
                border: "none",
                borderRadius: "9999px",
                padding: "6px 16px",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                boxShadow: "0 2px 8px rgba(163,255,0,0.3)",
              }}
              className="hover:bg-[#92E800] transition-colors active:scale-95"
            >
              <Check size={13} strokeWidth={3} />
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
