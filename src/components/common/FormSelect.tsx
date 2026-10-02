import React, { forwardRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FormSelectOption {
  label: string;
  value: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: FormSelectOption[];
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, placeholder, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "8px" }}>
        {label && (
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#0E3E2B",
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
          <select
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            style={{
              width: "100%",
              paddingInline: "20px",
              paddingBlock: "14px",
              paddingRight: "48px",
              borderRadius: "9999px",
              border: `1px solid ${error ? "#EF4444" : isFocused ? "#0E3E2B" : "rgba(14,62,43,0.2)"}`,
              backgroundColor: "transparent",
              fontSize: "14px",
              color: "#0E3E2B",
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              outline: "none",
              transition: "border-color 0.2s ease",
              cursor: "pointer",
              appearance: "none" as const,
              WebkitAppearance: "none" as const,
              boxSizing: "border-box",
              ...style,
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div
            style={{
              position: "absolute",
              right: "20px",
              pointerEvents: "none",
              color: "#0E3E2B",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronDown size={18} />
          </div>
        </div>
        {error && (
          <span style={{ fontSize: "12px", color: "#EF4444" }}>{error}</span>
        )}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";
