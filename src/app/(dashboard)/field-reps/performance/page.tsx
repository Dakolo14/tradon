"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle2, 
  Search, 
  Download, 
  ChevronRight, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  MoreHorizontal,
  Edit,
  DollarSign,
  X,
  Check
} from "lucide-react";

interface RepLeaderboard {
  rank: number;
  name: string;
  code: string;
  territory: string;
  monthlySales: string;
  targetAchievement: number;
  strikeRate: number; // Conversion rate
  outletsCovered: number;
  incentiveEarned: string;
}

const initialLeaderboard: RepLeaderboard[] = [
  {
    rank: 1,
    name: "Emeka Okafor",
    code: "REP-LAG-04",
    territory: "Lagos Island",
    monthlySales: "₦42.8M",
    targetAchievement: 122,
    strikeRate: 88,
    outletsCovered: 142,
    incentiveEarned: "₦450,000",
  },
  {
    rank: 2,
    name: "Tunde Bakare",
    code: "REP-LAG-01",
    territory: "Lagos Mainland",
    monthlySales: "₦38.4M",
    targetAchievement: 110,
    strikeRate: 82,
    outletsCovered: 128,
    incentiveEarned: "₦320,000",
  },
  {
    rank: 3,
    name: "Amina Yusuf",
    code: "REP-KAN-02",
    territory: "Kano Central",
    monthlySales: "₦31.2M",
    targetAchievement: 104,
    strikeRate: 79,
    outletsCovered: 115,
    incentiveEarned: "₦250,000",
  },
  {
    rank: 4,
    name: "Segun Adeleke",
    code: "REP-IBD-01",
    territory: "Ibadan Core",
    monthlySales: "₦26.9M",
    targetAchievement: 96,
    strikeRate: 75,
    outletsCovered: 98,
    incentiveEarned: "₦140,000",
  },
  {
    rank: 5,
    name: "Chukwudi Eze",
    code: "REP-PH-03",
    territory: "Port Harcourt",
    monthlySales: "₦21.5M",
    targetAchievement: 86,
    strikeRate: 68,
    outletsCovered: 84,
    incentiveEarned: "₦80,000",
  },
];

export default function RepPerformancePage() {
  const [leaderboard, setLeaderboard] = useState<RepLeaderboard[]>(initialLeaderboard);
  const [selectedCycle, setSelectedCycle] = useState("September 2026");
  const [activeDropdownCode, setActiveDropdownCode] = useState<string | null>(null);

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAdjustQuotasModalOpen, setIsAdjustQuotasModalOpen] = useState(false);
  const [editingRep, setEditingRep] = useState<RepLeaderboard | null>(null);
  const [bonusRep, setBonusRep] = useState<RepLeaderboard | null>(null);
  const [bonusAmount, setBonusAmount] = useState("50000");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRep) return;
    setLeaderboard(leaderboard.map(r => r.code === editingRep.code ? editingRep : r));
    setEditingRep(null);
    showToast(`Targets & quotas updated for ${editingRep.name}`);
  };

  const handleIssueBonus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bonusRep) return;
    const bonusVal = parseInt(bonusAmount) || 0;
    const currentBonusVal = parseInt(bonusRep.incentiveEarned.replace(/[^0-9]/g, "")) || 0;
    const updatedBonus = `₦${(currentBonusVal + bonusVal).toLocaleString()}`;

    setLeaderboard(leaderboard.map(r => r.code === bonusRep.code ? { ...r, incentiveEarned: updatedBonus } : r));
    setBonusRep(null);
    showToast(`Instant bonus of ₦${bonusVal.toLocaleString()} awarded to ${bonusRep.name}!`);
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Rep Target Achievement & Leaderboard</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Track sales quotas, order strike rates, beat compliance, and calculate field incentive bonuses.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsExportModalOpen(true)}
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
            <Download size={14} />
            Export Commission Report
          </button>
          <button 
            onClick={() => setIsAdjustQuotasModalOpen(true)}
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
            <Target size={16} />
            Adjust Territory Quotas
          </button>
        </div>
      </div>

      {/* Podium Cards for Top 3 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {leaderboard.slice(0, 3).map((rep, idx) => (
          <div
            key={rep.code}
            style={{
              backgroundColor: idx === 0 ? "#0E3E2B" : "#FFFFFF",
              color: idx === 0 ? "#FFFFFF" : "#0E3E2B",
              borderRadius: "16px",
              border: idx === 0 ? "none" : "1px solid rgba(14,62,43,0.08)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: idx === 0 ? "0 10px 30px rgba(14,62,43,0.15)" : "0 1px 3px rgba(0,0,0,0.02)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {idx === 0 && (
              <div style={{ position: "absolute", top: 16, right: 16, backgroundColor: "#A3FF00", color: "#0E3E2B", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                <Trophy size={12} /> #1 TOP PERFORMER
              </div>
            )}

            <div>
              <div style={{ fontSize: "12px", color: idx === 0 ? "rgba(255,255,255,0.6)" : "rgba(14,62,43,0.5)", textTransform: "uppercase", fontWeight: 600 }}>
                {rep.territory} • {rep.code}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "4px 0 0" }}>{rep.name}</h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px", backgroundColor: idx === 0 ? "rgba(255,255,255,0.08)" : "#F8FAF8", borderRadius: "12px" }}>
              <div>
                <span style={{ fontSize: "11px", color: idx === 0 ? "rgba(255,255,255,0.7)" : "rgba(14,62,43,0.5)" }}>Sales Achieved</span>
                <p style={{ fontSize: "18px", fontWeight: 700, margin: "2px 0 0", color: idx === 0 ? "#A3FF00" : "#0E3E2B" }}>{rep.monthlySales}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: idx === 0 ? "rgba(255,255,255,0.7)" : "rgba(14,62,43,0.5)" }}>Target Met</span>
                <p style={{ fontSize: "18px", fontWeight: 700, margin: "2px 0 0" }}>{rep.targetAchievement}%</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
              <span style={{ color: idx === 0 ? "rgba(255,255,255,0.7)" : "rgba(14,62,43,0.6)" }}>Order Strike Rate: <strong>{rep.strikeRate}%</strong></span>
              <span style={{ fontWeight: 700, color: idx === 0 ? "#A3FF00" : "#16A34A" }}>Bonus: {rep.incentiveEarned}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Full Regional Standings</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)", margin: "2px 0 0" }}>Ranked by percentage of target achieved against monthly quota.</p>
          </div>
        </div>

        <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Rank</th>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Representative</th>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Territory</th>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Monthly GMV</th>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Quota %</th>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Strike Rate</th>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Incentive Accrued</th>
              <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((rep, idx) => {
              const isMenuOpen = activeDropdownCode === rep.code;

              return (
                <tr key={rep.code} style={{ borderBottom: idx !== leaderboard.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/[0.01] transition-colors">
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>#{rep.rank}</td>
                  <td style={{ padding: "16px 24px", minWidth: "180px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{rep.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", whiteSpace: "nowrap" }}>{rep.code}</div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", color: "rgba(14,62,43,0.8)", minWidth: "160px" }}>{rep.territory}</td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>{rep.monthlySales}</td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "60px", height: "6px", backgroundColor: "rgba(14,62,43,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${Math.min(rep.targetAchievement, 100)}%`, height: "100%", backgroundColor: rep.targetAchievement >= 100 ? "#10B981" : "#F59E0B" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: rep.targetAchievement >= 100 ? "#10B981" : "#D97706" }}>
                        {rep.targetAchievement}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", color: "rgba(14,62,43,0.8)", whiteSpace: "nowrap" }}>{rep.strikeRate}%</td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 700, color: "#16A34A", whiteSpace: "nowrap" }}>{rep.incentiveEarned}</td>
                  <td style={{ padding: "16px 24px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => setBonusRep(rep)}
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
                        <DollarSign size={12} />
                        Bonus
                      </button>

                      <button
                        onClick={() => setActiveDropdownCode(isMenuOpen ? null : rep.code)}
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
                          right: "24px",
                          top: "52px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "12px",
                          border: "1px solid rgba(14,62,43,0.1)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          zIndex: 50,
                          width: "210px",
                          padding: "6px",
                          textAlign: "left",
                        }}
                      >
                        <button
                          onClick={() => {
                            setEditingRep({ ...rep });
                            setActiveDropdownCode(null);
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
                          Edit Quota & Targets
                        </button>

                        <button
                          onClick={() => {
                            setBonusRep(rep);
                            setActiveDropdownCode(null);
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
                          <DollarSign size={14} color="#16A34A" />
                          Issue Instant Bonus
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

      {/* Modal: Export Report */}
      {isExportModalOpen && (
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
            maxWidth: "450px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Export Commission Schedule
              </h3>
              <button 
                onClick={() => setIsExportModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 20px 0" }}>
              Export certified field commission payroll schedule for {selectedCycle}:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast("Exported field commission payroll to Excel (.xlsx)");
                }}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(14,62,43,0.15)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
                className="hover:bg-black/5"
              >
                <span>Payroll Spreadsheet (.XLSX)</span>
                <Download size={16} />
              </button>
              <button
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast("Exported commission audit log (.csv)");
                }}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(14,62,43,0.15)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#0E3E2B",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
                className="hover:bg-black/5"
              >
                <span>Audit Raw Data (.CSV)</span>
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Adjust Territory Quotas */}
      {isAdjustQuotasModalOpen && (
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
                Adjust Regional Monthly Quotas
              </h3>
              <button 
                onClick={() => setIsAdjustQuotasModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Lagos Island Tier Quota (Emeka Okafor)
                </label>
                <input
                  type="text"
                  defaultValue="₦35,000,000"
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Lagos Mainland Quota (Tunde Bakare)
                </label>
                <input
                  type="text"
                  defaultValue="₦35,000,000"
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Kano Central Quota (Amina Yusuf)
                </label>
                <input
                  type="text"
                  defaultValue="₦30,000,000"
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsAdjustQuotasModalOpen(false)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdjustQuotasModalOpen(false);
                    showToast("Regional quota thresholds adjusted for next cycle!");
                  }}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save Quotas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Rep Quota & Commission Tier */}
      {editingRep && (
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
                Adjust Targets: {editingRep.name}
              </h3>
              <button 
                onClick={() => setEditingRep(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Territory Assignment
                </label>
                <input
                  type="text"
                  required
                  value={editingRep.territory}
                  onChange={(e) => setEditingRep({ ...editingRep, territory: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Target Achievement %
                  </label>
                  <input
                    type="number"
                    value={editingRep.targetAchievement}
                    onChange={(e) => setEditingRep({ ...editingRep, targetAchievement: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                    Strike Rate %
                  </label>
                  <input
                    type="number"
                    value={editingRep.strikeRate}
                    onChange={(e) => setEditingRep({ ...editingRep, strikeRate: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingRep(null)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save Quotas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Issue Instant Bonus */}
      {bonusRep && (
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
            maxWidth: "450px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <DollarSign size={20} color="#16A34A" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Issue Performance Bonus
                </h3>
              </div>
              <button 
                onClick={() => setBonusRep(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Award a spot performance bonus directly to <strong>{bonusRep.name} ({bonusRep.code})</strong> for exceeding territory quotas:
            </p>

            <form onSubmit={handleIssueBonus} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Bonus Amount (₦)
                </label>
                <input
                  type="number"
                  required
                  value={bonusAmount}
                  onChange={(e) => setBonusAmount(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "14px", fontWeight: 700, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setBonusRep(null)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Confirm Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
