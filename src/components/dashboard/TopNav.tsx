"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Menu,
  Bell,
  HelpCircle,
  X,
  Check,
  CheckCircle2,
  ChevronDown,
  LogOut,
  User,
  Settings,
  CreditCard,
  Shield,
  RefreshCw,
  Box,
  ShoppingBag,
  Users,
  Building,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAppearance } from "@/context/AppearanceContext";
import { OnboardingTooltip } from "../common/OnboardingTooltip";
import { getPageGuide } from "@/lib/pageGuides";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "order" | "finance" | "depot";
  href: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Purchase Order #PO-8821",
    description: "Kano Central Stores submitted ₦1,850,000 order awaiting credit approval.",
    time: "12m ago",
    read: false,
    type: "order",
    href: "/orders",
  },
  {
    id: "notif-2",
    title: "Overdue Credit Term Alert",
    description: "Alaba Mega Depot exceeded 30-day payment term by 4 days.",
    time: "1h ago",
    read: false,
    type: "finance",
    href: "/finance",
  },
  {
    id: "notif-3",
    title: "Depot Dispatch Dispatched",
    description: "Order #ORD-4412 safely dispatched from Ikeja Central Depot.",
    time: "3h ago",
    read: false,
    type: "depot",
    href: "/depots",
  },
];

const SEARCH_ITEMS = [
  // Pages
  { title: "Dashboard Overview", category: "Pages", href: "/dashboard", icon: Layers, meta: "Main metrics & KPIs" },
  { title: "Purchase Orders", category: "Pages", href: "/orders", icon: ShoppingBag, meta: "Manage incoming & approved orders" },
  { title: "Product Catalog", category: "Pages", href: "/products", icon: Box, meta: "Manage SKUs, units & pricing" },
  { title: "Inventory & Warehouses", category: "Pages", href: "/inventory", icon: Building, meta: "Stock levels across depots" },
  { title: "Distributor Network", category: "Pages", href: "/distributors", icon: Users, meta: "Distributor tiers & credit limits" },
  { title: "Field Reps Tracker", category: "Pages", href: "/field-reps", icon: Users, meta: "Field rep visits & sales targets" },
  { title: "Promotions & Smart Pricing", category: "Pages", href: "/promos", icon: Sparkles, meta: "Trade discounts & volume deals" },
  { title: "Collections & Overdue", category: "Pages", href: "/collections", icon: CreditCard, meta: "Debt recovery & payment tracking" },
  { title: "Financial Settlement", category: "Pages", href: "/finance", icon: CreditCard, meta: "Reconciliation & payouts" },
  { title: "Depots & Hubs", category: "Pages", href: "/depots", icon: Building, meta: "Fulfillment & dispatch centers" },
  { title: "Audit Trail", category: "Pages", href: "/audits", icon: Shield, meta: "System activity logs" },
  { title: "Workspace Settings", category: "Pages", href: "/settings", icon: Settings, meta: "Security, team & organization" },
  // Products
  { title: "Chi Exotic Pineapple & Coconut 1L", category: "Products", href: "/products", icon: Box, meta: "SKU: CHI-EXO-01 · ₦14,500/case" },
  { title: "Chivita 100% Apple Juice 1L", category: "Products", href: "/products", icon: Box, meta: "SKU: CHI-APL-02 · ₦15,200/case" },
  { title: "Hollandia Yoghurt Strawberry 500ml", category: "Products", href: "/products", icon: Box, meta: "SKU: HOL-YOG-03 · ₦9,800/case" },
  { title: "Hollandia Evaporated Milk 200g", category: "Products", href: "/products", icon: Box, meta: "SKU: HOL-EVAP-04 · ₦11,200/case" },
  { title: "Chi Happy Hour Tropical 500ml", category: "Products", href: "/products", icon: Box, meta: "SKU: CHI-HH-05 · ₦7,500/case" },
  { title: "Capri-Sun Orange 200ml", category: "Products", href: "/products", icon: Box, meta: "SKU: CAP-ORG-06 · ₦6,400/case" },
  // Orders
  { title: "Purchase Order #PO-2024-001", category: "Orders", href: "/orders", icon: ShoppingBag, meta: "₦4,850,000 · Approved · Kano Depot" },
  { title: "Purchase Order #PO-2024-002", category: "Orders", href: "/orders", icon: ShoppingBag, meta: "₦2,420,000 · Pending Approval" },
  { title: "Purchase Order #PO-2024-003", category: "Orders", href: "/orders", icon: ShoppingBag, meta: "₦1,150,000 · Dispatched · Alaba" },
  // Distributors
  { title: "Kano Central Stores Ltd", category: "Distributors", href: "/distributors", icon: Users, meta: "Tier 1 · Credit limit ₦15M" },
  { title: "Alaba Mega Depot Distribution", category: "Distributors", href: "/distributors", icon: Users, meta: "Tier 2 · Credit limit ₦8M" },
  { title: "Onitsha Main Hub Enterprise", category: "Distributors", href: "/distributors", icon: Users, meta: "Tier 1 · Credit limit ₦20M" },
  { title: "Ibadan Express Wholesale", category: "Distributors", href: "/distributors", icon: Users, meta: "Tier 3 · Credit limit ₦4M" },
];

export const DashboardTopNav = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { tokens, config, accentData } = useAppearance();
  const guide = getPageGuide(pathname || "/dashboard");

  // State
  const [showGuide, setShowGuide] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState<"All" | "Pages" | "Products" | "Orders" | "Distributors">("All");

  const [isTestMode, setIsTestMode] = useState(true);
  const [showEnvPopover, setShowEnvPopover] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs for click outside
  const envRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Format today's date
  const today = new Date();
  const dateString = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Check if this page's guide has been seen or dismissed before
  useEffect(() => {
    try {
      const currentPath = pathname || "/dashboard";
      const seenGuides: string[] = JSON.parse(localStorage.getItem("tradon_seen_guides") || "[]");
      if (!seenGuides.includes(currentPath)) {
        setShowGuide(true);
      } else {
        setShowGuide(false);
      }
    } catch {
      setShowGuide(false);
    }
  }, [pathname]);

  const handleDismissGuide = () => {
    setShowGuide(false);
    try {
      const currentPath = pathname || "/dashboard";
      const seenGuides: string[] = JSON.parse(localStorage.getItem("tradon_seen_guides") || "[]");
      if (!seenGuides.includes(currentPath)) {
        seenGuides.push(currentPath);
        localStorage.setItem("tradon_seen_guides", JSON.stringify(seenGuides));
      }
    } catch {
      // localStorage fallback
    }
  };

  // Toast feedback helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Global Keyboard Shortcuts (⌘K, ⌘F, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "f")) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setShowEnvPopover(false);
        setShowNotifPopover(false);
        setShowProfilePopover(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to dismiss popovers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (envRef.current && !envRef.current.contains(e.target as Node)) {
        setShowEnvPopover(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifPopover(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfilePopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
      setSearchFilter("All");
    }
  }, [isSearchOpen]);

  // Notifications handlers
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    triggerToast("All notifications marked as read");
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)));
    setShowNotifPopover(false);
    router.push(notif.href);
  };

  // Sign out handler
  const handleSignOut = () => {
    logout();
    setShowProfilePopover(false);
    router.push("/login");
  };

  // Filtered search results
  const filteredSearchItems = SEARCH_ITEMS.filter((item) => {
    const matchesFilter = searchFilter === "All" || item.category === searchFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesFilter;
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.meta.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <>
      <header
        style={{
          backgroundColor: tokens.bgHeader,
          borderBottom: `1px solid ${tokens.borderSubtle}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          flexShrink: 0,
          position: "relative",
          zIndex: 30,
          transition: config.enableAnimations ? "background-color 0.2s ease, border-color 0.2s ease" : "none",
        }}
        className="h-16 md:h-[76px] px-3 sm:px-6 md:px-8"
      >
        {/* LEFT SECTION: Mobile Toggle, Title & Page Guide, Search Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }} className="sm:gap-4 md:gap-6">
          {/* Mobile Menu Toggle */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              aria-label="Open mobile menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: tokens.textPrimary,
                padding: "7px",
                borderRadius: "8px",
                backgroundColor: tokens.bgSubtle,
              }}
              className="flex md:!hidden items-center justify-center flex-shrink-0 transition-colors"
            >
              <Menu size={19} />
            </button>
          )}

          {/* Date & Title & Page Guide */}
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: tokens.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "2px",
                lineHeight: 1,
              }}
              className="hidden sm:block"
            >
              {dateString}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
              <span
                style={{
                  fontWeight: 700,
                  color: tokens.textPrimary,
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  whiteSpace: "nowrap",
                }}
                className="text-[15px] sm:text-base md:text-[18px]"
              >
                {guide.title}
              </span>

              {/* Guide help trigger */}
              <button
                onClick={() => setShowGuide((prev) => !prev)}
                title="Page explanation & guide"
                aria-label="Toggle page explanation"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "3px 6px",
                  borderRadius: "9999px",
                  border: `1px solid ${tokens.borderSubtle}`,
                  backgroundColor: showGuide ? tokens.bgSubtle : "transparent",
                  color: tokens.textPrimary,
                  fontSize: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <HelpCircle size={12} />
                <span className="hidden sm:inline">Guide</span>
              </button>
            </div>

            {/* Contextual Page Explanation Tooltip */}
            {showGuide && (
              <OnboardingTooltip
                badge={guide.category}
                title={guide.title}
                content={guide.description}
                tip={guide.keyAction}
                arrowAlign="left"
                onClose={handleDismissGuide}
                onGotIt={handleDismissGuide}
              />
            )}
          </div>

          {/* Desktop Search Bar Trigger */}
          <div
            onClick={() => setIsSearchOpen(true)}
            style={{
              position: "relative",
              flexGrow: 1,
              maxWidth: "380px",
              marginLeft: "20px",
              cursor: "pointer",
            }}
            className="hidden sm:block"
          >
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(14,62,43,0.4)",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <Search size={15} />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search products, orders, distributors..."
              style={{
                width: "100%",
                height: "40px",
                paddingLeft: "38px",
                paddingRight: "46px",
                borderRadius: "10px",
                border: `1px solid ${tokens.borderSubtle}`,
                backgroundColor: tokens.bgSubtle,
                fontSize: "13px",
                color: tokens.textPrimary,
                outline: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: tokens.bgHeader,
                border: `1px solid ${tokens.borderSubtle}`,
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 600,
                color: tokens.textMuted,
                letterSpacing: "0.02em",
                pointerEvents: "none",
              }}
            >
              ⌘K
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Search button (mobile), Environment Switcher, Notifications, Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }} className="sm:gap-3 md:gap-4">
          {/* Mobile-only Search Button (strictly hidden on desktop/tablet) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            style={{
              width: "36px",
              height: "36px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              border: `1px solid ${tokens.borderSubtle}`,
              backgroundColor: tokens.bgSubtle,
              color: tokens.textPrimary,
              cursor: "pointer",
            }}
            className="flex sm:!hidden transition-colors"
          >
            <Search size={16} />
          </button>

          {/* Operating Environment Switcher (Desktop / Tablet only) */}
          <div ref={envRef} style={{ position: "relative" }} className="hidden md:block">
            <button
              onClick={() => {
                setShowEnvPopover((prev) => !prev);
                setShowNotifPopover(false);
                setShowProfilePopover(false);
              }}
              style={{
                alignItems: "center",
                gap: "6px",
                padding: "5px 10px",
                backgroundColor: isTestMode ? "#FFFBEB" : "#ECFDF5",
                border: isTestMode ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(16,185,129,0.25)",
                borderRadius: "9999px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="flex hover:brightness-95"
              title="Click to switch environment or reset sandbox data"
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isTestMode ? "#F59E0B" : "#10B981",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: isTestMode ? "#B45309" : "#065F46",
                  whiteSpace: "nowrap",
                }}
              >
                {isTestMode ? "Test Mode" : "Live Mode"}
              </span>
              <ChevronDown size={12} style={{ color: isTestMode ? "#B45309" : "#065F46", opacity: 0.7 }} />
            </button>

            {/* Environment Dropdown Popover */}
            {showEnvPopover && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  width: "280px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  boxShadow: "0 12px 30px rgba(14,62,43,0.12), 0 2px 8px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(14,62,43,0.1)",
                  padding: "16px",
                  zIndex: 50,
                  animation: "fadeIn 0.15s ease-out",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#0E3E2B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Environment
                  </span>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      backgroundColor: isTestMode ? "#FFFBEB" : "#ECFDF5",
                      color: isTestMode ? "#B45309" : "#065F46",
                    }}
                  >
                    {isTestMode ? "Sandbox" : "Production"}
                  </span>
                </div>

                <p style={{ fontSize: "11.5px", color: "rgba(14,62,43,0.65)", lineHeight: 1.5, margin: "0 0 14px" }}>
                  {isTestMode
                    ? "You are exploring in Test Mode. Financial reconciliations and orders run against demo data."
                    : "Live Production environment active. Real transactions and inventory updates will take effect."}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button
                    onClick={() => {
                      setIsTestMode((prev) => !prev);
                      setShowEnvPopover(false);
                      triggerToast(isTestMode ? "Switched to Live Production mode" : "Switched to Test Mode (Sandbox)");
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid rgba(14,62,43,0.15)",
                      backgroundColor: "#FAFCF9",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0E3E2B",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                    }}
                    className="hover:bg-[#0E3E2B] hover:text-white transition-colors"
                  >
                    <span>Switch to {isTestMode ? "Live Mode" : "Test Mode"}</span>
                    <ArrowRight size={13} />
                  </button>

                  {isTestMode && (
                    <button
                      onClick={() => {
                        setShowEnvPopover(false);
                        triggerToast("Sandbox demo records reloaded successfully");
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "rgba(14,62,43,0.05)",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: "#0E3E2B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                      className="hover:bg-amber-50 hover:text-amber-800 transition-colors"
                    >
                      <RefreshCw size={12} />
                      <span>Reset Demo Sandbox Data</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell with Dropdown Popover */}
          <div ref={notifRef} style={{ position: "relative" }}>
            <button
              onClick={() => {
                setShowNotifPopover((prev) => !prev);
                setShowEnvPopover(false);
                setShowProfilePopover(false);
              }}
              aria-label="Notifications"
              style={{
                position: "relative",
                background: "transparent",
                border: `1px solid ${tokens.borderSubtle}`,
                cursor: "pointer",
                color: tokens.textPrimary,
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                backgroundColor: showNotifPopover ? tokens.bgSubtle : tokens.bgHeader,
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              className="hover:bg-black/5 hover:border-[#0E3E2B]/20"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-3px",
                    minWidth: "16px",
                    height: "16px",
                    padding: "0 3px",
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    fontSize: "9px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    border: "2px solid #FFFFFF",
                  }}
                >
                  {unreadCount}
                </div>
              )}
            </button>

            {/* Notifications Dropdown Popover */}
            {showNotifPopover && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  width: "330px",
                  maxWidth: "calc(100vw - 24px)",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  boxShadow: "0 12px 30px rgba(14,62,43,0.12), 0 2px 8px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(14,62,43,0.1)",
                  overflow: "hidden",
                  zIndex: 50,
                  animation: "fadeIn 0.15s ease-out",
                }}
              >
                {/* Popover Header */}
                <div
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid rgba(14,62,43,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#FAFCF9",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>Notifications</span>
                    {unreadCount > 0 && (
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          backgroundColor: "#EF4444",
                          color: "#FFFFFF",
                          padding: "1px 6px",
                          borderRadius: "9999px",
                        }}
                      >
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0E3E2B",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      className="hover:opacity-75"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid rgba(14,62,43,0.05)",
                        backgroundColor: notif.read ? "#FFFFFF" : "rgba(14,62,43,0.02)",
                        cursor: "pointer",
                        transition: "background-color 0.15s ease",
                      }}
                      className="hover:bg-[rgba(14,62,43,0.05)]"
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {!notif.read && (
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#EF4444", flexShrink: 0 }} />
                          )}
                          <span style={{ fontSize: "12.5px", fontWeight: notif.read ? 600 : 700, color: "#0E3E2B" }}>
                            {notif.title}
                          </span>
                        </div>
                        <span style={{ fontSize: "10.5px", color: "rgba(14,62,43,0.4)", whiteSpace: "nowrap" }}>
                          {notif.time}
                        </span>
                      </div>
                      <p style={{ fontSize: "11.5px", color: "rgba(14,62,43,0.65)", margin: "4px 0 0", lineHeight: 1.4 }}>
                        {notif.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Popover Footer */}
                <div
                  onClick={() => {
                    setShowNotifPopover(false);
                    router.push("/audits");
                  }}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#FAFCF9",
                    borderTop: "1px solid rgba(14,62,43,0.08)",
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    color: "#0E3E2B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                  className="hover:bg-[rgba(14,62,43,0.04)]"
                >
                  <span>View all audit events</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            )}
          </div>

          {/* Vertical Separator */}
          <div
            style={{
              width: "1px",
              height: "22px",
              backgroundColor: tokens.borderSubtle,
              margin: "0 2px",
            }}
            className="hidden md:block"
          />

          {/* User Profile Menu with Popover */}
          <div ref={profileRef} style={{ position: "relative" }}>
            <div
              onClick={() => {
                setShowProfilePopover((prev) => !prev);
                setShowEnvPopover(false);
                setShowNotifPopover(false);
              }}
              style={{
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                flexShrink: 0,
                padding: "3px 6px",
                borderRadius: "10px",
                transition: "background-color 0.15s ease",
              }}
              className="flex hover:opacity-80"
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  backgroundColor: tokens.accentHex,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: tokens.accentText,
                  fontSize: "12px",
                  fontWeight: 700,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                {user?.userName ? user.userName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "AD"}
                {/* On mobile, amber indicator dot on avatar when in Test Mode */}
                {isTestMode && (
                  <span
                    className="md:hidden"
                    title="Test Mode active"
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      backgroundColor: "#F59E0B",
                      border: `2px solid ${tokens.bgHeader}`,
                    }}
                  />
                )}
              </div>
              <div className="hidden lg:flex flex-col">
                <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, lineHeight: 1.2, whiteSpace: "nowrap" }}>
                  {user?.userName || "Adebayo Damilare"}
                </span>
                <span style={{ fontSize: "10.5px", color: tokens.textMuted, marginTop: "2px", whiteSpace: "nowrap" }}>
                  {user?.workspaceRole || "Growth plan"}
                </span>
              </div>
              <ChevronDown size={14} style={{ color: tokens.textMuted }} className="hidden lg:block" />
            </div>

            {/* Profile Dropdown Popover */}
            {showProfilePopover && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  width: "260px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  boxShadow: "0 12px 30px rgba(14,62,43,0.12), 0 2px 8px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(14,62,43,0.1)",
                  padding: "8px",
                  zIndex: 50,
                  animation: "fadeIn 0.15s ease-out",
                }}
              >
                {/* User Info Header */}
                <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(14,62,43,0.08)", marginBottom: "6px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B", margin: 0, lineHeight: 1.2 }}>
                    {user?.userName || "Adebayo Damilare"}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.55)", margin: "3px 0 6px" }}>
                    {user?.email || "adebayo@chiltd.com"}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "rgba(14,62,43,0.06)", padding: "2px 8px", borderRadius: "6px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 600, color: "#0E3E2B" }}>
                      {user?.businessName || "Chi Limited"} · Owner
                    </span>
                  </div>
                </div>

                {/* Mobile Environment Switcher (Always accessible inside profile menu) */}
                <div
                  style={{
                    padding: "8px 10px",
                    margin: "4px 0 8px",
                    backgroundColor: isTestMode ? "#FFFBEB" : "#ECFDF5",
                    borderRadius: "8px",
                    border: isTestMode ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(16,185,129,0.25)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: isTestMode ? "#F59E0B" : "#10B981" }} />
                      <span style={{ fontSize: "11px", fontWeight: 600, color: isTestMode ? "#B45309" : "#065F46" }}>
                        {isTestMode ? "Test Mode (Sandbox)" : "Live Mode"}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                    <button
                      onClick={() => {
                        setIsTestMode((prev) => !prev);
                        triggerToast(isTestMode ? "Switched to Live Production mode" : "Switched to Test Mode (Sandbox)");
                      }}
                      style={{
                        flex: 1,
                        padding: "5px 8px",
                        borderRadius: "6px",
                        border: "1px solid rgba(14,62,43,0.15)",
                        backgroundColor: "#FFFFFF",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#0E3E2B",
                        cursor: "pointer",
                      }}
                      className="hover:bg-[rgba(14,62,43,0.05)] transition-colors"
                    >
                      Switch to {isTestMode ? "Live" : "Test"}
                    </button>
                    {isTestMode && (
                      <button
                        onClick={() => triggerToast("Sandbox demo records reloaded")}
                        style={{
                          padding: "5px 8px",
                          borderRadius: "6px",
                          border: "none",
                          backgroundColor: "rgba(14,62,43,0.08)",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#0E3E2B",
                          cursor: "pointer",
                        }}
                        className="hover:bg-amber-100 transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Links */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <button
                    onClick={() => {
                      setShowProfilePopover(false);
                      router.push("/settings/team");
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#0E3E2B",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    className="hover:bg-[rgba(14,62,43,0.05)] transition-colors"
                  >
                    <User size={15} style={{ opacity: 0.7 }} />
                    <span>Profile & Team</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfilePopover(false);
                      router.push("/billing");
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#0E3E2B",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    className="hover:bg-[rgba(14,62,43,0.05)] transition-colors"
                  >
                    <CreditCard size={15} style={{ opacity: 0.7 }} />
                    <span>Billing & Subscription</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfilePopover(false);
                      router.push("/settings/security");
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#0E3E2B",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    className="hover:bg-[rgba(14,62,43,0.05)] transition-colors"
                  >
                    <Shield size={15} style={{ opacity: 0.7 }} />
                    <span>Security & Keys</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfilePopover(false);
                      router.push("/settings");
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#0E3E2B",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    className="hover:bg-[rgba(14,62,43,0.05)] transition-colors"
                  >
                    <Settings size={15} style={{ opacity: 0.7 }} />
                    <span>Organization Settings</span>
                  </button>
                </div>

                {/* Sign Out Action */}
                <div style={{ marginTop: "6px", paddingTop: "6px", borderTop: "1px solid rgba(14,62,43,0.08)" }}>
                  <button
                    onClick={handleSignOut}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#DC2626",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    className="hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* GLOBAL SEARCH COMMAND PALETTE MODAL */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(14, 62, 43, 0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "80px 16px 20px",
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "640px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(14,62,43,0.25), 0 0 0 1px rgba(14,62,43,0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              animation: "scaleIn 0.15s ease-out",
            }}
          >
            {/* Search Input Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(14,62,43,0.08)",
                gap: "12px",
              }}
            >
              <Search size={20} style={{ color: "rgba(14,62,43,0.5)" }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything: 'orders', 'chivita', 'kano', 'pricing'..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                  color: "#0E3E2B",
                  backgroundColor: "transparent",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(14,62,43,0.4)",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <X size={16} />
                </button>
              )}
              <kbd
                onClick={() => setIsSearchOpen(false)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(14,62,43,0.06)",
                  border: "1px solid rgba(14,62,43,0.12)",
                  fontSize: "11px",
                  color: "rgba(14,62,43,0.6)",
                  cursor: "pointer",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                borderBottom: "1px solid rgba(14,62,43,0.06)",
                backgroundColor: "#FAFCF9",
                overflowX: "auto",
              }}
            >
              {(["All", "Pages", "Products", "Orders", "Distributors"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchFilter(cat)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    border: "none",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: searchFilter === cat ? "#0E3E2B" : "rgba(14,62,43,0.05)",
                    color: searchFilter === cat ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div style={{ maxHeight: "380px", overflowY: "auto", padding: "8px" }}>
              {filteredSearchItems.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "rgba(14,62,43,0.5)" }}>
                  <Search size={32} style={{ margin: "0 auto 10px", opacity: 0.3 }} />
                  <p style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>No results found</p>
                  <p style={{ fontSize: "12px", margin: "4px 0 0" }}>Try searching for a different term or change category</p>
                </div>
              ) : (
                filteredSearchItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push(item.href);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "background-color 0.15s ease",
                      }}
                      className="hover:bg-[rgba(14,62,43,0.06)] group"
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(14,62,43,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#0E3E2B",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#0E3E2B",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.title}
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "rgba(14,62,43,0.55)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.meta}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                        <span
                          style={{
                            fontSize: "10.5px",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: "6px",
                            backgroundColor: "rgba(14,62,43,0.05)",
                            color: "rgba(14,62,43,0.6)",
                          }}
                        >
                          {item.category}
                        </span>
                        <ArrowRight size={14} style={{ color: "#0E3E2B", opacity: 0.4 }} className="group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Palette Footer */}
            <div
              style={{
                padding: "10px 16px",
                borderTop: "1px solid rgba(14,62,43,0.08)",
                backgroundColor: "#FAFCF9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "rgba(14,62,43,0.5)",
              }}
            >
              <span>Navigation shortcut: <kbd style={{ padding: "1px 4px", borderRadius: "4px", background: "white", border: "1px solid #ccc" }}>↵ Enter</kbd> to select</span>
              <span>Press <kbd style={{ padding: "1px 4px", borderRadius: "4px", background: "white", border: "1px solid #ccc" }}>ESC</kbd> to close</span>
            </div>
          </div>
        </div>
      )}

      {/* TOAST BANNER */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#0E3E2B",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(14,62,43,0.3)",
            fontSize: "12.5px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 110,
            animation: "slideUp 0.2s ease-out",
          }}
        >
          <CheckCircle2 size={16} style={{ color: "#10B981" }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
