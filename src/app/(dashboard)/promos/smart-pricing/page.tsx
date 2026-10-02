"use client";

import React, { useState } from "react";
import { 
  Check, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Pause, 
  Play, 
  CheckCircle2, 
  X, 
  Sparkles, 
  SlidersHorizontal 
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PricingRule {
  id: string;
  name: string;
  skuCategory: string;
  adjustmentType: "Surge / Peak" | "Off-Peak Discount" | "Volume Incentive";
  multiplier: string;
  appliedDays: string;
  status: "Active" | "Paused";
}

const initialRules: PricingRule[] = [
  {
    id: "pr-1",
    name: "Festive Weekend Peak Surge",
    skuCategory: "All Fruit Juices (1L & 200ml)",
    adjustmentType: "Surge / Peak",
    multiplier: "+4.5%",
    appliedDays: "Friday 04:00 PM - Sunday 11:59 PM",
    status: "Active",
  },
  {
    id: "pr-2",
    name: "Mid-Week Bulk Clearance Window",
    skuCategory: "Hollandia Evap & UHT Milk",
    adjustmentType: "Off-Peak Discount",
    multiplier: "-3.0%",
    appliedDays: "Tuesday & Wednesday (All Day)",
    status: "Active",
  },
  {
    id: "pr-3",
    name: "Northern Hub High-Humidity Inventory Push",
    skuCategory: "Snacks & Confectionery",
    adjustmentType: "Volume Incentive",
    multiplier: "-5.0% (> 1,000 ctns)",
    appliedDays: "Monday to Friday",
    status: "Paused",
  },
];

export default function SmartPricingPage() {
  const router = useRouter();
  const [rules, setRules] = useState<PricingRule[]>(initialRules);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Modals state
  const [isNewRuleModalOpen, setIsNewRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Rule form
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("All Fruit Juices (1L & 200ml)");
  const [newType, setNewType] = useState<PricingRule["adjustmentType"]>("Surge / Peak");
  const [newMultiplier, setNewMultiplier] = useState("+5.0%");
  const [newDays, setNewDays] = useState("Saturday & Sunday");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newEntry: PricingRule = {
      id: `pr-${Date.now()}`,
      name: newName,
      skuCategory: newCat,
      adjustmentType: newType,
      multiplier: newMultiplier,
      appliedDays: newDays,
      status: "Active",
    };
    setRules([newEntry, ...rules]);
    setIsNewRuleModalOpen(false);
    setNewName("");
    showToast(`Dynamic pricing rule "${newEntry.name}" published!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRule) return;
    setRules(rules.map(r => r.id === editingRule.id ? editingRule : r));
    setEditingRule(null);
    showToast(`Rule "${editingRule.name}" updated`);
  };

  const handleToggleStatus = (id: string) => {
    setRules(rules.map(r => {
      if (r.id === id) {
        const next = r.status === "Active" ? "Paused" : "Active";
        return { ...r, status: next };
      }
      return r;
    }));
    setActiveDropdownId(null);
    showToast("Pricing rule status toggled!");
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete dynamic pricing rule "${name}"?`)) {
      setRules(rules.filter(r => r.id !== id));
      setActiveDropdownId(null);
      showToast("Rule removed.");
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Smart Dynamic Pricing Engine</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Automate price elasticity, peak holiday demand surges, and off-peak inventory clearance discounts.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsNewRuleModalOpen(true)}
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
            + New pricing rule
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Active Elasticity Rules</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>
            {rules.filter(r => r.status === "Active").length} Live Rules
          </h3>
          <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 500 }}>Auto-adjusting wholesale catalog</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Average Margin Lift</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>+₦3.8M / Mo</h3>
          <span style={{ fontSize: "12px", color: "#16A34A", fontWeight: 500 }}>Optimized peak captures</span>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Off-Peak Stock Turnaround</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>-4.2 Days</h3>
          <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>Faster depot warehouse turns</span>
        </div>
      </div>

      {/* Rules Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1000px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Rule Name</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>SKU Target Category</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Adjustment Mode</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Multiplier</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Active Schedule</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, idx) => {
              const isMenuOpen = activeDropdownId === rule.id;

              return (
                <tr key={rule.id} style={{ borderBottom: idx !== rules.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/[0.01] transition-colors">
                  <td style={{ padding: "16px 20px", minWidth: "180px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{rule.name}</span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", color: "rgba(14,62,43,0.8)", minWidth: "160px" }}>
                    {rule.skuCategory}
                  </td>
                  <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: rule.adjustmentType === "Surge / Peak" ? "#EFF6FF" : "#F0FDF4",
                      color: rule.adjustmentType === "Surge / Peak" ? "#2563EB" : "#16A34A",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      whiteSpace: "nowrap",
                      display: "inline-flex"
                    }}>
                      {rule.adjustmentType}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 700, color: rule.multiplier.startsWith("+") ? "#2563EB" : "#16A34A", whiteSpace: "nowrap" }}>
                    {rule.multiplier}
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(14,62,43,0.7)", whiteSpace: "nowrap" }}>
                    {rule.appliedDays}
                  </td>
                  <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: rule.status === "Active" ? "#F0FDF4" : "#FFFBEB",
                      color: rule.status === "Active" ? "#16A34A" : "#D97706",
                      border: rule.status === "Active" ? "1px solid rgba(22,163,74,0.2)" : "1px solid rgba(217,119,6,0.2)",
                      padding: "3px 8px",
                      borderRadius: "9999px",
                      whiteSpace: "nowrap",
                      display: "inline-flex"
                    }}>
                      {rule.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => setEditingRule(rule)}
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
                        onClick={() => setActiveDropdownId(isMenuOpen ? null : rule.id)}
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
                            setEditingRule(rule);
                            setActiveDropdownId(null);
                          }}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-black/5"
                        >
                          <Edit size={14} />
                          Edit Multiplier
                        </button>

                        <button
                          onClick={() => handleToggleStatus(rule.id)}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-black/5"
                        >
                          {rule.status === "Active" ? <Pause size={14} color="#D97706" /> : <Play size={14} color="#16A34A" />}
                          {rule.status === "Active" ? "Pause Rule" : "Activate Rule"}
                        </button>

                        <div style={{ height: "1px", backgroundColor: "rgba(14,62,43,0.06)", margin: "4px 0" }} />

                        <button
                          onClick={() => handleDelete(rule.id, rule.name)}
                          style={{ width: "100%", padding: "8px 12px", backgroundColor: "transparent", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 600, color: "#EF4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                          className="hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete Rule
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

      {/* Modal: Create Pricing Rule */}
      {isNewRuleModalOpen && (
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
                <SlidersHorizontal size={18} color="#0E3E2B" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Create Smart Pricing Rule
                </h3>
              </div>
              <button 
                onClick={() => setIsNewRuleModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateRule} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Rule Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rainy Season Logistics Buffer"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Target Product Category
                </label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none", backgroundColor: "#FFFFFF" }}
                >
                  <option value="All Fruit Juices (1L & 200ml)">All Fruit Juices (1L & 200ml)</option>
                  <option value="Hollandia Evap & UHT Milk">Hollandia Evap & UHT Milk</option>
                  <option value="Snacks & Confectionery">Snacks & Confectionery</option>
                  <option value="Entire Catalog">Entire FMCG Wholesale Catalog</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Adjustment Mode
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="Surge / Peak">Surge / Peak (+)</option>
                    <option value="Off-Peak Discount">Off-Peak Discount (-)</option>
                    <option value="Volume Incentive">Volume Incentive</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Multiplier %
                  </label>
                  <input
                    type="text"
                    required
                    value={newMultiplier}
                    onChange={(e) => setNewMultiplier(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Active Schedule & Days
                </label>
                <input
                  type="text"
                  required
                  value={newDays}
                  onChange={(e) => setNewDays(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewRuleModalOpen(false)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Pricing Rule */}
      {editingRule && (
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
                Edit Pricing Rule: {editingRule.name}
              </h3>
              <button 
                onClick={() => setEditingRule(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Rule Name
                </label>
                <input
                  type="text"
                  required
                  value={editingRule.name}
                  onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Multiplier %
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRule.multiplier}
                    onChange={(e) => setEditingRule({ ...editingRule, multiplier: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Schedule
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRule.appliedDays}
                    onChange={(e) => setEditingRule({ ...editingRule, appliedDays: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingRule(null)}
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
