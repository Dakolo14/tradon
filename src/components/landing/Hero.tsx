"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Hero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "60px",
        paddingBottom: "120px",
        width: "100%",
      }}
    >


      {/* Main 1440px Container centered with 70px page padding */}
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "70px",
          paddingRight: "70px",
          position: "relative",
          zIndex: 1,
          boxSizing: "border-box",
        }}
      >
        {/* Title, Subtitle, and Button Column: Strictly Centered */}
        <div
          style={{
            width: "100%",
            maxWidth: "860px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Main Headline: Poppins Regular, #0E3E2B */}
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "72px",
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#0E3E2B",
            }}
          >
            Distribute with impact.
            <br />
            Deliver at scale.
          </h1>

          {/* Subtitle: Poppins Regular, 20px, #0E3E2B */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#0E3E2B",
              marginTop: "22px",
              maxWidth: "760px",
            }}
          >
            One platform where FMCG brands, distributors, and retailers manage
            <br />
            every order together.
          </p>

          {/* Hero CTA Button: Poppins Medium 24px, 48px inline, 18px block */}
          <div style={{ marginTop: "36px" }}>
            <Link href="/register">
              <button className="btn-hero-cta">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Large Rounded Gray Wireframe Box Container: Centered and spaced down more */}
        <div
          style={{
            marginTop: "96px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1300px",
              height: "640px",
              borderRadius: "40px",
              backgroundColor: "#737373",
              transition: "all 0.2s ease",
            }}
          />
        </div>
      </div>
    </section>
  );
};
