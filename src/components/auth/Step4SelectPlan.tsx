"use client";

import React from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { RegisterFormData } from "./types";
import { ProgressBar } from "./ProgressBar";

interface Step4SelectPlanProps {
  data: RegisterFormData;
  updateData: (updates: Partial<RegisterFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface PlanOption {
  id: "starter" | "pro" | "enterprise";
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  highlightFeatures: string[];
}

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For growing brands entering distribution.",
    monthlyPrice: 300,
    annualPrice: 240,
    popular: false,
    highlightFeatures: [
      "Up to 25 verified Tier-1 distributors",
      "15 Field sales representative seats",
      "2 Central warehouse depots",
      "Daily automated Morning Brief report",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For scaling brands with large distributor networks.",
    monthlyPrice: 600,
    annualPrice: 480,
    popular: true,
    highlightFeatures: [
      "Up to 120 verified distributors & sub-dealers",
      "60 Field sales representative seats",
      "Tradon AI Copilot & route planner",
      "2-Way ERP bridge (SAP, Business Central, Sage)",
    ],
  },
  {
    id: "enterprise",
    name: "Entreprise",
    tagline: "Tailored solutions for large-scale businesses.",
    monthlyPrice: 1250,
    annualPrice: 1000,
    popular: false,
    highlightFeatures: [
      "Unlimited distributors, retailers & field sales reps",
      "Unlimited nationwide plants & depots",
      "Custom algorithmic credit underwriting",
      "Dedicated Technical Account Manager & SLA",
    ],
  },
];

export const Step4SelectPlan: React.FC<Step4SelectPlanProps> = ({
  data,
  updateData,
  onNext,
  onPrev,
}) => {
  const isAnnual = data.billingCycle === "annually";

  const handleSelectPlan = (planId: "starter" | "pro" | "enterprise") => {
    updateData({ selectedPlan: planId });
  };

  const handleToggleBilling = (cycle: "monthly" | "annually") => {
    updateData({ billingCycle: cycle });
  };

  const selectedPlan = PLAN_OPTIONS.find((p) => p.id === data.selectedPlan) || PLAN_OPTIONS[1];
  const displayPrice = isAnnual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "580px",
        marginInline: "auto",
        paddingBlock: "24px",
        paddingInline: "16px",
        height: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
      }}
    >
      <ProgressBar currentStep={4} totalSteps={5} />

      <button
        onClick={onPrev}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          fontWeight: 500,
          color: "rgba(14,62,43,0.8)",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "16px",
          width: "fit-content",
          padding: 0,
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 600,
            color: "#0E3E2B",
            lineHeight: "1.2",
            margin: 0,
          }}
        >
          Choose your subscription plan
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(14,62,43,0.7)",
            margin: 0,
            lineHeight: "1.4",
          }}
        >
          Select a tier to get started. Every plan includes your first month free so you can onboard risk-free.
        </p>
      </div>

      {/* 30-Day Free Trial Notice Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#F4FAF2",
          border: "1.5px solid rgba(14,62,43,0.18)",
          borderRadius: "12px",
          padding: "12px 16px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: "#B2FF00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0E3E2B",
            flexShrink: 0,
          }}
        >
          <Sparkles size={16} />
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>
            First Month Free (30-Day Trial)
          </div>
          <div style={{ fontSize: "12px", color: "rgba(14,62,43,0.7)" }}>
            $0 due today. Full platform access with complete wholesale & field rep tools.
          </div>
        </div>
      </div>

      {/* Billing Cycle Pill Toggle with Save 20% */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "9999px",
            padding: "4px",
            border: "1.5px solid rgba(14,62,43,0.15)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <button
            type="button"
            onClick={() => handleToggleBilling("monthly")}
            style={{
              backgroundColor: !isAnnual ? "#0E3E2B" : "transparent",
              color: !isAnnual ? "#FFFFFF" : "#0E3E2B",
              fontSize: "13px",
              fontWeight: 600,
              padding: "7px 20px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => handleToggleBilling("annually")}
            style={{
              backgroundColor: isAnnual ? "#0E3E2B" : "transparent",
              color: isAnnual ? "#FFFFFF" : "#0E3E2B",
              fontSize: "13px",
              fontWeight: 600,
              padding: "7px 18px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.15s ease",
            }}
          >
            <span>Annually</span>
            <span
              style={{
                backgroundColor: isAnnual ? "#B2FF00" : "rgba(14,62,43,0.1)",
                color: isAnnual ? "#0E3E2B" : "#0E3E2B",
                fontSize: "10px",
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: "9999px",
              }}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Selection Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {PLAN_OPTIONS.map((plan) => {
          const isSelected = data.selectedPlan === plan.id;
          const planPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan.id)}
              style={{
                backgroundColor: isSelected ? "rgba(14,62,43,0.03)" : "#FFFFFF",
                border: isSelected ? "2px solid #0E3E2B" : "1.5px solid rgba(14,62,43,0.14)",
                borderRadius: "16px",
                padding: "16px 20px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: isSelected ? "0 6px 18px rgba(14,62,43,0.08)" : "none",
                transition: "all 0.15s ease",
              }}
              className="hover:border-[#0E3E2B]/50"
            >
              {/* Card Header Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Bold Primary Radio Indicator */}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: isSelected ? "6px solid #0E3E2B" : "2px solid rgba(14,62,43,0.25)",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.15s ease",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "16px", fontWeight: isSelected ? 700 : 600, color: "#0E3E2B" }}>
                        {plan.name}
                      </span>
                      {plan.popular && (
                        <span
                          style={{
                            backgroundColor: "#B2FF00",
                            color: "#0E3E2B",
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "9999px",
                          }}
                        >
                          POPULAR
                        </span>
                      )}
                      <span
                        style={{
                          backgroundColor: "rgba(14,62,43,0.08)",
                          color: "#0E3E2B",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "9999px",
                        }}
                      >
                        1ST MONTH FREE
                      </span>
                    </div>
                    <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)" }}>
                      {plan.tagline}
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end" }}>
                    <span style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B" }}>
                      ${planPrice}
                    </span>
                    <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)", marginLeft: "2px" }}>
                      /mo
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#0E3E2B", fontWeight: 600 }}>
                    $0 for Day 1–30
                  </div>
                </div>
              </div>

              {/* Mini Features List */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "6px",
                  paddingTop: "8px",
                  borderTop: "1px solid rgba(14,62,43,0.08)",
                  paddingLeft: "30px",
                }}
              >
                {plan.highlightFeatures.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: "#0E3E2B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={9} color="#FFFFFF" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: "11.5px", color: "rgba(14,62,43,0.75)" }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trial Terms Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(14,62,43,0.04)",
          borderRadius: "10px",
          padding: "10px 14px",
          marginBottom: "20px",
          fontSize: "12px",
          color: "#0E3E2B",
        }}
      >
        <span>
          Selected: <strong>{selectedPlan.name} Plan</strong> • 30 Days Free
        </span>
        <span style={{ fontWeight: 600 }}>Due Today: $0.00</span>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onNext}
        style={{
          width: "100%",
          height: "52px",
          borderRadius: "9999px",
          backgroundColor: "#0E3E2B",
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: 600,
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(14,62,43,0.15)",
          transition: "opacity 0.2s ease",
          marginBottom: "12px",
        }}
        className="hover:opacity-95"
      >
        Continue to Finalize Account
      </button>

      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "rgba(14,62,43,0.5)",
          margin: 0,
          paddingBottom: "16px",
        }}
      >
        No card charged today. Cancel or switch plans anytime from workspace settings.
      </p>
    </div>
  );
};
