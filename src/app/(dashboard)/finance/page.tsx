"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowUp, MoreHorizontal, Edit, Download, CheckCircle2, X, Check, FileText } from "lucide-react";

interface Transaction {
  id: string;
  distributor: string;
  txnId: string;
  date: string;
  amount: string;
  method: string;
  status: "Received" | "Pending" | "Overdue";
}

const initialTransactions: Transaction[] = [
  { id: "1", distributor: "Lagos Island Beverages", txnId: "TXN-0041", date: "Jun 17, 09:32", amount: "₦1.2M", method: "Bank transfer", status: "Received" },
  { id: "2", distributor: "Shoprite Ikeja", txnId: "TXN-0040", date: "Jun 17, 08:18", amount: "₦84,000", method: "POS", status: "Received" },
  { id: "3", distributor: "Alhaji Musa Distributors", txnId: "TXN-0039", date: "Jun 16, 16:44", amount: "₦540K", method: "Bank transfer", status: "Pending" },
  { id: "4", distributor: "Eko FMCG Hub", txnId: "TXN-0038", date: "Jun 16, 14:20", amount: "₦2.1M", method: "Bank transfer", status: "Overdue" },
  { id: "5", distributor: "Abuja Central Trading", txnId: "TXN-0037", date: "Jun 16, 11:05", amount: "₦980K", method: "Bank transfer", status: "Received" },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);
  const [receiptTxn, setReceiptTxn] = useState<Transaction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Received": return { bg: "#DCFCE7", text: "#16A34A" };
      case "Pending": return { bg: "#FFEDD5", text: "#D97706" };
      case "Overdue": return { bg: "#FEE2E2", text: "#EF4444" };
    }
  };

  const handleUpdateStatus = (newStatus: Transaction["status"]) => {
    if (!editingTxn) return;
    setTransactions(transactions.map(t => t.id === editingTxn.id ? { ...t, status: newStatus } : t));
    setEditingTxn(null);
    showToast(`Payment status updated to ${newStatus} for ${editingTxn.distributor}`);
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Treasury & Collections</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Real-time cash flow, bank transfer verification, overdue aging, and payment receipts.
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
            Export Ledger
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "12px", overflowX: "auto" }}>
        {["Overview", "Credit & Limits", "Invoices & Aging", "Reconciliation", "Payouts", "Approvals"].map(tab => (
          <div 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              showToast(`Switched view to ${tab}`);
            }}
            style={{ 
              cursor: "pointer", 
              fontSize: "14px", 
              fontWeight: 600, 
              color: activeTab === tab ? "#0E3E2B" : "rgba(14,62,43,0.5)",
              borderBottom: activeTab === tab ? "2px solid #0E3E2B" : "2px solid transparent",
              paddingBottom: "12px",
              marginBottom: "-13px",
              whiteSpace: "nowrap"
            }} 
            className="hover:text-[#0E3E2B] transition-colors"
          >
            {tab}
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        
        {/* COLLECTED */}
        <div style={{ backgroundColor: "#0E3E2B", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "8px" }}>COLLECTED</p>
          <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>₦284M</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#A3FF00", marginTop: "4px" }}>
            <ArrowUp size={12} strokeWidth={3} />
            <span style={{ fontSize: "12px", fontWeight: 600 }}>+14.2%</span>
          </div>
        </div>
        
        {/* PENDING */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "8px" }}>PENDING</p>
          <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>₦38M</h3>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(14,62,43,0.5)", marginTop: "4px" }}>Due within 7 days</span>
        </div>

        {/* OVERDUE */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "8px" }}>OVERDUE</p>
          <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#EF4444", margin: 0 }}>₦8.1M</h3>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#EF4444", marginTop: "4px" }}>23 distributors</span>
        </div>

        {/* DSO */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "8px" }}>DSO</p>
          <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>29 days</h3>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#D97706", marginTop: "4px" }}>Target: 21 days</span>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "visible", marginTop: "8px" }}>
        
        {/* Table Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(14,62,43,0.08)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0E3E2B", margin: 0 }}>Recent Collections & Settlement Transactions</h3>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            style={{ background: "none", border: "none", color: "#16A34A", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
          >
            <span>Export Transactions</span>
            <ArrowRight size={14} color="#16A34A" />
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "transparent", whiteSpace: "nowrap" }}>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Distributor</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Method</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => {
                const isMenuOpen = activeDropdownId === t.id;

                return (
                  <tr key={t.id} style={{ borderBottom: index !== transactions.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                    <td style={{ padding: "16px 24px", minWidth: "180px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{t.distributor}</span>
                        <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.4)", marginTop: "2px", whiteSpace: "nowrap" }}>{t.txnId}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "12px", color: "rgba(14,62,43,0.6)", whiteSpace: "nowrap" }}>{t.date}</td>
                    <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>{t.amount}</td>
                    <td style={{ padding: "16px 24px", fontSize: "13px", color: "rgba(14,62,43,0.7)", whiteSpace: "nowrap" }}>{t.method}</td>
                    <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                      <span style={{ 
                        backgroundColor: getStatusColor(t.status).bg, 
                        color: getStatusColor(t.status).text, 
                        padding: "4px 10px", 
                        borderRadius: "4px", 
                        fontSize: "11px", 
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        display: "inline-flex"
                      }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => setReceiptTxn(t)}
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
                        <FileText size={12} />
                        Receipt
                      </button>

                      <button
                        onClick={() => setActiveDropdownId(isMenuOpen ? null : t.id)}
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

                    {/* Dropdown */}
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
                          width: "200px",
                          padding: "6px",
                          textAlign: "left",
                        }}
                      >
                        <button
                          onClick={() => {
                            setEditingTxn(t);
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
                          Update Payment Status
                        </button>

                        <button
                          onClick={() => {
                            setReceiptTxn(t);
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
                          <FileText size={14} color="#16A34A" />
                          View Digital Receipt
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
      </div>

      {/* Modal: Export Ledger */}
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
            maxWidth: "420px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Export Treasury Ledger
              </h3>
              <button 
                onClick={() => setIsExportModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Download settlement audit records for treasury reconciliation:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast("Treasury ledger downloaded (.xlsx)");
                }}
                style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", backgroundColor: "#FFFFFF", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>Excel Spreadsheet (.XLSX)</span>
                <Download size={16} />
              </button>
              <button
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast("Raw transaction log downloaded (.csv)");
                }}
                style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", backgroundColor: "#FFFFFF", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>Bank Statement CSV (.CSV)</span>
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Update Payment Status */}
      {editingTxn && (
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
            maxWidth: "400px",
            padding: "24px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Update Payment Status
              </h3>
              <button 
                onClick={() => setEditingTxn(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Transaction <strong>{editingTxn.txnId}</strong> ({editingTxn.distributor} - {editingTxn.amount}):
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(["Received", "Pending", "Overdue"] as Transaction["status"][]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleUpdateStatus(st)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid",
                    borderColor: editingTxn.status === st ? "#0E3E2B" : "rgba(14,62,43,0.1)",
                    backgroundColor: editingTxn.status === st ? "#F0F5ED" : "#FFFFFF",
                    color: "#0E3E2B",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="hover:bg-black/5"
                >
                  <span>{st}</span>
                  {editingTxn.status === st && <Check size={16} color="#0E3E2B" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Digital Receipt */}
      {receiptTxn && (
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
            maxWidth: "460px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "16px", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#16A34A", textTransform: "uppercase" }}>TREASURY SETTLEMENT RECEIPT</span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{receiptTxn.txnId}</h3>
              </div>
              <button 
                onClick={() => setReceiptTxn(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", backgroundColor: "#F0F5ED", borderRadius: "10px" }}>
                <span style={{ color: "rgba(14,62,43,0.6)" }}>Distributor</span>
                <span style={{ fontWeight: 700, color: "#0E3E2B" }}>{receiptTxn.distributor}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <span style={{ color: "rgba(14,62,43,0.6)" }}>Settled Amount</span>
                <span style={{ fontWeight: 700, color: "#16A34A", fontSize: "16px" }}>{receiptTxn.amount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <span style={{ color: "rgba(14,62,43,0.6)" }}>Payment Channel</span>
                <span style={{ fontWeight: 600, color: "#0E3E2B" }}>{receiptTxn.method}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  window.print();
                  showToast("Receipt sent to printer");
                }}
                style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              >
                Print Receipt
              </button>
              <button
                onClick={() => {
                  setReceiptTxn(null);
                  showToast("Receipt sent via WhatsApp to distributor!");
                }}
                style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              >
                Send via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
