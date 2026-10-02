"use client";

import React, { useState } from "react";
import { Star, Download, CheckCircle2, X, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const MorningBriefCard = () => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [briefIndex, setBriefIndex] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("+234 803 555 0192");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const briefs = [
    {
      title: (
        <>
          Good morning. Yesterday Chi shipped{" "}
          <span style={{ color: "#A3FF00" }}>1,247 orders</span> across 18 states, generating{" "}
          <span style={{ color: "#A3FF00" }}>₦43.2M</span> in revenue.
        </>
      ),
      body: "Kano is 57% below target — Yusuf Ibrahim needs support. 23 distributors are overdue (₦8.1M). Top performer: Emeka Okafor at 187% of target.",
    },
    {
      title: (
        <>
          Mid-day dispatch update. Fleet dispatched{" "}
          <span style={{ color: "#A3FF00" }}>8,420 cartons</span> from Apapa & Ikeja depots, tracking{" "}
          <span style={{ color: "#A3FF00" }}>₦51.8M</span> in confirmed GMV.
        </>
      ),
      body: "Lagos Island wholesale corridor cleared all pending backorders. 4 key supermarket accounts confirmed receipt (Shoprite & Justrite). Stockout risk mitigated for Chivita 1L.",
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setBriefIndex((prev) => (prev + 1) % briefs.length);
      setIsRegenerating(false);
      showToast("AI Morning Brief refreshed with latest depot telemetrics!");
    }, 600);
  };

  const currentBrief = briefs[briefIndex];

  return (
    <div
      style={{
        backgroundColor: "#0E3E2B",
        color: "#FFFFFF",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        position: "relative",
      }}
      className="p-5 sm:p-7 md:p-8 rounded-2xl md:rounded-3xl"
    >
      {/* Toast */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#FFFFFF",
          color: "#0E3E2B",
          padding: "12px 20px",
          borderRadius: "9999px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 9999,
          fontSize: "14px",
          fontWeight: 600,
        }}>
          <CheckCircle2 size={18} color="#16A34A" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <Star size={15} color="#A3FF00" fill="#A3FF00" className={isRegenerating ? "animate-spin" : ""} />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#A3FF00",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          AI MORNING BRIEF
        </span>
      </div>

      <h3
        style={{
          fontWeight: 600,
          color: "#FFFFFF",
          lineHeight: "1.4",
          maxWidth: "800px",
        }}
        className="text-[17px] sm:text-xl md:text-2xl mb-2 sm:mb-3"
      >
        {currentBrief.title}
      </h3>

      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          lineHeight: "1.6",
          maxWidth: "800px",
        }}
        className="text-xs sm:text-sm md:text-base mb-4 sm:mb-6"
      >
        {currentBrief.body}
      </p>

      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }} className="gap-2 sm:gap-3">
        <button
          onClick={handleRegenerate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "9999px",
            color: "#FFFFFF",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="text-xs sm:text-sm py-2 px-3 sm:py-2.5 sm:px-4 hover:bg-white/20"
        >
          <Star size={14} />
          {isRegenerating ? "Analyzing data..." : "Regenerate"}
        </button>

        <button
          onClick={() => setIsReportModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "9999px",
            color: "#FFFFFF",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="text-xs sm:text-sm py-2 px-3 sm:py-2.5 sm:px-4 hover:bg-white/20"
        >
          <Download size={14} />
          Report
        </button>

        <button
          onClick={() => setIsWhatsappModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#A3FF00",
            border: "none",
            borderRadius: "9999px",
            color: "#0E3E2B",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="text-xs sm:text-sm py-2 px-3 sm:py-2.5 sm:px-4 hover:bg-[#8ee600]"
        >
          <FaWhatsapp size={15} />
          WhatsApp
        </button>
      </div>

      {/* Modal: Generate Report */}
      {isReportModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)",
          padding: "16px"
        }}>
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "420px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative",
            color: "#0E3E2B"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Generate Morning Brief Pack
              </h3>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 20px 0" }}>
              Download today's executive performance brief:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setIsReportModalOpen(false);
                  showToast("Morning Brief PDF downloaded!");
                }}
                style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", backgroundColor: "#FFFFFF", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>Executive Summary (PDF)</span>
                <Download size={16} />
              </button>
              <button
                onClick={() => {
                  setIsReportModalOpen(false);
                  showToast("Order Log Spreadsheet (.xlsx) downloaded!");
                }}
                style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", backgroundColor: "#FFFFFF", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>Full Orders Stream (.XLSX)</span>
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Send to WhatsApp */}
      {isWhatsappModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)",
          padding: "16px"
        }}>
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "440px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative",
            color: "#0E3E2B"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaWhatsapp size={20} color="#25D366" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Send Brief via WhatsApp
                </h3>
              </div>
              <button 
                onClick={() => setIsWhatsappModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Broadcast executive briefing to executive phone numbers or WhatsApp management channel:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  WhatsApp Recipient Number
                </label>
                <input
                  type="text"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ padding: "12px", backgroundColor: "#F0F5ED", borderRadius: "10px", fontSize: "12px", color: "rgba(14,62,43,0.8)" }}>
                Message will be delivered instantly with key revenue metrics, overdue summaries, and top performer recognition.
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <button
                  type="button"
                  onClick={() => setIsWhatsappModalOpen(false)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsWhatsappModalOpen(false);
                    showToast(`Morning brief dispatched to WhatsApp (${whatsappPhone})!`);
                  }}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
