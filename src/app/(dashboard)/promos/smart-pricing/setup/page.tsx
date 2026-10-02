"use client";

import React, { useState } from "react";
import { ArrowLeft, Trash2, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function SmartPricingSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Simple state for mockup
  const [tuesdayEnabled, setTuesdayEnabled] = useState(true);

  const handleContinue = () => {
    if (step === 1) setStep(2);
    else router.push("/promos/smart-pricing");
  };

  const renderStepIndicators = () => (
    <div style={{ display: "flex", width: "100%", gap: "8px", position: "absolute", top: 0, left: 0 }}>
      <div style={{ flex: 1, height: "4px", backgroundColor: step >= 1 ? "#0E3E2B" : "rgba(14,62,43,0.1)" }} />
      <div style={{ flex: 1, height: "4px", backgroundColor: step >= 2 ? "#0E3E2B" : "rgba(14,62,43,0.1)" }} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>
      
      {renderStepIndicators()}

      <div style={{ padding: "24px", maxWidth: step === 1 ? "900px" : "700px", margin: "0 auto", width: "100%", paddingTop: "40px" }}>
        
        {/* Header / Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={() => step === 1 ? router.push("/promos/smart-pricing") : setStep(step - 1)}
              style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0E3E2B", cursor: "pointer" }}
              className="hover:bg-black/5"
            >
              <ArrowLeft size={20} />
            </button>
            <span style={{ color: "#0E3E2B", fontSize: "16px", fontWeight: 600 }}>
              Set up smart pricing
            </span>
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              onClick={() => router.push("/promos/smart-pricing")}
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
              {step === 1 ? "Next step" : "Finish setup"}
            </button>
          </div>
        </div>

        {/* Step 1: Set up Rules */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Set up smart pricing rules</h1>
            <p style={{ fontSize: "15px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "32px" }}>Choose how and when to apply smart pricing. <a href="#" style={{ color: "#0E3E2B", fontWeight: 600, textDecoration: "underline" }}>Learn more</a></p>
            
            <div style={{ borderTop: "1px solid rgba(14,62,43,0.08)" }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 1fr 1fr", gap: "16px", padding: "16px 0", borderBottom: "1px solid rgba(14,62,43,0.08)" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>Day</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>Time interval</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>Price change</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>Change by</span>
              </div>

              {/* Monday */}
              <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "16px", padding: "24px 0", borderBottom: "1px solid rgba(14,62,43,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "4px" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B" }}>Monday</span>
                </div>
                <div style={{ color: "rgba(14,62,43,0.4)", fontSize: "14px" }}>No smart pricing rules</div>
              </div>

              {/* Tuesday */}
              <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "16px", padding: "24px 0", borderBottom: "1px solid rgba(14,62,43,0.04)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#0E3E2B", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 700 }}>✓</div>
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B" }}>Tuesday</span>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <select style={{ backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px", color: "#0E3E2B", fontSize: "13px", outline: "none", appearance: "none", width: "100px" }}>
                        <option>09:00</option>
                      </select>
                      <span style={{ color: "rgba(14,62,43,0.4)" }}>-</span>
                      <select style={{ backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px", color: "#0E3E2B", fontSize: "13px", outline: "none", appearance: "none", width: "100px" }}>
                        <option>11:00</option>
                      </select>
                    </div>
                    
                    <select style={{ backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px", color: "#0E3E2B", fontSize: "13px", outline: "none", appearance: "none", width: "130px" }}>
                      <option>↑ Increase</option>
                    </select>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{ position: "relative", width: "100px" }}>
                        <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)", fontSize: "12px" }}>%</span>
                        <input type="text" value="10" readOnly style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px 8px 30px", color: "#0E3E2B", fontSize: "13px", outline: "none" }} />
                      </div>
                      <div style={{ display: "flex", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px" }}>
                        <button style={{ background: "rgba(14,62,43,0.05)", border: "none", borderRight: "1px solid rgba(14,62,43,0.1)", padding: "0 12px", color: "#0E3E2B", borderRadius: "6px 0 0 6px", cursor: "pointer" }}>%</button>
                        <button style={{ background: "none", border: "none", padding: "0 12px", color: "rgba(14,62,43,0.4)", cursor: "pointer" }}>NGN</button>
                      </div>
                      <button style={{ background: "none", border: "none", color: "rgba(14,62,43,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <select style={{ backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px", color: "#0E3E2B", fontSize: "13px", outline: "none", appearance: "none", width: "100px" }}>
                        <option>16:00</option>
                      </select>
                      <span style={{ color: "rgba(14,62,43,0.4)" }}>-</span>
                      <select style={{ backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px", color: "#0E3E2B", fontSize: "13px", outline: "none", appearance: "none", width: "100px" }}>
                        <option>17:00</option>
                      </select>
                    </div>
                    
                    <select style={{ backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px", color: "#0E3E2B", fontSize: "13px", outline: "none", appearance: "none", width: "130px" }}>
                      <option>↓ Decrease</option>
                    </select>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{ position: "relative", width: "100px" }}>
                        <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)", fontSize: "12px" }}>%</span>
                        <input type="text" value="10" readOnly style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px", padding: "8px 12px 8px 30px", color: "#0E3E2B", fontSize: "13px", outline: "none" }} />
                      </div>
                      <div style={{ display: "flex", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "6px" }}>
                        <button style={{ background: "rgba(14,62,43,0.05)", border: "none", borderRight: "1px solid rgba(14,62,43,0.1)", padding: "0 12px", color: "#0E3E2B", borderRadius: "6px 0 0 6px", cursor: "pointer" }}>%</button>
                        <button style={{ background: "none", border: "none", padding: "0 12px", color: "rgba(14,62,43,0.4)", cursor: "pointer" }}>NGN</button>
                      </div>
                      <button style={{ background: "none", border: "none", color: "rgba(14,62,43,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <button style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer", textAlign: "left", width: "fit-content" }}>
                    + Add time interval
                  </button>
                </div>
              </div>

              {/* Wednesday - Friday */}
              {["Wednesday", "Thursday", "Friday"].map((day) => (
                <div key={day} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "16px", padding: "24px 0", borderBottom: "1px solid rgba(14,62,43,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "20px", height: "20px", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "4px" }} />
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B" }}>{day}</span>
                  </div>
                  <div style={{ color: "rgba(14,62,43,0.4)", fontSize: "14px" }}>No smart pricing rules</div>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* Step 2: Select Products */}
        {step === 2 && (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>Select products</h1>
            <p style={{ fontSize: "15px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "32px" }}>Choose which products can be booked with smart pricing.</p>
            
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B", marginBottom: "16px" }}>Apply to</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.12)", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px" }}>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#0E3E2B" }}>All products</span>
                <button 
                  onClick={() => setShowModal(true)}
                  style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "13px", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
                >
                  Edit
                </button>
              </div>

              <div style={{ backgroundColor: "rgba(14,62,43,0.05)", border: "1px solid rgba(14,62,43,0.12)", borderRadius: "8px", padding: "16px", display: "flex", gap: "12px" }}>
                <div style={{ color: "#0E3E2B", fontSize: "16px" }}>ℹ️</div>
                <div>
                  <p style={{ fontSize: "13px", color: "#1F2937", margin: 0, lineHeight: "1.5", fontWeight: 500 }}>
                    Prices for selected products adjust automatically for wholesale orders online, while field reps can manually apply smart pricing when taking orders manually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Select Products Modal Overlay */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(14,62,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", width: "500px", padding: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Select products</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", color: "rgba(14,62,43,0.6)", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ position: "relative", marginBottom: "24px" }}>
              <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }} size={16} />
              <input 
                type="text" 
                placeholder="Search by name"
                style={{ width: "100%", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "8px", padding: "12px 16px 12px 42px", color: "#0E3E2B", fontSize: "14px", outline: "none" }}
                className="focus:border-[#0E3E2B] focus:ring-1 focus:ring-[#0E3E2B]"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", maxHeight: "300px", overflowY: "auto" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "12px" }}>
                <div style={{ width: "20px", height: "20px", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "4px" }} />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B" }}>Select all</span>
                <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.4)", backgroundColor: "rgba(14,62,43,0.05)", padding: "2px 6px", borderRadius: "9999px" }}>2</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "20px", height: "20px", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "4px" }} />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B" }}>Beverages</span>
                <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.4)", backgroundColor: "rgba(14,62,43,0.05)", padding: "2px 6px", borderRadius: "9999px" }}>2</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#0E3E2B", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 700 }}>✓</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", color: "#0E3E2B" }}>Premium Fruit Juice</span>
                    <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.4)" }}>Carton (12x1L)</span>
                  </div>
                </div>
                <span style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)" }}>NGN 15,000</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "4px" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", color: "#0E3E2B" }}>Hollandia Yoghurt</span>
                    <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.4)" }}>Carton (12x1L)</span>
                  </div>
                </div>
                <span style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)" }}>NGN 18,000</span>
              </div>

            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid rgba(14,62,43,0.08)" }}>
              <span style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)" }}>1 selected item</span>
              <button 
                onClick={() => setShowModal(false)}
                style={{ backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", borderRadius: "9999px", padding: "8px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
