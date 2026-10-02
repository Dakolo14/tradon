"use client";

import React from "react";
import Image from "next/image";

export const CtaBanner: React.FC = () => {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "var(--color-page-bg, #FFFFFF)",
        paddingBlock: "10rem",
        boxSizing: "border-box",
      }}
    >
      <div
        className="page-container"
        style={{
          width: "100%",
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* ============================================================ */}
        {/* CTA BANNER CARD: Rounded, Inner Shadow + 35% Overlay         */}
        {/* ============================================================ */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1300px",
            minHeight: "560px",
            height: "680px",
            margin: "0 auto",
            borderRadius: "32px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px 24px",
            boxSizing: "border-box",
          }}
        >
          {/* Background Image */}
          <Image
            src="/images/cta.jpg"
            alt="Stop guessing numbers. Move onto Tradon."
            fill
            className="object-cover object-center"
            priority
          />

          {/* Black to 35% Overlay + Figma Inner Shadow (X:0, Y:0, Blur:80, Spread:20, #557C06 100%) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.35)",
              boxShadow: "inset 0px 0px 80px 20px #557C06",
              borderRadius: "inherit",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Text & Action Button Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                margin: 0,
                textAlign: "center",
              }}
            >
              Stop guessing numbers.
              <br />
              Move onto{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Tradon
              </span>
              .
            </h2>

            <button
              className="btn-cta-banner"
              style={{
                marginTop: "36px",
              }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Get Tradon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
