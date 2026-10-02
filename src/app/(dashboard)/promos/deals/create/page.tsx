"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateDealPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1 State
  const [dealType, setDealType] = useState<string | null>(null);

  // Step 2 State
  const [promoName, setPromoName] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountCode, setDiscountCode] = useState("");

  const handleContinue = () => {
    if (step < 3) setStep(step + 1);
    else router.push("/promos/deals");
  };

  const renderStepIndicators = () => (
    <div style={{ display: "flex", width: "100%", gap: "8px", position: "absolute", top: 0, left: 0 }}>
      <div style={{ flex: 1, height: "4px", backgroundColor: step >= 1 ? "#0E3E2B" : "rgba(14,62,43,0.1)" }} />
      <div style={{ flex: 1, height: "4px", backgroundColor: step >= 2 ? "#0E3E2B" : "rgba(14,62,43,0.1)" }} />
      <div style={{ flex: 1, height: "4px", backgroundColor: step >= 3 ? "#0E3E2B" : "rgba(14,62,43,0.1)" }} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>
      
      {renderStepIndicators()}

      <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto", width: "100%", paddingTop: "40px" }}>
        
        {/* Header / Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={() => step === 1 ? router.push("/promos/deals") : setStep(step - 1)}
              style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0E3E2B", cursor: "pointer" }}
              className="hover:bg-black/5"
            >
              <ArrowLeft size={20} />
            </button>
            <span style={{ color: "#0E3E2B", fontSize: "16px", fontWeight: 600 }}>
              {step === 1 && "Select deal type"}
              {step === 2 && "Customize promotion details"}
              {step === 3 && "Set up promotion limits"}
            </span>
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              onClick={() => router.push("/promos/deals")}
              style={{ backgroundColor: "transparent", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "9999px", padding: "8px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
              className="hover:bg-black/5"
            >
              Close
            </button>
            <button 
              onClick={handleContinue}
              disabled={step === 1 && !dealType}
              style={{ backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", borderRadius: "9999px", padding: "8px 24px", fontSize: "14px", fontWeight: 600, cursor: (step === 1 && !dealType) ? "not-allowed" : "pointer", opacity: (step === 1 && !dealType) ? 0.5 : 1 }}
              className="hover:bg-gray-100"
            >
              {step === 3 ? "Create" : "Continue"}
            </button>
          </div>
        </div>

        {/* Step 1: Select Deal Type */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Select deal type</h1>
            <p style={{ fontSize: "15px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "32px" }}>Choose the type of deal you want to create. <a href="#" style={{ color: "#0E3E2B", fontWeight: 600, textDecoration: "underline" }}>Learn more</a></p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div 
                onClick={() => setDealType("promotion")}
                style={{ 
                  backgroundColor: dealType === "promotion" ? "rgba(14,62,43,0.03)" : "#FFFFFF", 
                  border: dealType === "promotion" ? "2px solid #0E3E2B" : "1.5px solid rgba(14,62,43,0.12)", 
                  borderRadius: "12px", 
                  padding: "24px", 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  boxShadow: dealType === "promotion" ? "0 4px 16px rgba(14,62,43,0.08)" : "none",
                  transition: "all 0.15s ease"
                }}
                className="hover:border-[#0E3E2B]/40"
              >
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: dealType === "promotion" ? 700 : 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Promotion</h3>
                  <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.5)", margin: 0 }}>Create a discount redeemed by distributors entering the code when ordering bulk online.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                  <span style={{ fontSize: "20px" }}>🎫</span>
                  <div 
                    style={{ 
                      width: "20px", 
                      height: "20px", 
                      borderRadius: "50%", 
                      border: dealType === "promotion" ? "6px solid #0E3E2B" : "2px solid rgba(14,62,43,0.25)",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.15s ease"
                    }} 
                  />
                </div>
              </div>

              <div 
                onClick={() => setDealType("flash")}
                style={{ 
                  backgroundColor: dealType === "flash" ? "rgba(14,62,43,0.03)" : "#FFFFFF", 
                  border: dealType === "flash" ? "2px solid #0E3E2B" : "1.5px solid rgba(14,62,43,0.12)", 
                  borderRadius: "12px", 
                  padding: "24px", 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  boxShadow: dealType === "flash" ? "0 4px 16px rgba(14,62,43,0.08)" : "none",
                  transition: "all 0.15s ease"
                }}
                className="hover:border-[#0E3E2B]/40"
              >
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: dealType === "flash" ? 700 : 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Flash sale</h3>
                  <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.5)", margin: 0 }}>Immediately apply a discount to wholesale catalogs for a limited time.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                  <span style={{ fontSize: "20px" }}>⚡️</span>
                  <div 
                    style={{ 
                      width: "20px", 
                      height: "20px", 
                      borderRadius: "50%", 
                      border: dealType === "flash" ? "6px solid #0E3E2B" : "2px solid rgba(14,62,43,0.25)",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.15s ease"
                    }} 
                  />
                </div>
              </div>

              <div 
                onClick={() => setDealType("volume")}
                style={{ 
                  backgroundColor: dealType === "volume" ? "rgba(14,62,43,0.03)" : "#FFFFFF", 
                  border: dealType === "volume" ? "2px solid #0E3E2B" : "1.5px solid rgba(14,62,43,0.12)", 
                  borderRadius: "12px", 
                  padding: "24px", 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  boxShadow: dealType === "volume" ? "0 4px 16px rgba(14,62,43,0.08)" : "none",
                  transition: "all 0.15s ease"
                }}
                className="hover:border-[#0E3E2B]/40"
              >
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: dealType === "volume" ? 700 : 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Volume offer</h3>
                  <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.5)", margin: 0 }}>Apply a discount automatically when distributors order above a certain carton threshold.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
                  <span style={{ fontSize: "20px" }}>📦</span>
                  <div 
                    style={{ 
                      width: "20px", 
                      height: "20px", 
                      borderRadius: "50%", 
                      border: dealType === "volume" ? "6px solid #0E3E2B" : "2px solid rgba(14,62,43,0.25)",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.15s ease"
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Customize */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Customize promotion details</h1>
            <p style={{ fontSize: "15px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "32px" }}>Choose how and when to apply the promotion. <a href="#" style={{ color: "#0E3E2B", fontWeight: 600, textDecoration: "underline" }}>Learn more</a></p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Name</label>
                <input 
                  type="text" 
                  value={promoName}
                  onChange={(e) => setPromoName(e.target.value)}
                  placeholder="Enter promotion name here"
                  style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.15)", borderRadius: "8px", padding: "14px 16px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                  className="focus:border-[#0E3E2B] focus:ring-1 focus:ring-[#0E3E2B]"
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>Description <span style={{ color: "rgba(14,62,43,0.4)" }}>(Optional)</span></label>
                  <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.4)" }}>0/600</span>
                </div>
                <textarea 
                  placeholder="Enter promotion description here"
                  style={{ width: "100%", height: "100px", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.15)", borderRadius: "8px", padding: "14px 16px", color: "#0E3E2B", fontSize: "14px", outline: "none", resize: "none" }}
                  className="focus:border-[#0E3E2B] focus:ring-1 focus:ring-[#0E3E2B]"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Discount value</label>
                <div style={{ display: "flex" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)", fontSize: "14px" }}>%</span>
                    <input 
                      type="text" 
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="10"
                      style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.15)", borderRadius: "8px 0 0 8px", padding: "14px 16px 14px 40px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                      className="focus:border-[#0E3E2B] focus:ring-1 focus:ring-[#0E3E2B]"
                    />
                  </div>
                  <div style={{ display: "flex", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.15)", borderLeft: "none", borderRadius: "0 8px 8px 0" }}>
                    <button style={{ background: "rgba(14,62,43,0.06)", border: "none", borderRight: "1px solid rgba(14,62,43,0.15)", padding: "0 16px", color: "#0E3E2B", cursor: "pointer", fontWeight: 600 }}>%</button>
                    <button style={{ background: "none", border: "none", padding: "0 16px", color: "rgba(14,62,43,0.4)", cursor: "pointer" }}>NGN</button>
                  </div>
                </div>
              </div>

              {dealType === "promotion" && (
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Discount code</label>
                  <input 
                    type="text" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter discount code, e.g. FESTIVE20"
                    style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.15)", borderRadius: "8px", padding: "14px 16px", color: "#0E3E2B", fontSize: "14px", outline: "none", marginBottom: "8px" }}
                    className="focus:border-[#0E3E2B] focus:ring-1 focus:ring-[#0E3E2B]"
                  />
                  <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.4)" }}>Create a catchy code for distributors to use when they place orders online.</span>
                </div>
              )}

              <div style={{ backgroundColor: "rgba(14,62,43,0.04)", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "8px", padding: "16px", display: "flex", gap: "12px" }}>
                <div style={{ color: "#0E3E2B" }}>💡</div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Discount codes only available for wholesale catalogs.</h4>
                  <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.7)", margin: 0 }}>Distributors cannot apply discount codes to outstanding invoice payments.</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Promotion starts</label>
                  <select style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "8px", padding: "14px 16px", color: "#0E3E2B", fontSize: "14px", outline: "none", appearance: "none" }}>
                    <option>Sunday, September 6, 2026</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Promotion ends</label>
                  <select style={{ width: "100%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "8px", padding: "14px 16px", color: "#0E3E2B", fontSize: "14px", outline: "none", appearance: "none" }}>
                    <option>Never</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B", marginBottom: "16px" }}>Apply promotion to</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "8px", padding: "12px 16px" }}>
                    <span style={{ fontSize: "14px", color: "#0E3E2B" }}>All products</span>
                    <button style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Edit</button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "8px", padding: "12px 16px" }}>
                    <span style={{ fontSize: "14px", color: "#0E3E2B" }}>No logistics fees</span>
                    <button style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Limits and Targeting */}
        {step === 3 && (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Set up promotion limits</h1>
            <p style={{ fontSize: "15px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "48px" }}>Limit the number of times this promotion can be used and who can use it.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "24px", backgroundColor: "#374151", borderRadius: "12px", position: "relative", cursor: "pointer" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#FFFFFF", borderRadius: "50%", position: "absolute", top: "2px", left: "2px" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Limit to one use per distributor</h4>
                  <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)", margin: 0 }}>Each distributor will be able to use this promotion only once.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "24px", backgroundColor: "#374151", borderRadius: "12px", position: "relative", cursor: "pointer" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#FFFFFF", borderRadius: "50%", position: "absolute", top: "2px", left: "2px" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Limit total number of uses</h4>
                  <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)", margin: 0 }}>Set the total amount of times this promotion can be used globally.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "24px", backgroundColor: "#374151", borderRadius: "12px", position: "relative", cursor: "pointer" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#FFFFFF", borderRadius: "50%", position: "absolute", top: "2px", left: "2px" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Set minimum order amount</h4>
                  <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)", margin: 0 }}>The distributor must spend a minimum amount to qualify for this promotion.</p>
                </div>
              </div>

              {/* Special Client Email Whitelist */}
              <div style={{ marginTop: "16px", paddingTop: "32px", borderTop: "1px solid rgba(14,62,43,0.08)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Special Client Access (Optional)</h3>
                <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.5)", margin: 0, marginBottom: "16px" }}>
                  Want to restrict this deal to specific VIP distributors? Input their emails below. If left blank, anyone with the code can use it.
                </p>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", borderRadius: "8px", padding: "16px" }}>
                  <textarea 
                    placeholder="Enter emails separated by commas (e.g. vip@shoprite.com, gold@spar.com)"
                    style={{ width: "100%", height: "80px", backgroundColor: "transparent", border: "none", color: "#0E3E2B", fontSize: "14px", outline: "none", resize: "none" }}
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
