"use client";

import React, { useState } from "react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 1,
    title: "Manage every order in real time",
    description:
      "From WhatsApp messages to web requests — every distributor order lands in one place, auto-confirmed, auto-invoiced, and tracked from placement to delivery. No calls. No chaos.",
  },
  {
    id: 2,
    title: "Control your cash flow",
    description:
      "Instant settlement tracking, credit limit enforcement, and automated payment reminders so you always know your receivables balance.",
  },
  {
    id: 3,
    title: "Know where your team is, always",
    description:
      "Live GPS tracking, route optimization, and beat check-in analytics for field reps visiting distributors and retail stockists.",
  },
  {
    id: 4,
    title: "Your morning brief is fully automated",
    description:
      "Daily automated executive digests summarizing yesterday's shipments, out-of-stock SKUs, and pending approvals directly in your inbox.",
  },
  {
    id: 5,
    title: "Run trade promotions without the leakage",
    description:
      "Design targeted trade discounts, volume rebates, and retailer incentives with hard automated validation at invoicing.",
  },
];

export const DistributionFeaturesSection: React.FC = () => {
  // First item open by default, matching wireframe
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      style={{
        width: "100%",
        backgroundColor: "var(--color-page-bg, #FFFFFF)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div 
        className="w-full flex flex-col lg:flex-row lg:min-h-[903px]"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* ============================================================ */}
        {/* LEFT COLUMN: 50% width (720px at 1440px), Body Color (#FFFFFF) */}
        {/* ============================================================ */}
        <div 
          className="w-full lg:w-1/2 flex justify-start items-center py-16 sm:py-20 lg:py-0 dist-left-column"
          style={{
            backgroundColor: "var(--color-page-bg, #FFFFFF)",
          }}
        >
          <div 
            style={{
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Category Eyebrow */}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#0E3E2B",
                opacity: 0.7,
                display: "block",
                marginBottom: "16px",
              }}
            >
              DISTRIBUTION MANAGEMENT
            </span>

            {/* Main Section Headline */}
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "48px",
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#0E3E2B",
                marginTop: 0,
                marginBottom: "48px",
              }}
            >
              See your entire network
              <br />
              click into place
            </h2>

            {/* Feature Accordion Items */}
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
              }}
            >
              {FEATURE_ITEMS.map((item) => {
                const isOpen = activeId === item.id;

                return (
                  <div
                    key={item.id}
                    className="cursor-pointer select-none group"
                    style={{
                      transition: "opacity 0.2s ease",
                    }}
                    onClick={() => toggleItem(item.id)}
                  >
                    {/* Item Title & Plus Icon */}
                    <div 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "20px",
                          fontWeight: 500,
                          color: "#0E3E2B",
                          letterSpacing: "-0.01em",
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "24px",
                          fontWeight: 300,
                          lineHeight: 1,
                          color: "#0E3E2B",
                          width: "28px",
                          height: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "transform 250ms ease-in-out",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </div>

                    {/* Expandable Description */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                        transition: "grid-template-rows 300ms ease-in-out, opacity 250ms ease-in-out",
                      }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "15px",
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: "#0E3E2B",
                            opacity: 0.8,
                            marginTop: "12px",
                            marginBottom: "8px",
                            maxWidth: "500px",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Exact 720px by 903px Flat Green Block          */}
        {/* ============================================================ */}
        <div 
          className="w-full lg:w-1/2 flex items-center justify-center min-h-[460px] lg:min-h-[903px] lg:h-[903px]"
          style={{
            backgroundColor: "#A3DBB5", // Exact Figma wireframe green
            boxSizing: "border-box",
            padding: "40px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "44px",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#0E3E2B",
              textAlign: "center",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Gif On How the App Works
          </p>
        </div>
      </div>
    </section>
  );
};
