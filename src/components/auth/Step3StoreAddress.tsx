import React, { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import { FormInput } from "../common/FormInput";
import { RegisterFormData } from "./types";
import { ProgressBar } from "./ProgressBar";

interface Step3Props {
  data: RegisterFormData;
  updateData: (updates: Partial<RegisterFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3StoreAddress: React.FC<Step3Props> = ({
  data,
  updateData,
  onNext,
  onPrev,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (!data.storeAddress && data.businessName) {
      const suggested = data.businessName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      updateData({ storeAddress: suggested });
    }
  }, []);

  const handleNext = () => {
    setShowErrors(true);
    if (data.storeAddress.trim() !== "") {
      onNext();
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
      <ProgressBar currentStep={3} totalSteps={5} />

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
          Claim your store address
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(14,62,43,0.7)",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          This is the web address your distributors and retailers will visit to
          log in and order from {data.businessName || "{Business Name}"}.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", flexGrow: 1 }}>
        <FormInput
          label="Your store address"
          placeholder="{Business Name}"
          value={data.storeAddress}
          onChange={(e) => updateData({ storeAddress: e.target.value })}
          error={showErrors && data.storeAddress.trim() === "" ? "Required" : ""}
          suffix={
            <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingRight: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#0E3E2B" }}>
                .tradon.app
              </span>
              <CheckCircle2 size={16} color="#84CC16" />
            </div>
          }
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "#E8F8D4",
            border: "1px solid rgba(168,219,54,0.3)",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "9999px",
              backgroundColor: "#0E3E2B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#FFFFFF",
              marginTop: "2px",
            }}
          >
            <Info size={12} />
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(14,62,43,0.8)",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Your buyers create their own accounts on your storefront — their
            logins are separate from your Tradon admin login.
          </p>
        </div>

        <div style={{ marginTop: "32px" }}>
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
            Claim Address
          </button>
        </div>
      </div>
    </div>
  );
};
