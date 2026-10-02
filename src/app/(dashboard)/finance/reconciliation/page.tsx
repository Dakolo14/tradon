"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  RefreshCw, 
  Building2, 
  UploadCloud, 
  Download,
  Filter,
  Check,
  X,
  Clock,
  ShieldCheck
} from "lucide-react";

interface ReconciliationEntry {
  id: string;
  source: "NIBSS Bank Transfer" | "POS Terminal" | "Field Rep Cash Deposit";
  reference: string;
  distributor: string;
  amount: string;
  bankAccount: string;
  clearedAt: string;
  matchingStatus: "Auto-Matched" | "Pending Match" | "Discrepancy";
  invoiceLinked: string;
}

const initialEntries: ReconciliationEntry[] = [
  {
    id: "1",
    source: "NIBSS Bank Transfer",
    reference: "NIBSS-TRF-9902341",
    distributor: "Lagos Island Beverages",
    amount: "₦1,200,000",
    bankAccount: "Zenith Bank (9012)",
    clearedAt: "Today @ 09:32 AM",
    matchingStatus: "Auto-Matched",
    invoiceLinked: "INV-2026-0905",
  },
  {
    id: "2",
    source: "POS Terminal",
    reference: "POS-STANBIC-88412",
    distributor: "Mama Tope Stores",
    amount: "₦450,000",
    bankAccount: "Stanbic IBTC (4410)",
    clearedAt: "Today @ 08:18 AM",
    matchingStatus: "Auto-Matched",
    invoiceLinked: "INV-2026-0912",
  },
  {
    id: "3",
    source: "NIBSS Bank Transfer",
    reference: "NIBSS-TRF-9901844",
    distributor: "Alhaji Musa Distributors",
    amount: "₦2,000,000",
    bankAccount: "Access Bank (1120)",
    clearedAt: "Yesterday @ 04:44 PM",
    matchingStatus: "Pending Match",
    invoiceLinked: "Partial payment for INV-2026-0891",
  },
  {
    id: "4",
    source: "Field Rep Cash Deposit",
    reference: "DEP-SLIP-7712",
    distributor: "Bodija Provision Outlets",
    amount: "₦385,000",
    bankAccount: "First Bank (0092)",
    clearedAt: "Yesterday @ 03:10 PM",
    matchingStatus: "Discrepancy",
    invoiceLinked: "Teller amount mismatch (Logged: ₦395k)",
  },
];

export default function BankReconciliationPage() {
  const [entries, setEntries] = useState<ReconciliationEntry[]>(initialEntries);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [auditItem, setAuditItem] = useState<ReconciliationEntry | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showToast("Synchronized statement feeds with NIBSS and Zenith API");
    }, 1200);
  };

  const handleApproveMatch = (id: string) => {
    setEntries(entries.map(e => {
      if (e.id === id) {
        return {
          ...e,
          matchingStatus: "Auto-Matched",
          invoiceLinked: "Verified & Reconciled with General Ledger"
        };
      }
      return e;
    }));

    showToast(`Approved match for ${auditItem?.reference}`);
    setAuditItem(null);
  };

  const filteredEntries = entries.filter(item =>
    item.distributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.bankAccount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>
      
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Bank Settlement & Reconciliation</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Automated statement matching across corporate accounts, POS terminal batches, and field agent cash deposits.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={handleSync}
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
              gap: "8px" 
            }} 
            className="hover:bg-black/5 transition-colors"
          >
            <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing Feeds..." : "Sync Bank Feeds"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Total Reconciled Today</span>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 0" }}>₦4.03M</h3>
          <p style={{ fontSize: "12px", color: "#16A34A", margin: "4px 0 0", fontWeight: 500 }}>98.4% Match Rate</p>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Pending Invoices</span>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#D97706", margin: "8px 0 0" }}>₦2.00M</h3>
          <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", margin: "4px 0 0" }}>1 Unallocated Deposit</p>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Teller Discrepancies</span>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#DC2626", margin: "8px 0 0" }}>₦10,000</h3>
          <p style={{ fontSize: "12px", color: "#DC2626", margin: "4px 0 0", fontWeight: 500 }}>Requires Audit Review</p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div style={{ position: "relative", maxWidth: "420px" }}>
        <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search by reference, dealer name, or bank..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            height: "40px",
            paddingLeft: "42px",
            paddingRight: "16px",
            borderRadius: "9999px",
            border: "1px solid rgba(14,62,43,0.15)",
            backgroundColor: "#FFFFFF",
            fontSize: "13px",
            color: "#0E3E2B",
            outline: "none",
          }}
        />
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "980px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Channel Source</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Distributor</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Deposit Account</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: idx !== filteredEntries.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                <td style={{ padding: "16px 24px", minWidth: "180px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{item.source}</div>
                  <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px", fontFamily: "monospace", whiteSpace: "nowrap" }}>{item.reference} • {item.clearedAt}</div>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "13px", color: "#0E3E2B", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {item.distributor}
                </td>
                <td style={{ padding: "16px 24px", fontSize: "13px", color: "rgba(14,62,43,0.8)", whiteSpace: "nowrap" }}>
                  {item.bankAccount}
                </td>
                <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                  {item.amount}
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "4px", 
                    backgroundColor: item.matchingStatus === "Auto-Matched" ? "#F0FDF4" : item.matchingStatus === "Pending Match" ? "#FFFBEB" : "#FEF2F2", 
                    color: item.matchingStatus === "Auto-Matched" ? "#16A34A" : item.matchingStatus === "Pending Match" ? "#D97706" : "#DC2626", 
                    fontSize: "11px", 
                    fontWeight: 600, 
                    padding: "3px 8px", 
                    borderRadius: "9999px",
                    whiteSpace: "nowrap"
                  }}>
                    {item.matchingStatus === "Auto-Matched" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {item.matchingStatus}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right", whiteSpace: "nowrap" }}>
                  <button 
                    onClick={() => setAuditItem(item)}
                    style={{ 
                      height: "32px", 
                      padding: "0 14px", 
                      backgroundColor: "transparent", 
                      border: "1px solid rgba(14,62,43,0.2)", 
                      borderRadius: "9999px", 
                      fontSize: "11px", 
                      fontWeight: 600, 
                      color: "#0E3E2B", 
                      cursor: "pointer" 
                    }}
                    className="hover:bg-black/5"
                  >
                    Audit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: RECONCILIATION AUDIT */}
      {auditItem && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "500px", padding: "30px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setAuditItem(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: "11px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "#A3FF00", padding: "3px 8px", borderRadius: "4px" }}>
              SETTLEMENT VERIFICATION
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0E3E2B", margin: "8px 0 2px" }}>
              Audit {auditItem.reference}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 20px" }}>
              Channel: {auditItem.source} • Cleared {auditItem.clearedAt}
            </p>

            <div style={{ backgroundColor: "#F8FAF8", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>Distributor:</span>
                <strong style={{ color: "#0E3E2B" }}>{auditItem.distributor}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>Settlement Amount:</span>
                <strong style={{ color: "#0E3E2B", fontSize: "15px" }}>{auditItem.amount}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>Bank Receiving Account:</span>
                <strong style={{ color: "#0E3E2B" }}>{auditItem.bankAccount}</strong>
              </div>
            </div>

            <div style={{ padding: "12px 16px", border: "1px solid rgba(14,62,43,0.1)", borderRadius: "10px", marginBottom: "24px" }}>
              <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 600, color: "rgba(14,62,43,0.5)", display: "block", marginBottom: "4px" }}>
                Matched Invoice Ledger Note
              </span>
              <p style={{ fontSize: "13px", color: "#0E3E2B", margin: 0, fontWeight: 500 }}>
                {auditItem.invoiceLinked}
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setAuditItem(null)}
                style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
              >
                Close
              </button>
              {auditItem.matchingStatus !== "Auto-Matched" && (
                <button
                  type="button"
                  onClick={() => handleApproveMatch(auditItem.id)}
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                  className="hover:bg-[#08281B]"
                >
                  <CheckCircle2 size={16} color="#A3FF00" />
                  Approve & Reconcile
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
