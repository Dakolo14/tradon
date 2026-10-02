import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";
import { FormInput } from "../common/FormInput";
import { FormSelect } from "../common/FormSelect";
import { RegisterFormData } from "./types";
import { ProgressBar } from "./ProgressBar";

interface Step1Props {
  data: RegisterFormData;
  updateData: (updates: Partial<RegisterFormData>) => void;
  onNext: () => void;
}

export const Step1BusinessInfo: React.FC<Step1Props> = ({
  data,
  updateData,
  onNext,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const isFormValid =
    data.businessName.trim() !== "" &&
    data.cacNumber.trim() !== "" &&
    data.numDistributors !== "";

  const handleNext = () => {
    if (isFormValid) {
      setShowErrors(false);
      onNext();
    } else {
      setShowErrors(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
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
      <ProgressBar currentStep={1} totalSteps={5} />

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          fontWeight: 500,
          color: "rgba(14,62,43,0.8)",
          textDecoration: "none",
          marginBottom: "24px",
          width: "fit-content",
        }}
      >
        <ArrowLeft size={16} /> Back to Landing Page
      </Link>

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
          Tell us about your business
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(14,62,43,0.7)",
            margin: 0,
          }}
        >
          This sets up your branded workspace and the right portal for your buyers.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          padding: "16px",
          borderRadius: "12px",
          backgroundColor: "#E8F8D4",
          marginBottom: "32px",
          border: "1px solid rgba(168,219,54,0.3)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "9999px",
            backgroundColor: "#0E3E2B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "#FFFFFF",
          }}
        >
          <Box size={18} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingTop: "4px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B", margin: 0 }}>
            Just want a simple online store?
          </h4>
          <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.8)", margin: 0 }}>
            No distributor network needed. Just register!
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", flexGrow: 1 }}>
        <FormInput
          label="Business / Brand name"
          placeholder="e.g Business Name"
          value={data.businessName}
          onChange={(e) => updateData({ businessName: e.target.value })}
          error={showErrors && data.businessName.trim() === "" ? "Required" : ""}
        />

        <FormInput
          label="CAC / Registration Number"
          placeholder="RC - 123456"
          value={data.cacNumber}
          onChange={(e) => updateData({ cacNumber: e.target.value })}
          error={showErrors && data.cacNumber.trim() === "" ? "Required" : ""}
        />

        <FormSelect
          label="Approximate number of distributors"
          placeholder="Range"
          options={[
            { label: "1 - 10", value: "1-10" },
            { label: "11 - 50", value: "11-50" },
            { label: "51 - 200", value: "51-200" },
            { label: "201+", value: "201+" },
          ]}
          value={data.numDistributors}
          onChange={(e) => updateData({ numDistributors: e.target.value })}
          error={showErrors && data.numDistributors === "" ? "Required" : ""}
        />

        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.8)", margin: 0 }}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                fontWeight: 600,
                color: "#0E3E2B",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </p>

          <button
            onClick={handleNext}
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
