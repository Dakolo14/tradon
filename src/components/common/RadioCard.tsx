import React from "react";

interface RadioCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  title,
  description,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "24px",
        border: `1px solid ${selected ? "#0E3E2B" : "rgba(14,62,43,0.2)"}`,
        backgroundColor: selected ? "#FFFFFF" : "transparent",
        boxShadow: selected ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h4
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#0E3E2B",
            margin: 0,
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          }}
        >
          {title}
        </h4>
        {description && (
          <p
            style={{
              fontSize: "13px",
              color: "rgba(14,62,43,0.7)",
              margin: 0,
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div
        style={{
          flexShrink: 0,
          width: "20px",
          height: "20px",
          borderRadius: "9999px",
          border: `1.5px solid ${selected ? "#0E3E2B" : "rgba(14,62,43,0.4)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.2s ease",
          marginLeft: "16px",
        }}
      >
        {selected && (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              backgroundColor: "#0E3E2B",
            }}
          />
        )}
      </div>
    </div>
  );
};
