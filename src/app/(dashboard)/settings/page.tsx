"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Bell,
  Key,
  CreditCard,
  Layers,
  MapPin,
  Package,
  FileText,
  Lock,
  Sparkles,
  ArrowRight,
  SunMedium,
  Moon,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  Send,
  Upload,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppearance } from "@/context/AppearanceContext";

type SettingsTab =
  | "workspace"
  | "company"
  | "branding"
  | "products"
  | "regions"
  | "tax"
  | "notifications"
  | "apikeys"
  | "danger";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { config, tokens, accentData, updateConfig } = useAppearance();

  const [activeTab, setActiveTab] = useState<SettingsTab>("workspace");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Company Form State
  const [companyForm, setCompanyForm] = useState({
    companyName: user?.businessName || "Chi Limited",
    rcNumber: "RC 12345",
    tin: "01234567-0001",
    phone: "+234 1700 0000",
    email: "support@chi.ng",
    headquarters: "14 Chivita Avenue, Ajao Estate, Lagos",
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    morningBrief: true,
    overdueAlerts: true,
    newRetailerOrders: false,
    stockoutAlerts: true,
    fieldRepCheckin: false,
  });

  // API Keys State
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  // Tax & Invoicing State
  const [taxForm, setTaxForm] = useState({
    vatRate: "7.5",
    whtRate: "5.0",
    invoicePrefix: "CHI-INV-",
    remittanceBank: "Zenith Bank (Virtual Pool Acct #1029482910)",
  });

  // Products Setting State
  const [productSettings, setProductSettings] = useState({
    minCartonMoq: "10",
    enforceFifo: true,
    autoHideStockout: true,
    wholesaleMarginFloor: "12",
    storefrontBanner: "⚡ Chi Limited Direct Wholesaler Portal • Minimum Order Quantity (MOQ): 10 Cartons • Next-Day Factory Dispatch Across Nigeria • Direct Manufacturer Invoicing",
  });

  // Load custom storefront settings from localStorage
  useEffect(() => {
    try {
      const savedMoq = localStorage.getItem("tradon_storefront_moq");
      const savedBanner = localStorage.getItem("tradon_storefront_banner");
      if (savedMoq || savedBanner) {
        setProductSettings((prev) => ({
          ...prev,
          minCartonMoq: savedMoq || prev.minCartonMoq,
          storefrontBanner: savedBanner || prev.storefrontBanner,
        }));
      }
    } catch {}
  }, []);

  // Domain Request Modal / State
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [customDomainInput, setCustomDomainInput] = useState("");
  const [domainRequested, setDomainRequested] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    triggerToast(`Copied ${text} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({ businessName: companyForm.companyName });
    }
    triggerToast("Company profile updated successfully!");
  };

  const currentAccent = accentData;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        paddingBottom: "80px",
        color: tokens.textPrimary,
        transition: config.enableAnimations ? "color 0.2s ease" : "none",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#0E3E2B",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            fontSize: "13px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 100,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <CheckCircle2 size={16} color="#A3FF00" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Tabs Header (matches user UI style) */}
      <div
        style={{
          backgroundColor: tokens.bgCard,
          borderRadius: "14px",
          border: `1px solid ${tokens.borderSubtle}`,
          padding: "6px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {[
          { id: "workspace" as SettingsTab, label: "Workspace" },
          { id: "company" as SettingsTab, label: "Company" },
          { id: "branding" as SettingsTab, label: "Branding" },
          { id: "products" as SettingsTab, label: "Products" },
          { id: "regions" as SettingsTab, label: "Regions" },
          { id: "tax" as SettingsTab, label: "Tax & invoicing" },
          { id: "notifications" as SettingsTab, label: "Notifications" },
          { id: "apikeys" as SettingsTab, label: "API keys" },
          { id: "danger" as SettingsTab, label: "Danger zone", isDanger: true },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: isActive
                  ? tokens.bgSubtle
                  : "transparent",
                color: tab.isDanger
                  ? "#DC2626"
                  : isActive
                  ? tokens.textPrimary
                  : tokens.textSecondary,
                fontWeight: isActive ? 700 : 600,
                fontSize: "13.5px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.15s ease",
              }}
            >
              {tab.isDanger && <AlertTriangle size={14} color="#DC2626" />}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: WORKSPACE */}
      {activeTab === "workspace" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Theme Quick Switcher Card */}
          <div
            style={{
              backgroundColor: tokens.bgCard,
              borderRadius: "14px",
              border: `1px solid ${tokens.borderSubtle}`,
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>Theme</h2>
            <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px", marginBottom: "16px" }}>
              Choose how the dashboard looks for you.
            </p>

            <div
              style={{
                display: "inline-flex",
                backgroundColor: tokens.bgSubtle,
                padding: "4px",
                borderRadius: "10px",
                gap: "4px",
                border: `1px solid ${tokens.borderSubtle}`,
              }}
            >
              <button
                onClick={() => updateConfig({ theme: "light" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: config.theme === "light" ? tokens.bgCard : "transparent",
                  color: tokens.textPrimary,
                  fontSize: "13px",
                  fontWeight: config.theme === "light" ? 600 : 500,
                  cursor: "pointer",
                  boxShadow: config.theme === "light" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                <SunMedium size={15} />
                Light
              </button>
              <button
                onClick={() => updateConfig({ theme: "dark" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: config.theme === "dark" ? tokens.bgCard : "transparent",
                  color: tokens.textPrimary,
                  fontSize: "13px",
                  fontWeight: config.theme === "dark" ? 600 : 500,
                  cursor: "pointer",
                  boxShadow: config.theme === "dark" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                <Moon size={15} />
                Dark
              </button>
            </div>
          </div>

          {/* Your Workspace URLs & Domains */}
          <div
            style={{
              backgroundColor: tokens.bgCard,
              borderRadius: "14px",
              border: `1px solid ${tokens.borderSubtle}`,
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>Your workspace</h2>
              <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                These are the URLs your distributors and retailers use.
              </p>
            </div>

            {/* URL Cards Container */}
            <div
              style={{
                borderRadius: "12px",
                border: `1px solid ${tokens.borderSubtle}`,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundColor: tokens.bgSubtle,
              }}
            >
              {/* Distributor Login */}
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  DISTRIBUTOR LOGIN
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                  <Globe size={16} color="#0E3E2B" />
                  <span style={{ fontSize: "14.5px", fontWeight: 600, color: tokens.textPrimary }}>
                    chi.tradon.app
                  </span>
                  <button
                    onClick={() => handleCopy("https://chi.tradon.app", "distributor_url")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: tokens.textMuted,
                      display: "flex",
                      alignItems: "center",
                    }}
                    title="Copy Distributor URL"
                  >
                    {copiedField === "distributor_url" ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* B2B Wholesaler Storefront */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    B2B WHOLESALER STOREFRONT
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#166534", backgroundColor: "#DCFCE7", padding: "1px 6px", borderRadius: "4px" }}>
                    SEO Canonical
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
                  <Globe size={16} color="#0E3E2B" />
                  <span style={{ fontSize: "14.5px", fontWeight: 600, color: tokens.textPrimary }}>
                    chi.tradon.app/shop
                  </span>
                  <button
                    onClick={() => handleCopy("https://chi.tradon.app/shop", "shop_url")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      color: tokens.textMuted,
                      display: "flex",
                      alignItems: "center",
                    }}
                    title="Copy Storefront URL"
                  >
                    {copiedField === "shop_url" ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  </button>
                  <a
                    href="/shop"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0E3E2B",
                      backgroundColor: "rgba(14,62,43,0.08)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      textDecoration: "none",
                    }}
                  >
                    Visit Storefront <ExternalLink size={12} />
                  </a>
                </div>
                <p style={{ fontSize: "11px", color: tokens.textMuted, margin: "4px 0 0 0" }}>
                  Legacy link <code>chi.tradon.app/retailer</code> automatically aliases and redirects to <code>/shop</code>.
                </p>
              </div>
            </div>

            {/* Custom Domain Item 1 */}
            <div
              style={{
                borderRadius: "12px",
                border: `1px solid ${tokens.borderSubtle}`,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(16,185,129,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#059669",
                  }}
                >
                  <Globe size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                    Custom domain — internal team
                  </div>
                  <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                    Run your distributor portal at dms.yourbrand.com instead. Paid add-on.
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowDomainModal(true);
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = tokens.bgSubtle)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = tokens.bgCard)}
              >
                Request
              </button>
            </div>

            {/* Custom Domain Item 2 (Recommended Storefront) */}
            <div
              style={{
                borderRadius: "12px",
                border: `1px solid ${tokens.borderSubtle}`,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(245,158,11,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#D97706",
                  }}
                >
                  <Building2 size={18} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                      Branded retailer storefront
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#047857",
                        backgroundColor: "rgba(16,185,129,0.12)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      Recommended
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: tokens.textMuted, marginTop: "2px" }}>
                    Sell to retailers from shop.yourbrand.com instead of a Tradon URL — customers trust your domain, fewer fraud worries.
                  </div>
                  <div style={{ fontSize: "11px", color: tokens.textMuted, marginTop: "2px" }}>
                    ₦150,000 setup + ₦35,000/mo includes SSL & branded checkout.
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerToast("Branded storefront setup request submitted to account executive.");
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = tokens.bgSubtle)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = tokens.bgCard)}
              >
                Request
              </button>
            </div>

            {/* Plan Status Banner */}
            <div
              style={{
                borderRadius: "10px",
                backgroundColor: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "13px",
                color: "#065F46",
                fontWeight: 500,
              }}
            >
              <CheckCircle2 size={16} color="#059669" />
              <span>Your workspace is on the <strong>Growth plan</strong> — billed monthly.</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPANY PROFILE (matches Image 2) */}
      {activeTab === "company" && (
        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: `1px solid ${tokens.borderSubtle}`,
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary, marginBottom: "20px" }}>
            Company profile
          </h2>

          <form onSubmit={handleSaveCompany} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                  Company name
                </label>
                <input
                  type="text"
                  value={companyForm.companyName}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${tokens.borderSubtle}`,
                    backgroundColor: tokens.bgCard,
                    color: tokens.textPrimary,
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                  RC number
                </label>
                <input
                  type="text"
                  value={companyForm.rcNumber}
                  onChange={(e) => setCompanyForm({ ...companyForm, rcNumber: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${tokens.borderSubtle}`,
                    backgroundColor: tokens.bgCard,
                    color: tokens.textPrimary,
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                  TIN
                </label>
                <input
                  type="text"
                  value={companyForm.tin}
                  onChange={(e) => setCompanyForm({ ...companyForm, tin: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${tokens.borderSubtle}`,
                    backgroundColor: tokens.bgCard,
                    color: tokens.textPrimary,
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                  Phone
                </label>
                <input
                  type="text"
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${tokens.borderSubtle}`,
                    backgroundColor: tokens.bgCard,
                    color: tokens.textPrimary,
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                Email
              </label>
              <input
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13.5px",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                Headquarters address
              </label>
              <textarea
                rows={3}
                value={companyForm.headquarters}
                onChange={(e) => setCompanyForm({ ...companyForm, headquarters: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13.5px",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  backgroundColor: "#0E3E2B",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 0.15s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Save company
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: BRANDING */}
      {activeTab === "branding" && (
        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: `1px solid ${tokens.borderSubtle}`,
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>
              Brand identity & document headers
            </h2>
            <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
              Upload logos appearing on invoices, thermal receipt roll prints, and distributor portals.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              border: `1px dashed ${tokens.borderSubtle}`,
              backgroundColor: tokens.bgSubtle,
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "12px",
                backgroundColor: currentAccent.hex,
                color: currentAccent.textHex,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
              CHI
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                Primary Master Logo
              </div>
              <div style={{ fontSize: "12px", color: tokens.textMuted, marginTop: "2px" }}>
                Recommended dimensions: 512x512px. PNG with transparent background.
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  onClick={() => triggerToast("Logo uploaded successfully!")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: `1px solid ${tokens.borderSubtle}`,
                    backgroundColor: tokens.bgCard,
                    fontSize: "12px",
                    fontWeight: 500,
                    color: tokens.textPrimary,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Upload size={13} /> Upload New
                </button>
              </div>
            </div>
          </div>

          {/* Logo Style Preference */}
          <div style={{ marginTop: "8px", paddingTop: "24px", borderTop: `1px solid ${tokens.borderSubtle}` }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
              Display Style
            </div>
            <div style={{ fontSize: "12px", color: tokens.textMuted, marginTop: "2px", marginBottom: "16px" }}>
              Choose how your brand logo appears in the dashboard sidebar and storefront.
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {(["icon", "wordmark", "combo"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    updateConfig({ logoStyle: style });
                    triggerToast(`Logo style updated to ${style === "combo" ? "Icon + Wordmark" : style}`);
                  }}
                  style={{
                    flex: "1 1 200px",
                    padding: "16px",
                    borderRadius: "12px",
                    border: `1px solid ${config.logoStyle === style ? currentAccent.hex : tokens.borderSubtle}`,
                    backgroundColor: config.logoStyle === style ? currentAccent.lightBg : tokens.bgSubtle,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "40px",
                    color: config.logoStyle === style ? currentAccent.hex : tokens.textMuted,
                  }}>
                    {style === "icon" && (
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "currentColor", display: "flex", alignItems: "center", justifyContent: "center", color: currentAccent.textHex, fontSize: "14px", fontWeight: 800 }}>CHI</div>
                    )}
                    {style === "wordmark" && (
                      <span style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.02em" }}>Tradon</span>
                    )}
                    {style === "combo" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "6px", backgroundColor: "currentColor", display: "flex", alignItems: "center", justifyContent: "center", color: currentAccent.textHex, fontSize: "10px", fontWeight: 800 }}>CHI</div>
                        <span style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em" }}>Tradon</span>
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: config.logoStyle === style ? tokens.textPrimary : tokens.textMuted, textTransform: "capitalize" }}>
                    {style === "combo" ? "Icon + Wordmark" : style}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTS */}
      {activeTab === "products" && (
        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: `1px solid ${tokens.borderSubtle}`,
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>
              Master catalog & Storefront policies
            </h2>
            <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
              Configure wholesale carton minimums, inventory policies, and your B2B storefront.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                Default Minimum Order Quantity (Cartons)
              </label>
              <input
                type="number"
                value={productSettings.minCartonMoq}
                onChange={(e) => setProductSettings({ ...productSettings, minCartonMoq: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13.5px",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                Minimum Wholesale Margin Floor (%)
              </label>
              <input
                type="number"
                value={productSettings.wholesaleMarginFloor}
                onChange={(e) => setProductSettings({ ...productSettings, wholesaleMarginFloor: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13.5px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
              B2B Storefront Announcement Banner
            </label>
            <input
              type="text"
              value={productSettings.storefrontBanner}
              onChange={(e) => setProductSettings({ ...productSettings, storefrontBanner: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: `1px solid ${tokens.borderSubtle}`,
                backgroundColor: tokens.bgCard,
                color: tokens.textPrimary,
                fontSize: "13.5px",
                outline: "none",
              }}
              placeholder="Announcement displayed on chi.tradon.app/shop"
            />
            <p style={{ fontSize: "11.5px", color: tokens.textMuted, margin: "4px 0 0 0" }}>
              Displayed live at the very top of your wholesale storefront (<code>chi.tradon.app/shop</code>).
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: 600, color: tokens.textPrimary }}>
                  Enforce FIFO Dispatch (First In, First Out)
                </div>
                <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                  Field reps and loading bays must pack oldest batch codes first to avoid near-expiry losses.
                </div>
              </div>
              <input
                type="checkbox"
                checked={productSettings.enforceFifo}
                onChange={(e) => setProductSettings({ ...productSettings, enforceFifo: e.target.checked })}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: 600, color: tokens.textPrimary }}>
                  Auto-hide Out of Stock SKUs from Retailer Storefront
                </div>
                <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                  Prevents back-order disputes by temporarily removing zero-inventory items.
                </div>
              </div>
              <input
                type="checkbox"
                checked={productSettings.autoHideStockout}
                onChange={(e) => setProductSettings({ ...productSettings, autoHideStockout: e.target.checked })}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
            </div>
          </div>

          {/* How Chi Modifies the Storefront Guide */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              backgroundColor: "rgba(14,62,43,0.04)",
              border: "1px solid rgba(14,62,43,0.12)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} color="#0E3E2B" />
              <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#0E3E2B" }}>
                How Chi Manages the Storefront
              </span>
            </div>
            <p style={{ fontSize: "12.5px", color: tokens.textSecondary, margin: 0, lineHeight: 1.5 }}>
              Your B2B storefront (<code>chi.tradon.app/shop</code>) automatically inherits prices, stock levels, and promotional trade rebates configured in your dashboard:
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
              <Link
                href="/products"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  textDecoration: "none",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(14,62,43,0.2)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Manage SKUs & Prices (/products) <ArrowRight size={12} />
              </Link>
              <Link
                href="/promos/smart-pricing"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  textDecoration: "none",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(14,62,43,0.2)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Volume Rebates (/promos) <ArrowRight size={12} />
              </Link>
              <Link
                href="/orders"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  textDecoration: "none",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(14,62,43,0.2)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Incoming Wholesale Orders (/orders) <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          <button
            onClick={() => {
              try {
                localStorage.setItem("tradon_storefront_moq", productSettings.minCartonMoq);
                localStorage.setItem("tradon_storefront_banner", productSettings.storefrontBanner);
              } catch {}
              triggerToast("Product rules & Storefront policies updated successfully!");
            }}
            style={{
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: "8px",
              backgroundColor: "#0E3E2B",
              color: "#FFFFFF",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save product & storefront rules
          </button>
        </div>
      )}

      {/* TAB 5: REGIONS */}
      {activeTab === "regions" && (

        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: `1px solid ${tokens.borderSubtle}`,
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>
              Operational distribution regions
            </h2>
            <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
              Manage active regional hubs and van sales territories.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {[
              { name: "South West Hub", states: "Lagos, Ogun, Oyo, Osun", trucks: "42 Trucks active", status: "Active" },
              { name: "North Central Hub", states: "Abuja FCT, Kano, Kaduna, Niger", trucks: "28 Trucks active", status: "Active" },
              { name: "South East Hub", states: "Anambra, Abia, Enugu, Imo", trucks: "34 Trucks active", status: "Active" },
              { name: "South South Hub", states: "Rivers, Delta, Edo, Akwa Ibom", trucks: "19 Trucks active", status: "Active" },
            ].map((reg, idx) => (
              <div
                key={idx}
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgSubtle,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: tokens.textPrimary }}>{reg.name}</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#065F46", backgroundColor: "#D1FAE5", border: "1px solid #A7F3D0", padding: "2px 7px", borderRadius: "9999px" }}>
                    {reg.status}
                  </span>
                </div>
                <span style={{ fontSize: "12.5px", color: tokens.textSecondary, fontWeight: 500 }}>{reg.states}</span>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 600,
                    color: tokens.textPrimary,
                    backgroundColor: tokens.bgCard,
                    border: `1px solid ${tokens.borderSubtle}`,
                    padding: "4px 10px",
                    borderRadius: "6px",
                    width: "fit-content",
                    marginTop: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10B981" }} />
                  {reg.trucks}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TAX & INVOICING */}
      {activeTab === "tax" && (
        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: `1px solid ${tokens.borderSubtle}`,
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>
              Tax compliance & wholesale invoices
            </h2>
            <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
              Configure statutory FIRS VAT rates and automated payment clearance pools.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                VAT Rate (%)
              </label>
              <input
                type="text"
                value={taxForm.vatRate}
                onChange={(e) => setTaxForm({ ...taxForm, vatRate: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13.5px",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
                Invoice Number Prefix
              </label>
              <input
                type="text"
                value={taxForm.invoicePrefix}
                onChange={(e) => setTaxForm({ ...taxForm, invoicePrefix: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "13.5px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>
              Primary Settlement Pool
            </label>
            <input
              type="text"
              value={taxForm.remittanceBank}
              onChange={(e) => setTaxForm({ ...taxForm, remittanceBank: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: `1px solid ${tokens.borderSubtle}`,
                backgroundColor: tokens.bgCard,
                color: tokens.textPrimary,
                fontSize: "13.5px",
                outline: "none",
              }}
            />
          </div>

          <button
            onClick={() => triggerToast("Tax & invoicing preferences saved")}
            style={{
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: "8px",
              backgroundColor: "#0E3E2B",
              color: "#FFFFFF",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save invoicing rules
          </button>
        </div>
      )}

      {/* TAB 7: NOTIFICATIONS (matches Image 4) */}
      {activeTab === "notifications" && (
        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: `1px solid ${tokens.borderSubtle}`,
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>Notifications</h2>
            <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
              Control which alerts you receive and where they are delivered.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {[
              {
                id: "morningBrief" as keyof typeof notifications,
                title: "AI Morning Brief",
                desc: "Delivered at 6:00 AM daily via email & WhatsApp",
              },
              {
                id: "overdueAlerts" as keyof typeof notifications,
                title: "Overdue payment alerts",
                desc: "When distributors become overdue on payments",
              },
              {
                id: "newRetailerOrders" as keyof typeof notifications,
                title: "New retailer orders",
                desc: "Push notification for every order on your retailer portal",
              },
              {
                id: "stockoutAlerts" as keyof typeof notifications,
                title: "Stockout risk alerts",
                desc: "When a SKU drops below 3-day cover",
              },
              {
                id: "fieldRepCheckin" as keyof typeof notifications,
                title: "Field rep check-in",
                desc: "When reps start and complete their daily routes",
              },
            ].map((item) => {
              const checked = notifications[item.id];
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "12px", color: tokens.textMuted, marginTop: "2px" }}>
                      {item.desc}
                    </div>
                  </div>

                  {/* Clean toggle switch */}
                  <div
                    onClick={() => {
                      setNotifications((prev) => ({ ...prev, [item.id]: !checked }));
                      triggerToast(`${item.title} preference updated`);
                    }}
                    style={{
                      width: "44px",
                      height: "24px",
                      borderRadius: "9999px",
                      backgroundColor: checked ? "#0E3E2B" : "rgba(14,62,43,0.15)",
                      padding: "2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: checked ? "flex-end" : "flex-start",
                      transition: "background-color 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 8: API KEYS */}
      {activeTab === "apikeys" && (
        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: `1px solid ${tokens.borderSubtle}`,
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>API Keys & ERP Integration</h2>
            <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
              Sync purchase orders and payment confirmations with SAP, Microsoft Dynamics, or Odoo.
            </p>
          </div>

          <div
            style={{
              padding: "16px",
              borderRadius: "10px",
              border: `1px solid ${tokens.borderSubtle}`,
              backgroundColor: tokens.bgSubtle,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: tokens.textMuted }}>PRODUCTION LIVE SECRET KEY</span>
              <button
                onClick={() => setShowSecretKey(!showSecretKey)}
                style={{
                  background: "none",
                  border: "none",
                  color: tokens.textPrimary,
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {showSecretKey ? <EyeOff size={14} /> : <Eye size={14} />}
                {showSecretKey ? "Hide" : "Reveal"}
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <code
                style={{
                  flexGrow: 1,
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: tokens.bgCard,
                  border: `1px solid ${tokens.borderSubtle}`,
                  fontFamily: "monospace",
                  fontSize: "13px",
                  color: tokens.textPrimary,
                }}
              >
                {showSecretKey ? "tr_live_9482018491829482910482918" : "tr_live_••••••••••••••••••••••••••••••••"}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("tr_live_9482018491829482910482918");
                  setApiKeyCopied(true);
                  triggerToast("API Key copied to clipboard");
                  setTimeout(() => setApiKeyCopied(false), 2000);
                }}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: tokens.bgCard,
                  color: tokens.textPrimary,
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {apiKeyCopied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: DANGER ZONE */}
      {activeTab === "danger" && (
        <div
          style={{
            backgroundColor: tokens.bgCard,
            borderRadius: "14px",
            border: "1px solid rgba(220,38,38,0.2)",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AlertTriangle size={20} color="#DC2626" />
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#DC2626" }}>Danger Zone</h2>
              <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                Irreversible actions regarding your workspace distribution records and tenant account.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                border: `1px solid ${tokens.borderSubtle}`,
                backgroundColor: tokens.bgSubtle,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                  Reset Demo Sandbox Records
                </div>
                <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                  Re-populates 18-state demo van sales orders and sample distributor accounts.
                </div>
              </div>
              <button
                onClick={() => triggerToast("Demo sandbox records re-initialized.")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(220,38,38,0.1)",
                  color: "#DC2626",
                  border: "1px solid rgba(220,38,38,0.2)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Reset Sandbox
              </button>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                border: `1px solid ${tokens.borderSubtle}`,
                backgroundColor: tokens.bgSubtle,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                  Deactivate Workspace
                </div>
                <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                  Temporarily freezes distributor portal access and van sales dispatch routes.
                </div>
              </div>
              <button
                onClick={() => triggerToast("Deactivation request sent to workspace owner confirmation.")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Custom Domain Request */}
      {showDomainModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              backgroundColor: tokens.bgCard,
              borderRadius: "16px",
              border: `1px solid ${tokens.borderSubtle}`,
              padding: "24px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: tokens.textPrimary }}>
                Request Custom Domain
              </h3>
              <button
                onClick={() => setShowDomainModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "13px", color: tokens.textMuted }}>
              Enter the subdomain you wish to route your Tier-1 distributor portal to (e.g. <code>dms.chilimited.com</code>).
            </p>

            <input
              type="text"
              placeholder="dms.yourbrand.com"
              value={customDomainInput}
              onChange={(e) => setCustomDomainInput(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: `1px solid ${tokens.borderSubtle}`,
                backgroundColor: tokens.bgSubtle,
                color: tokens.textPrimary,
                fontSize: "14px",
                outline: "none",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
              <button
                onClick={() => setShowDomainModal(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: "transparent",
                  color: tokens.textPrimary,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDomainModal(false);
                  triggerToast(`Custom domain request for "${customDomainInput || "dms.yourbrand.com"}" submitted.`);
                  setCustomDomainInput("");
                }}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  backgroundColor: "#0E3E2B",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
