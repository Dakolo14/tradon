"use client";

import React, { useState } from "react";
import { 
  Award, 
  Gift, 
  TrendingUp, 
  Users, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Star,
  X,
  Sliders,
  DollarSign
} from "lucide-react";

interface LoyaltyTier {
  name: string;
  badgeColor: string;
  badgeBg: string;
  minSpend: string;
  rebatePercent: string;
  membersCount: number;
  perks: string[];
}

interface LoyaltyReward {
  id: string;
  distributor: string;
  tier: string;
  points: string;
  reward: string;
  date: string;
  status: string;
}

const initialTiers: LoyaltyTier[] = [
  {
    name: "Platinum Elite",
    badgeColor: "#0E3E2B",
    badgeBg: "#A3FF00",
    minSpend: "₦10,000,000+ / mo",
    rebatePercent: "4.5% Monthly Rebate",
    membersCount: 8,
    perks: ["Priority truck dispatch", "45-day extended credit line", "Dedicated KAM rep", "Direct manufacturer warranty support"],
  },
  {
    name: "Gold Partner",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB",
    minSpend: "₦5,000,000 - ₦10,000,000 / mo",
    rebatePercent: "3.0% Monthly Rebate",
    membersCount: 22,
    perks: ["Guaranteed stock allocation", "30-day revolving credit", "Quarterly marketing support", "POS display banners"],
  },
  {
    name: "Silver Wholesaler",
    badgeColor: "#64748B",
    badgeBg: "#F8F9FA",
    minSpend: "₦2,000,000 - ₦5,000,000 / mo",
    rebatePercent: "1.5% Monthly Rebate",
    membersCount: 38,
    perks: ["Standard delivery window", "14-day credit terms", "Volume discount pricing"],
  },
  {
    name: "Bronze Retailer",
    badgeColor: "#C2410C",
    badgeBg: "#FFEDD5",
    minSpend: "< ₦2,000,000 / mo",
    rebatePercent: "0.5% Points Accrual",
    membersCount: 45,
    perks: ["Cash-on-delivery & instant transfer", "Standard portal access"],
  },
];

const initialRewards: LoyaltyReward[] = [
  { id: "1", distributor: "Alhaji Musa Distributors", tier: "Gold Partner", points: "45,000 pts", reward: "₦450,000 Invoice Credit", date: "Sep 04, 2026", status: "Credited" },
  { id: "2", distributor: "Lagos Island Beverages", tier: "Platinum Elite", points: "120,000 pts", reward: "₦1,200,000 Annual Rebate", date: "Sep 02, 2026", status: "Credited" },
  { id: "3", distributor: "Mama Tope Stores", tier: "Silver Wholesaler", points: "18,500 pts", reward: "₦185,000 Invoice Credit", date: "Aug 29, 2026", status: "Credited" },
  { id: "4", distributor: "Abuja Central Trading", tier: "Gold Partner", points: "32,000 pts", reward: "₦320,000 Invoice Credit", date: "Aug 25, 2026", status: "Credited" },
];

export default function ClientLoyaltyPage() {
  const [tiersList, setTiersList] = useState<LoyaltyTier[]>(initialTiers);
  const [rewards, setRewards] = useState<LoyaltyReward[]>(initialRewards);

  // Modals
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bonus Form
  const [bonusDistributor, setBonusDistributor] = useState("Alhaji Musa Distributors");
  const [bonusAmount, setBonusAmount] = useState("₦250,000");
  const [bonusReason, setBonusReason] = useState("Q3 Volume Milestone Bonus");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleIssueBonus = (e: React.FormEvent) => {
    e.preventDefault();
    const newReward: LoyaltyReward = {
      id: String(Date.now()),
      distributor: bonusDistributor,
      tier: "Gold Partner",
      points: "25,000 pts",
      reward: `${bonusAmount} Ledger Credit`,
      date: "Today",
      status: "Credited"
    };

    setRewards([newReward, ...rewards]);
    setIsBonusModalOpen(false);
    showToast(`Issued ${bonusAmount} credit to ${bonusDistributor}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", paddingBottom: "36px" }}>
      
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

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Client Loyalty & Trade Rebates</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Incentivize bulk purchasing, on-time payments, and territorial expansion with automated trade rebates.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsRulesModalOpen(true)}
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
            <Sliders size={14} />
            Rebate Rules
          </button>
          <button 
            onClick={() => setIsBonusModalOpen(true)}
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
            <Plus size={16} />
            Issue Manual Bonus
          </button>
        </div>
      </div>

      {/* Highlights Banner */}
      <div 
        style={{ 
          backgroundColor: "#0E3E2B", 
          borderRadius: "16px", 
          padding: "24px 32px", 
          color: "#FFFFFF", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: "24px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", right: "-40px", bottom: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(163,255,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(163,255,0,0.15)", color: "#A3FF00", padding: "4px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>
            <Sparkles size={14} />
            Q3 REBATE CYCLE ACTIVE
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, margin: 0, marginBottom: "8px" }}>₦14,850,000 Available Rebate Pool</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", margin: 0, maxWidth: "560px", lineHeight: "1.6" }}>
            Calculated automatically from distributor quarterly order volume and 0-day payment compliance. Next settlement: Oct 01, 2026.
          </p>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px 20px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", margin: 0, textTransform: "uppercase" }}>Qualified Dealers</p>
            <h3 style={{ fontSize: "24px", fontWeight: 700, margin: "4px 0 0", color: "#A3FF00" }}>68</h3>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px 20px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", margin: 0, textTransform: "uppercase" }}>Avg Growth</p>
            <h3 style={{ fontSize: "24px", fontWeight: 700, margin: "4px 0 0", color: "#FFFFFF" }}>+19.4%</h3>
          </div>
        </div>
      </div>

      {/* Tiers Breakdown */}
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "0 0 16px" }}>Tier Structure & Commercial Privileges</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {tiersList.map((t) => (
            <div
              key={t.name}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid rgba(14,62,43,0.08)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: t.badgeColor,
                    backgroundColor: t.badgeBg,
                    padding: "4px 10px",
                    borderRadius: "9999px",
                  }}
                >
                  {t.name}
                </span>
                <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>
                  {t.membersCount} dealers
                </span>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)", margin: 0, textTransform: "uppercase", fontWeight: 600 }}>Requirement</p>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#0E3E2B", margin: "4px 0 8px" }}>{t.minSpend}</p>
                <div style={{ backgroundColor: "#F0F5ED", color: "#0E3E2B", padding: "8px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
                  {t.rebatePercent}
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(14,62,43,0.06)", paddingTop: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.4)", textTransform: "uppercase" }}>Tier Perks</span>
                <ul style={{ paddingLeft: "16px", margin: "8px 0 0", fontSize: "12px", color: "rgba(14,62,43,0.8)", lineHeight: "1.8" }}>
                  {t.perks.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Disbursed Rebates Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflow: "hidden", marginTop: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Recent Loyalty Disbursals</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)", margin: "2px 0 0" }}>Direct credits applied to distributor balances.</p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "700px", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", whiteSpace: "nowrap" }}>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Distributor</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Current Tier</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Reward Issued</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Date</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((r, idx) => (
                <tr key={r.id} style={{ borderBottom: idx !== rewards.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }}>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", whiteSpace: "nowrap" }}>{r.distributor}</td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", color: "rgba(14,62,43,0.8)", whiteSpace: "nowrap" }}>{r.tier}</td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>{r.reward}</td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", color: "rgba(14,62,43,0.6)", whiteSpace: "nowrap" }}>{r.date}</td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#F0FDF4", color: "#16A34A", fontSize: "11px", fontWeight: 600, padding: "4px 8px", borderRadius: "9999px", whiteSpace: "nowrap" }}>
                      <CheckCircle2 size={12} />
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ISSUE MANUAL BONUS */}
      {isBonusModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "480px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsBonusModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Issue Trade Rebate / Bonus Credit</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Apply direct invoice deduction credit to authorized distributor accounts.
            </p>

            <form onSubmit={handleIssueBonus} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Select Distributor *</label>
                <select
                  value={bonusDistributor}
                  onChange={(e) => setBonusDistributor(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Alhaji Musa Distributors">Alhaji Musa Distributors (Kano)</option>
                  <option value="Lagos Island Beverages">Lagos Island Beverages (Lagos)</option>
                  <option value="Mama Tope Stores">Mama Tope Stores (Ibadan)</option>
                  <option value="Abuja Central Trading">Abuja Central Trading (Abuja)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Rebate / Bonus Value (₦) *</label>
                <input
                  type="text"
                  required
                  placeholder="₦250,000"
                  value={bonusAmount}
                  onChange={(e) => setBonusAmount(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Commercial Reason</label>
                <input
                  type="text"
                  required
                  value={bonusReason}
                  onChange={(e) => setBonusReason(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsBonusModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Confirm & Credit Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: REBATE RULES */}
      {isRulesModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "500px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsRulesModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>FMCG Rebate Rules Engine</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Standard quarterly criteria required for automated ledger credit approval.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "#0E3E2B" }}>
              <div style={{ padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <strong>Rule 1: On-Time Payment Settlement</strong>
                <p style={{ margin: "4px 0 0", color: "rgba(14,62,43,0.7)", fontSize: "12px" }}>Dealers must maintain zero overdue invoices exceeding 14 days to be eligible for rebates.</p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <strong>Rule 2: Minimum Monthly Carton Volume</strong>
                <p style={{ margin: "4px 0 0", color: "rgba(14,62,43,0.7)", fontSize: "12px" }}>Only orders booked through TRADON or validated by Key Account Managers count towards GMV spend.</p>
              </div>
              <div style={{ padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <strong>Rule 3: Territory Exclusivity Benchmark</strong>
                <p style={{ margin: "4px 0 0", color: "rgba(14,62,43,0.7)", fontSize: "12px" }}>Platinum Elite dealers must maintain retail re-distribution across at least 15 verified sub-wholesalers.</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => setIsRulesModalOpen(false)}
                style={{ height: "40px", padding: "0 22px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
              >
                Close Engine Rules
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
