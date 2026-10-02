import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, X } from "lucide-react";
import { RegisterFormData } from "./types";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface Step5Props {
  data: RegisterFormData;
}

export const Step5Success: React.FC<Step5Props> = ({ data }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = showVideo ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
      onClick={() => setShowVideo(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "16/9",
          backgroundColor: "#000",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowVideo(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            backgroundColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
        >
          <X size={24} />
        </button>
        <video
          src="/videos/hero_distribution.mp4"
          controls
          autoPlay
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "600px",
          marginInline: "auto",
          paddingBlock: "40px",
          paddingInline: "16px",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          boxSizing: "border-box",
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        }}
      >
        {/* Decorative success animation */}
        <div
          style={{
            width: "200px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            position: "relative",
          }}
        >
          <DotLottieReact
            src="/success.json"
            autoplay
            loop
            style={{ 
              width: "100%", 
              height: "100%",
              transform: "scale(1.6)",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            color: "#0E3E2B",
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          Account Created Successfully!
        </h1>
        
        <div
          style={{
            backgroundColor: "#F4FAF2",
            border: "1.5px solid rgba(14,62,43,0.18)",
            borderRadius: "12px",
            padding: "12px 18px",
            marginBottom: "28px",
            maxWidth: "440px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#0E3E2B", marginBottom: "3px" }}>
            {data.selectedPlan === "starter" ? "Starter Plan" : data.selectedPlan === "enterprise" ? "Entreprise Plan" : "Pro Plan"} • 30-Day Free Trial
          </div>
          <div style={{ fontSize: "12px", color: "rgba(14,62,43,0.7)" }}>
            Your first month is free ($0 charged today). Enjoy full enterprise access to your new workspace.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "320px" }}>
          <button
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "9999px",
              backgroundColor: "transparent",
              color: "#0E3E2B",
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              border: "1px solid rgba(14,62,43,0.4)",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onClick={() => setShowVideo(true)}
          >
            Watch Demo
          </button>
          <Link href="/dashboard" style={{ flex: 1, textDecoration: "none" }}>
            <button
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
            >
              Go To Dashboard
            </button>
          </Link>
        </div>
      </div>
      {mounted && showVideo ? createPortal(modalContent, document.body) : null}
    </>
  );
};
