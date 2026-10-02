"use client";

import React, { useState } from "react";
import {
  Headphones,
  LifeBuoy,
  MessageSquare,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Send,
  X,
  BookOpen,
  Activity,
  Server,
  Calendar,
  Smartphone,
  Check,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  category: "Field App & GPS" | "Distributor Credit" | "Depot & Inventory" | "Payments & Billing" | "General";
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
  lastUpdated: string;
  assignee: string;
  description: string;
}

interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  views: number;
}

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "TK-9042",
    title: "Kano Central Depot GPS Geofence sync delay for 3 delivery trucks",
    category: "Field App & GPS",
    priority: "Urgent",
    status: "In Progress",
    createdAt: "Today, 10:14 AM",
    lastUpdated: "18m ago",
    assignee: "Emeka Nwankwo (Senior Support Lead)",
    description: "Field drivers at Kano Depot reported delivery completions not syncing with centralized dispatch ERP due to intermittent network switchover.",
  },
  {
    id: "2",
    ticketNumber: "TK-8831",
    title: "Request for bulk promotional tier import format (.XLSX template)",
    category: "Distributor Credit",
    priority: "Medium",
    status: "Resolved",
    createdAt: "Yesterday, 03:20 PM",
    lastUpdated: "Yesterday, 05:45 PM",
    assignee: "Fatima Aliyu (Integration Engineer)",
    description: "Finance team needed clarification on column headers for Tier-1 Gold volume rebate formulas when migrating from Excel.",
  },
  {
    id: "3",
    ticketNumber: "TK-8710",
    title: "Virtual account reconciliation webhook verification for Alaba Mega Depot",
    category: "Payments & Billing",
    priority: "High",
    status: "In Progress",
    createdAt: "Sep 04, 09:30 AM",
    lastUpdated: "2h ago",
    assignee: "Tunde Oladipo (Fintech API Support)",
    description: "₦8.4M wholesale bank transfer cleared at central bank but required manual ledger verification on the TRADON dashboard.",
  },
  {
    id: "4",
    ticketNumber: "TK-8605",
    title: "Bluetooth mobile thermal printer pairing guidelines for Field Reps",
    category: "Field App & GPS",
    priority: "Low",
    status: "Resolved",
    createdAt: "Sep 02, 11:00 AM",
    lastUpdated: "Sep 02, 02:15 PM",
    assignee: "Chioma Eze (Field Support Lead)",
    description: "Provided instructions and driver update package for Sunmi V2 POS printers used by Ikeja route representatives.",
  },
];

const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "kb-1",
    title: "How to configure offline GPS check-ins for field reps in rural zones",
    category: "Field Workforce",
    readTime: "4 min read",
    summary: "Set up offline queue caching so field representatives can log store visits, stock counts, and orders without mobile internet.",
    views: 1240,
  },
  {
    id: "kb-2",
    title: "Reconciling bulk distributor bank transfers via Virtual Account webhooks",
    category: "Finance & Settlements",
    readTime: "6 min read",
    summary: "Step-by-step guide to instant payment matching, partial payment allocations, and handling reversal dispute holds.",
    views: 980,
  },
  {
    id: "kb-3",
    title: "Setting up volume-tier promotional deals and automated cart discounts",
    category: "Promotions & Pricing",
    readTime: "5 min read",
    summary: "Configure smart pricing guardrails, minimum carton thresholds, and SKU combo deals that apply automatically at wholesale checkout.",
    views: 1530,
  },
  {
    id: "kb-4",
    title: "Managing stock rotation (FIFO) and batch expiry alerts across multi-state depots",
    category: "Warehousing & Inventory",
    readTime: "7 min read",
    summary: "Ensure older juice and dairy production batches are dispatched first to prevent warehouse obsolescence and shelf expiry write-offs.",
    views: 890,
  },
  {
    id: "kb-5",
    title: "Assigning Permanent Journey Plans (PJP) and beat territories to new Sales Reps",
    category: "Field Workforce",
    readTime: "3 min read",
    summary: "Map weekly retailer visits by geographical proximity to minimize transit fuel costs and increase daily outlet coverage.",
    views: 2100,
  },
  {
    id: "kb-6",
    title: "Exporting audited P&L ledgers and distributor statements for financial audit",
    category: "Compliance & Reporting",
    readTime: "4 min read",
    summary: "Download tax-compliant CSV, PDF, and Excel transaction reports for external audit firms and corporate board reviews.",
    views: 740,
  },
];

export default function SupportPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"tickets" | "knowledge" | "system" | "training">("tickets");
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [ticketFilter, setTicketFilter] = useState<"All" | "Open" | "In Progress" | "Resolved">("All");
  const [ticketSearch, setTicketSearch] = useState("");
  const [kbSearch, setKbSearch] = useState("");

  // New Ticket Modal State
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<SupportTicket["category"]>("Field App & GPS");
  const [newPriority, setNewPriority] = useState<SupportTicket["priority"]>("Medium");
  const [newDescription, setNewDescription] = useState("");
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  // Detail Modal State
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTicket(true);

    setTimeout(() => {
      const createdTicket: SupportTicket = {
        id: String(Date.now()),
        ticketNumber: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
        title: newTitle,
        category: newCategory,
        priority: newPriority,
        status: "Open",
        createdAt: "Just now",
        lastUpdated: "Just now",
        assignee: "Assigned to TRADON Enterprise Queue",
        description: newDescription,
      };

      setTickets([createdTicket, ...tickets]);
      setIsSubmittingTicket(false);
      setIsNewTicketModalOpen(false);
      setNewTitle("");
      setNewDescription("");
      showToast(`Support ticket ${createdTicket.ticketNumber} created successfully! Our team will respond within 15 minutes.`);
    }, 800);
  };

  // Filtered tickets
  const filteredTickets = tickets.filter((t) => {
    const matchesFilter = ticketFilter === "All" || t.status === ticketFilter;
    const q = ticketSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      t.ticketNumber.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Filtered knowledge articles
  const filteredArticles = KNOWLEDGE_ARTICLES.filter((a) => {
    const q = kbSearch.toLowerCase().trim();
    return (
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        position: "relative",
        paddingBottom: "40px",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
              Helpdesk & Enterprise Support
            </h1>
            <span
              style={{
                backgroundColor: "rgba(16,185,129,0.12)",
                color: "#059669",
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              SYSTEMS HEALTHY (99.98%)
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0 }}>
            Dedicated mission-critical support for {user?.businessName || "Chi Limited"}. Access live engineers, dispatch emergency hotlines, and browse FMCG operational runbooks.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/2348000000000?text=Hello%20TRADON%20Enterprise%20Support%20Team%2C%20I%20need%20urgent%20dispatch%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: "42px",
              padding: "0 18px",
              backgroundColor: "#25D366",
              border: "none",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(37,211,102,0.25)",
            }}
            className="hover:opacity-95 transition-opacity"
          >
            <PhoneCall size={15} />
            <span>Emergency WhatsApp Hotline</span>
          </a>

          <button
            onClick={() => setIsNewTicketModalOpen(true)}
            style={{
              height: "42px",
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
              gap: "8px",
              boxShadow: "0 4px 12px rgba(14,62,43,0.2)",
            }}
            className="hover:bg-[#08281B] transition-colors"
          >
            <Plus size={16} />
            <span>Open Support Ticket</span>
          </button>
        </div>
      </div>

      {/* SLA & Dedicated Account Lead Banner */}
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
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-40px",
            top: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(163,255,0,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "600px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(163,255,0,0.15)",
              color: "#A3FF00",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            <ShieldCheck size={13} />
            ENTERPRISE GOLD SLA ACTIVE (CHI LIMITED)
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px" }}>
            Dedicated Technical Account Lead: Emeka Nwankwo
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5 }}>
            Your account is assigned senior technical staff for real-time field escalation, multi-million Naira credit batch approvals, and warehouse depot sync. Direct response time is under <strong>15 minutes</strong>.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "12px 18px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
              Avg Response Time
            </span>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#A3FF00", margin: "2px 0 0" }}>8.4 Mins</p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "12px 18px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
              Resolution Rate
            </span>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", margin: "2px 0 0" }}>99.2%</p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "12px 18px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
              Coverage Window
            </span>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#A3FF00", margin: "2px 0 0" }}>24/7 Priority</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          borderBottom: "1px solid rgba(14,62,43,0.08)",
          paddingBottom: "12px",
          overflowX: "auto",
        }}
      >
        <button
          onClick={() => setActiveTab("tickets")}
          style={{
            background: "none",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === "tickets" ? 700 : 500,
            color: activeTab === "tickets" ? "#0E3E2B" : "rgba(14,62,43,0.6)",
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
        >
          <MessageSquare size={16} />
          <span>Support Tickets ({tickets.length})</span>
          {activeTab === "tickets" && (
            <div
              style={{
                position: "absolute",
                bottom: "-13px",
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "#0E3E2B",
              }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("knowledge")}
          style={{
            background: "none",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === "knowledge" ? 700 : 500,
            color: activeTab === "knowledge" ? "#0E3E2B" : "rgba(14,62,43,0.6)",
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
        >
          <BookOpen size={16} />
          <span>FMCG Knowledge Base & Runbooks</span>
          {activeTab === "knowledge" && (
            <div
              style={{
                position: "absolute",
                bottom: "-13px",
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "#0E3E2B",
              }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("system")}
          style={{
            background: "none",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === "system" ? 700 : 500,
            color: activeTab === "system" ? "#0E3E2B" : "rgba(14,62,43,0.6)",
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
        >
          <Activity size={16} />
          <span>Live Infrastructure Status</span>
          {activeTab === "system" && (
            <div
              style={{
                position: "absolute",
                bottom: "-13px",
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "#0E3E2B",
              }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("training")}
          style={{
            background: "none",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === "training" ? 700 : 500,
            color: activeTab === "training" ? "#0E3E2B" : "rgba(14,62,43,0.6)",
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
        >
          <Calendar size={16} />
          <span>Book Staff Onboarding & Training</span>
          {activeTab === "training" && (
            <div
              style={{
                position: "absolute",
                bottom: "-13px",
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "#0E3E2B",
              }}
            />
          )}
        </button>
      </div>

      {/* TAB 1: SUPPORT TICKETS */}
      {activeTab === "tickets" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Controls Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Search Input */}
            <div style={{ position: "relative", flexGrow: 1, maxWidth: "360px" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(14,62,43,0.4)",
                }}
              />
              <input
                type="text"
                placeholder="Search ticket number, topic, assignee..."
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  paddingLeft: "38px",
                  paddingRight: "14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(14,62,43,0.12)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "13px",
                  color: "#0E3E2B",
                  outline: "none",
                }}
              />
            </div>

            {/* Status Pills Filter */}
            <div style={{ display: "flex", gap: "6px", overflowX: "auto" }}>
              {(["All", "Open", "In Progress", "Resolved"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTicketFilter(filter)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: ticketFilter === filter ? "#0E3E2B" : "rgba(14,62,43,0.05)",
                    color: ticketFilter === filter ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Tickets Table */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid rgba(14,62,43,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "960px", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", whiteSpace: "nowrap" }}>
                    <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>
                      Ticket ID
                    </th>
                    <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>
                      Subject & Description
                    </th>
                    <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>
                      Category
                    </th>
                    <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>
                      Priority
                    </th>
                    <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>
                      Status
                    </th>
                    <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>
                      Assignee
                    </th>
                    <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket, idx) => (
                    <tr
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      style={{
                        borderBottom: idx !== filteredTickets.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none",
                        cursor: "pointer",
                      }}
                      className="hover:bg-black/5 transition-colors"
                    >
                      <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#0E3E2B",
                            fontFamily: "monospace",
                            backgroundColor: "rgba(14,62,43,0.06)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          {ticket.ticketNumber}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", maxWidth: "340px" }}>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B", margin: 0, lineHeight: 1.3 }}>
                          {ticket.title}
                        </p>
                        <p
                          style={{
                            fontSize: "11.5px",
                            color: "rgba(14,62,43,0.55)",
                            margin: "3px 0 0",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {ticket.description}
                        </p>
                      </td>
                      <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            fontSize: "11.5px",
                            fontWeight: 600,
                            color: "rgba(14,62,43,0.75)",
                            backgroundColor: "#F8FAF8",
                            padding: "3px 10px",
                            borderRadius: "6px",
                            border: "1px solid rgba(14,62,43,0.08)",
                          }}
                        >
                          {ticket.category}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            backgroundColor:
                              ticket.priority === "Urgent"
                                ? "#FEF2F2"
                                : ticket.priority === "High"
                                ? "#FFFBEB"
                                : "rgba(14,62,43,0.05)",
                            color:
                              ticket.priority === "Urgent"
                                ? "#DC2626"
                                : ticket.priority === "High"
                                ? "#D97706"
                                : "#0E3E2B",
                          }}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11.5px",
                            fontWeight: 600,
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            backgroundColor:
                              ticket.status === "Resolved"
                                ? "#F0FDF4"
                                : ticket.status === "In Progress"
                                ? "#EFF6FF"
                                : "#FFFBEB",
                            color:
                              ticket.status === "Resolved"
                                ? "#16A34A"
                                : ticket.status === "In Progress"
                                ? "#2563EB"
                                : "#D97706",
                          }}
                        >
                          {ticket.status === "Resolved" ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <Clock size={12} />
                          )}
                          {ticket.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(14,62,43,0.7)", whiteSpace: "nowrap" }}>
                        {ticket.assignee}
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "11.5px", color: "rgba(14,62,43,0.5)", whiteSpace: "nowrap" }}>
                        {ticket.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FMCG KNOWLEDGE BASE & RUNBOOKS */}
      {activeTab === "knowledge" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* KB Search bar */}
          <div style={{ maxWidth: "560px", position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(14,62,43,0.4)",
              }}
            />
            <input
              type="text"
              placeholder="Search guides: 'GPS offline', 'virtual account', 'safety stock'..."
              value={kbSearch}
              onChange={(e) => setKbSearch(e.target.value)}
              style={{
                width: "100%",
                height: "46px",
                paddingLeft: "46px",
                paddingRight: "16px",
                borderRadius: "12px",
                border: "1px solid rgba(14,62,43,0.15)",
                fontSize: "14px",
                color: "#0E3E2B",
                backgroundColor: "#FFFFFF",
                outline: "none",
              }}
            />
          </div>

          {/* Grid of articles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid rgba(14,62,43,0.08)",
                  padding: "22px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                  transition: "all 0.15s ease",
                }}
                className="hover:border-[#0E3E2B]/30 hover:shadow-md"
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#0E3E2B",
                        backgroundColor: "rgba(14,62,43,0.05)",
                        padding: "2px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {article.category}
                    </span>
                    <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>
                      {article.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0E3E2B", margin: "0 0 6px", lineHeight: 1.35 }}>
                    {article.title}
                  </h3>

                  <p style={{ fontSize: "12.5px", color: "rgba(14,62,43,0.65)", margin: 0, lineHeight: 1.5 }}>
                    {article.summary}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(14,62,43,0.06)",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>
                    {article.views.toLocaleString()} reads
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0E3E2B",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>Read Guide</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE INFRASTRUCTURE STATUS */}
      {activeTab === "system" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid rgba(14,62,43,0.08)",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  TRADON Enterprise Cloud Health
                </h3>
                <p style={{ fontSize: "12.5px", color: "rgba(14,62,43,0.6)", margin: "3px 0 0" }}>
                  Real-time microservice status across Lagos AWS Cluster, NIBSS settlement pipe, and Field GPS relays.
                </p>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#16A34A", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16A34A" }} />
                All Systems Operational
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Field Sales App & Real-Time GPS Tracking Engine", status: "100% Operational", latency: "38ms", region: "West Africa (Lagos)" },
                { name: "Master Product Catalog & Dynamic Pricing Microservice", status: "100% Operational", latency: "24ms", region: "West Africa (Lagos)" },
                { name: "Distributor Virtual Account & Bank Settlement Webhooks", status: "100% Operational", latency: "112ms", region: "NIBSS / Instant Rail" },
                { name: "Warehouse Depot Inventory & Safety Stock Batch Dispatch", status: "100% Operational", latency: "31ms", region: "West Africa (Lagos)" },
                { name: "SMS / WhatsApp Automated Order Notification Gateway", status: "100% Operational", latency: "95ms", region: "Telecom Multi-carrier" },
                { name: "Bluetooth Mobile Thermal Printer Synchronization Protocol", status: "100% Operational", latency: "14ms", region: "Local Device Mesh" },
              ].map((service, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "10px",
                    backgroundColor: "#FAFCF9",
                    border: "1px solid rgba(14,62,43,0.06)",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Server size={18} style={{ color: "#0E3E2B", opacity: 0.7 }} />
                    <div>
                      <p style={{ fontSize: "13.5px", fontWeight: 600, color: "#0E3E2B", margin: 0 }}>
                        {service.name}
                      </p>
                      <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", margin: "2px 0 0" }}>
                        {service.region} · Latency: {service.latency}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      backgroundColor: "#F0FDF4",
                      color: "#16A34A",
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(22,163,74,0.2)",
                    }}
                  >
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BOOK STAFF ONBOARDING & TRAINING */}
      {activeTab === "training" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid rgba(14,62,43,0.08)",
              padding: "32px",
              maxWidth: "780px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#0E3E2B",
                  color: "#A3FF00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Calendar size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Schedule FMCG Team Onboarding
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "2px 0 0" }}>
                  Complimentary 1-on-1 operational training with TRADON Solution Engineers for your regional managers, accountants, and field supervisors.
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "24px" }}>
              {[
                { title: "Field Workforce Masterclass", duration: "45 mins", focus: "GPS Tracking, Permanent Journey Plans, offline order taking on mobile." },
                { title: "Wholesale & Credit Governance", duration: "60 mins", focus: "Managing revolving credit terms, automated overdue debt locks, and banking webhooks." },
                { title: "Warehouse Depot & Safety Stock", duration: "45 mins", focus: "FIFO dispatch, batch expiry alert thresholds, and multi-depot stock transfers." },
              ].map((session, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(14,62,43,0.12)",
                    backgroundColor: "#FAFCF9",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "rgba(14,62,43,0.06)", padding: "2px 8px", borderRadius: "9999px" }}>
                      {session.duration}
                    </span>
                    <h4 style={{ fontSize: "14.5px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 4px" }}>
                      {session.title}
                    </h4>
                    <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.65)", margin: 0, lineHeight: 1.4 }}>
                      {session.focus}
                    </p>
                  </div>

                  <button
                    onClick={() => showToast(`Training session request sent for ${session.title}. A calendar invite has been dispatched to ${user?.email || "adebayo@chiltd.com"}.`)}
                    style={{
                      width: "100%",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(14,62,43,0.2)",
                      backgroundColor: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0E3E2B",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                    className="hover:bg-[#0E3E2B] hover:text-white transition-colors"
                  >
                    <span>Book Session</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEW SUPPORT TICKET MODAL */}
      {isNewTicketModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(14,62,43,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "560px",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "28px 32px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsNewTicketModalOpen(false)}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(14,62,43,0.4)",
              }}
              className="hover:text-[#0E3E2B]"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#0E3E2B",
                  color: "#A3FF00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Submit Support Ticket
                </h3>
                <p style={{ fontSize: "12.5px", color: "rgba(14,62,43,0.6)", margin: "2px 0 0" }}>
                  Our enterprise response team will attend to your request immediately.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateTicket} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>
                  Issue Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Geofence sync delay at Kano Central Depot"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.15)",
                    outline: "none",
                    fontSize: "13px",
                    color: "#0E3E2B",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(14,62,43,0.15)",
                      outline: "none",
                      fontSize: "13px",
                      color: "#0E3E2B",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <option value="Field App & GPS">Field App & GPS</option>
                    <option value="Distributor Credit">Distributor Credit</option>
                    <option value="Depot & Inventory">Depot & Inventory</option>
                    <option value="Payments & Billing">Payments & Billing</option>
                    <option value="General">General Inquiries</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>
                    Urgency / Severity
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(14,62,43,0.15)",
                      outline: "none",
                      fontSize: "13px",
                      color: "#0E3E2B",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <option value="Low">Low (General guidance)</option>
                    <option value="Medium">Medium (Operational query)</option>
                    <option value="High">High (Impacting deliveries)</option>
                    <option value="Urgent">Urgent (System blocking dispatch)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>
                  Detailed Description & Affected Outlets
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the issue in detail, include outlet names, PO numbers, or specific depot locations..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.15)",
                    outline: "none",
                    fontSize: "13px",
                    color: "#0E3E2B",
                    resize: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px", borderTop: "1px solid rgba(14,62,43,0.08)", paddingTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  style={{
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    backgroundColor: "transparent",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#0E3E2B",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTicket}
                  style={{
                    height: "42px",
                    padding: "0 24px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: "#0E3E2B",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  className="hover:bg-[#08281B]"
                >
                  {isSubmittingTicket ? (
                    <span>Submitting Ticket...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Submit to Enterprise Queue</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW TICKET DETAIL MODAL */}
      {selectedTicket && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(14,62,43,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "540px",
              padding: "28px 32px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedTicket(null)}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(14,62,43,0.4)",
              }}
              className="hover:text-[#0E3E2B]"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  backgroundColor: "rgba(14,62,43,0.06)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  color: "#0E3E2B",
                }}
              >
                {selectedTicket.ticketNumber}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  backgroundColor:
                    selectedTicket.status === "Resolved"
                      ? "#F0FDF4"
                      : "#EFF6FF",
                  color:
                    selectedTicket.status === "Resolved"
                      ? "#16A34A"
                      : "#2563EB",
                }}
              >
                {selectedTicket.status}
              </span>
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0E3E2B", margin: "0 0 8px" }}>
              {selectedTicket.title}
            </h3>

            <div
              style={{
                backgroundColor: "#F8FAF8",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(14,62,43,0.08)",
                marginBottom: "16px",
              }}
            >
              <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.8)", margin: 0, lineHeight: 1.5 }}>
                {selectedTicket.description}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px", marginBottom: "20px" }}>
              <div>
                <span style={{ color: "rgba(14,62,43,0.5)" }}>Category:</span>
                <p style={{ fontWeight: 600, color: "#0E3E2B", margin: "2px 0 0" }}>{selectedTicket.category}</p>
              </div>
              <div>
                <span style={{ color: "rgba(14,62,43,0.5)" }}>Priority:</span>
                <p style={{ fontWeight: 600, color: "#0E3E2B", margin: "2px 0 0" }}>{selectedTicket.priority}</p>
              </div>
              <div>
                <span style={{ color: "rgba(14,62,43,0.5)" }}>Created:</span>
                <p style={{ fontWeight: 600, color: "#0E3E2B", margin: "2px 0 0" }}>{selectedTicket.createdAt}</p>
              </div>
              <div>
                <span style={{ color: "rgba(14,62,43,0.5)" }}>Lead Engineer:</span>
                <p style={{ fontWeight: 600, color: "#0E3E2B", margin: "2px 0 0" }}>{selectedTicket.assignee}</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedTicket(null)}
                style={{
                  height: "40px",
                  padding: "0 22px",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: "#0E3E2B",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                Close Ticket View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW KNOWLEDGE ARTICLE MODAL */}
      {selectedArticle && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(14,62,43,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px 32px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(14,62,43,0.4)",
              }}
              className="hover:text-[#0E3E2B]"
            >
              <X size={20} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "rgba(14,62,43,0.06)",
                  color: "#0E3E2B",
                  padding: "2px 8px",
                  borderRadius: "6px",
                }}
              >
                {selectedArticle.category}
              </span>
              <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>
                {selectedArticle.readTime}
              </span>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "0 0 12px", lineHeight: 1.35 }}>
              {selectedArticle.title}
            </h3>

            <div style={{ backgroundColor: "#FAFCF9", padding: "16px", borderRadius: "12px", border: "1px solid rgba(14,62,43,0.08)", marginBottom: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B", margin: "0 0 6px" }}>
                Operational Summary:
              </p>
              <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.75)", margin: 0, lineHeight: 1.5 }}>
                {selectedArticle.summary}
              </p>
            </div>

            <div style={{ fontSize: "13px", color: "#0E3E2B", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ margin: 0 }}>
                1. <strong>Verification:</strong> Ensure the user role possesses operational privileges before executing batch mutations.
              </p>
              <p style={{ margin: 0 }}>
                2. <strong>Data Safety:</strong> All updates trigger automated audit log snapshots stored with immutable hash verification.
              </p>
              <p style={{ margin: 0 }}>
                3. <strong>Depot Notification:</strong> State branch managers will receive push notifications upon configuration activation.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  height: "40px",
                  padding: "0 22px",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: "#0E3E2B",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 1000,
            backgroundColor: "#0E3E2B",
            color: "#FFFFFF",
            padding: "14px 22px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(14,62,43,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            fontWeight: 600,
            animation: "slideUp 0.2s ease-out",
          }}
        >
          <CheckCircle2 size={16} color="#A3FF00" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
