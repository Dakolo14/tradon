"use client";

import React from "react";

export const ValuePropositionSection: React.FC = () => {
  return (
    <section 
      style={{
        width: "100%",
        backgroundColor: "#0E3E2B",
        boxSizing: "border-box",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <div className="page-container flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* Left Side: Poppins Regular 48px */}
        <div className="w-full lg:w-[55%]">
          <p 
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "48px",
              fontWeight: 400, // Regular
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            FMCG brand ship{" "}
            <span 
              style={{
                fontWeight: 500, // Medium
                fontStyle: "italic",
                color: "#B2FF00", // Accent Color
              }}
            >
              billions
            </span>{" "}
            every year through a distribution layer that still runs on screenshots, paper receipts, and trust.
          </p>
        </div>

        {/* Right Side: Poppins Light-Italics 36px */}
        <div className="w-full lg:w-[45%] flex justify-end">
          <p 
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "36px",
              fontWeight: 300, // Light
              fontStyle: "italic",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
              textAlign: "right",
              maxWidth: "600px",
            }}
          >
            Tradon is the system of record sitting underneath all of it without forcing your distributors to learn a new app.
          </p>
        </div>

      </div>
    </section>
  );
};
