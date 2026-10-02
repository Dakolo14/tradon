import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
  prefixNode?: React.ReactNode;
  isPassword?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, error, suffix, prefixNode, isPassword, type, style, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

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
          {prefixNode && (
            <div
              style={{
                position: "absolute",
                left: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: "#0E3E2B",
              }}
            >
              {prefixNode}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
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
              borderRadius: "9999px",
              border: `1px solid ${error ? "#EF4444" : isFocused ? "#0E3E2B" : "rgba(14,62,43,0.2)"}`,
              backgroundColor: "transparent",
              fontSize: "14px",
              color: "#0E3E2B",
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              outline: "none",
              transition: "border-color 0.2s ease",
              boxSizing: "border-box",
              ...(prefixNode ? { paddingLeft: "112px" } : {}),
              ...(suffix || isPassword ? { paddingRight: "52px" } : {}),
              ...style,
            }}
            {...props}
          />
          {(suffix || isPassword) && (
            <div
              style={{
                position: "absolute",
                right: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(14,62,43,0.5)",
              }}
            >
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "inherit",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              ) : (
                suffix
              )}
            </div>
          )}
        </div>
        {error && (
          <span style={{ fontSize: "12px", color: "#EF4444" }}>{error}</span>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
