"use client";

import React, { useState } from "react";
import { MoreVertical, Bell, Mail, X, CheckCircle2, DollarSign, Sliders, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AutomationItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: string[];
}

const initialAutomations: AutomationItem[] = [
  {
    id: "3days",
    title: "3 days overdue payment reminder",
    description: "Notifies distributors reminding them of their overdue invoice.",
    enabled: true,
    channels: ["bell"]
  },
  {
    id: "24hours",
    title: "24 hours overdue payment reminder",
    description: "Notifies distributors reminding them of their overdue invoice.",
    enabled: true,
    channels: ["mail", "whatsapp"]
  },
  {
    id: "1hour",
    title: "1 hour overdue payment reminder",
    description: "Notifies distributors reminding them of their overdue invoice.",
    enabled: true,
    channels: ["whatsapp"]
  }
];

const tabs = [
  "Reminders",
  "Order updates",
  "Restock alerts",
  "Payment notices",
  "Milestones",
];

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState("Reminders");
  const [automations, setAutomations] = useState<AutomationItem[]>(initialAutomations);
  const [balance, setBalance] = useState(45000);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<AutomationItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleAutomation = (id: string) => {
    setAutomations(automations.map(a => {
      if (a.id === id) {
        const next = !a.enabled;
        showToast(`${a.title} is now ${next ? "Enabled" : "Disabled"}`);
        return { ...a, enabled: next };
      }
      return a;
    }));
  };

  const handleTopUp = (amount: number) => {
    setBalance(balance + amount);
    setIsTopUpOpen(false);
    showToast(`Added ₦${amount.toLocaleString()} to Communication Balance`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>
      
      {/* Toast */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 1000,
          backgroundColor: "#0E3E2B",
          color: "#FFFFFF",
          padding: "12px 20px",
          borderRadius: "9999px",
          boxShadow: "0 10px 25px rgba(14,62,43,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
          fontWeight: 600,
        }}>
          <CheckCircle2 size={16} color="#A3FF00" />
          {toastMessage}
        </div>
      )}

      <div>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Automations</h1>
            <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
              View and manage automated alerts, dispatch notifications, and payment reminders sent to your distributors.
            </p>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.12)", borderRadius: "12px", padding: "10px 16px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>SMS / WhatsApp Balance</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B" }}>₦{balance.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => setIsTopUpOpen(true)}
              style={{ background: "none", border: "none", color: "#0E3E2B", cursor: "pointer", padding: "6px 10px", borderRadius: "9999px", backgroundColor: "rgba(14,62,43,0.06)", fontSize: "12px", fontWeight: 600 }}
              className="hover:bg-black/10"
            >
              Top up
            </button>
            <button 
              onClick={() => setIsCreateOpen(true)}
              style={{ backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}
              className="hover:bg-[#08281B]"
            >
              <MoreVertical size={14} style={{ display: "none" }} />
              Create Trigger
            </button>
          </div>
        </div>

        {/* Top-up Banner */}
        <div style={{ backgroundColor: "#F0F5ED", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>
              Automated triggers keep dealer accounts paid on schedule
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.7)", margin: 0 }}>
              Automatic webhooks notify distributors when trucks leave the depot and when aging invoices enter overdue periods.
            </p>
          </div>
          <button 
            onClick={() => setIsTopUpOpen(true)}
            style={{ backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", borderRadius: "9999px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
            className="hover:bg-[#08281B] transition-colors"
          >
            Add Communication Credits
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "24px", overflowX: "auto", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "16px", marginBottom: "32px" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                color: activeTab === tab ? "#0E3E2B" : "rgba(14,62,43,0.6)",
                fontSize: "14px",
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: "pointer",
                padding: "4px 0",
                whiteSpace: "nowrap",
                position: "relative",
              }}
            >
              {tab}
              {activeTab === tab && (
                <div style={{ position: "absolute", bottom: "-17px", left: 0, right: 0, height: "2px", backgroundColor: "#0E3E2B" }} />
              )}
            </button>
          ))}
        </div>

        {/* Automations Section */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "20px" }}>
            {activeTab} Triggers
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {activeTab === "Reminders" ? automations.map((automation) => (
              <div 
                key={automation.id} 
                style={{ 
                  backgroundColor: "#FFFFFF", 
                  border: "1px solid rgba(14,62,43,0.08)", 
                  borderRadius: "16px", 
                  padding: "24px", 
                  display: "flex", 
                  flexDirection: "column",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "rgba(14,62,43,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0E3E2B" }}>
                    <Bell size={18} />
                  </div>
                  <button
                    onClick={() => handleToggleAutomation(automation.id)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      border: "none",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      backgroundColor: automation.enabled ? "#F0FDF4" : "#F1F5F9",
                      color: automation.enabled ? "#16A34A" : "#64748B"
                    }}
                  >
                    {automation.enabled ? "Active" : "Paused"}
                  </button>
                </div>
                
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>
                  {automation.title}
                </h3>
                
                <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "24px", lineHeight: "1.5", flex: 1 }}>
                  {automation.description}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(14,62,43,0.06)", paddingTop: "14px" }}>
                  <button
                    onClick={() => setEditingAutomation(automation)}
                    style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "12px", fontWeight: 600, cursor: "pointer", padding: 0 }}
                    className="hover:underline"
                  >
                    Configure trigger
                  </button>
                  
                  <div style={{ display: "flex", gap: "10px", color: "rgba(14,62,43,0.5)" }}>
                    {automation.channels.includes("mail") && <Mail size={16} />}
                    {automation.channels.includes("whatsapp") && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <p style={{ color: "rgba(14,62,43,0.4)", fontSize: "14px" }}>No {activeTab.toLowerCase()} automations set up yet.</p>
            )}
          </div>
        </div>

      </div>

      {/* MODAL 1: TOP UP COMMUNICATION BALANCE */}
      {isTopUpOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "460px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsTopUpOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>
              Top Up Communication Wallet
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Recharge SMS gateway and WhatsApp Business API credits. Current: <strong>₦{balance.toLocaleString()}</strong>.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {[
                { amount: 25000, label: "₦25,000 (~5,000 WhatsApp Messages)" },
                { amount: 50000, label: "₦50,000 (~10,000 Messages + SMS)" },
                { amount: 100000, label: "₦100,000 (~25,000 Enterprise Volume)" },
              ].map(opt => (
                <button
                  key={opt.amount}
                  onClick={() => handleTopUp(opt.amount)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(14,62,43,0.15)",
                    backgroundColor: "#FFFFFF",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  className="hover:border-[#0E3E2B] hover:bg-[#F8FAF8] transition-colors"
                >
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{opt.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#16A34A" }}>Top Up</span>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setIsTopUpOpen(false)}
                style={{ height: "40px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CONFIGURE TRIGGER */}
      {(editingAutomation || isCreateOpen) && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "540px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button 
              onClick={() => { setEditingAutomation(null); setIsCreateOpen(false); }}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>
              {isCreateOpen ? "Create New Automation" : "Configure Automation Trigger"}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              {isCreateOpen ? "Set up rules and messaging for a new automated workflow." : editingAutomation?.title}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
              
              {isCreateOpen && (
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Automation Name</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 days overdue alert"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(14,62,43,0.15)",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px",
                      color: "#0E3E2B",
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "8px" }}>Notification Channels & Messaging</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  
                  {/* SMS / WhatsApp */}
                  <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "#F8FAF8", border: "1px solid rgba(14,62,43,0.1)" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#0E3E2B", fontWeight: 600, marginBottom: "12px" }}>
                      <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px", accentColor: "#0E3E2B" }} />
                      <span>WhatsApp / SMS Message to Distributor KAM</span>
                    </label>
                    <textarea
                      defaultValue={isCreateOpen ? "" : `Hi {{distributor_name}}, your invoice for {{amount}} is overdue. Please pay to avoid supply disruption.`}
                      placeholder="Enter text message..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid rgba(14,62,43,0.15)",
                        backgroundColor: "#FFFFFF",
                        fontSize: "13px",
                        color: "#0E3E2B",
                        fontFamily: "inherit",
                        resize: "vertical"
                      }}
                    />
                    <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "6px" }}>
                      Available variables: <code>{`{{distributor_name}}`}</code>, <code>{`{{amount}}`}</code>, <code>{`{{invoice_id}}`}</code>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "#F8FAF8", border: "1px solid rgba(14,62,43,0.1)" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#0E3E2B", fontWeight: 600, marginBottom: "12px" }}>
                      <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px", accentColor: "#0E3E2B" }} />
                      <span>Email Statement to Accounts Desk</span>
                    </label>
                    <input
                      defaultValue={isCreateOpen ? "" : `Overdue Payment Notice: {{invoice_id}}`}
                      placeholder="Email subject..."
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid rgba(14,62,43,0.15)",
                        backgroundColor: "#FFFFFF",
                        fontSize: "13px",
                        color: "#0E3E2B",
                        marginBottom: "8px"
                      }}
                    />
                    <textarea
                      defaultValue={isCreateOpen ? "" : `Dear {{distributor_name}},\n\nThis is a reminder that your payment for {{amount}} is now overdue.\n\nPlease find the attached statement.`}
                      placeholder="Email body..."
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid rgba(14,62,43,0.15)",
                        backgroundColor: "#FFFFFF",
                        fontSize: "13px",
                        color: "#0E3E2B",
                        fontFamily: "inherit",
                        resize: "vertical"
                      }}
                    />
                  </div>
                  
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => { setEditingAutomation(null); setIsCreateOpen(false); }}
                style={{ height: "40px", padding: "0 18px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(isCreateOpen ? "Automation created" : "Saved automation preferences");
                  setEditingAutomation(null);
                  setIsCreateOpen(false);
                }}
                style={{ height: "40px", padding: "0 22px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                className="hover:bg-[#08281B]"
              >
                {isCreateOpen ? "Create Automation" : "Save Preferences"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
