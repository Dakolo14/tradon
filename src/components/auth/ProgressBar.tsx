import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "40px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "11px",
          fontWeight: 500,
          color: "rgba(14,62,43,0.6)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        }}
      >
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>Your Business</span>
      </div>
      <div
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "rgba(163,219,181,0.3)",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#0E3E2B",
            borderRadius: "9999px",
            transition: "width 0.3s ease-in-out",
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};
