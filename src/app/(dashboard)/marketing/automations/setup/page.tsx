"use client";

import React, { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const amounts = [
  { id: 25000, value: "NGN 25,000", messages: "Up to 543 WhatsApp messages" },
  { id: 50000, value: "NGN 50,000", messages: "Up to 1,086 WhatsApp messages" },
  { id: 100000, value: "NGN 100,000", messages: "Up to 2,173 WhatsApp messages", recommended: true },
  { id: 200000, value: "NGN 200,000", messages: "Up to 4,347 WhatsApp messages" },
  { id: "custom", value: "Custom", messages: "Set your own limit" },
];

export default function SetupTopUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [balanceDropLimit, setBalanceDropLimit] = useState("10000");
  const [selectedAmount, setSelectedAmount] = useState<number | string>(100000);

  const handleContinue = () => {
    if (step === 1) setStep(2);
    else router.push("/marketing/automations");
  };

  const getAmountString = () => {
    if (selectedAmount === "custom") return "Custom amount";
    return `NGN ${selectedAmount.toLocaleString()}`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>
      <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        
        {/* Header / Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
          <button 
            onClick={() => step === 1 ? router.push("/marketing/automations") : setStep(1)}
            style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0E3E2B", cursor: "pointer" }}
            className="hover:bg-black/5"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              onClick={() => router.push("/marketing/automations")}
              style={{ backgroundColor: "transparent", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "9999px", padding: "8px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
              className="hover:bg-black/5"
            >
              Close
            </button>
            <button 
              onClick={handleContinue}
              style={{ backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", borderRadius: "9999px", padding: "8px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
              className="hover:bg-gray-100"
            >
              {step === 1 ? "Continue" : "Enable"}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Main Content Area */}
          <div style={{ flex: "1 1 500px" }}>
            
            {step === 1 ? (
              <>
                <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Set automatic top-up amount</h1>
                <p style={{ fontSize: "15px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "32px" }}>Choose how much to automatically add to your messaging balance when it gets low.</p>
                
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>When balance drops to</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)", fontSize: "14px" }}>NGN</span>
                    <input 
                      type="text" 
                      value={balanceDropLimit}
                      onChange={(e) => setBalanceDropLimit(e.target.value)}
                      style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "8px", padding: "14px 16px 14px 56px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                      className="focus:border-[#A3FF00]"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", marginBottom: "4px" }}>Automatically top up with</label>
                  
                  {amounts.map((amount) => (
                    <div 
                      key={amount.id}
                      onClick={() => setSelectedAmount(amount.id)}
                      style={{ 
                        backgroundColor: selectedAmount === amount.id ? "rgba(14,62,43,0.03)" : "#FFFFFF", 
                        border: selectedAmount === amount.id ? "2px solid #0E3E2B" : "1.5px solid rgba(14,62,43,0.12)", 
                        borderRadius: "8px", 
                        padding: "16px", 
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: selectedAmount === amount.id ? "0 4px 14px rgba(14,62,43,0.06)" : "none",
                        transition: "all 0.15s ease"
                      }}
                      className="hover:border-[#0E3E2B]/40 transition-colors"
                    >
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: selectedAmount === amount.id ? 700 : 600, color: "#0E3E2B", marginBottom: "4px" }}>
                          {amount.value}
                        </div>
                        <div style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)" }}>
                          {amount.messages}
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {amount.recommended && (
                          <div style={{ fontSize: "11px", color: "#0E3E2B", backgroundColor: "rgba(14,62,43,0.08)", padding: "4px 8px", borderRadius: "4px", fontWeight: 700 }}>
                            Recommended
                          </div>
                        )}
                        <div 
                          style={{ 
                            width: "18px", 
                            height: "18px", 
                            borderRadius: "50%", 
                            border: selectedAmount === amount.id ? "5px solid #0E3E2B" : "2px solid rgba(14,62,43,0.25)",
                            backgroundColor: "#FFFFFF",
                            transition: "all 0.15s ease"
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Confirm automatic top-up payment method</h1>
                <p style={{ fontSize: "15px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "32px" }}>Select your payment method and confirm your automatic top-up set up.</p>
                
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    
                    <div style={{ gridColumn: "span 2" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Card holder full name</label>
                      <input 
                        type="text" 
                        placeholder="Add card holder full name"
                        style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "8px", padding: "14px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                      />
                    </div>
                    
                    <div style={{ gridColumn: "span 2" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Card number</label>
                      <input 
                        type="text" 
                        placeholder="Credit or debit card number"
                        style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "8px", padding: "14px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Expiry date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "8px", padding: "14px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>CVV</label>
                      <input 
                        type="text" 
                        placeholder="3 digits"
                        style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "8px", padding: "14px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                      />
                    </div>

                  </div>
                </div>

                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "16px", padding: "24px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Billing details</h3>
                  <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)", margin: 0, marginBottom: "24px" }}>Provide the details that you would like to appear on your invoice.</p>
                  
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Account type</label>
                    <select style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "8px", padding: "14px", color: "#0E3E2B", fontSize: "14px", outline: "none", appearance: "none" }}>
                      <option>Distributor / Enterprise</option>
                      <option>Sole Trader</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div style={{ width: "320px", flexShrink: 0, backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "13px", color: "rgba(14,62,43,0.8)" }}>
              <span>Top-up amount</span>
              <span>{getAmountString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid rgba(14,62,43,0.08)", fontSize: "13px", color: "rgba(14,62,43,0.4)" }}>
              <span>Subtotal</span>
              <span>{getAmountString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", marginBottom: "24px" }}>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#0E3E2B" }}>Total</span>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#0E3E2B" }}>{getAmountString()}</span>
            </div>

            <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", margin: 0, lineHeight: "1.5" }}>
              <strong style={{ color: "#0E3E2B" }}>{getAmountString()}</strong> will be added automatically each time your balance drops to <strong style={{ color: "#0E3E2B" }}>NGN {Number(balanceDropLimit).toLocaleString()}</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
