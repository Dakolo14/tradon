"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Plus, 
  ChevronDown, 
  Edit, 
  CheckCircle2, 
  X, 
  FileSpreadsheet, 
  Calendar,
  MoreHorizontal
} from "lucide-react";

interface TransactionRow {
  id: string;
  itemType: string;
  salesQty: number;
  refundQty: number;
  grossTotal: string;
}

interface CashMovementRow {
  id: string;
  paymentType: string;
  paymentsCollected: string;
  refundsPaid: string;
}

const initialTransactionSummary: TransactionRow[] = [
  { id: "t1", itemType: "Beverages (Fruit Juices & Nectars)", salesQty: 1240, refundQty: 12, grossTotal: "₦2,450,000" },
  { id: "t2", itemType: "Snacks & Confectionery", salesQty: 850, refundQty: 0, grossTotal: "₦680,000" },
  { id: "t3", itemType: "Dairy & Evaporated Milk", salesQty: 420, refundQty: 5, grossTotal: "₦1,250,000" },
  { id: "t4", itemType: "Logistics Delivery Surcharges", salesQty: 0, refundQty: 0, grossTotal: "₦45,000" },
  { id: "t5", itemType: "Promotional Distributor Discounts", salesQty: 0, refundQty: 0, grossTotal: "-₦120,000" },
];

const initialCashMovementSummary: CashMovementRow[] = [
  { id: "c1", paymentType: "Physical Cash (Depot Vault)", paymentsCollected: "₦850,000", refundsPaid: "₦15,000" },
  { id: "c2", paymentType: "POS / Card Terminals", paymentsCollected: "₦1,200,000", refundsPaid: "₦0" },
  { id: "c3", paymentType: "NIBSS Instant Bank Transfer", paymentsCollected: "₦2,255,000", refundsPaid: "₦12,500" },
  { id: "c4", paymentType: "Credit / Invoiced Receivables", paymentsCollected: "₦1,450,000", refundsPaid: "₦0" },
];

export default function DailySalesSummaryPage() {
  const [dayOffset, setDayOffset] = useState(0);
  const [transactions, setTransactions] = useState<TransactionRow[]>(initialTransactionSummary);
  const [cashMovements, setCashMovements] = useState<CashMovementRow[]>(initialCashMovementSummary);

  // Modals
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionRow | null>(null);
  const [editingCash, setEditingCash] = useState<CashMovementRow | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New entry form
  const [newCategory, setNewCategory] = useState("Beverages");
  const [newQty, setNewQty] = useState("100");
  const [newAmount, setNewAmount] = useState("150000");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getDateString = (offset: number) => {
    const d = new Date(2026, 8, 6 + offset); // Sep 6, 2026 base
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric" });
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(newQty) || 0;
    const gross = parseInt(newAmount) || 0;
    const newTx: TransactionRow = {
      id: `t-${Date.now()}`,
      itemType: newCategory,
      salesQty: qty,
      refundQty: 0,
      grossTotal: `₦${gross.toLocaleString()}`,
    };
    setTransactions([...transactions, newTx]);
    setIsNewEntryModalOpen(false);
    showToast(`Added ${newCategory} entry for ${getDateString(dayOffset)}`);
  };

  const handleSaveTransactionEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;
    setTransactions(transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t));
    setEditingTransaction(null);
    showToast("Transaction category updated successfully!");
  };

  const handleSaveCashEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCash) return;
    setCashMovements(cashMovements.map(c => c.id === editingCash.id ? editingCash : c));
    setEditingCash(null);
    showToast("Cash movement record updated!");
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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
        <div>
          <h1 style={{ fontWeight: 700, color: "#0E3E2B", margin: 0 }} className="text-xl sm:text-2xl">
            Daily Sales & Cash Summary
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Reconciliation of day-end transaction batches and physical depot cash movement.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }} className="gap-2 sm:gap-3">
          <button 
            onClick={() => setIsExportModalOpen(true)}
            style={{ 
              backgroundColor: "transparent", 
              border: "1px solid rgba(14,62,43,0.2)", 
              borderRadius: "9999px", 
              fontWeight: 600, 
              color: "#0E3E2B", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px" 
            }} 
            className="h-9 sm:h-10 px-3.5 sm:px-4 text-xs sm:text-sm hover:bg-black/5 transition-colors"
          >
            <Download size={14} />
            Export Day Pack
            <ChevronDown size={13} />
          </button>
          <button 
            onClick={() => setIsNewEntryModalOpen(true)}
            style={{ 
              backgroundColor: "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px" 
            }} 
            className="h-9 sm:h-10 px-3.5 sm:px-4 text-xs sm:text-sm hover:bg-[#154E38] transition-colors"
          >
            <Plus size={15} />
            Add Manual Entry
          </button>
        </div>
      </div>

      {/* Date Picker Ribbon */}
      <div style={{ display: "inline-flex", alignItems: "center", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.12)", borderRadius: "9999px", width: "fit-content", maxWidth: "100%" }}>
        <button 
          onClick={() => setDayOffset(prev => prev - 1)}
          style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.6)", display: "flex", alignItems: "center" }} 
          className="hover:text-[#0E3E2B]"
        >
          <ChevronLeft size={16} />
        </button>
        <div style={{ padding: "6px 12px", borderLeft: "1px solid rgba(14,62,43,0.1)", borderRight: "1px solid rgba(14,62,43,0.1)", display: "flex", alignItems: "center", gap: "8px" }} className="sm:gap-3">
          <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#0E3E2B" }}>
            {dayOffset === 0 ? "Today" : dayOffset === -1 ? "Yesterday" : `${dayOffset} days`}
          </span>
          <span style={{ fontSize: "12.5px", color: "rgba(14,62,43,0.6)" }}>{getDateString(dayOffset)}</span>
        </div>
        <button 
          onClick={() => setDayOffset(prev => prev + 1)}
          style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.6)", display: "flex", alignItems: "center" }} 
          className="hover:text-[#0E3E2B]"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Tables Container */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
        
        {/* Transaction Summary */}
        <div style={{ flex: "1 1 500px", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(14,62,43,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Category Transaction Summary</h2>
              <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)", margin: "2px 0 0" }}>Breakdown by FMCG product line</p>
            </div>
            <button
              onClick={() => setIsNewEntryModalOpen(true)}
              style={{ fontSize: "12px", color: "#0E3E2B", background: "none", border: "none", fontWeight: 600, cursor: "pointer" }}
              className="hover:underline"
            >
              + Add Line
            </button>
          </div>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ width: "100%", minWidth: "550px", borderCollapse: "collapse", textAlign: "right" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Item category</th>
                  <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Sales qty</th>
                  <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Refunds</th>
                  <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Gross total</th>
                  <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: idx !== transactions.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none", whiteSpace: "nowrap" }} className="hover:bg-black/[0.01]">
                    <td style={{ padding: "14px 20px", textAlign: "left", fontSize: "13px", color: "#0E3E2B", fontWeight: 500 }}>{row.itemType}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{row.salesQty}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 500, color: "rgba(14,62,43,0.6)" }}>{row.refundQty}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 700, color: row.grossTotal.startsWith("-") ? "#EF4444" : "#0E3E2B" }}>{row.grossTotal}</td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <button
                        onClick={() => setEditingTransaction(row)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#F0F5ED",
                          border: "1px solid rgba(14,62,43,0.1)",
                          borderRadius: "6px",
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cash Movement Summary */}
        <div style={{ flex: "1 1 500px", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(14,62,43,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Cash Movement & Settlements</h2>
              <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)", margin: "2px 0 0" }}>Vault & bank inflow ledger</p>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#16A34A" }}>Settled Today</span>
          </div>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ width: "100%", minWidth: "500px", borderCollapse: "collapse", textAlign: "right" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Payment Channel</th>
                  <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Collections</th>
                  <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Refunds</th>
                  <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cashMovements.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: idx !== cashMovements.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none", whiteSpace: "nowrap" }} className="hover:bg-black/[0.01]">
                    <td style={{ padding: "14px 20px", textAlign: "left", fontSize: "13px", color: "#0E3E2B", fontWeight: 500 }}>{row.paymentType}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 700, color: "#16A34A" }}>{row.paymentsCollected}</td>
                    <td style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 500, color: "rgba(14,62,43,0.6)" }}>{row.refundsPaid}</td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <button
                        onClick={() => setEditingCash(row)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#F0F5ED",
                          border: "1px solid rgba(14,62,43,0.1)",
                          borderRadius: "6px",
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
                        Adjust
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal: Export Day Pack */}
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
                Export Daily Sales Pack
              </h3>
              <button 
                onClick={() => setIsExportModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 20px 0" }}>
              Download certified reconciliation summary for {getDateString(dayOffset)}:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast("Excel audit pack downloaded (.xlsx)");
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
                <span>Full General Ledger (.XLSX)</span>
                <Download size={16} />
              </button>
              <button
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast("CSV summary downloaded (.csv)");
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
                <span>Raw Transaction Stream (.CSV)</span>
                <Download size={16} />
              </button>
              <button
                onClick={() => {
                  window.print();
                  setIsExportModalOpen(false);
                  showToast("Sent to printer / PDF export");
                }}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#0E3E2B",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
                className="hover:bg-[#154E38]"
              >
                <span>Print Official PDF Summary</span>
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Manual Entry */}
      {isNewEntryModalOpen && (
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Record Category Transaction
              </h3>
              <button 
                onClick={() => setIsNewEntryModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddEntry} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Product Category / Line
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Energy Drinks / Canisters"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
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
                    Sales Qty
                  </label>
                  <input
                    type="number"
                    required
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
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
                    Gross Amount (₦)
                  </label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
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

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewEntryModalOpen(false)}
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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Transaction */}
      {editingTransaction && (
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Edit {editingTransaction.itemType}
              </h3>
              <button 
                onClick={() => setEditingTransaction(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTransactionEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Sales Quantity
                </label>
                <input
                  type="number"
                  required
                  value={editingTransaction.salesQty}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, salesQty: parseInt(e.target.value) || 0 })}
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
                  Refund Quantity
                </label>
                <input
                  type="number"
                  required
                  value={editingTransaction.refundQty}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, refundQty: parseInt(e.target.value) || 0 })}
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
                  Gross Total
                </label>
                <input
                  type="text"
                  required
                  value={editingTransaction.grossTotal}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, grossTotal: e.target.value })}
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

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingTransaction(null)}
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
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Cash Movement */}
      {editingCash && (
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Adjust {editingCash.paymentType}
              </h3>
              <button 
                onClick={() => setEditingCash(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCashEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Payments Collected
                </label>
                <input
                  type="text"
                  required
                  value={editingCash.paymentsCollected}
                  onChange={(e) => setEditingCash({ ...editingCash, paymentsCollected: e.target.value })}
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
                  Refunds Paid Out
                </label>
                <input
                  type="text"
                  required
                  value={editingCash.refundsPaid}
                  onChange={(e) => setEditingCash({ ...editingCash, refundsPaid: e.target.value })}
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

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingCash(null)}
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
                  Save Cash Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
