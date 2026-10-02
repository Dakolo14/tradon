"use client";

import React, { useState } from "react";
import { 
  BarChart2, 
  TrendingUp, 
  Download, 
  Calendar, 
  FileSpreadsheet, 
  PieChart, 
  ChevronRight, 
  Layers, 
  Clock, 
  DollarSign,
  Printer,
  Sparkles,
  CheckCircle2,
  X,
  FileText,
  Mail,
  Check
} from "lucide-react";

interface ReportTemplate {
  id: string;
  title: string;
  category: "Revenue & Gross Margin" | "Territory & Regional Volume" | "Receivables & Credit Risk" | "Tax & Audit Compliance";
  description: string;
  frequency: "Daily Automail" | "Weekly on Monday" | "Monthly Closing" | "Quarterly Board Pack";
  lastGenerated: string;
  format: "Excel / CSV" | "PDF Presentation" | "Direct Ledger Sync";
}

const initialReports: ReportTemplate[] = [
  {
    id: "rep-1",
    title: "Executive Revenue & Gross Margins Breakdown",
    category: "Revenue & Gross Margin",
    description: "Net carton sales, promotional discounts applied, cost-of-goods-sold (COGS), and contribution margin per product category.",
    frequency: "Monthly Closing",
    lastGenerated: "Sep 01, 2026 (Aug Period)",
    format: "PDF Presentation",
  },
  {
    id: "rep-2",
    title: "Regional Distributor GMV & Order Velocity",
    category: "Territory & Regional Volume",
    description: "Turnover comparisons across Lagos, Northern Depots, South-East, and Western states with distributor tier migration stats.",
    frequency: "Weekly on Monday",
    lastGenerated: "Today @ 06:00 AM",
    format: "Excel / CSV",
  },
  {
    id: "rep-3",
    title: "Receivables Aging & Days Sales Outstanding (DSO)",
    category: "Receivables & Credit Risk",
    description: "Detailed distributor balance aging buckets, credit utilization ceilings, and overdue bad-debt risk assessment.",
    frequency: "Weekly on Monday",
    lastGenerated: "Sep 04, 2026",
    format: "Excel / CSV",
  },
  {
    id: "rep-4",
    title: "Trade Rebates & Loyalty System Payout Audit",
    category: "Revenue & Gross Margin",
    description: "Volume rebate deductions, cash-back vouchers, and distributor credit-note accruals for tax reconciliation.",
    frequency: "Quarterly Board Pack",
    lastGenerated: "Jul 05, 2026 (Q2 Close)",
    format: "PDF Presentation",
  },
  {
    id: "rep-5",
    title: "Withholding Tax (WHT) & VAT Monthly Ledger",
    category: "Tax & Audit Compliance",
    description: "Export-ready tax schedules compliant with Federal Inland Revenue Service (FIRS) e-invoicing standards.",
    frequency: "Monthly Closing",
    lastGenerated: "Aug 21, 2026",
    format: "Excel / CSV",
  },
];

export default function FinancialReportsPage() {
  const [reports, setReports] = useState<ReportTemplate[]>(initialReports);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCustomStatementModalOpen, setIsCustomStatementModalOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState<ReportTemplate | null>(null);
  const [downloadReport, setDownloadReport] = useState<ReportTemplate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom statement form
  const [statementTitle, setStatementTitle] = useState("Q3 Preliminary Executive Flash Report");
  const [statementPeriod, setStatementPeriod] = useState("Aug 01, 2026 - Aug 31, 2026");
  const [statementFormat, setStatementFormat] = useState("PDF Presentation");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredReports = reports.filter(r => {
    if (selectedCategory === "All") return true;
    return r.category.includes(selectedCategory);
  });

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: ReportTemplate = {
      id: `rep-${Date.now()}`,
      title: statementTitle,
      category: "Revenue & Gross Margin",
      description: `Custom generated audit schedule covering ${statementPeriod}.`,
      frequency: "Daily Automail",
      lastGenerated: "Just now",
      format: statementFormat as any,
    };
    setReports([newEntry, ...reports]);
    setIsCustomStatementModalOpen(false);
    showToast(`Custom statement "${statementTitle}" generated and added to library!`);
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Financial Reports & Analytics</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Audit-ready financial statements, gross margin intelligence, tax schedules, and automated board pack exports.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
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
            <Clock size={14} />
            Scheduled Deliveries
          </button>
          <button 
            onClick={() => setIsCustomStatementModalOpen(true)}
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
            <Download size={16} />
            Generate Custom Statement
          </button>
        </div>
      </div>

      {/* Highlights Bar */}
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
        <div style={{ position: "absolute", right: "-30px", top: "-30px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(163,255,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(163,255,0,0.15)", color: "#A3FF00", padding: "4px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: 700, marginBottom: "8px" }}>
            <Sparkles size={12} />
            AUTO-COMPILED STATEMENTS
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0, marginBottom: "6px" }}>August 2026 Monthly Closing Pack Ready</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: "560px", lineHeight: "1.5" }}>
            Includes ₦284M total collections reconciliation, carton GMV velocity, DSO aging schedules, and VAT schedules verified against NIBSS bank settlement feeds.
          </p>
        </div>

        <button 
          onClick={() => {
            showToast("August 2026 Closing Pack PDF downloaded!");
          }}
          style={{ 
            height: "40px", 
            padding: "0 22px", 
            backgroundColor: "#A3FF00", 
            border: "none", 
            borderRadius: "9999px", 
            fontSize: "13px", 
            fontWeight: 700, 
            color: "#0E3E2B", 
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          className="hover:bg-[#92E600]"
        >
          <Download size={14} color="#0E3E2B" />
          Download Complete Pack (PDF)
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "12px" }}>
        {["All", "Revenue & Margins", "Territory Volume", "Receivables & Credit", "Tax & Audit"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? "All" : cat.split(" ")[0])}
            style={{
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid",
              borderColor: selectedCategory === (cat === "All" ? "All" : cat.split(" ")[0]) ? "#0E3E2B" : "rgba(14,62,43,0.15)",
              backgroundColor: selectedCategory === (cat === "All" ? "All" : cat.split(" ")[0]) ? "#0E3E2B" : "transparent",
              color: selectedCategory === (cat === "All" ? "All" : cat.split(" ")[0]) ? "#FFFFFF" : "#0E3E2B",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
            className="transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
        {filteredReports.map((report) => (
          <div
            key={report.id}
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
            className="hover:shadow-md transition-shadow"
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "#F0F5ED", padding: "3px 8px", borderRadius: "9999px" }}>
                {report.category}
              </span>
              <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)", fontWeight: 500 }}>
                {report.format}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>
                {report.title}
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, lineHeight: "1.5" }}>
                {report.description}
              </p>
            </div>

            <div style={{ padding: "10px 14px", backgroundColor: "#F8FAF8", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
              <span style={{ color: "rgba(14,62,43,0.5)" }}>Schedule: <strong style={{ color: "#0E3E2B" }}>{report.frequency}</strong></span>
              <span style={{ color: "rgba(14,62,43,0.5)" }}>Last run: <strong style={{ color: "#0E3E2B" }}>{report.lastGenerated}</strong></span>
            </div>

            <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(14,62,43,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button 
                onClick={() => setPreviewReport(report)}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "#0E3E2B", 
                  fontSize: "13px", 
                  fontWeight: 600, 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "4px",
                  padding: 0 
                }} 
                className="hover:underline"
              >
                <Printer size={14} />
                Preview in Dashboard
              </button>

              <button 
                onClick={() => setDownloadReport(report)}
                style={{ 
                  height: "36px", 
                  padding: "0 16px", 
                  backgroundColor: "#0E3E2B", 
                  border: "none", 
                  borderRadius: "9999px", 
                  fontSize: "12px", 
                  fontWeight: 600, 
                  color: "#FFFFFF", 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                className="hover:bg-[#08281B]"
              >
                <Download size={13} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Scheduled Deliveries */}
      {isScheduleModalOpen && (
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
                <Clock size={20} color="#0E3E2B" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Automated Schedule Configuration
                </h3>
              </div>
              <button 
                onClick={() => setIsScheduleModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Configure executive email recipients and timing for automatically compiled financial packs:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Delivery Frequency
                </label>
                <select
                  defaultValue="Weekly Monday 06:00 AM"
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Daily 08:00 AM">Daily Morning Flash (08:00 AM)</option>
                  <option value="Weekly Monday 06:00 AM">Weekly Executive Brief (Monday 06:00 AM)</option>
                  <option value="Monthly 1st of month">Monthly Closing Pack (1st of Month)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Executive Recipients (comma separated)
                </label>
                <input
                  type="text"
                  defaultValue="cfo@chigroup.com, md@chigroup.com, audit@chigroup.com"
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsScheduleModalOpen(false);
                    showToast("Automated email dispatch schedule saved!");
                  }}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Generate Custom Statement */}
      {isCustomStatementModalOpen && (
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
                Generate Custom Statement
              </h3>
              <button 
                onClick={() => setIsCustomStatementModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGenerateCustom} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Statement Title
                </label>
                <input
                  type="text"
                  required
                  value={statementTitle}
                  onChange={(e) => setStatementTitle(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Accounting Period
                </label>
                <input
                  type="text"
                  required
                  value={statementPeriod}
                  onChange={(e) => setStatementPeriod(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Export Format
                </label>
                <select
                  value={statementFormat}
                  onChange={(e) => setStatementFormat(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none", backgroundColor: "#FFFFFF" }}
                >
                  <option value="PDF Presentation">PDF Board Pack (Presentation format)</option>
                  <option value="Excel / CSV">Excel Spreadsheet (.xlsx)</option>
                  <option value="Direct Ledger Sync">NIBSS Automated Tax Schedule</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsCustomStatementModalOpen(false)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Compile & Export
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Preview in Dashboard */}
      {previewReport && (
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
            maxWidth: "560px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#16A34A", textTransform: "uppercase" }}>STATEMENT PREVIEW</span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{previewReport.title}</h3>
              </div>
              <button 
                onClick={() => setPreviewReport(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "14px", backgroundColor: "#F0F5ED", borderRadius: "10px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Period GMV Collections</span>
                  <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: 700, color: "#0E3E2B" }}>₦284,500,000</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Gross Margin %</span>
                  <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: 700, color: "#16A34A" }}>31.8% Net</p>
                </div>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <p style={{ margin: 0, fontWeight: 600, color: "#0E3E2B" }}>Executive Notes</p>
                <p style={{ margin: "4px 0 0", color: "rgba(14,62,43,0.7)", lineHeight: "1.5" }}>
                  {previewReport.description}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  window.print();
                  setPreviewReport(null);
                  showToast("Statement sent to printer");
                }}
                style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              >
                Print Statement
              </button>
              <button
                onClick={() => {
                  setPreviewReport(null);
                  showToast(`Downloaded ${previewReport.title}`);
                }}
                style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Download Report Options */}
      {downloadReport && (
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
            maxWidth: "440px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Download Statement
              </h3>
              <button 
                onClick={() => setDownloadReport(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Choose format for <strong>{downloadReport.title}</strong>:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setDownloadReport(null);
                  showToast(`Downloaded ${downloadReport.title} as PDF`);
                }}
                style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", backgroundColor: "#FFFFFF", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>PDF Document (.pdf)</span>
                <Download size={16} />
              </button>
              <button
                onClick={() => {
                  setDownloadReport(null);
                  showToast(`Downloaded ${downloadReport.title} as Excel`);
                }}
                style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", backgroundColor: "#FFFFFF", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>Excel Spreadsheet (.xlsx)</span>
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
