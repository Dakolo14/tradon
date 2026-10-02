import React from "react";
import Image from "next/image";

export const AuthLeftPanel: React.FC = () => {
  const benefits = [
    "First month free (30-day trial)",
    "No credit card required to start",
    "Live Tradon AI Analytic Tool",
    "Cancel or switch plans anytime",
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingInline: "20px",
        paddingBlock: "42px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "40px",
          overflow: "hidden",
          backgroundColor: "#0E3E2B",
        }}
      >
        {/* Background Image */}
        <Image
          src="/images/auth-bg.jpg"
          alt="Warehouse Operations"
          fill
          style={{ objectFit: "cover", opacity: 0.55 }}
          priority
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #0E3E2B 5%, rgba(14,62,43,0.55) 50%, transparent 100%)",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "32px",
            paddingBottom: "42px",
          }}
        >
          {/* Logo */}
          <Image
            src="/logo-white.png"
            alt="Tradon"
            width={165}
            height={48}
            style={{ objectFit: "contain", objectPosition: "left" }}
            priority
          />

          {/* Bottom Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              maxWidth: "420px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "40px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Join 500+ FMCG brands running smarter distribution
            </h1>
            <p
              style={{
                fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "rgba(255,255,255,0.9)",
                margin: 0,
              }}
            >
              Register your business and get your entire distribution network
              live in 3 days — no technical setup required.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#FFFFFF",
                  }}
                >
                  {/* Green circle tick — same as PricingSection */}
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "9999px",
                      backgroundColor: "#84CC16",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
