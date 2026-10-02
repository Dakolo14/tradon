"use client";

import React, { useState } from "react";
import { Search, Filter, MessageSquare, Mail, Bell, MoreHorizontal, CheckCircle2, X, Check, RefreshCw, Download, Trash2, Eye } from "lucide-react";

interface Message {
  id: string;
  campaign: string;
  type: "Blast" | "Automation";
  channel: "WhatsApp" | "Email" | "In-App";
  date: string;
  recipients: string;
  status: "Sent" | "Delivered" | "Read";
  cost: string;
  deliveryRate: string;
}

const initialHistory: Message[] = [
  { id: "1", campaign: "Festive Season Promo", type: "Blast", channel: "WhatsApp", date: "Sep 06, 2026 10:00 AM", recipients: "All Gold Tier (124 distributors)", status: "Read", cost: "NGN 4,500", deliveryRate: "98.4%" },
  { id: "2", campaign: "Overdue Invoice #INV-204", type: "Automation", channel: "WhatsApp", date: "Sep 05, 2026 09:30 AM", recipients: "Alhaji Musa Depot", status: "Delivered", cost: "NGN 15", deliveryRate: "100%" },
  { id: "3", campaign: "New Juice SKUs Available", type: "Blast", channel: "Email", date: "Sep 04, 2026 02:15 PM", recipients: "All Distributors (450 contacts)", status: "Sent", cost: "Free", deliveryRate: "95.2%" },
  { id: "4", campaign: "Overdue Invoice #INV-188", type: "Automation", channel: "In-App", date: "Sep 02, 2026 08:00 AM", recipients: "Eko FMCG Hub", status: "Read", cost: "Free", deliveryRate: "100%" },
];

export default function MessageHistoryPage() {
  const [messages, setMessages] = useState<Message[]>(initialHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Modals state
  const [telemetryMessage, setTelemetryMessage] = useState<Message | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = messages.filter(m => 
    m.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.recipients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "WhatsApp": return <MessageSquare size={14} color="#25D366" />;
      case "Email": return <Mail size={14} color="#0E3E2B" />;
      case "In-App": return <Bell size={14} color="#D97706" />;
      default: return null;
    }
  };

  const handleResend = (msg: Message) => {
    setActiveDropdownId(null);
    showToast(`Resending message "${msg.campaign}" to unconfirmed recipients...`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove log record for "${name}"?`)) {
      setMessages(messages.filter(m => m.id !== id));
      setActiveDropdownId(null);
      showToast("Log entry archived");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#0E3E2B",
          color: "#FFFFFF",
          padding: "12px 20px",
          borderRadius: "9999px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 9999,
          fontSize: "14px",
          fontWeight: 500,
        }}>
          <CheckCircle2 size={18} color="#A3FF00" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>Messages & Broadcast History</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0 }}>
            Track the delivery status, costs, and open rates of all automated and blast messages sent to distributors.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}>
          <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search campaigns or recipients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "42px",
              paddingRight: "16px",
              borderRadius: "9999px",
              border: "1px solid rgba(14,62,43,0.1)",
              backgroundColor: "#FFFFFF",
              fontSize: "13px",
              color: "#0E3E2B",
              outline: "none",
            }}
            className="focus:border-[#0E3E2B]/40 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1000px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Campaign / Automation</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Channel</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Dispatched Date</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Recipients</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Cost</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((msg, idx) => {
              const isMenuOpen = activeDropdownId === msg.id;

              return (
                <tr key={msg.id} style={{ borderBottom: idx !== filtered.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/[0.01] transition-colors">
                  <td style={{ padding: "16px 20px", minWidth: "220px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{msg.campaign}</span>
                      <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px", whiteSpace: "nowrap" }}>Type: {msg.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#0E3E2B", fontWeight: 500 }}>
                      {getChannelIcon(msg.channel)}
                      <span>{msg.channel}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(14,62,43,0.6)", whiteSpace: "nowrap" }}>{msg.date}</td>
                  <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(14,62,43,0.8)", whiteSpace: "nowrap" }}>{msg.recipients}</td>
                  <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                    <span style={{
                      backgroundColor: msg.status === "Read" ? "#F0FDF4" : "#EFF6FF",
                      color: msg.status === "Read" ? "#16A34A" : "#2563EB",
                      padding: "3px 8px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      display: "inline-flex"
                    }}>
                      {msg.status} ({msg.deliveryRate})
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", whiteSpace: "nowrap" }}>{msg.cost}</td>
                  <td style={{ padding: "16px 20px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => setTelemetryMessage(msg)}
                        style={{
                          height: "30px",
                          padding: "0 10px",
                          backgroundColor: "#F0F5ED",
                          border: "1px solid rgba(14,62,43,0.15)",
                          borderRadius: "9999px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#0E3E2B",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                        className="hover:bg-[#E0EBDC]"
                      >
                        <Eye size={12} />
                        Telemetry
                      </button>

                      <button
                        onClick={() => setActiveDropdownId(isMenuOpen ? null : msg.id)}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          border: "1px solid rgba(14,62,43,0.15)",
                          backgroundColor: isMenuOpen ? "#0E3E2B" : "#FFFFFF",
                          color: isMenuOpen ? "#FFFFFF" : "#0E3E2B",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <div
                        style={{
                          position: "absolute",
                          right: "20px",
                          top: "52px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "12px",
                          border: "1px solid rgba(14,62,43,0.1)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          zIndex: 50,
                          width: "200px",
                          padding: "6px",
                          textAlign: "left",
                        }}
                      >
                        <button
                          onClick={() => {
                            setTelemetryMessage(msg);
                            setActiveDropdownId(null);
                          }}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-black/5"
                        >
                          <Eye size={14} />
                          Delivery Breakdown
                        </button>

                        <button
                          onClick={() => handleResend(msg)}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-black/5"
                        >
                          <RefreshCw size={14} color="#2563EB" />
                          Resend to Failed
                        </button>

                        <div style={{ height: "1px", backgroundColor: "rgba(14,62,43,0.06)", margin: "4px 0" }} />

                        <button
                          onClick={() => handleDelete(msg.id, msg.campaign)}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#EF4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Archive Entry
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: Telemetry Breakdown */}
      {telemetryMessage && (
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
            maxWidth: "460px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#16A34A", textTransform: "uppercase" }}>DELIVERY TELEMETRY</span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{telemetryMessage.campaign}</h3>
              </div>
              <button 
                onClick={() => setTelemetryMessage(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "14px", backgroundColor: "#F0F5ED", borderRadius: "10px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Delivery Success Rate</span>
                  <p style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: 700, color: "#16A34A" }}>{telemetryMessage.deliveryRate}</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Channel Used</span>
                  <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: 700, color: "#0E3E2B" }}>{telemetryMessage.channel}</p>
                </div>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Recipient Cohort</span>
                <p style={{ margin: "2px 0 0", fontWeight: 600, color: "#0E3E2B" }}>{telemetryMessage.recipients}</p>
                <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Timestamp: {telemetryMessage.date}</p>
              </div>
            </div>

            <button
              onClick={() => setTelemetryMessage(null)}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "9999px",
                border: "none",
                backgroundColor: "#0E3E2B",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
