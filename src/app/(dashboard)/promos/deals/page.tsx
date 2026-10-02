"use client";

import React, { useState } from "react";
import { 
  Check, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Clock, 
  Tag, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ArrowRight,
  Pause,
  Play
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Deal {
  id: string;
  name: string;
  code: string;
  discountType: "Percentage" | "Fixed Amount" | "Free Cartons (BOGO)";
  discountValue: string;
  minCartons: number;
  status: "Active" | "Paused" | "Expired";
  usageCount: number;
  validUntil: string;
}

const initialDeals: Deal[] = [
  {
    id: "deal-1",
    name: "Festive Wholesale Mega Lift",
    code: "FESTIVE10",
    discountType: "Percentage",
    discountValue: "10% Off",
    minCartons: 500,
    status: "Active",
    usageCount: 42,
    validUntil: "Dec 31, 2026",
  },
  {
    id: "deal-2",
    name: "Gold Tier Tiered Volume Rebate",
    code: "SUPERGOLD15",
    discountType: "Percentage",
    discountValue: "15% Off",
    minCartons: 1000,
    status: "Active",
    usageCount: 19,
    validUntil: "Nov 30, 2026",
  },
  {
    id: "deal-3",
    name: "Capri-Sun Fast Mover Clearance",
    code: "CAPRIBOOST",
    discountType: "Free Cartons (BOGO)",
    discountValue: "+5 Free ctns per 100",
    minCartons: 100,
    status: "Active",
    usageCount: 68,
    validUntil: "Oct 15, 2026",
  },
  {
    id: "deal-4",
    name: "Q2 Off-Peak Buffer Discount",
    code: "OFFPEAK2026",
    discountType: "Fixed Amount",
    discountValue: "₦50,000 Off",
    minCartons: 300,
    status: "Paused",
    usageCount: 11,
    validUntil: "Sep 30, 2026",
  },
];

export default function DealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Modals state
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Deal Form
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newValue, setNewValue] = useState("10% Off");
  const [newMin, setNewMin] = useState("200");
  const [newExpiry, setNewExpiry] = useState("Dec 31, 2026");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCode) return;
    const newEntry: Deal = {
      id: `deal-${Date.now()}`,
      name: newName,
      code: newCode.toUpperCase(),
      discountType: "Percentage",
      discountValue: newValue,
      minCartons: parseInt(newMin) || 100,
      status: "Active",
      usageCount: 0,
      validUntil: newExpiry,
    };
    setDeals([newEntry, ...deals]);
    setIsNewDealModalOpen(false);
    setNewName("");
    setNewCode("");
    showToast(`Promotion code ${newEntry.code} created and live!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDeal) return;
    setDeals(deals.map(d => d.id === editingDeal.id ? editingDeal : d));
    setEditingDeal(null);
    showToast(`Promotion ${editingDeal.name} updated.`);
  };

  const handleToggleStatus = (id: string) => {
    setDeals(deals.map(d => {
      if (d.id === id) {
        const next = d.status === "Active" ? "Paused" : "Active";
        return { ...d, status: next };
      }
      return d;
    }));
    setActiveDropdownId(null);
    showToast("Deal status toggled!");
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete promotion "${name}"?`)) {
      setDeals(deals.filter(d => d.id !== id));
      setActiveDropdownId(null);
      showToast(`Promotion removed.`);
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Wholesale Deals & Promotional Discounts</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Reward and retain distributors with discount coupons, BOGO carton bonuses, and festive flash offers.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsNewDealModalOpen(true)}
            style={{ 
              height: "40px", 
              padding: "0 20px", 
              backgroundColor: "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontSize: "14px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }} 
            className="hover:bg-[#154E38] transition-colors"
          >
            <Plus size={16} />
            + Create deal
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Active Promotional Campaigns</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>
            {deals.filter(d => d.status === "Active").length} Campaigns
          </h3>
          <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 500 }}>Wholesale portal redemption live</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Total Redemptions</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>
            {deals.reduce((acc, d) => acc + d.usageCount, 0)} Orders
          </h3>
          <span style={{ fontSize: "12px", color: "#2563EB", fontWeight: 500 }}>Driven by coupon triggers</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Volume Lift Contribution</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>+18.4%</h3>
          <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>Incremental cartons cleared</span>
        </div>
      </div>

      {/* Deals Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1080px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Promotion Campaign</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Coupon Code</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Discount Value</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Min Cartons</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Orders Redeemed</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Expiry Date</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, idx) => {
              const isMenuOpen = activeDropdownId === deal.id;

              return (
                <tr key={deal.id} style={{ borderBottom: idx !== deals.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/[0.01] transition-colors">
                  <td style={{ padding: "16px 20px", minWidth: "200px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{deal.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{deal.discountType}</div>
                  </td>
                  <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "#F0F5ED", padding: "4px 10px", borderRadius: "6px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      {deal.code}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 700, color: "#16A34A", whiteSpace: "nowrap" }}>
                    {deal.discountValue}
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "rgba(14,62,43,0.8)", whiteSpace: "nowrap" }}>
                    {deal.minCartons} ctns
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                    {deal.usageCount}
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(14,62,43,0.6)", whiteSpace: "nowrap" }}>
                    {deal.validUntil}
                  </td>
                  <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: deal.status === "Active" ? "#F0FDF4" : "#FFFBEB",
                      color: deal.status === "Active" ? "#16A34A" : "#D97706",
                      border: deal.status === "Active" ? "1px solid rgba(22,163,74,0.2)" : "1px solid rgba(217,119,6,0.2)",
                      padding: "3px 8px",
                      borderRadius: "9999px",
                      whiteSpace: "nowrap",
                      display: "inline-flex"
                    }}>
                      {deal.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => setEditingDeal(deal)}
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
                        <Edit size={11} />
                        Edit
                      </button>

                      <button
                        onClick={() => setActiveDropdownId(isMenuOpen ? null : deal.id)}
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
                            setEditingDeal(deal);
                            setActiveDropdownId(null);
                          }}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-black/5"
                        >
                          <Edit size={14} />
                          Edit Promotion Details
                        </button>

                        <button
                          onClick={() => handleToggleStatus(deal.id)}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-black/5"
                        >
                          {deal.status === "Active" ? <Pause size={14} color="#D97706" /> : <Play size={14} color="#16A34A" />}
                          {deal.status === "Active" ? "Pause Promotion" : "Resume Promotion"}
                        </button>

                        <div style={{ height: "1px", backgroundColor: "rgba(14,62,43,0.06)", margin: "4px 0" }} />

                        <button
                          onClick={() => handleDelete(deal.id, deal.name)}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#EF4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete Deal
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

      {/* Modal: Create Deal */}
      {isNewDealModalOpen && (
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Tag size={18} color="#0E3E2B" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Create Wholesale Deal
                </h3>
              </div>
              <button 
                onClick={() => setIsNewDealModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Promotion Campaign Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Independence Day Stock Lift"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NAIJA60"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none", textTransform: "uppercase" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Discount Value
                  </label>
                  <input
                    type="text"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Min. Carton Requirement
                  </label>
                  <input
                    type="number"
                    value={newMin}
                    onChange={(e) => setNewMin(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewDealModalOpen(false)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Publish Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Deal */}
      {editingDeal && (
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
                Edit Deal: {editingDeal.code}
              </h3>
              <button 
                onClick={() => setEditingDeal(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={editingDeal.name}
                  onChange={(e) => setEditingDeal({ ...editingDeal, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Discount Value
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDeal.discountValue}
                    onChange={(e) => setEditingDeal({ ...editingDeal, discountValue: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Min. Cartons
                  </label>
                  <input
                    type="number"
                    value={editingDeal.minCartons}
                    onChange={(e) => setEditingDeal({ ...editingDeal, minCartons: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={editingDeal.validUntil}
                  onChange={(e) => setEditingDeal({ ...editingDeal, validUntil: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingDeal(null)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
