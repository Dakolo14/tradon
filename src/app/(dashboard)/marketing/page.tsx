"use client";

import React, { useState } from "react";
import { Database, TrendingUp, Search, Megaphone, Share2, Server, CheckCircle2, X, Check, RefreshCw, Key, Link2 } from "lucide-react";

interface IntegrationApp {
  id: string;
  name: string;
  description: string;
  iconName: string;
  bgColor: string;
  status: "Connected" | "Not Connected";
  lastSync?: string;
}

const initialIntegrations: IntegrationApp[] = [
  {
    id: "sap",
    name: "SAP S/4HANA",
    description: "Streamline your enterprise distribution, sales, and FMCG accounting by connecting SAP.",
    iconName: "sap",
    bgColor: "rgba(0,143,211,0.1)",
    status: "Connected",
    lastSync: "Today @ 08:30 AM",
  },
  {
    id: "dynamics",
    name: "Microsoft Dynamics 365",
    description: "Sync your supply chain and CRM with Microsoft's powerful enterprise suite.",
    iconName: "dynamics",
    bgColor: "rgba(0,90,158,0.1)",
    status: "Not Connected",
  },
  {
    id: "meta",
    name: "Meta Pixel Ads",
    description: "Track conversions from Facebook and Instagram campaigns targeting B2B leads.",
    iconName: "meta",
    bgColor: "rgba(24,119,242,0.1)",
    status: "Connected",
    lastSync: "15 mins ago",
  },
  {
    id: "analytics",
    name: "Google Analytics",
    description: "Track B2B portal traffic and user engagement to optimize your wholesale funnel.",
    iconName: "analytics",
    bgColor: "rgba(249,171,0,0.1)",
    status: "Connected",
    lastSync: "Live streaming",
  },
  {
    id: "google_ads",
    name: "Google Ads",
    description: "Optimize Google Ads campaigns to capture high-intent distributor searches.",
    iconName: "ads",
    bgColor: "rgba(66,133,244,0.1)",
    status: "Not Connected",
  },
  {
    id: "gmb",
    name: "Google My Business",
    description: "Manage your local search presence and reviews for your regional distribution centers.",
    iconName: "gmb",
    bgColor: "rgba(15,157,88,0.1)",
    status: "Connected",
    lastSync: "Yesterday",
  },
];

export default function MarketingIntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationApp[]>(initialIntegrations);
  const [selectedApp, setSelectedApp] = useState<IntegrationApp | null>(null);
  const [apiKey, setApiKey] = useState("api_prod_chi_fmcg_live_99214710");
  const [syncFreq, setSyncFreq] = useState("Real-time Webhook");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case "sap": return <Database size={24} color="#008FD3" />;
      case "dynamics": return <Server size={24} color="#005A9E" />;
      case "meta": return <Share2 size={24} color="#1877F2" />;
      case "analytics": return <TrendingUp size={24} color="#F9AB00" />;
      case "ads": return <Megaphone size={24} color="#4285F4" />;
      case "gmb": return <Search size={24} color="#0F9D58" />;
      default: return <Database size={24} color="#0E3E2B" />;
    }
  };

  const handleToggleConnection = () => {
    if (!selectedApp) return;
    const nextStatus = selectedApp.status === "Connected" ? "Not Connected" : "Connected";
    setIntegrations(integrations.map(i => i.id === selectedApp.id ? { 
      ...i, 
      status: nextStatus, 
      lastSync: nextStatus === "Connected" ? "Just now" : undefined 
    } : i));
    setSelectedApp(null);
    showToast(`${selectedApp.name} is now ${nextStatus}!`);
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
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "4px" }}>
          Enterprise Integrations & Synced APIs
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0 }}>
          Connect your enterprise tools to automate marketing, SEO, Google Business Profiles, and SAP distribution accounting.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {integrations.map((app) => (
          <div 
            key={app.id} 
            style={{ 
              backgroundColor: "#FFFFFF", 
              border: "1px solid rgba(14,62,43,0.08)", 
              borderRadius: "16px", 
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            {/* Header / App Icon */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: app.bgColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {renderIcon(app.iconName)}
              </div>
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                backgroundColor: app.status === "Connected" ? "#F0FDF4" : "#F8FAF8",
                color: app.status === "Connected" ? "#16A34A" : "rgba(14,62,43,0.5)",
                border: app.status === "Connected" ? "1px solid rgba(22,163,74,0.2)" : "1px solid rgba(14,62,43,0.1)",
                padding: "3px 10px",
                borderRadius: "9999px",
              }}>
                {app.status}
              </span>
            </div>

            {/* Text Content */}
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>
                {app.name}
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, lineHeight: "1.5" }}>
                {app.description}
              </p>
            </div>

            {app.lastSync && (
              <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>
                Last synced: <strong style={{ color: "#0E3E2B" }}>{app.lastSync}</strong>
              </div>
            )}

            {/* Action Button */}
            <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(14,62,43,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button 
                onClick={() => setSelectedApp(app)}
                style={{ 
                  backgroundColor: "#F0F5ED", 
                  border: "1px solid rgba(14,62,43,0.15)", 
                  borderRadius: "9999px", 
                  padding: "6px 18px", 
                  fontSize: "13px", 
                  fontWeight: 600, 
                  color: "#0E3E2B", 
                  cursor: "pointer" 
                }}
                className="hover:bg-[#E0EBDC] transition-colors"
              >
                Configure & Sync
              </button>

              <button
                onClick={() => {
                  const nextStatus = app.status === "Connected" ? "Not Connected" : "Connected";
                  setIntegrations(integrations.map(i => i.id === app.id ? { ...i, status: nextStatus } : i));
                  showToast(`${app.name} ${nextStatus === "Connected" ? "Connected" : "Disconnected"}!`);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: app.status === "Connected" ? "#DC2626" : "#16A34A",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {app.status === "Connected" ? "Disconnect" : "Quick Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Integration Details & Configuration */}
      {selectedApp && (
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
            maxWidth: "500px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: selectedApp.bgColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {renderIcon(selectedApp.iconName)}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                    {selectedApp.name} Setup
                  </h3>
                  <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)" }}>Enterprise sync gateway</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  API Token / Secret Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Sync Mode & Schedule
                </label>
                <select
                  value={syncFreq}
                  onChange={(e) => setSyncFreq(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Real-time Webhook">Real-time Webhook (Instant order & payment sync)</option>
                  <option value="Hourly Batch">Hourly Batch Sync</option>
                  <option value="Daily 02:00 AM">Nightly Batch (02:00 AM)</option>
                </select>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F0F5ED", borderRadius: "10px", fontSize: "12px", color: "rgba(14,62,43,0.8)" }}>
                Current Status: <strong>{selectedApp.status}</strong>
                {selectedApp.lastSync && <div>Last successful handshake: {selectedApp.lastSync}</div>}
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={handleToggleConnection}
                  style={{
                    flex: 1,
                    height: "44px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    backgroundColor: "transparent",
                    color: selectedApp.status === "Connected" ? "#DC2626" : "#0E3E2B",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {selectedApp.status === "Connected" ? "Disconnect App" : "Connect Integration"}
                </button>
                <button
                  onClick={() => {
                    setSelectedApp(null);
                    showToast(`Sync test passed for ${selectedApp.name}!`);
                  }}
                  style={{
                    flex: 1,
                    height: "44px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: "#0E3E2B",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Test & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
