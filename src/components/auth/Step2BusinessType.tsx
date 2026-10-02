import React from "react";
import { ArrowLeft } from "lucide-react";
import { RadioCard } from "../common/RadioCard";
import { RegisterFormData } from "./types";
import { ProgressBar } from "./ProgressBar";

interface Step2Props {
  data: RegisterFormData;
  updateData: (updates: Partial<RegisterFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2BusinessType: React.FC<Step2Props> = ({
  data,
  updateData,
  onNext,
  onPrev,
}) => {
  const businessTypes = [
    {
      id: "fmcg",
      title: "FMCG Brand / Manufacturer",
      desc: "You make products and want to control how distributors & retailers order from you.",
    },
    {
      id: "distributor",
      title: "Distributor / Wholesaler",
      desc: "You buy in bulk and resell to a network of retailers in your region.",
    },
    {
      id: "retailer",
      title: "Retailer Chain",
      desc: "You run multiple outlets and want to streamline how they reorder stock.",
    },
    {
      id: "trading",
      title: "Trading / Import-Export Company",
      desc: "You source and supply goods across multiple channels and partners.",
    },
    {
      id: "others",
      title: "Others",
      desc: "",
    },
  ];

  const isFormValid = data.businessType !== "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "550px",
        marginInline: "auto",
        paddingBlock: "40px",
        paddingInline: "16px",
        height: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        justifyContent: "center",
      }}
    >
      <ProgressBar currentStep={2} totalSteps={5} />

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
          marginBottom: "24px",
          width: "fit-content",
          padding: 0,
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "#0E3E2B",
            lineHeight: "1.2",
            margin: 0,
          }}
        >
          What best describes your business?
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(14,62,43,0.7)",
            margin: 0,
          }}
        >
          This decides how your portal is configured and what your buyers can do.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
        {businessTypes.map((type) => (
          <RadioCard
            key={type.id}
            title={type.title}
            description={type.desc}
            selected={data.businessType === type.id}
            onClick={() => updateData({ businessType: type.id })}
          />
        ))}

        <div style={{ marginTop: "32px" }}>
          <button
            onClick={() => {
              if (isFormValid) onNext();
            }}
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "9999px",
              backgroundColor: "#0E3E2B",
              color: "#FFFFFF",
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#154E38")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E3E2B")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
