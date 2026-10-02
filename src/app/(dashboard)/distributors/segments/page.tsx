"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  Users, 
  ShieldAlert, 
  Award, 
  Layers, 
  ChevronRight, 
  MoreHorizontal, 
  CheckCircle2, 
  X, 
  Edit2, 
  Copy, 
  Trash2,
  Building2
} from "lucide-react";
import { useAppearance } from "@/context/AppearanceContext";

interface Segment {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  totalRevenue: string;
  avgOrderValue: string;
  criteria: string;
  badgeColor: string;
  badgeBg: string;
  growth: string;
}

const initialSegments: Segment[] = [
  {
    id: "1",
    name: "Tier 1 Gold Wholesalers",
    description: "High-volume distributors ordering over ₦5M monthly with under 15-day settlement.",
    membersCount: 18,
    totalRevenue: "₦142.5M",
    avgOrderValue: "₦7.9M",
    criteria: "Monthly GMV > ₦5,000,000",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB",
    growth: "+14.2% MoM",
  },
  {
    id: "2",
    name: "Key Modern Trade Accounts",
    description: "National retail chains and supermarkets with high distribution velocity.",
    membersCount: 7,
    totalRevenue: "₦84.2M",
    avgOrderValue: "₦12.0M",
    criteria: "Modern Trade / Supermarket key chains",
    badgeColor: "#2563EB",
    badgeBg: "#EFF6FF",
    growth: "+8.5% MoM",
  },
  {
    id: "3",
    name: "Regional Silver Distributors",
    description: "Consistent mid-tier distributors serving state depots across North and South-West.",
    membersCount: 34,
    totalRevenue: "₦68.9M",
    avgOrderValue: "₦2.0M",
    criteria: "Monthly GMV ₦1M - ₦5M",
    badgeColor: "#64748B",
    badgeBg: "#F8F9FA",
    growth: "+5.1% MoM",
  },
  {
    id: "4",
    name: "At-Risk / Overdue Balance",
    description: "Distributors with credit utilization > 85% and payment delay beyond 21 days.",
    membersCount: 6,
    totalRevenue: "₦18.4M",
    avgOrderValue: "₦3.1M",
    criteria: "Credit Overdue > 21 Days",
    badgeColor: "#DC2626",
    badgeBg: "#FEF2F2",
    growth: "-12.0% MoM",
  },
  {
    id: "5",
    name: "New Onboarding (Last 30 Days)",
    description: "Recently approved distributor accounts currently on introductory credit terms.",
    membersCount: 12,
    totalRevenue: "₦9.6M",
    avgOrderValue: "₦800K",
    criteria: "Account Age < 30 Days",
    badgeColor: "#0E3E2B",
    badgeBg: "#F0F5ED",
    growth: "+100%",
  },
];

const mockSegmentMembers: Record<string, Array<{ name: string; region: string; gmv: string; status: string }>> = {
  "1": [
    { name: "Alhaji Musa Distributors", region: "Kano", gmv: "₦18.4M", status: "Active" },
    { name: "Lagos Island Beverages", region: "Lagos", gmv: "₦24.2M", status: "Active" },
    { name: "Eko FMCG Hub", region: "Lagos", gmv: "₦15.8M", status: "14d overdue" }
  ],
  "2": [
    { name: "Shoprite Nigeria Central", region: "National", gmv: "₦42.0M", status: "Active" },
    { name: "Hubmart Supermarkets", region: "Lagos", gmv: "₦18.5M", status: "Active" }
  ],
  "3": [
    { name: "Mama Tope Stores", region: "Ibadan", gmv: "₦3.2M", status: "Active" },
    { name: "Abuja Central Trading", region: "Abuja", gmv: "₦4.8M", status: "Active" }
  ],
  "4": [
    { name: "PH Riverside Distrib.", region: "Port Harcourt", gmv: "₦1.4M", status: "21d overdue" },
    { name: "Ibadan Wholesale Co.", region: "Ibadan", gmv: "₦890K", status: "7d overdue" }
  ],
  "5": [
    { name: "Kano Northern Goods", region: "Kano", gmv: "₦320K", status: "Active" },
    { name: "Kaduna Mega Store", region: "Kaduna", gmv: "₦480K", status: "Active" }
  ]
};

export default function DistributorSegmentsPage() {
  const { tokens, config } = useAppearance();
  const isDark = config.theme === "dark";
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);
  const [viewingMembersSegment, setViewingMembersSegment] = useState<Segment | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [criteriaInput, setCriteriaInput] = useState("");
  const [colorInput, setColorInput] = useState("#0E3E2B");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput) return;

    const newSeg: Segment = {
      id: String(Date.now()),
      name: nameInput,
      description: descInput || "Custom FMCG dealer segment based on volume and settlement.",
      membersCount: 0,
      totalRevenue: "₦0",
      avgOrderValue: "₦0",
      criteria: criteriaInput || "Custom criteria",
      badgeColor: colorInput,
      badgeBg: colorInput === "#0E3E2B" ? "#F0F5ED" : `${colorInput}15`,
      growth: "+0% MoM",
    };

    setSegments([...segments, newSeg]);
    setIsCreateModalOpen(false);
    setNameInput("");
    setDescInput("");
    setCriteriaInput("");
    showToast(`Created segment "${newSeg.name}"`);
  };

  const handleUpdateSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSegment) return;

    setSegments(segments.map(s => s.id === editingSegment.id ? editingSegment : s));
    showToast(`Updated "${editingSegment.name}" rules`);
    setEditingSegment(null);
  };

  const handleDuplicateSegment = (seg: Segment) => {
    const clone: Segment = {
      ...seg,
      id: String(Date.now()),
      name: `${seg.name} (Copy)`,
      membersCount: 0,
    };
    setSegments([...segments, clone]);
    setActiveMenuId(null);
    showToast(`Duplicated ${seg.name}`);
  };

  const handleDeleteSegment = (id: string) => {
    setSegments(segments.filter(s => s.id !== id));
    setActiveMenuId(null);
    showToast("Segment removed");
  };

  const filteredSegments = segments.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", paddingBottom: "36px" }}>
      
      {/* Toast */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 1000,
          backgroundColor: isDark ? "#10B981" : "#0E3E2B",
          color: "#FFFFFF",
          padding: "12px 20px",
          borderRadius: "9999px",
          boxShadow: isDark ? "0 10px 25px rgba(0,0,0,0.5)" : "0 10px 25px rgba(14,62,43,0.2)",
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>Distributor Segments</h1>
          <p style={{ fontSize: "14px", color: tokens.textSecondary, margin: 0, marginTop: "4px" }}>
            Categorize distributors by credit performance, territory volume, and order velocity.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
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
            Create Segment
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div style={{ position: "relative", maxWidth: "420px" }}>
        <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: tokens.textMuted }}>
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search segments by name or criteria..."
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
            boxShadow: "none"
          }}
        />
      </div>

      {/* Grid of Segments */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {filteredSegments.map((segment) => (
          <div
            key={segment.id}
            style={{
              backgroundColor: tokens.bgCard,
              borderRadius: "16px",
              border: `1px solid ${tokens.borderSubtle}`,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "none",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: isDark ? "#F1F5F9" : segment.badgeColor,
                  backgroundColor: isDark ? `${segment.badgeColor}35` : segment.badgeBg,
                  border: isDark ? `1px solid ${segment.badgeColor}50` : "none",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                }}
              >
                {segment.criteria}
              </span>

              <div style={{ position: "relative" }}>
                <button 
                  onClick={() => setActiveMenuId(activeMenuId === segment.id ? null : segment.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }} 
                  className="hover:opacity-80"
                >
                  <MoreHorizontal size={18} />
                </button>

                {/* Card Dropdown */}
                {activeMenuId === segment.id && (
                  <div 
                    style={{ 
                      position: "absolute", 
                      right: 0, 
                      top: "28px", 
                      zIndex: 50, 
                      backgroundColor: tokens.bgCard, 
                      borderRadius: "14px", 
                      boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.6)" : "0 10px 25px rgba(0,0,0,0.1)", 
                      border: `1px solid ${tokens.borderSubtle}`, 
                      minWidth: "170px", 
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      textAlign: "left"
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveMenuId(null);
                        setEditingSegment(segment);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: tokens.textPrimary,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left"
                      }}
                      className="hover:opacity-80"
                    >
                      <Edit2 size={13} />
                      Edit Segment Rules
                    </button>

                    <button
                      onClick={() => handleDuplicateSegment(segment)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: tokens.textPrimary,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left"
                      }}
                      className="hover:opacity-80"
                    >
                      <Copy size={13} />
                      Duplicate Segment
                    </button>

                    <button
                      onClick={() => handleDeleteSegment(segment.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#EF4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left"
                      }}
                      className="hover:opacity-80"
                    >
                      <Trash2 size={13} />
                      Delete Segment
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary, margin: 0, marginBottom: "6px" }}>
                {segment.name}
              </h3>
              <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, lineHeight: "1.5" }}>
                {segment.description}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px 16px", backgroundColor: tokens.bgSubtle, border: `1px solid ${tokens.borderSubtle}`, borderRadius: "12px" }}>
              <div>
                <span style={{ fontSize: "11px", color: tokens.textMuted, fontWeight: 500, textTransform: "uppercase" }}>Distributors</span>
                <p style={{ fontSize: "15px", fontWeight: 700, color: tokens.textPrimary, margin: "2px 0 0" }}>{segment.membersCount}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: tokens.textMuted, fontWeight: 500, textTransform: "uppercase" }}>Total GMV</span>
                <p style={{ fontSize: "15px", fontWeight: 700, color: tokens.textPrimary, margin: "2px 0 0" }}>{segment.totalRevenue}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px", borderTop: `1px solid ${tokens.borderSubtle}`, marginTop: "auto" }}>
              <span style={{ fontSize: "12px", color: tokens.textSecondary, fontWeight: 500 }}>
                Growth: <strong style={{ color: segment.growth.startsWith("+") ? "#10B981" : "#EF4444" }}>{segment.growth}</strong>
              </span>
              <button
                onClick={() => setViewingMembersSegment(segment)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: tokens.textPrimary,
                  cursor: "pointer",
                  padding: 0,
                }}
                className="hover:opacity-80"
              >
                View members ({segment.membersCount})
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: CREATE SEGMENT */}
      {isCreateModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "480px", 
            padding: "28px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: 0, marginBottom: "6px" }}>Create Distributor Segment</h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, marginBottom: "20px" }}>
              Group distributors into automatic discount tiers or risk cohorts.
            </p>

            <form onSubmit={handleCreateSegment} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Segment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Northern Wholesalers"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Qualification Criteria *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monthly GMV > ₦8M & 0 Overdue"
                  value={criteriaInput}
                  onChange={(e) => setCriteriaInput(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the purpose or targeted incentives for this cohort..."
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", resize: "none", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: `1px solid ${tokens.borderSubtle}`, backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: isDark ? "#10B981" : "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", boxShadow: "none" }}
                  className="hover:opacity-90"
                >
                  Save Segment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT SEGMENT */}
      {editingSegment && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "480px", 
            padding: "28px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setEditingSegment(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: 0, marginBottom: "6px" }}>Edit Segment Rules</h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, marginBottom: "20px" }}>
              Modify cohort criteria and descriptive rules.
            </p>

            <form onSubmit={handleUpdateSegment} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Segment Name</label>
                <input
                  type="text"
                  required
                  value={editingSegment.name}
                  onChange={(e) => setEditingSegment({ ...editingSegment, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Criteria Badge</label>
                <input
                  type="text"
                  required
                  value={editingSegment.criteria}
                  onChange={(e) => setEditingSegment({ ...editingSegment, criteria: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Description</label>
                <textarea
                  rows={3}
                  value={editingSegment.description}
                  onChange={(e) => setEditingSegment({ ...editingSegment, description: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", resize: "none", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditingSegment(null)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: `1px solid ${tokens.borderSubtle}`, backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: isDark ? "#10B981" : "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", boxShadow: "none" }}
                  className="hover:opacity-90"
                >
                  Save Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW MEMBERS DRAWER/MODAL */}
      {viewingMembersSegment && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "540px", 
            padding: "28px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setViewingMembersSegment(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: "11px", fontWeight: 700, color: isDark ? "#F1F5F9" : viewingMembersSegment.badgeColor, backgroundColor: isDark ? `${viewingMembersSegment.badgeColor}35` : viewingMembersSegment.badgeBg, border: isDark ? `1px solid ${viewingMembersSegment.badgeColor}50` : "none", padding: "3px 8px", borderRadius: "9999px" }}>
              {viewingMembersSegment.criteria}
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: "8px 0 4px" }}>
              {viewingMembersSegment.name} Members
            </h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: "0 0 20px" }}>
              Active distributors currently assigned to this segment criteria.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "300px", overflowY: "auto" }}>
              {(mockSegmentMembers[viewingMembersSegment.id] || []).map((m, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: tokens.bgSubtle, border: `1px solid ${tokens.borderSubtle}`, borderRadius: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Building2 size={16} color={tokens.textSecondary} />
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>{m.name}</div>
                      <div style={{ fontSize: "11px", color: tokens.textMuted }}>Region: {m.region}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: tokens.textPrimary }}>{m.gmv}</div>
                    <div style={{ fontSize: "11px", color: m.status === "Active" ? "#10B981" : "#EF4444", fontWeight: 600 }}>{m.status}</div>
                  </div>
                </div>
              ))}

              {(!mockSegmentMembers[viewingMembersSegment.id] || mockSegmentMembers[viewingMembersSegment.id].length === 0) && (
                <div style={{ padding: "24px", textAlign: "center", color: tokens.textMuted, fontSize: "13px" }}>
                  No distributors currently assigned to this custom segment.
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => setViewingMembersSegment(null)}
                style={{ height: "40px", padding: "0 22px", borderRadius: "9999px", border: `1px solid ${tokens.borderSubtle}`, backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
