import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { FormInput } from "../common/FormInput";
import { FormSelect } from "../common/FormSelect";
import { RegisterFormData } from "./types";
import { ProgressBar } from "./ProgressBar";
import { useAuth } from "@/context/AuthContext";

interface Step4Props {
  data: RegisterFormData;
  updateData: (updates: Partial<RegisterFormData>) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

export const Step4Finalize: React.FC<Step4Props> = ({
  data,
  updateData,
  onSubmit,
  onPrev,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const isFormValid =
    data.workEmail.trim() !== "" &&
    data.phoneNumber.trim() !== "" &&
    data.password.trim() !== "" &&
    data.confirmPassword.trim() !== "" &&
    data.password === data.confirmPassword &&
    data.location !== "" &&
    data.agreedToTerms;

  const { login } = useAuth();

  const handleSubmit = () => {
    if (isFormValid) {
      setShowErrors(false);
      
      // Update global context with registered data
      const planLabel = data.selectedPlan === "starter" ? "Starter plan" : data.selectedPlan === "enterprise" ? "Enterprise plan" : "Growth plan";
      login({
        businessName: data.businessName || "New Business",
        userName: data.workEmail.split("@")[0],
        workspaceRole: planLabel,
        email: data.workEmail
      });
      
      onSubmit();
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
        paddingBlock: "24px",
        paddingInline: "16px",
        height: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        justifyContent: "center",
      }}
    >
      <ProgressBar currentStep={5} totalSteps={5} />

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

      {/* Chosen Plan Trial Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F4FAF2",
          border: "1.5px solid rgba(14,62,43,0.18)",
          borderRadius: "12px",
          padding: "10px 14px",
          marginBottom: "18px",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", textTransform: "uppercase", fontWeight: 600 }}>
            Chosen Plan:
          </span>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>
            {data.selectedPlan === "starter" ? "Starter Plan ($300/mo)" : data.selectedPlan === "enterprise" ? "Entreprise Plan ($1,250/mo)" : "Pro Plan ($600/mo)"}
          </div>
        </div>
        <span
          style={{
            backgroundColor: "#B2FF00",
            color: "#0E3E2B",
            fontSize: "11px",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "9999px",
          }}
        >
          30-DAY FREE TRIAL
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 600,
            color: "#0E3E2B",
            lineHeight: "1.2",
            margin: 0,
          }}
        >
          Finalize your account
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(14,62,43,0.7)",
            margin: 0,
          }}
        >
          Set up your workspace administrator credentials. $0 charged today.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", flexGrow: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <FormInput
            label="Work Email Address"
            placeholder="you@company.com"
            type="email"
            value={data.workEmail}
            onChange={(e) => updateData({ workEmail: e.target.value })}
            error={showErrors && data.workEmail.trim() === "" ? "Required" : ""}
          />
          <FormInput
            label="Phone Number"
            placeholder="+1 234 567 8900"
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => updateData({ phoneNumber: e.target.value })}
            error={showErrors && data.phoneNumber.trim() === "" ? "Required" : ""}
          />
        </div>

        <FormInput
          label="Password"
          placeholder="Password"
          isPassword
          value={data.password}
          onChange={(e) => updateData({ password: e.target.value })}
          error={showErrors && data.password.trim() === "" ? "Required" : ""}
        />

        <FormInput
          label="Confirm Password"
          placeholder="Confirm Password"
          isPassword
          value={data.confirmPassword}
          onChange={(e) => updateData({ confirmPassword: e.target.value })}
          error={
            showErrors && data.confirmPassword.trim() === "" 
              ? "Required" 
              : data.confirmPassword && data.password !== data.confirmPassword
                ? "Passwords do not match"
                : ""
          }
        />

        <FormSelect
          label="Location"
          placeholder="Location"
          options={[
            { label: "Nigeria (English)", value: "NG" },
            { label: "Ghana (English)", value: "GH" },
            { label: "Kenya (English)", value: "KE" },
            { label: "South Africa (English)", value: "ZA" },
          ]}
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
          error={showErrors && data.location === "" ? "Required" : ""}
        />

        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            marginTop: "16px",
            cursor: "pointer",
          }}
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
            <input
              type="checkbox"
              checked={data.agreedToTerms}
              onChange={(e) => updateData({ agreedToTerms: e.target.checked })}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "4px",
                border: `1px solid ${data.agreedToTerms ? "#84CC16" : (showErrors && !data.agreedToTerms ? "#EF4444" : "rgba(14,62,43,0.3)")}`,
                backgroundColor: data.agreedToTerms ? "#84CC16" : "transparent",
                appearance: "none",
                WebkitAppearance: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
            {data.agreedToTerms && (
              <svg
                style={{
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  pointerEvents: "none",
                }}
                fill="none"
                stroke="#FFFFFF"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span
            style={{
              fontSize: "13px",
              color: "rgba(14,62,43,0.8)",
              lineHeight: "1.6",
              userSelect: "none",
            }}
          >
            I agree to Tradon's{" "}
            <span style={{ color: "#0E3E2B", fontWeight: 500 }}>Terms</span>,{" "}
            <span style={{ color: "#0E3E2B", fontWeight: 500 }}>Privacy Policy</span>,
            and{" "}
            <span style={{ color: "#0E3E2B", fontWeight: 500 }}>E-Sign Consent</span>.
          </span>
        </label>

        <div style={{ marginTop: "32px" }}>
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "9999px",
              backgroundColor: "#0E3E2B",
              color: "#FFFFFF",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#154E38")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E3E2B")}
          >
            Start 30-Day Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};
