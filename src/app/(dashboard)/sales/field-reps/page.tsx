"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  Search, 
  UserCheck, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  CheckCircle2, 
  X, 
  Clock, 
  Trash2, 
  MapPin,
  ShieldCheck,
  CreditCard,
  DollarSign,
  Check
} from "lucide-react";

interface FieldSale {
  id: string;
  ref: string;
  repName: string;
  repCode: string;
  outletName: string;
  territory: string;
  cartons: number;
  totalAmount: string;
  paymentMethod: "Cash Collected" | "POS Swipe" | "Bank Transfer";
  syncedStatus: "Remitted & Verified" | "Cash In Hand" | "Pending Audit";
  timestamp: string;
}

const initialFieldSales: FieldSale[] = [
  {
    id: "FS-1",
    ref: "FLD-2026-901",
    repName: "Emeka Okafor",
    repCode: "REP-LAG-04",
    outletName: "Goodness Supermarket, Idumota",
    territory: "Lagos Island",
    cartons: 45,
    totalAmount: "₦607,500",
    paymentMethod: "Cash Collected",
    syncedStatus: "Cash In Hand",
    timestamp: "Today @ 10:14 AM",
  },
  {
    id: "FS-2",
    ref: "FLD-2026-900",
    repName: "Tunde Bakare",
    repCode: "REP-LAG-01",
    outletName: "Mama Titi Provisions, Allen Ave",
    territory: "Ikeja Wholesale Beat",
    cartons: 60,
    totalAmount: "₦810,000",
    paymentMethod: "Bank Transfer",
    syncedStatus: "Remitted & Verified",
    timestamp: "Today @ 09:48 AM",
  },
  {
    id: "FS-3",
    ref: "FLD-2026-899",
    repName: "Amina Yusuf",
    repCode: "REP-KAN-02",
    outletName: "Bata Stores Co, Sabon Gari",
    territory: "Kano Central",
    cartons: 110,
    totalAmount: "₦1,485,000",
    paymentMethod: "Cash Collected",
    syncedStatus: "Pending Audit",
    timestamp: "Today @ 09:12 AM",
  },
  {
    id: "FS-4",
    ref: "FLD-2026-898",
    repName: "Segun Adeleke",
    repCode: "REP-IBD-01",
    outletName: "Bodija Coldstore Hub",
    territory: "Ibadan Core",
    cartons: 35,
    totalAmount: "₦472,500",
    paymentMethod: "POS Swipe",
    syncedStatus: "Remitted & Verified",
    timestamp: "Yesterday @ 04:30 PM",
  },
  {
    id: "FS-5",
    ref: "FLD-2026-897",
    repName: "Chukwudi Eze",
    repCode: "REP-PH-03",
    outletName: "Mile 1 Market Beverage Depot",
    territory: "Port Harcourt",
    cartons: 80,
    totalAmount: "₦1,080,000",
    paymentMethod: "Bank Transfer",
    syncedStatus: "Remitted & Verified",
    timestamp: "Yesterday @ 02:15 PM",
  },
];

export default function FieldRepsSalesPage() {
  const [sales, setSales] = useState<FieldSale[]>(initialFieldSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modals state
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<FieldSale | null>(null);
  const [remitSale, setRemitSale] = useState<FieldSale | null>(null);
  const [gpsSale, setGpsSale] = useState<FieldSale | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Sale Form
  const [newRepName, setNewRepName] = useState("Emeka Okafor (REP-LAG-04)");
  const [newOutlet, setNewOutlet] = useState("");
  const [newTerritory, setNewTerritory] = useState("Lagos Island");
  const [newCartons, setNewCartons] = useState("40");
  const [newPayment, setNewPayment] = useState<FieldSale["paymentMethod"]>("Cash Collected");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredSales = sales.filter((s) => {
    const matchesSearch = 
      s.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.repName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.territory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || s.syncedStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOutlet) {
      alert("Please enter retail outlet name");
      return;
    }
    const ctns = parseInt(newCartons) || 20;
    const amountVal = ctns * 13500;
    const [name, code] = newRepName.split(" (");

    const newEntry: FieldSale = {
      id: `FS-${Date.now().toString().slice(-4)}`,
      ref: `FLD-2026-${Math.floor(100 + Math.random() * 900)}`,
      repName: name,
      repCode: code ? code.replace(")", "") : "REP-LAG-01",
      outletName: newOutlet,
      territory: newTerritory,
      cartons: ctns,
      totalAmount: `₦${amountVal.toLocaleString()}`,
      paymentMethod: newPayment,
      syncedStatus: newPayment === "Cash Collected" ? "Cash In Hand" : "Remitted & Verified",
      timestamp: "Just now",
    };

    setSales([newEntry, ...sales]);
    setIsNewSaleModalOpen(false);
    setNewOutlet("");
    showToast(`Field sale ${newEntry.ref} logged successfully!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSale) return;
    setSales(sales.map(s => s.id === editingSale.id ? editingSale : s));
    setEditingSale(null);
    showToast(`Field sale ${editingSale.ref} updated`);
  };

  const handleVerifyRemittance = (saleId: string) => {
    setSales(sales.map(s => s.id === saleId ? { ...s, syncedStatus: "Remitted & Verified" } : s));
    setRemitSale(null);
    showToast("Cash remittance verified and reconciled with treasury!");
  };

  const handleDeleteSale = (saleId: string, ref: string) => {
    if (confirm(`Void field sale ${ref}?`)) {
      setSales(sales.filter(s => s.id !== saleId));
      setActiveDropdownId(null);
      showToast(`Sale entry ${ref} voided.`);
    }
  };

  const getStatusBadge = (status: FieldSale["syncedStatus"]) => {
    switch (status) {
      case "Remitted & Verified":
        return { bg: "#F0FDF4", text: "#16A34A", border: "rgba(22,163,74,0.2)" };
      case "Cash In Hand":
        return { bg: "#FFFBEB", text: "#D97706", border: "rgba(217,119,6,0.2)" };
      case "Pending Audit":
        return { bg: "#FEF2F2", text: "#DC2626", border: "rgba(220,38,38,0.2)" };
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Field Rep Sales</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Real-time outlet orders logged by field agents, cash-in-hand remittance tracking, and GPS proof.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsNewSaleModalOpen(true)}
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
            + Log field sale
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Today's Field Gross</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>₦4.45M</h3>
          <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 500 }}>330 Cartons sold on beats</span>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Cash with Agents</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#D97706", margin: "8px 0 2px" }}>
            ₦2.09M
          </h3>
          <span style={{ fontSize: "12px", color: "#D97706", fontWeight: 500 }}>Requires bank depot pay-in</span>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Verified Remittance</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#16A34A", margin: "8px 0 2px" }}>
            ₦2.36M
          </h3>
          <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>Settled to bank accounts</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", flex: 1 }}>
          <div style={{ position: "relative", width: "320px" }}>
            <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reference, rep name, or retail outlet"
              style={{ width: "100%", height: "40px", paddingLeft: "42px", paddingRight: "16px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.1)", backgroundColor: "transparent", fontSize: "13px", color: "#0E3E2B", outline: "none" }}
              className="focus:border-[#0E3E2B]/40 transition-colors"
            />
          </div>

          <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
            {["All", "Cash In Hand", "Remitted & Verified", "Pending Audit"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  height: "36px",
                  padding: "0 14px",
                  borderRadius: "9999px",
                  border: "1px solid",
                  borderColor: filterStatus === st ? "#0E3E2B" : "rgba(14,62,43,0.12)",
                  backgroundColor: filterStatus === st ? "#0E3E2B" : "transparent",
                  color: filterStatus === st ? "#FFFFFF" : "#0E3E2B",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Sale Ref</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Field Representative</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Retail Outlet / Beat</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Cartons</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Amount & Payment</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Remittance Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "rgba(14,62,43,0.5)", fontSize: "14px" }}>
                  No field sales logged matching your search.
                </td>
              </tr>
            ) : (
              filteredSales.map((sale, idx) => {
                const badge = getStatusBadge(sale.syncedStatus);
                const isMenuOpen = activeDropdownId === sale.id;

                return (
                  <tr key={sale.id} style={{ borderBottom: idx !== filteredSales.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/[0.01] transition-colors">
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{sale.ref}</span>
                      <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px" }}>{sale.timestamp}</div>
                    </td>
                    <td style={{ padding: "16px 20px", minWidth: "170px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{sale.repName}</div>
                      <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{sale.repCode}</div>
                    </td>
                    <td style={{ padding: "16px 20px", minWidth: "180px" }}>
                      <div style={{ fontSize: "13px", color: "#0E3E2B", fontWeight: 500 }}>{sale.outletName}</div>
                      <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{sale.territory}</div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                      {sale.cartons} ctns
                    </td>
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{sale.totalAmount}</div>
                      <span style={{ fontSize: "10px", color: "rgba(14,62,43,0.6)", backgroundColor: "#F0F5ED", padding: "2px 6px", borderRadius: "4px" }}>
                        {sale.paymentMethod}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <span style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center"
                      }}>
                        {sale.syncedStatus}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        {sale.syncedStatus === "Cash In Hand" ? (
                          <button
                            onClick={() => setRemitSale(sale)}
                            style={{
                              height: "32px",
                              padding: "0 12px",
                              backgroundColor: "#FEF3C7",
                              border: "1px solid rgba(217,119,6,0.3)",
                              borderRadius: "9999px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#D97706",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                            className="hover:bg-[#FDE68A]"
                          >
                            <DollarSign size={12} />
                            Remit Cash
                          </button>
                        ) : (
                          <button
                            onClick={() => setGpsSale(sale)}
                            style={{
                              height: "32px",
                              padding: "0 12px",
                              backgroundColor: "#F0F5ED",
                              border: "1px solid rgba(14,62,43,0.15)",
                              borderRadius: "9999px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#0E3E2B",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                            className="hover:bg-[#E0EBDC]"
                          >
                            <MapPin size={12} />
                            GPS Proof
                          </button>
                        )}

                        <button
                          onClick={() => setActiveDropdownId(isMenuOpen ? null : sale.id)}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "1px solid rgba(14,62,43,0.15)",
                            backgroundColor: isMenuOpen ? "#0E3E2B" : "#FFFFFF",
                            color: isMenuOpen ? "#FFFFFF" : "#0E3E2B",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="hover:border-[#0E3E2B]"
                        >
                          <MoreHorizontal size={16} />
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
                            width: "210px",
                            padding: "6px",
                            textAlign: "left",
                          }}
                        >
                          <button
                            onClick={() => {
                              setEditingSale({ ...sale });
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
                            <Edit size={14} color="#0E3E2B" />
                            Edit Sale Record
                          </button>

                          <button
                            onClick={() => {
                              setRemitSale(sale);
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
                            <ShieldCheck size={14} color="#16A34A" />
                            Verify Cash Remittance
                          </button>

                          <button
                            onClick={() => {
                              setGpsSale(sale);
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
                            <MapPin size={14} color="#2563EB" />
                            Outlet GPS Location
                          </button>

                          <div style={{ height: "1px", backgroundColor: "rgba(14,62,43,0.06)", margin: "4px 0" }} />

                          <button
                            onClick={() => handleDeleteSale(sale.id, sale.ref)}
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
                            <Trash2 size={14} color="#EF4444" />
                            Void / Delete Entry
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Log New Field Sale */}
      {isNewSaleModalOpen && (
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
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#F0F5ED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <UserCheck size={18} color="#0E3E2B" />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Log Field Agent Sale
                </h3>
              </div>
              <button 
                onClick={() => setIsNewSaleModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSale} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Field Representative
                </label>
                <select
                  value={newRepName}
                  onChange={(e) => setNewRepName(e.target.value)}
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
                  <option value="Emeka Okafor (REP-LAG-04)">Emeka Okafor (REP-LAG-04 - Lagos Island)</option>
                  <option value="Tunde Bakare (REP-LAG-01)">Tunde Bakare (REP-LAG-01 - Lagos Mainland)</option>
                  <option value="Amina Yusuf (REP-KAN-02)">Amina Yusuf (REP-KAN-02 - Kano Central)</option>
                  <option value="Segun Adeleke (REP-IBD-01)">Segun Adeleke (REP-IBD-01 - Ibadan Core)</option>
                  <option value="Chukwudi Eze (REP-PH-03)">Chukwudi Eze (REP-PH-03 - Port Harcourt)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Retail Outlet Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mama Titi Mini-Mart, Broad Street"
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
                    Cartons Sold
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newCartons}
                    onChange={(e) => setNewCartons(e.target.value)}
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
                    Calculated Sale Total
                  </label>
                  <div style={{ height: "42px", display: "flex", alignItems: "center", padding: "0 14px", backgroundColor: "#F8FAF8", borderRadius: "10px", fontSize: "14px", fontWeight: 700, color: "#0E3E2B" }}>
                    ₦{((parseInt(newCartons) || 0) * 13500).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Payment Method
                </label>
                <select
                  value={newPayment}
                  onChange={(e) => setNewPayment(e.target.value as any)}
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
                  <option value="Cash Collected">Cash Collected (Held by Agent)</option>
                  <option value="POS Swipe">POS Terminal Swipe</option>
                  <option value="Bank Transfer">Direct Bank Transfer to Chi Treasury</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewSaleModalOpen(false)}
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
                  Record Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Sale */}
      {editingSale && (
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
                Edit Sale: {editingSale.ref}
              </h3>
              <button 
                onClick={() => setEditingSale(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Outlet Name
                </label>
                <input
                  type="text"
                  required
                  value={editingSale.outletName}
                  onChange={(e) => setEditingSale({ ...editingSale, outletName: e.target.value })}
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
                    Cartons
                  </label>
                  <input
                    type="number"
                    value={editingSale.cartons}
                    onChange={(e) => setEditingSale({ ...editingSale, cartons: parseInt(e.target.value) || 0 })}
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
                    Total Collected
                  </label>
                  <input
                    type="text"
                    value={editingSale.totalAmount}
                    onChange={(e) => setEditingSale({ ...editingSale, totalAmount: e.target.value })}
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
                  Payment Method
                </label>
                <select
                  value={editingSale.paymentMethod}
                  onChange={(e) => setEditingSale({ ...editingSale, paymentMethod: e.target.value as any })}
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
                  <option value="Cash Collected">Cash Collected</option>
                  <option value="POS Swipe">POS Swipe</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingSale(null)}
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Remit Cash Verification */}
      {remitSale && (
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
                Verify Cash Remittance
              </h3>
              <button 
                onClick={() => setRemitSale(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0", lineHeight: "1.5" }}>
              Agent <strong>{remitSale.repName} ({remitSale.repCode})</strong> collected <strong>{remitSale.totalAmount}</strong> in physical cash for {remitSale.outletName}.
            </p>

            <div style={{ padding: "16px", backgroundColor: "#F0FDF4", borderRadius: "12px", border: "1px solid rgba(22,163,74,0.2)", marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#16A34A" }}>Deposit Verification</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#0E3E2B", marginTop: "4px" }}>
                Amount: {remitSale.totalAmount}
              </div>
              <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", marginTop: "2px" }}>
                Depot Teller Bank ID: NIBSS-CASH-DEPOT-09
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setRemitSale(null)}
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
                onClick={() => handleVerifyRemittance(remitSale.id)}
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
                Approve & Reconcile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: GPS Proof */}
      {gpsSale && (
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={18} color="#0E3E2B" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  GPS Check-In Telemetry
                </h3>
              </div>
              <button 
                onClick={() => setGpsSale(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
              <div style={{ padding: "14px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Outlet Verified</div>
                <div style={{ fontWeight: 700, color: "#0E3E2B" }}>{gpsSale.outletName}</div>
                <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>{gpsSale.territory}</div>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F0F5ED", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Logged by Representative</span>
                  <p style={{ margin: 0, fontWeight: 700, color: "#0E3E2B" }}>{gpsSale.repName} ({gpsSale.repCode})</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Timestamp</span>
                  <p style={{ margin: 0, fontWeight: 700, color: "#0E3E2B" }}>{gpsSale.timestamp}</p>
                </div>
              </div>

              <div style={{ padding: "14px", border: "1px dashed rgba(14,62,43,0.2)", borderRadius: "10px", textAlign: "center" }}>
                <CheckCircle2 size={24} color="#16A34A" style={{ margin: "0 auto 6px" }} />
                <div style={{ fontWeight: 600, color: "#0E3E2B" }}>Geofence Check-in Confirmed</div>
                <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>Device was 12m from store registered GPS coordinates.</div>
              </div>
            </div>

            <button
              onClick={() => setGpsSale(null)}
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
                marginTop: "16px",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
