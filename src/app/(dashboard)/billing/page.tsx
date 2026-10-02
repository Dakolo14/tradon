"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Plus,
  CheckCircle2,
  X,
  Sparkles,
  Check,
  ShieldCheck,
  Calendar,
  Building2,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { useAppearance } from "@/context/AppearanceContext";

interface Feature {
  name: string;
  starter: boolean;
  pro: boolean;
  enterprise: boolean;
}

const ALL_FEATURES: Feature[] = [
  { name: "Centralized Workspace", starter: true, pro: true, enterprise: true },
  { name: "Task Management", starter: true, pro: true, enterprise: true },
  { name: "Secure File Sharing (up to 5GB)", starter: true, pro: true, enterprise: true },
  { name: "Built-In Chat", starter: true, pro: true, enterprise: true },
  { name: "Analytics Dashboard", starter: false, pro: true, enterprise: true },
  { name: "Real-Time Collaboration", starter: false, pro: true, enterprise: true },
  { name: "Seamless Integrations", starter: false, pro: true, enterprise: true },
  { name: "Priority Support", starter: false, pro: false, enterprise: true },
];

interface PlanTier {
  id: "starter" | "pro" | "enterprise";
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
}

const PRICING_TIERS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For growing brands entering distribution.",
    monthlyPrice: 300,
    annualPrice: 240,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For scaling brands with large distributor networks.",
    monthlyPrice: 600,
    annualPrice: 480,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Tailored solutions for large-scale businesses.",
    monthlyPrice: 1250,
    annualPrice: 1000,
    popular: false,
  },
];

interface Invoice {
  id: string;
  number: string;
  date: string;
  period: string;
  amount: number;
  status: "Paid" | "Processing";
  planName: string;
}

const initialInvoices: Invoice[] = [
  {
    id: "inv-1",
    number: "TRD-INV-2026-089",
    date: "Sep 1, 2026",
    period: "Sep 1 - Sep 30, 2026",
    amount: 600,
    status: "Paid",
    planName: "Pro Plan (Monthly Subscription)",
  },
  {
    id: "inv-2",
    number: "TRD-INV-2026-074",
    date: "Aug 1, 2026",
    period: "Aug 1 - Aug 31, 2026",
    amount: 600,
    status: "Paid",
    planName: "Pro Plan (Monthly Subscription)",
  },
  {
    id: "inv-3",
    number: "TRD-INV-2026-051",
    date: "Jul 1, 2026",
    period: "Jul 1 - Jul 31, 2026",
    amount: 600,
    status: "Paid",
    planName: "Pro Plan (Monthly Subscription)",
  },
  {
    id: "inv-4",
    number: "TRD-INV-2026-038",
    date: "Jun 1, 2026",
    period: "Jun 1 - Jun 30, 2026",
    amount: 600,
    status: "Paid",
    planName: "Pro Plan (Monthly Subscription)",
  },
];

interface PaymentMethod {
  id: string;
  brand: "Mastercard" | "Visa";
  last4: string;
  expiry: string;
  isDefault: boolean;
  bankName: string;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    brand: "Mastercard",
    last4: "4242",
    expiry: "08/29",
    isDefault: true,
    bankName: "Corporate Zenith Bank",
  },
  {
    id: "pm-2",
    brand: "Visa",
    last4: "8891",
    expiry: "11/27",
    isDefault: false,
    bankName: "Commercial Access Bank",
  },
];

export default function BillingPricingPage() {
  const { tokens, config, accentData } = useAppearance();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState<"starter" | "pro" | "enterprise">("pro");
  const [currentPlanId, setCurrentPlanId] = useState<"starter" | "pro" | "enterprise">("pro");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);

  // Modals
  const [showPlanConfirmModal, setShowPlanConfirmModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Card Form State
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvv, setNewCardCvv] = useState("");
  const [newCardBank, setNewCardBank] = useState("Corporate Zenith Bank");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isAnnual = billingCycle === "annually";
  const activePlan = PRICING_TIERS.find((p) => p.id === currentPlanId) || PRICING_TIERS[1];
  const pendingPlan = PRICING_TIERS.find((p) => p.id === selectedPlanId) || PRICING_TIERS[1];
  const isDark = config.theme === "dark";

  const handlePlanSelect = (tierId: "starter" | "pro" | "enterprise") => {
    setSelectedPlanId(tierId);
    if (tierId !== currentPlanId) {
      setShowPlanConfirmModal(true);
    }
  };

  const handleConfirmPlanChange = () => {
    setCurrentPlanId(selectedPlanId);
    setShowPlanConfirmModal(false);
    showToast(`Successfully switched to ${pendingPlan.name} Plan! Your billing has been updated.`);
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
    showToast("Default corporate payment method updated.");
  };

  const handleRemovePayment = (id: string) => {
    if (paymentMethods.length <= 1) {
      showToast("You must maintain at least one corporate card on file for billing.");
      return;
    }
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
    showToast("Payment card removed.");
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || newCardNumber.length < 16) {
      showToast("Please enter a valid 16-digit corporate card number.");
      return;
    }
    const brand: "Mastercard" | "Visa" = newCardNumber.startsWith("4") ? "Visa" : "Mastercard";
    const newPm: PaymentMethod = {
      id: `pm-${Date.now()}`,
      brand,
      last4: newCardNumber.slice(-4),
      expiry: newCardExpiry || "12/29",
      isDefault: false,
      bankName: newCardBank,
    };
    setPaymentMethods((prev) => [...prev, newPm]);
    setShowAddCardModal(false);
    setNewCardNumber("");
    setNewCardExpiry("");
    setNewCardCvv("");
    showToast(`New ${brand} corporate card added successfully.`);
  };

  return (
    <div
      style={{
        backgroundColor: tokens.bgPage,
        minHeight: "100%",
        paddingBottom: "80px",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: isDark ? "#1E293B" : "#0E3E2B",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 9999,
            fontSize: "13.5px",
            fontWeight: 600,
            border: `1px solid ${tokens.borderSubtle}`,
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div style={{ maxWidth: "1240px", width: "100%", margin: "0 auto", padding: "28px 20px" }}>
        
        {/* Header Title Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Subscription & Billing
              </h1>
              <span
                style={{
                  backgroundColor: "#D1FAE5",
                  color: "#065F46",
                  border: "1px solid #A7F3D0",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10B981" }} />
                {activePlan.name} Plan • Active
              </span>
            </div>
            <p style={{ fontSize: "14px", color: tokens.textSecondary, margin: 0, fontWeight: 500 }}>
              Manage corporate subscription tiers, company payment methods, and download official tax receipts.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setShowAddCardModal(true)}
              style={{
                backgroundColor: tokens.bgCard,
                border: `1px solid ${tokens.borderSubtle}`,
                color: tokens.textPrimary,
                borderRadius: "9999px",
                padding: "9px 20px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "none",
                transition: "all 0.15s ease",
              }}
            >
              <CreditCard size={15} color={tokens.textSecondary} />
              Add Payment Method
            </button>
            <button
              onClick={() => showToast("Downloading annual billing statement PDF...")}
              style={{
                backgroundColor: isDark ? tokens.bgSubtle : "#0E3E2B",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "9999px",
                padding: "9px 22px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "none",
                transition: "all 0.15s ease",
              }}
            >
              <Download size={15} />
              Download Statement
            </button>
          </div>
        </div>

        {/* Current Subscription Summary Card */}
        <div
          style={{
            backgroundColor: tokens.bgCard,
            border: `1px solid ${tokens.borderSubtle}`,
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "40px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: tokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                CURRENT SUBSCRIPTION
              </span>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  marginTop: "4px",
                }}
              >
                {activePlan.name} Tier
              </div>
              <span style={{ fontSize: "13px", color: tokens.textSecondary, fontWeight: 500 }}>
                ${activePlan.monthlyPrice} / month • Billed {billingCycle}
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: tokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                NEXT RENEWAL DATE
              </span>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  marginTop: "4px",
                }}
              >
                October 1, 2026
              </div>
              <span style={{ fontSize: "13px", color: tokens.textSecondary, fontWeight: 500 }}>
                Auto-renews with Mastercard (•••• 4242)
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: tokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                PRIMARY PAYMENT METHOD
              </span>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  marginTop: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "#0E3E2B",
                    color: "#FFFFFF",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                >
                  MC
                </span>
                Mastercard •••• 4242
              </div>
              <span style={{ fontSize: "13px", color: tokens.textSecondary, fontWeight: 500 }}>
                Corporate Zenith Bank (Exp 08/29)
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: tokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                GOVERNANCE & COMPLIANCE
              </span>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  marginTop: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={18} color="#10B981" />
                Enterprise SLA (99.9% Uptime)
              </div>
              <span style={{ fontSize: "13px", color: tokens.textSecondary, fontWeight: 500 }}>
                Chi Limited Master Workspace
              </span>
            </div>
          </div>
        </div>

        {/* Subscription Plan Management & Capacity Quotas Section */}
        <div
          style={{
            backgroundColor: tokens.bgCard,
            border: `1px solid ${tokens.borderSubtle}`,
            borderRadius: "16px",
            padding: "26px",
            marginBottom: "40px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
              borderBottom: `1px solid ${tokens.borderSubtle}`,
              paddingBottom: "20px",
              marginBottom: "24px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>
                  Active Subscription & Quota Allocation
                </h2>
                <span
                  style={{
                    backgroundColor: "#D1FAE5",
                    color: "#065F46",
                    border: "1px solid #A7F3D0",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "9999px",
                  }}
                >
                  ACTIVE
                </span>
              </div>
              <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, fontWeight: 500 }}>
                You are subscribed to the <strong>{activePlan.name} Plan</strong> (${activePlan.monthlyPrice}/month). Your plan renews on October 1, 2026.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setShowPlanConfirmModal(true)}
                style={{
                  backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "9px 20px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "none",
                }}
              >
                Change Subscription Plan
              </button>
              <a
                href="/#pricing"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: tokens.bgSubtle,
                  color: tokens.textPrimary,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "9999px",
                  padding: "9px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "none",
                }}
              >
                <span>View All Tiers on Pricing</span>
                <ExternalLink size={13} color={tokens.textMuted} />
              </a>
            </div>
          </div>

          {/* 4 Capacity Quota Meters */}
          <div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: tokens.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "block",
                marginBottom: "16px",
              }}
            >
              PLAN CAPACITY & USAGE UTILIZATION
            </span>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              {/* Quota 1 */}
              <div
                style={{
                  backgroundColor: tokens.bgSubtle,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>
                    Verified Distributors
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: tokens.textSecondary }}>
                    60 / 120
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "7px",
                    backgroundColor: tokens.borderSubtle,
                    borderRadius: "9999px",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ width: "50%", height: "100%", backgroundColor: "#10B981", borderRadius: "9999px" }} />
                </div>
                <span style={{ fontSize: "11.5px", color: tokens.textMuted }}>
                  50% of Pro quota utilized
                </span>
              </div>

              {/* Quota 2 */}
              <div
                style={{
                  backgroundColor: tokens.bgSubtle,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>
                    Field Sales Rep Seats
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: tokens.textSecondary }}>
                    42 / 60
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "7px",
                    backgroundColor: tokens.borderSubtle,
                    borderRadius: "9999px",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ width: "70%", height: "100%", backgroundColor: "#3B82F6", borderRadius: "9999px" }} />
                </div>
                <span style={{ fontSize: "11.5px", color: tokens.textMuted }}>
                  18 seats remaining for expansion
                </span>
              </div>

              {/* Quota 3 */}
              <div
                style={{
                  backgroundColor: tokens.bgSubtle,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>
                    Warehouse Depots
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#10B981" }}>
                    4 Connected
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "7px",
                    backgroundColor: tokens.borderSubtle,
                    borderRadius: "9999px",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#10B981", borderRadius: "9999px" }} />
                </div>
                <span style={{ fontSize: "11.5px", color: tokens.textMuted }}>
                  Unlimited depot hub synchronization
                </span>
              </div>

              {/* Quota 4 */}
              <div
                style={{
                  backgroundColor: tokens.bgSubtle,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>
                    Tradon AI Telemetry
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#10B981" }}>
                    Active
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "7px",
                    backgroundColor: tokens.borderSubtle,
                    borderRadius: "9999px",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#10B981", borderRadius: "9999px" }} />
                </div>
                <span style={{ fontSize: "11.5px", color: tokens.textMuted }}>
                  Morning Briefs & GMV forecasting enabled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Payment Methods */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: tokens.textPrimary, margin: "0 0 4px 0" }}>
                Payment Methods
              </h2>
              <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, fontWeight: 500 }}>
                Corporate debit & credit cards on file for subscription billing and automated renewal.
              </p>
            </div>
            <button
              onClick={() => setShowAddCardModal(true)}
              style={{
                backgroundColor: tokens.bgCard,
                border: `1px solid ${tokens.borderSubtle}`,
                color: tokens.textPrimary,
                borderRadius: "9999px",
                padding: "8px 18px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "none",
              }}
            >
              <Plus size={15} /> Add new card
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                style={{
                  backgroundColor: tokens.bgCard,
                  border: pm.isDefault
                    ? `2px solid ${isDark ? "#10B981" : "#0E3E2B"}`
                    : `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "14px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          backgroundColor: pm.brand === "Mastercard" ? "#EA580C" : "#2563EB",
                          color: "#FFFFFF",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 800,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {pm.brand.toUpperCase()}
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: tokens.textPrimary }}>
                        •••• {pm.last4}
                      </span>
                    </div>

                    {pm.isDefault && (
                      <span
                        style={{
                          backgroundColor: "#D1FAE5",
                          color: "#065F46",
                          border: "1px solid #A7F3D0",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "9999px",
                        }}
                      >
                        DEFAULT
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: "12.5px", color: tokens.textSecondary, fontWeight: 500, marginBottom: "4px" }}>
                    {pm.bankName}
                  </div>
                  <div style={{ fontSize: "12px", color: tokens.textMuted }}>
                    Expires {pm.expiry}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: `1px solid ${tokens.borderSubtle}`,
                    paddingTop: "12px",
                    marginTop: "16px",
                  }}
                >
                  {!pm.isDefault ? (
                    <button
                      onClick={() => handleSetDefaultPayment(pm.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: tokens.textPrimary,
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 600 }}>Primary Active</span>
                  )}
                  <button
                    onClick={() => handleRemovePayment(pm.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#EF4444",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Invoices & Official Tax Receipts */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: tokens.textPrimary, margin: "0 0 4px 0" }}>
                Billing History & Official Receipts
              </h2>
              <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, fontWeight: 500 }}>
                Itemized invoices and tax-compliant receipts for Chi Limited accounting audits.
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: tokens.bgCard,
              border: `1px solid ${tokens.borderSubtle}`,
              borderRadius: "14px",
              overflowX: "auto",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <table style={{ width: "100%", minWidth: "850px", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: tokens.bgSubtle,
                    borderBottom: `1px solid ${tokens.borderSubtle}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  <th style={{ padding: "14px 20px", color: tokens.textSecondary, fontWeight: 700, fontSize: "12px" }}>INVOICE ID</th>
                  <th style={{ padding: "14px 20px", color: tokens.textSecondary, fontWeight: 700, fontSize: "12px" }}>DATE</th>
                  <th style={{ padding: "14px 20px", color: tokens.textSecondary, fontWeight: 700, fontSize: "12px" }}>PLAN DESCRIPTION</th>
                  <th style={{ padding: "14px 20px", color: tokens.textSecondary, fontWeight: 700, fontSize: "12px" }}>AMOUNT</th>
                  <th style={{ padding: "14px 20px", color: tokens.textSecondary, fontWeight: 700, fontSize: "12px" }}>STATUS</th>
                  <th style={{ padding: "14px 20px", color: tokens.textSecondary, fontWeight: 700, fontSize: "12px", textAlign: "right" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {initialInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    style={{ borderBottom: `1px solid ${tokens.borderSubtle}` }}
                  >
                    <td style={{ padding: "16px 20px", fontWeight: 700, color: tokens.textPrimary, whiteSpace: "nowrap" }}>
                      {inv.number}
                    </td>
                    <td style={{ padding: "16px 20px", color: tokens.textSecondary, fontWeight: 500, whiteSpace: "nowrap" }}>
                      {inv.date}
                    </td>
                    <td style={{ padding: "16px 20px", color: tokens.textPrimary, minWidth: "180px" }}>
                      <div style={{ fontWeight: 600 }}>{inv.planName}</div>
                      <div style={{ fontSize: "11px", color: tokens.textMuted }}>{inv.period}</div>
                    </td>
                    <td style={{ padding: "16px 20px", fontWeight: 700, color: tokens.textPrimary, whiteSpace: "nowrap" }}>
                      ${inv.amount.toLocaleString()}.00
                    </td>
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          backgroundColor: "#D1FAE5",
                          color: "#065F46",
                          border: "1px solid #A7F3D0",
                          padding: "3px 9px",
                          borderRadius: "9999px",
                          fontSize: "11px",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                        PAID
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        style={{
                          background: "none",
                          border: `1px solid ${tokens.borderSubtle}`,
                          color: tokens.textPrimary,
                          backgroundColor: tokens.bgSubtle,
                          borderRadius: "9999px",
                          padding: "6px 14px",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          boxShadow: "none",
                        }}
                      >
                        <Receipt size={13} />
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL 1: Plan Switch Confirmation Modal */}
      {showPlanConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: tokens.bgCard,
              borderRadius: "18px",
              maxWidth: "480px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: `1px solid ${tokens.borderSubtle}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>
                Confirm Subscription Change
              </h3>
              <button
                onClick={() => setShowPlanConfirmModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13.5px", color: tokens.textSecondary, marginBottom: "16px", lineHeight: 1.5, fontWeight: 500 }}>
              Select a tier below or review complete feature sets on the public pricing page.
            </p>

            {/* Tier Selector Chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {PRICING_TIERS.map((tier) => {
                const isThisSelected = selectedPlanId === tier.id;
                const isThisCurrent = currentPlanId === tier.id;
                const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedPlanId(tier.id)}
                    style={{
                      border: isThisSelected
                        ? `2px solid ${isDark ? "#10B981" : "#0E3E2B"}`
                        : `1px solid ${tokens.borderSubtle}`,
                      backgroundColor: isThisSelected ? (isDark ? "rgba(16,185,129,0.1)" : "rgba(14,62,43,0.04)") : tokens.bgSubtle,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: tokens.textPrimary }}>
                          {tier.name} Plan
                        </span>
                        {isThisCurrent && (
                          <span
                            style={{
                              backgroundColor: "#D1FAE5",
                              color: "#065F46",
                              fontSize: "10.5px",
                              fontWeight: 700,
                              padding: "2px 7px",
                              borderRadius: "9999px",
                            }}
                          >
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "12px", color: tokens.textSecondary, margin: "2px 0 0 0" }}>
                        {tier.tagline}
                      </p>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>
                        ${price}
                      </span>
                      <span style={{ fontSize: "11px", color: tokens.textMuted }}>/mo</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: tokens.bgSubtle,
                border: `1px solid ${tokens.borderSubtle}`,
                borderRadius: "12px",
                padding: "14px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12.5px", color: tokens.textSecondary }}>Selected Plan:</span>
                <span style={{ fontSize: "12.5px", fontWeight: 700, color: tokens.textPrimary }}>
                  {pendingPlan.name} Plan (${isAnnual ? pendingPlan.annualPrice : pendingPlan.monthlyPrice}/mo)
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12.5px", color: tokens.textSecondary }}>Prorated Adjustment:</span>
                <span style={{ fontSize: "12.5px", fontWeight: 700, color: tokens.textPrimary }}>$0.00 (Due Oct 1)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${tokens.borderSubtle}`, paddingTop: "6px" }}>
                <span style={{ fontSize: "12.5px", fontWeight: 600, color: tokens.textPrimary }}>Effective Date:</span>
                <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#10B981" }}>Immediate Activation</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowPlanConfirmModal(false)}
                style={{
                  backgroundColor: "transparent",
                  color: tokens.textPrimary,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "9999px",
                  padding: "9px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "none",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPlanChange}
                style={{
                  backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "9px 24px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "none",
                }}
              >
                Confirm Switch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add New Card Modal */}
      {showAddCardModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: tokens.bgCard,
              borderRadius: "18px",
              maxWidth: "460px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: `1px solid ${tokens.borderSubtle}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    backgroundColor: tokens.bgSubtle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: tokens.textPrimary,
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>
                  Add Corporate Card
                </h3>
              </div>
              <button
                onClick={() => setShowAddCardModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPaymentMethod}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: tokens.textPrimary, marginBottom: "6px" }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={newCardNumber}
                    onChange={(e) => setNewCardNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="5399 4123 4567 8901"
                    style={{
                      width: "100%",
                      backgroundColor: tokens.bgSubtle,
                      border: `1px solid ${tokens.borderSubtle}`,
                      borderRadius: "8px",
                      padding: "11px 14px",
                      fontSize: "14px",
                      color: tokens.textPrimary,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: tokens.textPrimary, marginBottom: "6px" }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY (e.g. 10/28)"
                      maxLength={5}
                      value={newCardExpiry}
                      onChange={(e) => setNewCardExpiry(e.target.value)}
                      style={{
                        width: "100%",
                        backgroundColor: tokens.bgSubtle,
                        border: `1px solid ${tokens.borderSubtle}`,
                        borderRadius: "8px",
                        padding: "11px 14px",
                        fontSize: "14px",
                        color: tokens.textPrimary,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: tokens.textPrimary, marginBottom: "6px" }}>
                      CVV
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={newCardCvv}
                      onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, ""))}
                      placeholder="•••"
                      style={{
                        width: "100%",
                        backgroundColor: tokens.bgSubtle,
                        border: `1px solid ${tokens.borderSubtle}`,
                        borderRadius: "8px",
                        padding: "11px 14px",
                        fontSize: "14px",
                        color: tokens.textPrimary,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: tokens.textPrimary, marginBottom: "6px" }}>
                    Issuing Bank / Corporate Entity
                  </label>
                  <select
                    value={newCardBank}
                    onChange={(e) => setNewCardBank(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: tokens.bgSubtle,
                      border: `1px solid ${tokens.borderSubtle}`,
                      borderRadius: "8px",
                      padding: "11px 14px",
                      fontSize: "13.5px",
                      color: tokens.textPrimary,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option>Corporate Zenith Bank</option>
                    <option>Commercial Access Bank</option>
                    <option>Guaranty Trust Bank Corporate</option>
                    <option>Standard Chartered Bank</option>
                    <option>First Bank Commercial</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  style={{
                    backgroundColor: "transparent",
                    color: tokens.textPrimary,
                    border: `1px solid ${tokens.borderSubtle}`,
                    borderRadius: "9999px",
                    padding: "9px 20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "9px 24px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                >
                  Save Corporate Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Invoice Details Modal */}
      {selectedInvoice && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: tokens.bgCard,
              borderRadius: "18px",
              maxWidth: "500px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: `1px solid ${tokens.borderSubtle}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", color: tokens.textMuted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  OFFICIAL TAX INVOICE
                </span>
                <h3 style={{ fontSize: "19px", fontWeight: 700, color: tokens.textPrimary, margin: "2px 0 0" }}>
                  {selectedInvoice.number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ borderTop: `1px solid ${tokens.borderSubtle}`, borderBottom: `1px solid ${tokens.borderSubtle}`, padding: "16px 0", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: tokens.textSecondary }}>Billed Entity:</span>
                <span style={{ fontSize: "13px", fontWeight: 700, color: tokens.textPrimary }}>Chi Limited</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: tokens.textSecondary }}>Issue Date:</span>
                <span style={{ fontSize: "13px", color: tokens.textPrimary, fontWeight: 500 }}>{selectedInvoice.date}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: tokens.textSecondary }}>Settlement Status:</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#065F46",
                    backgroundColor: "#D1FAE5",
                    border: "1px solid #A7F3D0",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                  }}
                >
                  PAID IN FULL
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: tokens.textSecondary }}>Payment Instrument:</span>
                <span style={{ fontSize: "13px", color: tokens.textPrimary, fontWeight: 600 }}>Mastercard •••• 4242</span>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "12px", fontWeight: 700, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                LINE ITEM DETAILS
              </h4>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px", marginBottom: "6px" }}>
                <span style={{ color: tokens.textPrimary, fontWeight: 500 }}>{selectedInvoice.planName}</span>
                <span style={{ fontWeight: 700, color: tokens.textPrimary }}>${selectedInvoice.amount}.00</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  borderTop: `1px solid ${tokens.borderSubtle}`,
                  paddingTop: "10px",
                  marginTop: "10px",
                }}
              >
                <span>Total Paid:</span>
                <span style={{ color: isDark ? "#10B981" : "#0E3E2B" }}>${selectedInvoice.amount}.00</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedInvoice(null)}
                style={{
                  backgroundColor: "transparent",
                  color: tokens.textPrimary,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "9999px",
                  padding: "9px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "none",
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`Downloading receipt for ${selectedInvoice.number}...`);
                  setSelectedInvoice(null);
                }}
                style={{
                  backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "9px 24px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "none",
                }}
              >
                <Download size={15} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
