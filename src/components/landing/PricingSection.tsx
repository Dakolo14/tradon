"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Feature {
  name: string;
  starter: boolean;
  pro: boolean;
  enterprise: boolean;
}

const ALL_FEATURES: Feature[] = [
  { name: "Centralized Workspace", starter: true, pro: true, enterprise: true },
  { name: "Task Management", starter: true, pro: true, enterprise: true },
  { name: "Secure File Sharing (up to 5GB)", starter: true, pro: true, enterprise: true },
  { name: "Built-In Chat", starter: true, pro: true, enterprise: true },
  { name: "Analytics Dashboard", starter: false, pro: true, enterprise: true },
  { name: "Real-Time Collaboration", starter: false, pro: true, enterprise: true },
  { name: "Seamless Integrations", starter: false, pro: true, enterprise: true },
  { name: "Priority Support", starter: false, pro: false, enterprise: true },
];

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const isAnnual = billingCycle === "annually";

  // Display prices matching user screenshot:
  // Monthly: $300, $600, $1250
  // Annual (with 20% discount): $240, $480, $1000
  const starterPrice = isAnnual ? "240" : "300";
  const proPrice = isAnnual ? "480" : "600";
  const enterprisePrice = isAnnual ? "1000" : "1250";

  return (
    <section 
      id="pricing" 
      style={{
        width: "100%",
        backgroundColor: "#0E3E2B",
        boxSizing: "border-box",
        paddingTop: "96px",
        paddingBottom: "112px",
      }}
    >
      <div 
        className="page-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "48px",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            textAlign: "center",
            marginTop: 0,
            marginBottom: "16px",
          }}
        >
          Run Your Entire Business With One Plan
        </h2>
        
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "17px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#FFFFFF",
            opacity: 0.8,
            textAlign: "center",
            marginTop: 0,
            marginBottom: "36px",
            maxWidth: "680px",
          }}
        >
          No hidden fees or locked-in contracts. Cancel or switch plans anytime.
        </p>

        {/* ============================================================ */}
        {/* BILLING TOGGLE SWITCHER                                      */}
        {/* ============================================================ */}
        <div 
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "9999px",
            padding: "5px",
            marginBottom: "56px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}
        >
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            style={{
              fontFamily: "var(--font-sans)",
              backgroundColor: billingCycle === "monthly" ? "#B2FF00" : "transparent",
              color: "#010F09",
              fontSize: "15px",
              fontWeight: 500,
              padding: "9px 28px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annually")}
            style={{
              fontFamily: "var(--font-sans)",
              backgroundColor: billingCycle === "annually" ? "#B2FF00" : "transparent",
              color: "#010F09",
              fontSize: "15px",
              fontWeight: billingCycle === "annually" ? 600 : 500,
              padding: "9px 22px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
          >
            <span>Annually</span>
            <span
              style={{
                backgroundColor: billingCycle === "annually" ? "#0E3E2B" : "rgba(14,62,43,0.1)",
                color: billingCycle === "annually" ? "#FFFFFF" : "#0E3E2B",
                fontSize: "11px",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "9999px",
              }}
            >
              Save 20%
            </span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* 3 PRICING CARDS GRID                                         */}
        {/* ============================================================ */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1240px]"
          style={{ alignItems: "stretch" }}
        >
          
          {/* ========================================================== */}
          {/* CARD 1: STARTER                                            */}
          {/* ========================================================== */}
          <div 
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "28px",
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              boxSizing: "border-box",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h3 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  marginTop: 0,
                  marginBottom: "6px",
                }}
              >
                Starter
              </h3>
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#0E3E2B",
                  opacity: 0.75,
                  margin: 0,
                }}
              >
                For growing brands entering distribution.
              </p>
            </div>

            {/* Inner Bordered Card */}
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderRadius: "20px",
                border: "1px solid #E5E7EB",
                padding: "24px 20px",
                backgroundColor: "#FFFFFF",
                boxSizing: "border-box",
              }}
            >
              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", marginBottom: "4px" }}>
                <span 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "44px",
                    fontWeight: 700,
                    color: "#0E3E2B",
                    lineHeight: 1,
                  }}
                >
                  ${starterPrice}
                </span>
                <span 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#0E3E2B",
                    opacity: 0.6,
                    marginLeft: "4px",
                  }}
                >
                  /month
                </span>
              </div>
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#0E3E2B",
                  opacity: 0.6,
                  marginTop: 0,
                  marginBottom: "20px",
                }}
              >
                Billed monthly or annually. Cancel anytime.
              </p>

              {/* Divider */}
              <div style={{ width: "100%", borderTop: "1px solid #E5E7EB", marginBottom: "24px" }} />

              {/* Features List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px", flex: 1 }}>
                {ALL_FEATURES.map((feat, index) => {
                  const isAvailable = feat.starter;
                  return (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {isAvailable ? (
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
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div 
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "9999px",
                            backgroundColor: "#F3F4F6",
                            border: "1px solid #E5E7EB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7M7 1L1 7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                      <span 
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          fontWeight: isAvailable ? 500 : 400,
                          color: "#0E3E2B",
                          opacity: isAvailable ? 1 : 0.4,
                        }}
                      >
                        {feat.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <Link href="/register?plan=starter" style={{ display: "block", marginTop: "auto" }}>
                <button
                  type="button"
                  style={{
                    fontFamily: "var(--font-sans)",
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "9999px",
                    backgroundColor: "#B2FF00",
                    color: "#0E3E2B",
                    fontSize: "14px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.15s ease, background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9FE600")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#B2FF00")}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 2: PRO (Featured, Electric Lime Background)           */}
          {/* ========================================================== */}
          <div 
            style={{
              backgroundColor: "#B2FF00",
              borderRadius: "28px",
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
              border: "1px solid rgba(14, 62, 43, 0.2)",
              boxSizing: "border-box",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h3 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  marginTop: 0,
                  marginBottom: "6px",
                }}
              >
                Pro
              </h3>
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#0E3E2B",
                  opacity: 0.85,
                  margin: 0,
                }}
              >
                For scaling brands with large distributor networks.
              </p>
            </div>

            {/* Inner Bordered Card */}
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderRadius: "20px",
                border: "1px solid rgba(14, 62, 43, 0.2)",
                padding: "24px 20px",
                backgroundColor: "#B2FF00",
                boxSizing: "border-box",
              }}
            >
              {/* Price & Badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span 
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "44px",
                      fontWeight: 700,
                      color: "#0E3E2B",
                      lineHeight: 1,
                    }}
                  >
                    ${proPrice}
                  </span>
                  <span 
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#0E3E2B",
                      opacity: 0.7,
                      marginLeft: "4px",
                    }}
                  >
                    /month
                  </span>
                </div>
                
                <span 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: "#0E3E2B",
                    color: "#FFFFFF",
                    padding: "4px 14px",
                    borderRadius: "9999px",
                  }}
                >
                  Most Popular
                </span>
              </div>

              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#0E3E2B",
                  opacity: 0.7,
                  marginTop: 0,
                  marginBottom: "20px",
                }}
              >
                Billed monthly or annually. Cancel anytime.
              </p>

              {/* Divider */}
              <div style={{ width: "100%", borderTop: "1px solid rgba(14, 62, 43, 0.2)", marginBottom: "24px" }} />

              {/* Features List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px", flex: 1 }}>
                {ALL_FEATURES.map((feat, index) => {
                  const isAvailable = feat.pro;
                  return (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {isAvailable ? (
                        <div 
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "9999px",
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#0E3E2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div 
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "9999px",
                            backgroundColor: "rgba(14, 62, 43, 0.12)",
                            border: "1px solid rgba(14, 62, 43, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7M7 1L1 7" stroke="#0E3E2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                          </svg>
                        </div>
                      )}
                      <span 
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          fontWeight: isAvailable ? 500 : 400,
                          color: "#0E3E2B",
                          opacity: isAvailable ? 1 : 0.4,
                        }}
                      >
                        {feat.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <Link href="/register?plan=pro" style={{ display: "block", marginTop: "auto" }}>
                <button
                  type="button"
                  style={{
                    fontFamily: "var(--font-sans)",
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "9999px",
                    backgroundColor: "#0E3E2B",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.15s ease, background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#14563c")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E3E2B")}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* ========================================================== */}
          {/* CARD 3: ENTREPRISE                                         */}
          {/* ========================================================== */}
          <div 
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "28px",
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              boxSizing: "border-box",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h3 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  marginTop: 0,
                  marginBottom: "6px",
                }}
              >
                Entreprise
              </h3>
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#0E3E2B",
                  opacity: 0.75,
                  margin: 0,
                }}
              >
                Tailored solutions for large-scale businesses
              </p>
            </div>

            {/* Inner Bordered Card */}
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderRadius: "20px",
                border: "1px solid #E5E7EB",
                padding: "24px 20px",
                backgroundColor: "#FFFFFF",
                boxSizing: "border-box",
              }}
            >
              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", marginBottom: "4px" }}>
                <span 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "44px",
                    fontWeight: 700,
                    color: "#0E3E2B",
                    lineHeight: 1,
                  }}
                >
                  ${enterprisePrice}
                </span>
                <span 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#0E3E2B",
                    opacity: 0.6,
                    marginLeft: "4px",
                  }}
                >
                  /month
                </span>
              </div>
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#0E3E2B",
                  opacity: 0.6,
                  marginTop: 0,
                  marginBottom: "20px",
                }}
              >
                Billed monthly or annually. Cancel anytime.
              </p>

              {/* Divider */}
              <div style={{ width: "100%", borderTop: "1px solid #E5E7EB", marginBottom: "24px" }} />

              {/* Features List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px", flex: 1 }}>
                {ALL_FEATURES.map((feat, index) => {
                  const isAvailable = feat.enterprise;
                  return (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {isAvailable ? (
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
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div 
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "9999px",
                            backgroundColor: "#F3F4F6",
                            border: "1px solid #E5E7EB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7M7 1L1 7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                      <span 
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          fontWeight: isAvailable ? 500 : 400,
                          color: "#0E3E2B",
                          opacity: isAvailable ? 1 : 0.4,
                        }}
                      >
                        {feat.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <Link href="/register?plan=enterprise" style={{ display: "block", marginTop: "auto" }}>
                <button
                  type="button"
                  style={{
                    fontFamily: "var(--font-sans)",
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "9999px",
                    backgroundColor: "#B2FF00",
                    color: "#0E3E2B",
                    fontSize: "14px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.15s ease, background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9FE600")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#B2FF00")}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
