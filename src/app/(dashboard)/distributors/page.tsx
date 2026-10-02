"use client";

import React, { useState } from "react";
import { Search, Plus, Menu as MenuIcon, MoreHorizontal, Edit, Trash2, X, CheckCircle2, DollarSign } from "lucide-react";
import { useAppearance } from "@/context/AppearanceContext";

interface Distributor {
  id: string;
  name: string;
  distId: string;
  region: string;
  tier: "Gold" | "Silver" | "Bronze";
  credit: string;
  balance: string;
  utilization: number;
  status: "Active" | "28d overdue" | "14d overdue" | "21d overdue" | "7d overdue";
}

const initialDistributors: Distributor[] = [
  { id: "1", name: "Alhaji Musa Distributors", distId: "D001", region: "Kano", tier: "Gold", credit: "₦5.0M", balance: "₦4.3M", utilization: 87, status: "28d overdue" },
  { id: "2", name: "Mama Tope Stores", distId: "D002", region: "Ibadan", tier: "Silver", credit: "₦2.0M", balance: "₦450K", utilization: 22, status: "Active" },
  { id: "3", name: "Lagos Island Beverages", distId: "D003", region: "Lagos", tier: "Gold", credit: "₦8.0M", balance: "₦1.2M", utilization: 15, status: "Active" },
  { id: "4", name: "Eko FMCG Hub", distId: "D004", region: "Lagos", tier: "Gold", credit: "₦6.0M", balance: "₦5.8M", utilization: 97, status: "14d overdue" },
  { id: "5", name: "Abuja Central Trading", distId: "D005", region: "Abuja", tier: "Silver", credit: "₦3.0M", balance: "₦980K", utilization: 33, status: "Active" },
  { id: "6", name: "PH Riverside Distrib.", distId: "D006", region: "Port Harcourt", tier: "Bronze", credit: "₦1.5M", balance: "₦1.4M", utilization: 97, status: "21d overdue" },
  { id: "7", name: "Kano Northern Goods", distId: "D007", region: "Kano", tier: "Silver", credit: "₦2.5M", balance: "₦320K", utilization: 13, status: "Active" },
  { id: "8", name: "Ibadan Wholesale Co.", distId: "D008", region: "Ibadan", tier: "Bronze", credit: "₦1.0M", balance: "₦890K", utilization: 89, status: "7d overdue" },
];

export default function DistributorsPage() {
  const { tokens, config } = useAppearance();
  const isDark = config.theme === "dark";
  const [distributors, setDistributors] = useState<Distributor[]>(initialDistributors);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingDistributor, setEditingDistributor] = useState<Distributor | null>(null);
  const [creditLimitModal, setCreditLimitModal] = useState<{ id: string; name: string; currentCredit: string; type: "increase" | "reduce" } | null>(null);
  const [newCreditValue, setNewCreditValue] = useState("");

  // New Distributor Form
  const [newDistName, setNewDistName] = useState("");
  const [newDistRegion, setNewDistRegion] = useState("Lagos");
  const [newDistTier, setNewDistTier] = useState<Distributor["tier"]>("Silver");
  const [newDistCredit, setNewDistCredit] = useState("₦3.0M");

  const filteredDistributors = distributors.filter((d) => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.distId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDistributor = (e: React.FormEvent) => {
    e.preventDefault();
    const newDist: Distributor = {
      id: String(Date.now()),
      name: newDistName,
      distId: `D00${distributors.length + 1}`,
      region: newDistRegion,
      tier: newDistTier,
      credit: newDistCredit,
      balance: "₦0",
      utilization: 0,
      status: "Active",
    };
    setDistributors([newDist, ...distributors]);
    setIsNewModalOpen(false);
    setNewDistName("");
  };

  const handleUpdateDistributor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDistributor) return;
    setDistributors(distributors.map(d => d.id === editingDistributor.id ? editingDistributor : d));
    setEditingDistributor(null);
  };

  const handleSaveCreditLimit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditLimitModal) return;
    setDistributors(distributors.map(d => {
      if (d.id === creditLimitModal.id) {
        return { ...d, credit: newCreditValue };
      }
      return d;
    }));
    setCreditLimitModal(null);
    setNewCreditValue("");
  };

  const handleTogglePause = (id: string) => {
    setDistributors(distributors.map(d => {
      if (d.id === id) {
        return { ...d, status: d.status === "Active" ? "14d overdue" : "Active" };
      }
      return d;
    }));
    setActiveMenuId(null);
  };

  const handleDeleteDistributor = (id: string) => {
    setDistributors(distributors.filter(d => d.id !== id));
    setActiveMenuId(null);
  };

  const getTierColor = (tier: Distributor["tier"]) => {
    if (isDark) {
      switch (tier) {
        case "Gold": return { bg: "rgba(245,158,11,0.15)", text: "#FBBF24" };
        case "Silver": return { bg: "rgba(148,163,184,0.15)", text: "#CBD5E1" };
        case "Bronze": return { bg: "rgba(249,115,22,0.15)", text: "#FB923C" };
      }
    }
    switch (tier) {
      case "Gold": return { bg: "#FFFBEB", text: "#D97706" };
      case "Silver": return { bg: "#F8F9FA", text: "#64748B" };
      case "Bronze": return { bg: "#FFEDD5", text: "#C2410C" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", paddingBottom: "36px" }}>
      
      {/* Page Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: "-0.01em" }}>
          Distributors Directory
        </h1>
        <p style={{ fontSize: "13.5px", color: tokens.textSecondary, margin: 0 }}>
          Manage your verified Tier-1 wholesale partners, credit limits, and regional fulfillment status.
        </p>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}>
          <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: tokens.textMuted }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search distributors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "42px",
              paddingRight: "16px",
              borderRadius: "9999px",
              border: `1px solid ${tokens.borderSubtle}`,
              backgroundColor: tokens.bgCard,
              fontSize: "13px",
              color: tokens.textPrimary,
              outline: "none",
              boxShadow: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            style={{ 
              height: "40px", 
              padding: "0 18px", 
              backgroundColor: "transparent", 
              border: `1px solid ${tokens.borderSubtle}`, 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: tokens.textPrimary, 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px",
              boxShadow: "none"
            }} 
            className="hover:opacity-80 transition-opacity"
          >
            Export
          </button>
          <button 
            onClick={() => setIsNewModalOpen(true)}
            style={{ 
              height: "40px", 
              padding: "0 20px", 
              backgroundColor: isDark ? "#10B981" : "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              boxShadow: "none"
            }} 
            className="hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            New distributor
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ 
        backgroundColor: tokens.bgCard, 
        borderRadius: "16px", 
        border: `1px solid ${tokens.borderSubtle}`, 
        boxShadow: "none", 
        overflow: "visible" 
      }}>
        
        {/* Table */}
        <div style={{ overflowX: "auto", overflowY: "visible" }}>
          <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: tokens.bgSubtle, whiteSpace: "nowrap", borderBottom: `1px solid ${tokens.borderSubtle}` }}>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Distributor</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Region</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Tier</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Credit</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Balance</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Utilization</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "16px 24px", width: "40px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredDistributors.map((d, index) => (
                <tr key={d.id} style={{ borderBottom: index !== filteredDistributors.length - 1 ? `1px solid ${tokens.borderSubtle}` : "none", position: "relative" }} className="hover:opacity-90 transition-opacity">
                  <td style={{ padding: "16px 24px", minWidth: "200px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>{d.name}</span>
                      <span style={{ fontSize: "11px", color: tokens.textMuted, marginTop: "2px", whiteSpace: "nowrap" }}>{d.distId}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", color: tokens.textSecondary, fontWeight: 500, whiteSpace: "nowrap" }}>{d.region}</td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <span style={{ backgroundColor: getTierColor(d.tier).bg, color: getTierColor(d.tier).text, padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap", display: "inline-flex" }}>
                      {d.tier}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: tokens.textSecondary, whiteSpace: "nowrap" }}>{d.credit}</td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 700, color: tokens.textPrimary, whiteSpace: "nowrap" }}>{d.balance}</td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "80px", height: "4px", backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(14,62,43,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ 
                          width: `${d.utilization}%`, 
                          height: "100%", 
                          backgroundColor: d.utilization > 80 ? "#F59E0B" : d.utilization > 95 ? "#EF4444" : "#10B981" 
                        }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: tokens.textSecondary }}>{d.utilization}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    {d.status === "Active" ? (
                      <span style={{ color: "#10B981", fontSize: "12px", fontWeight: 600 }}>Active</span>
                    ) : (
                      <span style={{ backgroundColor: isDark ? "rgba(239,68,68,0.2)" : "#FEF2F2", color: isDark ? "#F87171" : "#EF4444", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>
                        {d.status}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "16px 24px", position: "relative" }}>
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === d.id ? null : d.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }} 
                      className="hover:opacity-80"
                    >
                      <MenuIcon size={16} />
                    </button>

                    {/* Action Dropdown Menu */}
                    {activeMenuId === d.id && (
                      <div style={{ 
                        position: "absolute", 
                        right: "24px", 
                        top: "40px", 
                        backgroundColor: tokens.bgCard, 
                        borderRadius: "14px", 
                        boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.6)" : "0 10px 25px rgba(0,0,0,0.1)", 
                        border: `1px solid ${tokens.borderSubtle}`,
                        width: "200px",
                        zIndex: 50,
                        padding: "8px"
                      }}>
                        <button 
                          onClick={() => {
                            setEditingDistributor(d);
                            setActiveMenuId(null);
                          }}
                          style={{ width: "100%", textAlign: "left", padding: "8px 12px", fontSize: "13px", fontWeight: 500, color: tokens.textPrimary, background: "none", border: "none", cursor: "pointer", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }} 
                          className="hover:opacity-80"
                        >
                          <Edit size={14} />
                          Edit Profile
                        </button>
                        <button 
                          onClick={() => {
                            setCreditLimitModal({ id: d.id, name: d.name, currentCredit: d.credit, type: "increase" });
                            setNewCreditValue(d.credit);
                            setActiveMenuId(null);
                          }}
                          style={{ width: "100%", textAlign: "left", padding: "8px 12px", fontSize: "13px", fontWeight: 500, color: tokens.textPrimary, background: "none", border: "none", cursor: "pointer", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }} 
                          className="hover:opacity-80"
                        >
                          <DollarSign size={14} />
                          Adjust Credit Limit
                        </button>
                        <button 
                          onClick={() => handleTogglePause(d.id)}
                          style={{ width: "100%", textAlign: "left", padding: "8px 12px", fontSize: "13px", fontWeight: 500, color: d.status === "Active" ? "#D97706" : "#10B981", background: "none", border: "none", cursor: "pointer", borderRadius: "8px" }} 
                          className="hover:opacity-80"
                        >
                          {d.status === "Active" ? "Pause Account" : "Re-activate Account"}
                        </button>
                        <button 
                          onClick={() => handleDeleteDistributor(d.id)}
                          style={{ width: "100%", textAlign: "left", padding: "8px 12px", fontSize: "13px", fontWeight: 500, color: "#EF4444", background: "none", border: "none", cursor: "pointer", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }} 
                          className="hover:opacity-80"
                        >
                          <Trash2 size={14} />
                          Delete Distributor
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW DISTRIBUTOR MODAL */}
      {isNewModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "480px", 
            padding: "32px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setIsNewModalOpen(false)}
              style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: 0, marginBottom: "8px" }}>Onboard New Distributor</h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, marginBottom: "20px" }}>
              Add an authorized wholesaler or regional modern trade account to your network.
            </p>

            <form onSubmit={handleCreateDistributor} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Distributor Trading Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kaduna Central Provision Hub"
                  value={newDistName}
                  onChange={(e) => setNewDistName(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Territory Region</label>
                  <select
                    value={newDistRegion}
                    onChange={(e) => setNewDistRegion(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Kano">Kano</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Partner Tier</label>
                  <select
                    value={newDistTier}
                    onChange={(e) => setNewDistTier(e.target.value as Distributor["tier"])}
                    style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Approved Credit Facility</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₦3.5M"
                  value={newDistCredit}
                  onChange={(e) => setNewDistCredit(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  style={{ height: "40px", padding: "0 18px", backgroundColor: "transparent", border: `1px solid ${tokens.borderSubtle}`, borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "40px", padding: "0 22px", backgroundColor: isDark ? "#10B981" : "#0E3E2B", border: "none", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", boxShadow: "none" }}
                  className="hover:opacity-90"
                >
                  Confirm & Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT DISTRIBUTOR MODAL */}
      {editingDistributor && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "480px", 
            padding: "32px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setEditingDistributor(null)}
              style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: 0, marginBottom: "8px" }}>Edit Distributor Details</h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, marginBottom: "20px" }}>
              Update registration and status for <strong>{editingDistributor.name}</strong>.
            </p>

            <form onSubmit={handleUpdateDistributor} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Company / Store Name</label>
                <input
                  type="text"
                  required
                  value={editingDistributor.name}
                  onChange={(e) => setEditingDistributor({ ...editingDistributor, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Territory</label>
                  <input
                    type="text"
                    required
                    value={editingDistributor.region}
                    onChange={(e) => setEditingDistributor({ ...editingDistributor, region: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Tier</label>
                  <select
                    value={editingDistributor.tier}
                    onChange={(e) => setEditingDistributor({ ...editingDistributor, tier: e.target.value as Distributor["tier"] })}
                    style={{ width: "100%", height: "42px", padding: "0 12px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>Assigned Credit Limit</label>
                <input
                  type="text"
                  required
                  value={editingDistributor.credit}
                  onChange={(e) => setEditingDistributor({ ...editingDistributor, credit: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setEditingDistributor(null)}
                  style={{ height: "40px", padding: "0 18px", backgroundColor: "transparent", border: `1px solid ${tokens.borderSubtle}`, borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "40px", padding: "0 22px", backgroundColor: isDark ? "#10B981" : "#0E3E2B", border: "none", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", boxShadow: "none" }}
                  className="hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADJUST CREDIT LIMIT MODAL */}
      {creditLimitModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "440px", 
            padding: "32px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setCreditLimitModal(null)}
              style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: 0, marginBottom: "8px" }}>Adjust Credit Limit</h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, marginBottom: "20px" }}>
              Modify revolving credit facility for <strong>{creditLimitModal.name}</strong>. Current: {creditLimitModal.currentCredit}.
            </p>

            <form onSubmit={handleSaveCreditLimit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>New Credit Facility Amount</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₦6.5M"
                  value={newCreditValue}
                  onChange={(e) => setNewCreditValue(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "14px", color: tokens.textPrimary, backgroundColor: tokens.bgSubtle, fontWeight: 700, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setCreditLimitModal(null)}
                  style={{ height: "40px", padding: "0 18px", backgroundColor: "transparent", border: `1px solid ${tokens.borderSubtle}`, borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "40px", padding: "0 22px", backgroundColor: isDark ? "#10B981" : "#0E3E2B", border: "none", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", boxShadow: "none" }}
                  className="hover:opacity-90"
                >
                  Update Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
