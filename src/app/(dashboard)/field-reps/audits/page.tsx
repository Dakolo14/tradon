"use client";

import React, { useState } from "react";
import { 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Box,
  MoreHorizontal,
  Edit,
  Trash2,
  X,
  Check,
  Plus,
  Layers
} from "lucide-react";

interface StoreAudit {
  id: string;
  outletName: string;
  repName: string;
  location: string;
  auditTime: string;
  shelfShare: number; // e.g. 68% of fruit juice category
  competitorBrand: string;
  competitorPrice: string;
  stockCondition: "Adequate Stock" | "Low Stock Alert" | "Out of Stock";
  planogramCompliance: "Passed" | "Partial Breach" | "Failed";
  imageUrl: string;
  notes: string;
}

const initialAudits: StoreAudit[] = [
  {
    id: "1",
    outletName: "Goodluck Supermarket, Allen Ave",
    repName: "Tunde Bakare",
    location: "Ikeja, Lagos",
    auditTime: "Today @ 10:14 AM",
    shelfShare: 72,
    competitorBrand: "5 Alive (Coca-Cola)",
    competitorPrice: "₦700/pack",
    stockCondition: "Adequate Stock",
    planogramCompliance: "Passed",
    imageUrl: "shelf_display_1",
    notes: "Eye-level display compliant. Chivita 100% positioned right next to till.",
  },
  {
    id: "2",
    outletName: "Alhaji Musa Depot, Balogun",
    repName: "Emeka Okafor",
    location: "Idumota, Lagos",
    auditTime: "Today @ 09:45 AM",
    shelfShare: 85,
    competitorBrand: "Cway Water / Dano",
    competitorPrice: "₦650/pack",
    stockCondition: "Low Stock Alert",
    planogramCompliance: "Passed",
    imageUrl: "shelf_display_2",
    notes: "Capri-Sun 200ml nearly depleted; urgent replenishment order booked.",
  },
  {
    id: "3",
    outletName: "Prince Ebeano Supermarket",
    repName: "Tunde Bakare",
    location: "Ikeja GRA, Lagos",
    auditTime: "Yesterday @ 04:12 PM",
    shelfShare: 45,
    competitorBrand: "Fumman Juices",
    competitorPrice: "₦680/pack",
    stockCondition: "Out of Stock",
    planogramCompliance: "Partial Breach",
    imageUrl: "shelf_display_3",
    notes: "Endcap banner was displaced by competitor POS material. Rep reinstated banner.",
  },
  {
    id: "4",
    outletName: "Bata Stores Co.",
    repName: "Amina Yusuf",
    location: "Sabon Gari, Kano",
    auditTime: "Yesterday @ 02:30 PM",
    shelfShare: 64,
    competitorBrand: "Peak Milk",
    competitorPrice: "₦850/tin",
    stockCondition: "Adequate Stock",
    planogramCompliance: "Passed",
    imageUrl: "shelf_display_4",
    notes: "Hollandia Evap milk well presented with fresh price tags.",
  },
];

export default function RetailAuditsPage() {
  const [audits, setAudits] = useState<StoreAudit[]>(initialAudits);
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Modals
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isNewAuditModalOpen, setIsNewAuditModalOpen] = useState(false);
  const [inspectAudit, setInspectAudit] = useState<StoreAudit | null>(null);
  const [editingAudit, setEditingAudit] = useState<StoreAudit | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Audit Request state
  const [newOutlet, setNewOutlet] = useState("");
  const [newRep, setNewRep] = useState("Emeka Okafor");
  const [newLocation, setNewLocation] = useState("Lagos Island Beat");
  const [newShare, setNewShare] = useState("65");
  const [newCompetitor, setNewCompetitor] = useState("5 Alive");
  const [newCompPrice, setNewCompPrice] = useState("₦700/pack");
  const [newNotes, setNewNotes] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredAudits = audits.filter(a => {
    if (selectedCondition === "All") return true;
    return a.stockCondition === selectedCondition;
  });

  const handleCreateAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOutlet) return;
    const newEntry: StoreAudit = {
      id: `audit-${Date.now()}`,
      outletName: newOutlet,
      repName: newRep,
      location: newLocation,
      auditTime: "Just now",
      shelfShare: parseInt(newShare) || 60,
      competitorBrand: newCompetitor,
      competitorPrice: newCompPrice,
      stockCondition: "Adequate Stock",
      planogramCompliance: "Passed",
      imageUrl: "shelf_display_new",
      notes: newNotes || "Full shelf share verified with GPS camera stamp.",
    };
    setAudits([newEntry, ...audits]);
    setIsNewAuditModalOpen(false);
    setNewOutlet("");
    setNewNotes("");
    showToast(`Dispatched field audit request for ${newOutlet}!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAudit) return;
    setAudits(audits.map(a => a.id === editingAudit.id ? editingAudit : a));
    setEditingAudit(null);
    showToast(`Audit for ${editingAudit.outletName} updated.`);
  };

  const handleDeleteAudit = (id: string, name: string) => {
    if (confirm(`Remove audit record for ${name}?`)) {
      setAudits(audits.filter(a => a.id !== id));
      setActiveDropdownId(null);
      showToast(`Audit record removed.`);
    }
  };

  const handleToggleCompliance = (id: string) => {
    setAudits(audits.map(a => {
      if (a.id === id) {
        const next = a.planogramCompliance === "Passed" ? "Partial Breach" : "Passed";
        return { ...a, planogramCompliance: next };
      }
      return a;
    }));
    setActiveDropdownId(null);
    showToast("Planogram compliance status updated!");
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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Retail Audits & Shelf Share Intelligence</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Photo proof of presence, planogram compliance, out-of-stock alerts, and competitor price tracking.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsGuidelinesModalOpen(true)}
            style={{ 
              height: "40px", 
              padding: "0 18px", 
              backgroundColor: "transparent", 
              border: "1px solid rgba(14,62,43,0.2)", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: "#0E3E2B", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px" 
            }} 
            className="hover:bg-black/5 transition-colors"
          >
            <Layers size={14} />
            Planogram Guidelines
          </button>
          <button 
            onClick={() => setIsNewAuditModalOpen(true)}
            style={{ 
              height: "40px", 
              padding: "0 20px", 
              backgroundColor: "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }} 
            className="hover:bg-[#08281B] transition-colors"
          >
            <Camera size={16} />
            Request Field Audit
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Average Shelf Share</span>
          <h3 style={{ fontSize: "26px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>68.4%</h3>
          <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 500 }}>+4.2% dominance over competitors</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Planogram Compliance</span>
          <h3 style={{ fontSize: "26px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>91.2%</h3>
          <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>Eye-level & POS branding verified</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Out-of-Stock (OOS) Flags</span>
          <h3 style={{ fontSize: "26px", fontWeight: 700, color: "#EF4444", margin: "8px 0 2px" }}>
            {audits.filter(a => a.stockCondition === "Out of Stock").length} Stores
          </h3>
          <span style={{ fontSize: "12px", color: "#DC2626", fontWeight: 500 }}>Auto-replenishment booked</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px" }}>
        {["All", "Adequate Stock", "Low Stock Alert", "Out of Stock"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedCondition(status)}
            style={{
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid",
              borderColor: selectedCondition === status ? "#0E3E2B" : "rgba(14,62,43,0.15)",
              backgroundColor: selectedCondition === status ? "#0E3E2B" : "transparent",
              color: selectedCondition === status ? "#FFFFFF" : "#0E3E2B",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
            className="transition-colors"
          >
            {status}
          </button>
        ))}
      </div>

      {/* Audits Feed Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
        {filteredAudits.map((audit) => {
          const isMenuOpen = activeDropdownId === audit.id;

          return (
            <div
              key={audit.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid rgba(14,62,43,0.08)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                position: "relative",
              }}
            >
              {/* Header / Outlet info */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>{audit.outletName}</h4>
                  <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)" }}>{audit.location} • By {audit.repName}</span>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: audit.planogramCompliance === "Passed" ? "#F0FDF4" : "#FEF2F2",
                      color: audit.planogramCompliance === "Passed" ? "#16A34A" : "#DC2626",
                      padding: "3px 8px",
                      borderRadius: "9999px",
                    }}
                  >
                    {audit.planogramCompliance}
                  </span>

                  <button
                    onClick={() => setActiveDropdownId(isMenuOpen ? null : audit.id)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border: "1px solid rgba(14,62,43,0.15)",
                      backgroundColor: isMenuOpen ? "#0E3E2B" : "transparent",
                      color: isMenuOpen ? "#FFFFFF" : "#0E3E2B",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </div>

                {/* Card Dropdown Menu */}
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
                        setEditingAudit({ ...audit });
                        setActiveDropdownId(null);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "transparent",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0E3E2B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      className="hover:bg-black/5"
                    >
                      <Edit size={14} />
                      Edit Audit Notes
                    </button>

                    <button
                      onClick={() => handleToggleCompliance(audit.id)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "transparent",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0E3E2B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      className="hover:bg-black/5"
                    >
                      <CheckCircle2 size={14} color="#16A34A" />
                      Toggle Compliance
                    </button>

                    <div style={{ height: "1px", backgroundColor: "rgba(14,62,43,0.06)", margin: "4px 0" }} />

                    <button
                      onClick={() => handleDeleteAudit(audit.id, audit.outletName)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: "transparent",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#EF4444",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      className="hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete Audit
                    </button>
                  </div>
                )}
              </div>

              {/* Photo Preview Simulation */}
              <div 
                style={{ 
                  height: "160px", 
                  backgroundColor: "#F0F5ED", 
                  borderRadius: "12px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  border: "1px dashed rgba(14,62,43,0.2)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <Camera size={32} color="#0E3E2B" opacity={0.5} />
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#0E3E2B", marginTop: "8px" }}>
                  Shelf Display Photo Uploaded
                </span>
                <span style={{ fontSize: "10px", color: "rgba(14,62,43,0.5)" }}>Timestamped GPS: {audit.auditTime}</span>

                {/* Shelf Share Tag Overlay */}
                <div style={{ position: "absolute", bottom: "10px", right: "10px", backgroundColor: "#0E3E2B", color: "#FFFFFF", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>
                  {audit.shelfShare}% Shelf Share
                </div>
              </div>

              {/* Competitor & Stock Status */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <div>
                  <span style={{ fontSize: "10px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Primary Competitor</span>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", margin: "2px 0 0" }}>{audit.competitorBrand}</p>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>{audit.competitorPrice}</span>
                </div>
                <div>
                  <span style={{ fontSize: "10px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Stock Condition</span>
                  <p style={{ 
                    fontSize: "12px", 
                    fontWeight: 700, 
                    margin: "2px 0 0",
                    color: audit.stockCondition === "Adequate Stock" ? "#16A34A" : audit.stockCondition === "Low Stock Alert" ? "#D97706" : "#DC2626"
                  }}>
                    {audit.stockCondition}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.7)", margin: 0, lineHeight: "1.4" }}>
                "{audit.notes}"
              </p>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(14,62,43,0.06)", paddingTop: "10px", marginTop: "auto" }}>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} />
                  {audit.auditTime}
                </span>
                <button 
                  onClick={() => setInspectAudit(audit)}
                  style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }} 
                  className="hover:underline"
                >
                  Audit Details <ChevronRight size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Planogram Guidelines */}
      {isGuidelinesModalOpen && (
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
            maxWidth: "520px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Chi FMCG Retail Planogram Rules
              </h3>
              <button 
                onClick={() => setIsGuidelinesModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px", color: "rgba(14,62,43,0.8)", lineHeight: "1.5" }}>
              <div style={{ padding: "12px", backgroundColor: "#F0F5ED", borderRadius: "10px" }}>
                <strong style={{ color: "#0E3E2B" }}>1. Eye-Level Shelf Dominance</strong>
                <p style={{ margin: "4px 0 0", fontSize: "12px" }}>Chivita 100% 1L must occupy the middle two eye-level shelves (120cm - 150cm from floor level) with a minimum of 4 facing blocks.</p>
              </div>

              <div style={{ padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <strong style={{ color: "#0E3E2B" }}>2. Chiller & Cooler Placements</strong>
                <p style={{ margin: "4px 0 0", fontSize: "12px" }}>In branded refrigerators, Hollandia UHT and Chivita fruit juices must take the top 2 racks. No competitor beverages allowed in Chi-branded coolers.</p>
              </div>

              <div style={{ padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <strong style={{ color: "#0E3E2B" }}>3. Price Tag Transparency</strong>
                <p style={{ margin: "4px 0 0", fontSize: "12px" }}>Recommended Consumer Price (RCP) talkers must be visible. Reps should flag any retail outlet price-gouging above 15% RCP margin.</p>
              </div>
            </div>

            <button
              onClick={() => setIsGuidelinesModalOpen(false)}
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
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Modal: Request Field Audit */}
      {isNewAuditModalOpen && (
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
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Request Field Audit
              </h3>
              <button 
                onClick={() => setIsNewAuditModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateAudit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Retail Outlet Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mega Plaza provisions, Marina"
                  value={newOutlet}
                  onChange={(e) => setNewOutlet(e.target.value)}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Assigned Rep
                  </label>
                  <select
                    value={newRep}
                    onChange={(e) => setNewRep(e.target.value)}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(14,62,43,0.2)",
                      fontSize: "13px",
                      outline: "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <option value="Emeka Okafor">Emeka Okafor (Lagos Island)</option>
                    <option value="Tunde Bakare">Tunde Bakare (Ikeja)</option>
                    <option value="Amina Yusuf">Amina Yusuf (Kano)</option>
                    <option value="Segun Adeleke">Segun Adeleke (Ibadan)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Expected Shelf Share %
                  </label>
                  <input
                    type="number"
                    value={newShare}
                    onChange={(e) => setNewShare(e.target.value)}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(14,62,43,0.2)",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Primary Competitor Brand
                </label>
                <input
                  type="text"
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Inspection Instructions / Notes
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Check stock depth on Capri-Sun and inspect cooler cleanliness."
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewAuditModalOpen(false)}
                  style={{
                    flex: 1,
                    height: "44px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    backgroundColor: "transparent",
                    color: "#0E3E2B",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
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
                  Dispatch Audit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Audit Details Inspection */}
      {inspectAudit && (
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  {inspectAudit.outletName}
                </h3>
                <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)" }}>Audited by {inspectAudit.repName} • {inspectAudit.auditTime}</span>
              </div>
              <button 
                onClick={() => setInspectAudit(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "14px", backgroundColor: "#F0F5ED", borderRadius: "10px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Chi Shelf Share</span>
                  <p style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: 700, color: "#0E3E2B" }}>{inspectAudit.shelfShare}%</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Planogram Status</span>
                  <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: 700, color: inspectAudit.planogramCompliance === "Passed" ? "#16A34A" : "#DC2626" }}>
                    {inspectAudit.planogramCompliance}
                  </p>
                </div>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Competitor Pricing Analysis</span>
                <p style={{ margin: "4px 0 0", fontWeight: 600, color: "#0E3E2B" }}>{inspectAudit.competitorBrand}: {inspectAudit.competitorPrice}</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(14,62,43,0.6)" }}>Chi Wholesale baseline: ₦620/pack (Competitive margin intact)</p>
              </div>

              <div style={{ padding: "14px", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Field Representative Remarks</span>
                <p style={{ margin: "4px 0 0", color: "#0E3E2B", fontStyle: "italic" }}>"{inspectAudit.notes}"</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  setInspectAudit(null);
                  showToast(`Urgent replenishment order triggered for ${inspectAudit.outletName}!`);
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
                Trigger Restock Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Audit Notes */}
      {editingAudit && (
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
            maxWidth: "480px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Edit Audit Notes: {editingAudit.outletName}
              </h3>
              <button 
                onClick={() => setEditingAudit(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Shelf Share %
                </label>
                <input
                  type="number"
                  value={editingAudit.shelfShare}
                  onChange={(e) => setEditingAudit({ ...editingAudit, shelfShare: parseInt(e.target.value) || 0 })}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Stock Condition
                </label>
                <select
                  value={editingAudit.stockCondition}
                  onChange={(e) => setEditingAudit({ ...editingAudit, stockCondition: e.target.value as any })}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="Adequate Stock">Adequate Stock</option>
                  <option value="Low Stock Alert">Low Stock Alert</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Audit Observation Notes
                </label>
                <textarea
                  rows={3}
                  value={editingAudit.notes}
                  onChange={(e) => setEditingAudit({ ...editingAudit, notes: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingAudit(null)}
                  style={{
                    flex: 1,
                    height: "44px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    backgroundColor: "transparent",
                    color: "#0E3E2B",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
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
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
