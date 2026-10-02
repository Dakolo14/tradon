"use client";

import React, { useState } from "react";
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Search, 
  Download, 
  Filter, 
  ChevronRight, 
  Send, 
  Building2,
  Calendar,
  AlertCircle,
  X,
  CreditCard,
  DollarSign,
  MessageSquare
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNo: string;
  distributorName: string;
  region: string;
  issuedDate: string;
  dueDate: string;
  amount: string;
  agingDays: number;
  agingBucket: "Current (0-14d)" | "15-30 days" | "31-60 days" | "60+ days Overdue";
  status: "Settled" | "Due Soon" | "Overdue" | "Credit Hold";
}

const initialInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "INV-2026-0891",
    distributorName: "Alhaji Musa Distributors",
    region: "Kano",
    issuedDate: "Aug 08, 2026",
    dueDate: "Aug 22, 2026",
    amount: "₦4,300,000",
    agingDays: 29,
    agingBucket: "15-30 days",
    status: "Overdue",
  },
  {
    id: "2",
    invoiceNo: "INV-2026-0884",
    distributorName: "Eko FMCG Hub",
    region: "Lagos",
    issuedDate: "Jul 25, 2026",
    dueDate: "Aug 08, 2026",
    amount: "₦5,800,000",
    agingDays: 43,
    agingBucket: "31-60 days",
    status: "Credit Hold",
  },
  {
    id: "3",
    invoiceNo: "INV-2026-0912",
    distributorName: "Mama Tope Stores",
    region: "Ibadan",
    issuedDate: "Sep 01, 2026",
    dueDate: "Sep 15, 2026",
    amount: "₦450,000",
    agingDays: 5,
    agingBucket: "Current (0-14d)",
    status: "Due Soon",
  },
  {
    id: "4",
    invoiceNo: "INV-2026-0905",
    distributorName: "Lagos Island Beverages",
    region: "Lagos",
    issuedDate: "Aug 28, 2026",
    dueDate: "Sep 11, 2026",
    amount: "₦1,200,000",
    agingDays: 9,
    agingBucket: "Current (0-14d)",
    status: "Due Soon",
  },
  {
    id: "5",
    invoiceNo: "INV-2026-0870",
    distributorName: "PH Riverside Distrib.",
    region: "Port Harcourt",
    issuedDate: "Jul 10, 2026",
    dueDate: "Jul 24, 2026",
    amount: "₦1,400,000",
    agingDays: 58,
    agingBucket: "31-60 days",
    status: "Credit Hold",
  },
  {
    id: "6",
    invoiceNo: "INV-2026-0850",
    distributorName: "Ibadan Wholesale Co.",
    region: "Ibadan",
    issuedDate: "Jun 28, 2026",
    dueDate: "Jul 12, 2026",
    amount: "₦890,000",
    agingDays: 70,
    agingBucket: "60+ days Overdue",
    status: "Credit Hold",
  },
  {
    id: "7",
    invoiceNo: "INV-2026-0915",
    distributorName: "Abuja Central Trading",
    region: "Abuja",
    issuedDate: "Sep 02, 2026",
    dueDate: "Sep 16, 2026",
    amount: "₦980,000",
    agingDays: 4,
    agingBucket: "Current (0-14d)",
    status: "Due Soon",
  },
];

const agingBuckets = [
  { label: "All Invoices", count: 7, total: "₦15.02M" },
  { label: "Current (0-14d)", count: 3, total: "₦2.63M", color: "#10B981" },
  { label: "15-30 days", count: 1, total: "₦4.30M", color: "#F59E0B" },
  { label: "31-60 days", count: 2, total: "₦7.20M", color: "#DC2626" },
  { label: "60+ days Overdue", count: 1, total: "₦890K", color: "#991B1B" },
];

export default function InvoicesAndAgingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [selectedBucket, setSelectedBucket] = useState("All Invoices");
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isBulkReminderOpen, setIsBulkReminderOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSettleInvoice = (id: string) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: "Settled",
          agingDays: 0,
        };
      }
      return inv;
    }));

    showToast(`Marked ${selectedInvoice?.invoiceNo} as fully Settled`);
    setSelectedInvoice(null);
  };

  const handleDispatchReminders = () => {
    setIsBulkReminderOpen(false);
    showToast("Dispatched payment reminders via WhatsApp and SMS to 4 overdue distributors");
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBucket = 
      selectedBucket === "All Invoices" || inv.agingBucket === selectedBucket;

    return matchesSearch && matchesBucket;
  });

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Settled":
        return { bg: "#F0FDF4", text: "#16A34A" };
      case "Due Soon":
        return { bg: "#EFF6FF", text: "#2563EB" };
      case "Overdue":
        return { bg: "#FFFBEB", text: "#D97706" };
      case "Credit Hold":
        return { bg: "#FEF2F2", text: "#DC2626" };
    }
  };

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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Invoices & Aging Ledger</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Track credit cycles, receivables aging buckets (DSO), and enforce automatic dispatch hold on overdue distributors.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
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
            Export Aging Schedule
          </button>
          <button 
            onClick={() => setIsBulkReminderOpen(true)}
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
            <Send size={14} />
            Send Bulk Payment Reminders
          </button>
        </div>
      </div>

      {/* Aging Buckets Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {agingBuckets.map((bucket) => {
          const isSelected = selectedBucket === bucket.label;

          return (
            <div
              key={bucket.label}
              onClick={() => setSelectedBucket(bucket.label)}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: isSelected ? "2px solid #0E3E2B" : "1px solid rgba(14,62,43,0.08)",
                padding: "20px",
                cursor: "pointer",
                boxShadow: isSelected ? "0 4px 12px rgba(14,62,43,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
                transition: "all 0.15s ease",
              }}
              className="hover:shadow-md"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.6)" }}>
                  {bucket.label}
                </span>
                <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: isSelected ? "#0E3E2B" : "rgba(14,62,43,0.08)", color: isSelected ? "#FFFFFF" : "#0E3E2B", padding: "2px 8px", borderRadius: "9999px" }}>
                  {bucket.count} inv
                </span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: bucket.color || "#0E3E2B", margin: "10px 0 0" }}>
                {bucket.total}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ position: "relative", flexGrow: 1, maxWidth: "420px" }}>
          <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search invoice number, distributor name, or region..."
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

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>Showing:</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#0E3E2B" }}>{filteredInvoices.length} invoices</span>
        </div>
      </div>

      {/* Invoices Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Invoice No</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Distributor Account</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Issued & Due Date</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount Due</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Aging DSO</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv, idx) => {
              const badge = getStatusBadge(inv.status);

              return (
                <tr key={inv.id} style={{ borderBottom: idx !== filteredInvoices.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <FileText size={16} color="#0E3E2B" opacity={0.7} />
                      <span style={{ fontSize: "13px", fontWeight: 700, fontFamily: "monospace", color: "#0E3E2B" }}>{inv.invoiceNo}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{inv.distributorName}</div>
                    <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px" }}>Region: {inv.region}</div>
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ fontSize: "12px", color: "#0E3E2B" }}>Issued: {inv.issuedDate}</div>
                    <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px" }}>Due: {inv.dueDate}</div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                    {inv.amount}
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <span style={{ 
                      fontSize: "12px", 
                      fontWeight: 700, 
                      color: inv.status === "Settled" ? "#16A34A" : inv.agingDays > 30 ? "#DC2626" : inv.agingDays > 14 ? "#D97706" : "#16A34A" 
                    }}>
                      {inv.status === "Settled" ? "0 days (Settled)" : `${inv.agingDays} days elapsed`}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <span style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "4px", 
                      backgroundColor: badge.bg, 
                      color: badge.text, 
                      fontSize: "11px", 
                      fontWeight: 600, 
                      padding: "3px 8px", 
                      borderRadius: "9999px" 
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right", whiteSpace: "nowrap" }}>
                    <button 
                      onClick={() => setSelectedInvoice(inv)}
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
                      Ledger
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: INVOICE LEDGER & PAYMENT DETAILS */}
      {selectedInvoice && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setSelectedInvoice(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: "11px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "#A3FF00", padding: "3px 8px", borderRadius: "4px" }}>
              RECEIVABLES LEDGER
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0E3E2B", margin: "8px 0 2px" }}>
              {selectedInvoice.invoiceNo}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 20px" }}>
              Issued to {selectedInvoice.distributorName} ({selectedInvoice.region} Territory)
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "16px", backgroundColor: "#F8FAF8", borderRadius: "12px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase", fontWeight: 600 }}>Invoice Total</span>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{selectedInvoice.amount}</p>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase", fontWeight: 600 }}>Aging Bucket</span>
                <p style={{ fontSize: "14px", fontWeight: 700, color: selectedInvoice.agingDays > 30 ? "#DC2626" : "#D97706", margin: "2px 0 0" }}>{selectedInvoice.agingBucket}</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>Date of Issue:</span>
                <strong style={{ color: "#0E3E2B" }}>{selectedInvoice.issuedDate}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>Payment Due Date:</span>
                <strong style={{ color: "#0E3E2B" }}>{selectedInvoice.dueDate}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>FMCG Dispatch Hold Status:</span>
                <strong style={{ color: selectedInvoice.status === "Credit Hold" ? "#DC2626" : "#16A34A" }}>
                  {selectedInvoice.status === "Credit Hold" ? "Active Hold (Orders Blocked)" : "Cleared for Dispatch"}
                </strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
              >
                Close
              </button>
              {selectedInvoice.status !== "Settled" && (
                <button
                  type="button"
                  onClick={() => handleSettleInvoice(selectedInvoice.id)}
                  style={{ height: "42px", padding: "0 22px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                  className="hover:bg-[#08281B]"
                >
                  <CheckCircle2 size={16} color="#A3FF00" />
                  Record Full Settlement
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SEND BULK REMINDERS */}
      {isBulkReminderOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "480px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsBulkReminderOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>
              Send Payment Reminders
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Automated notifications to dealers with overdue balances across Nigeria.
            </p>

            <div style={{ backgroundColor: "#F8FAF8", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>Overdue Accounts:</span>
                <strong style={{ color: "#DC2626" }}>4 Distributors</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "rgba(14,62,43,0.7)" }}>Total Receivables at Risk:</span>
                <strong style={{ color: "#0E3E2B" }}>₦12,390,000</strong>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B" }}>Broadcast Channels</span>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#0E3E2B", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px" }} />
                <span>WhatsApp Business Automated Statement & PayLink</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#0E3E2B", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px" }} />
                <span>SMS Alert to Registered Dealer Phone Numbers</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#0E3E2B", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ width: "16px", height: "16px" }} />
                <span>Official PDF Statement by Email</span>
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setIsBulkReminderOpen(false)}
                style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDispatchReminders}
                style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                className="hover:bg-[#08281B]"
              >
                <Send size={15} />
                Send Broadcast Reminders
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
