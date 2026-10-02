"use client";

import React, { useState } from "react";
import {
  SunMedium,
  Moon,
  Monitor,
  Palette,
  Sparkles,
  Sliders,
  Layout,
  Eye,
  Check,
  CheckCircle2,
  RotateCcw,
  Smartphone,
  Maximize2,
  Grid,
  TrendingUp,
  Package,
  Boxes,
  Upload,
  Info,
  Layers,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  useAppearance,
  ACCENT_MAP,
  ThemeMode,
  AccentColor,
  Density,
  CurrencyPref,
  FontScale,
  FontFamily,
} from "@/context/AppearanceContext";

export default function AppearancePage() {
  const { user } = useAuth();
  const { config, tokens, accentData, updateConfig, resetConfig } = useAppearance();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"theme" | "layout" | "data" | "branding">("theme");

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    resetConfig();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const currentAccent = accentData;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        paddingBottom: "80px",
        color: tokens.textPrimary,
        transition: config.enableAnimations ? "color 0.2s ease" : "none",
      }}
    >
      {/* Top Banner / Breadcrumb */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: tokens.textPrimary,
                backgroundColor: tokens.bgSubtle,
                padding: "3px 10px",
                borderRadius: "20px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              WORKSPACE SETTINGS
            </span>
            <span style={{ fontSize: "12px", color: tokens.textMuted }}>•</span>
            <span style={{ fontSize: "12px", color: tokens.textMuted, fontWeight: 500 }}>
              {user?.businessName || "Chi Limited"}
            </span>
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: tokens.textPrimary,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Interface Appearance & Display
          </h1>
          <p style={{ fontSize: "14px", color: tokens.textMuted, marginTop: "4px" }}>
            Personalize your FMCG mission control, color themes, display density, and van sales high-glare visibility modes.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handleReset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: tokens.bgCard,
              border: `1px solid ${tokens.borderSubtle}`,
              color: tokens.textPrimary,
              padding: "10px 18px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = tokens.bgSubtle)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = tokens.bgCard)}
          >
            <RotateCcw size={15} />
            Restore Defaults
          </button>

          <button
            onClick={handleSave}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: currentAccent.hex,
              color: currentAccent.textHex,
              border: "none",
              padding: "10px 22px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.1s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 size={16} />
                Preferences Active!
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${tokens.borderSubtle}`,
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "2px",
        }}
      >
        {[
          { id: "theme", label: "Theme & Palette", icon: <Palette size={16} /> },
          { id: "layout", label: "Density & Layout", icon: <Layout size={16} /> },
          { id: "data", label: "Data Visualization & Units", icon: <Grid size={16} /> },
          { id: "branding", label: "Distributor Portal Branding", icon: <Layers size={16} /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 18px",
                border: "none",
                background: "transparent",
                color: isActive ? tokens.textPrimary : tokens.textMuted,
                fontWeight: isActive ? 600 : 500,
                fontSize: "14px",
                borderBottom: isActive ? `2px solid ${currentAccent.hex}` : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Left Controls (60%), Right Live Interactive Preview (40%) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Settings Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* TAB 1: THEME & PALETTE */}
          {activeTab === "theme" && (
            <>
              {/* Interface Theme Cards */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  transition: config.enableAnimations ? "background-color 0.2s ease, border-color 0.2s ease" : "none",
                }}
              >
                <div style={{ marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: tokens.textPrimary }}>
                    System Color Mode
                  </h3>
                  <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                    Select high-contrast mode for sunny delivery docks or midnight dark mode for night depots.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "14px",
                  }}
                >
                  {[
                    {
                      id: "light" as ThemeMode,
                      title: "TRADON Light",
                      desc: "Clean Nigerian emerald & crisp canvas (Recommended)",
                      icon: <SunMedium size={20} color={tokens.textPrimary} />,
                      bg: "#FFFFFF",
                      headerBg: "#0E3E2B",
                      cardBg: "#F8FAF8",
                    },
                    {
                      id: "dark" as ThemeMode,
                      title: "Midnight Depot",
                      desc: "Deep contrast for evening dispatch & night shifts",
                      icon: <Moon size={20} color="#A3FF00" />,
                      bg: "#0A1711",
                      headerBg: "#0E2017",
                      cardBg: "#11241B",
                    },
                    {
                      id: "glare-guard" as ThemeMode,
                      title: "Van Glare Guard",
                      desc: "Ultra-high contrast for outdoor van windshield tablets",
                      icon: <Zap size={20} color="#000000" />,
                      bg: "#FFFFFF",
                      headerBg: "#000000",
                      cardBg: "#EEEEEE",
                    },
                    {
                      id: "slate" as ThemeMode,
                      title: "Executive Slate",
                      desc: "Neutral monochrome for boardroom presentations",
                      icon: <Monitor size={20} color="#334155" />,
                      bg: "#F8FAFC",
                      headerBg: "#1E293B",
                      cardBg: "#F1F5F9",
                    },
                  ].map((themeOpt) => {
                    const isSelected = config.theme === themeOpt.id;
                    return (
                      <div
                        key={themeOpt.id}
                        onClick={() => updateConfig({ theme: themeOpt.id })}
                        style={{
                          border: isSelected
                            ? `2px solid ${currentAccent.hex}`
                            : `1px solid ${tokens.borderSubtle}`,
                          borderRadius: "12px",
                          padding: "16px",
                          cursor: "pointer",
                          backgroundColor: isSelected ? tokens.bgSubtle : tokens.bgCard,
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          position: "relative",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {/* Mini Window Preview */}
                        <div
                          style={{
                            height: "64px",
                            borderRadius: "6px",
                            backgroundColor: themeOpt.bg,
                            border: "1px solid rgba(0,0,0,0.1)",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              height: "14px",
                              backgroundColor: themeOpt.headerBg,
                              display: "flex",
                              alignItems: "center",
                              paddingLeft: "6px",
                              gap: "3px",
                            }}
                          >
                            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)" }} />
                            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.4)" }} />
                          </div>
                          <div style={{ padding: "6px", display: "flex", gap: "4px", flexGrow: 1 }}>
                            <div
                              style={{
                                width: "24px",
                                backgroundColor: themeOpt.headerBg,
                                opacity: 0.3,
                                borderRadius: "3px",
                              }}
                            />
                            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "3px" }}>
                              <div
                                style={{
                                  height: "10px",
                                  backgroundColor: themeOpt.cardBg,
                                  borderRadius: "2px",
                                }}
                              />
                              <div
                                style={{
                                  height: "16px",
                                  backgroundColor: themeOpt.cardBg,
                                  borderRadius: "2px",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                              {themeOpt.title}
                            </span>
                            {isSelected && (
                              <div
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  backgroundColor: currentAccent.hex,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Check size={12} color={currentAccent.textHex} />
                              </div>
                            )}
                          </div>
                          <p style={{ fontSize: "11px", color: tokens.textMuted, marginTop: "4px", lineHeight: 1.3 }}>
                            {themeOpt.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color Palette */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  transition: config.enableAnimations ? "background-color 0.2s ease, border-color 0.2s ease" : "none",
                }}
              >
                <div style={{ marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: tokens.textPrimary }}>
                    Primary Accent Color
                  </h3>
                  <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                    Applied to active navigation pills, primary CTAs, order dispatch highlights, and KPI badges.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
                  {(Object.keys(ACCENT_MAP) as AccentColor[]).map((key) => {
                    const item = ACCENT_MAP[key];
                    const isSelected = config.accent === key;
                    return (
                      <div
                        key={key}
                        onClick={() => updateConfig({ accent: key })}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          border: isSelected
                            ? `2px solid ${item.hex}`
                            : `1px solid ${tokens.borderSubtle}`,
                          backgroundColor: isSelected ? item.lightBg : tokens.bgCard,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: item.hex,
                            border: "2px solid rgba(0,0,0,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {isSelected && <Check size={14} color={item.textHex} />}
                        </div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: "11px", color: tokens.textMuted, fontFamily: "monospace" }}>
                            {item.hex}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: DENSITY & LAYOUT */}
          {activeTab === "layout" && (
            <>
              {/* Density selector */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: tokens.textPrimary }}>
                    Table & Interface Density
                  </h3>
                  <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                    Configure row heights and spacing across orders, inventory ledgers, and distributor directories.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px" }}>
                  {[
                    {
                      id: "compact" as Density,
                      title: "Compact Density",
                      desc: "32px rows. Fits 40% more SKUs and order items per screen for fast order desk dispatchers.",
                      icon: <Maximize2 size={18} />,
                    },
                    {
                      id: "balanced" as Density,
                      title: "Balanced (Default)",
                      desc: "48px rows. Modern ergonomic breathing room with crisp iconography and comfortable reading.",
                      icon: <Sliders size={18} />,
                    },
                    {
                      id: "touch" as Density,
                      title: "Touch Screen / POS",
                      desc: "64px rows. Oversized tap targets designed specifically for rugged Android warehouse scanners.",
                      icon: <Smartphone size={18} />,
                    },
                  ].map((dens) => {
                    const isSelected = config.density === dens.id;
                    return (
                      <div
                        key={dens.id}
                        onClick={() => updateConfig({ density: dens.id })}
                        style={{
                          border: isSelected
                            ? `2px solid ${currentAccent.hex}`
                            : `1px solid ${tokens.borderSubtle}`,
                          borderRadius: "12px",
                          padding: "16px",
                          cursor: "pointer",
                          backgroundColor: isSelected ? tokens.bgSubtle : tokens.bgCard,
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              backgroundColor: isSelected ? currentAccent.hex : tokens.bgSubtle,
                              color: isSelected ? currentAccent.textHex : tokens.textPrimary,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {dens.icon}
                          </div>
                          {isSelected && <Check size={16} color={tokens.textPrimary} />}
                        </div>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                            {dens.title}
                          </div>
                          <div style={{ fontSize: "12px", color: tokens.textMuted, marginTop: "4px", lineHeight: 1.4 }}>
                            {dens.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4 Font Options (Typography) */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: tokens.textPrimary }}>
                    Font Family (Typography)
                  </h3>
                  <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                    Select your preferred interface typeface across all dashboards, SKU tables, and dispatch notes.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "12px" }}>
                  {[
                    {
                      id: "poppins" as FontFamily,
                      title: "Poppins",
                      family: "var(--font-poppins), sans-serif",
                      desc: "Modern FMCG geometric sans (Default)",
                      sample: "TRADON ₦42.8M",
                    },
                    {
                      id: "inter" as FontFamily,
                      title: "Inter",
                      family: "var(--font-inter), sans-serif",
                      desc: "Clean, ultra-legible enterprise typography",
                      sample: "TRADON ₦42.8M",
                    },
                    {
                      id: "jakarta" as FontFamily,
                      title: "Plus Jakarta Sans",
                      family: "var(--font-jakarta), sans-serif",
                      desc: "Contemporary, crisp geometric style",
                      sample: "TRADON ₦42.8M",
                    },
                    {
                      id: "outfit" as FontFamily,
                      title: "Outfit",
                      family: "var(--font-outfit), sans-serif",
                      desc: "Bold executive headers & high-contrast UI",
                      sample: "TRADON ₦42.8M",
                    },
                  ].map((fontOpt) => {
                    const isSelected = (config.fontFamily || "poppins") === fontOpt.id;
                    return (
                      <div
                        key={fontOpt.id}
                        onClick={() => updateConfig({ fontFamily: fontOpt.id })}
                        style={{
                          border: isSelected
                            ? `2px solid ${currentAccent.hex}`
                            : `1px solid ${tokens.borderSubtle}`,
                          borderRadius: "12px",
                          padding: "14px 16px",
                          cursor: "pointer",
                          backgroundColor: isSelected ? tokens.bgSubtle : tokens.bgCard,
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          transition: "all 0.15s ease",
                          fontFamily: fontOpt.family,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: tokens.textPrimary }}>
                            {fontOpt.title}
                          </span>
                          {isSelected && (
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                backgroundColor: currentAccent.hex,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Check size={12} color={currentAccent.textHex} />
                            </div>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: config.theme === "dark" ? currentAccent.hex : tokens.accentTextOnLight,
                            backgroundColor: tokens.bgSubtle,
                            padding: "4px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          {fontOpt.sample}
                        </div>
                        <span style={{ fontSize: "11px", color: tokens.textMuted, lineHeight: 1.3 }}>
                          {fontOpt.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Font scaling */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: tokens.textPrimary }}>
                    Font Scale & Readability
                  </h3>
                  <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                    Adjust typography scale across all dashboards and reports without breaking responsive alignment.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    { val: "90" as FontScale, label: "Compact (90%)" },
                    { val: "100" as FontScale, label: "Standard (100%)" },
                    { val: "110" as FontScale, label: "Enlarged (110%)" },
                    { val: "120" as FontScale, label: "Maximum Legibility (120%)" },
                  ].map((item) => {
                    const isSelected = config.fontScale === item.val;
                    return (
                      <button
                        key={item.val}
                        onClick={() => updateConfig({ fontScale: item.val })}
                        style={{
                          padding: "10px 18px",
                          borderRadius: "10px",
                          border: isSelected
                            ? `2px solid ${currentAccent.hex}`
                            : `1px solid ${tokens.borderSubtle}`,
                          backgroundColor: isSelected ? tokens.bgSubtle : tokens.bgCard,
                          color: tokens.textPrimary,
                          fontSize: "13px",
                          fontWeight: isSelected ? 600 : 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                      Show Table Gridlines
                    </div>
                    <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                      Displays subtle horizontal and vertical borders between SKU rows and columns.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showTableGridlines}
                    onChange={(e) => updateConfig({ showTableGridlines: e.target.checked })}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                      Enable Fluid Micro-Animations
                    </div>
                    <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                      Smooth slide transitions for modals, drawer trays, and live metric updates.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.enableAnimations}
                    onChange={(e) => updateConfig({ enableAnimations: e.target.checked })}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </>
          )}

          {/* TAB 3: DATA VISUALIZATION */}
          {activeTab === "data" && (
            <>
              {/* Currency and units */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: tokens.textPrimary }}>
                    Primary Currency Display
                  </h3>
                  <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                    Select default currency notation across wholesale invoices, bank settlement feeds, and credit ledgers.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
                  {[
                    { id: "NGN" as CurrencyPref, symbol: "₦", name: "Nigerian Naira (NGN)" },
                    { id: "USD" as CurrencyPref, symbol: "$", name: "US Dollar (USD)" },
                    { id: "GHS" as CurrencyPref, symbol: "₵", name: "Ghanaian Cedi (GHS)" },
                    { id: "KES" as CurrencyPref, symbol: "KSh", name: "Kenyan Shilling (KES)" },
                  ].map((cur) => {
                    const isSelected = config.currency === cur.id;
                    return (
                      <div
                        key={cur.id}
                        onClick={() => updateConfig({ currency: cur.id })}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          border: isSelected
                            ? `2px solid ${currentAccent.hex}`
                            : `1px solid ${tokens.borderSubtle}`,
                          backgroundColor: isSelected ? tokens.bgSubtle : tokens.bgCard,
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: tokens.textPrimary,
                            width: "28px",
                            height: "28px",
                            borderRadius: "6px",
                            backgroundColor: tokens.bgSubtle,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {cur.symbol}
                        </span>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>
                            {cur.id}
                          </div>
                          <div style={{ fontSize: "11px", color: tokens.textMuted }}>{cur.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stock risk badges */}
              <div
                style={{
                  backgroundColor: tokens.bgCard,
                  borderRadius: "14px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                      High-Contrast Expiry & Safety Stock Badges
                    </div>
                    <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                      Renders vibrant red/orange indicators when cartons are within 30 days of expiry.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.highContrastBadges}
                    onChange={(e) => updateConfig({ highContrastBadges: e.target.checked })}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                      Show Real-Time Stock Depletion Warnings
                    </div>
                    <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                      Pulse animation on SKUs approaching minimum warehouse safety threshold.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showStockWarnings}
                    onChange={(e) => updateConfig({ showStockWarnings: e.target.checked })}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </>
          )}

          {/* TAB 4: DISTRIBUTOR PORTAL BRANDING */}
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
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: tokens.textPrimary }}>
                  Distributor Self-Service Portal Co-Branding
                </h3>
                <p style={{ fontSize: "13px", color: tokens.textMuted, marginTop: "2px" }}>
                  Customize the look and feel your Tier-1 distributors see when placing wholesale purchase orders.
                </p>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  backgroundColor: tokens.bgSubtle,
                  border: `1px dashed ${tokens.borderSubtle}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      backgroundColor: currentAccent.hex,
                      color: currentAccent.textHex,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    CHI
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                      Active Tenant Logo: {user?.businessName || "Chi Limited"}
                    </div>
                    <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                      Appears on thermal printout dispatch notes and email receipts.
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                  <button
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
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
                    <Upload size={14} /> Upload Custom Logo
                  </button>
                  <button
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: tokens.bgSubtle,
                      fontSize: "12px",
                      fontWeight: 500,
                      color: tokens.textPrimary,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Preview Portal Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Preview Canvas (Real-Time Interactive Preview) */}
        <div
          style={{
            position: "sticky",
            top: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 4px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Eye size={16} color={tokens.textPrimary} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.textPrimary }}>
                Live Canvas Preview
              </span>
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: currentAccent.textHex,
                backgroundColor: currentAccent.hex,
                padding: "2px 8px",
                borderRadius: "12px",
              }}
            >
              UPDATES IN REAL TIME
            </span>
          </div>

          {/* Mini Mock Dashboard Container */}
          <div
            style={{
              borderRadius: "16px",
              border: `1px solid ${tokens.borderSubtle}`,
              backgroundColor: tokens.bgCard,
              color: tokens.textPrimary,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease",
            }}
          >
            {/* Mock Top Header Bar */}
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: tokens.bgHeader,
                borderBottom: `1px solid ${tokens.borderSubtle}`,
                color: tokens.textPrimary,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "4px",
                    backgroundColor: currentAccent.hex,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Boxes size={12} color={currentAccent.textHex} />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em", color: tokens.textPrimary }}>
                  TRADON OS
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    backgroundColor: currentAccent.hex,
                    color: currentAccent.textHex,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  {config.theme.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Mock Content Body */}
            <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Mock Metric Card */}
              <div
                style={{
                  padding: config.density === "compact" ? "10px 12px" : config.density === "touch" ? "18px 20px" : "14px 16px",
                  borderRadius: "12px",
                  backgroundColor: tokens.bgSubtle,
                  border: `1px solid ${tokens.borderSubtle}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: tokens.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Today's Wholesale Revenue
                  </div>
                  <div
                    style={{
                      fontSize: config.fontScale === "120" ? "22px" : config.fontScale === "110" ? "20px" : "18px",
                      fontWeight: 700,
                      color: tokens.textPrimary,
                      marginTop: "2px",
                    }}
                  >
                    {config.currency === "NGN"
                      ? "₦42,850,000"
                      : config.currency === "USD"
                      ? "$28,500.00"
                      : config.currency === "GHS"
                      ? "₵385,000"
                      : "KSh 3,740,000"}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: currentAccent.hex,
                    color: currentAccent.textHex,
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <TrendingUp size={12} /> +18.4%
                </div>
              </div>

              {/* Mock SKU Table Preview */}
              <div
                style={{
                  borderRadius: "10px",
                  border: config.showTableGridlines ? `1px solid ${tokens.borderSubtle}` : "none",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "8px 12px",
                    backgroundColor: tokens.bgSubtle,
                    fontSize: "11px",
                    fontWeight: 600,
                    color: tokens.textPrimary,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>SKU & BATCH</span>
                  <span>STOCK LEVEL</span>
                </div>

                {[
                  {
                    sku: "Chivita 100% Real Orange 1L x 10",
                    batch: "BN-2026-CH09",
                    qty: "1,250 Cartons",
                    status: "Healthy",
                    statusColor: "#059669",
                  },
                  {
                    sku: "Hollandia Yoghurt Strawberry 500ml",
                    batch: "BN-2026-HY14",
                    qty: "142 Cartons",
                    status: "Low Safety Stock",
                    statusColor: config.highContrastBadges ? "#DC2626" : "#EA580C",
                  },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: config.density === "compact" ? "6px 12px" : config.density === "touch" ? "14px 12px" : "10px 12px",
                      borderBottom: config.showTableGridlines && idx === 0 ? `1px solid ${tokens.borderSubtle}` : "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: idx % 2 === 0 ? tokens.bgCard : tokens.bgSubtle,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: config.fontScale === "120" ? "13px" : "12px",
                          fontWeight: 600,
                          color: tokens.textPrimary,
                        }}
                      >
                        {row.sku}
                      </div>
                      <div style={{ fontSize: "10px", color: tokens.textMuted }}>
                        {row.batch}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: tokens.textPrimary,
                        }}
                      >
                        {row.qty}
                      </div>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          color: row.statusColor,
                          backgroundColor: `${row.statusColor}18`,
                          padding: "1px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock Primary CTA Button with dynamic Accent */}
              <button
                style={{
                  width: "100%",
                  padding: config.density === "compact" ? "8px" : config.density === "touch" ? "16px" : "12px",
                  borderRadius: "10px",
                  backgroundColor: currentAccent.hex,
                  color: currentAccent.textHex,
                  border: "none",
                  fontWeight: 700,
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "default",
                }}
              >
                <Package size={14} /> Authorize Order Dispatch
              </button>
            </div>
          </div>

          <div
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              backgroundColor: tokens.bgSubtle,
              border: `1px solid ${tokens.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: tokens.textMuted,
            }}
          >
            <Info size={16} color={tokens.textPrimary} style={{ flexShrink: 0 }} />
            <span>Theme and styling persist automatically across this device and apply to all dashboard views.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
