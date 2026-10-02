"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAppearance } from "@/context/AppearanceContext";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Truck,
  Building2,
  Package,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
  X,
  Printer,
  ChevronDown,
  Info,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  PhoneCall,
  FileText,
  AlertCircle,
  Percent,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  subName: string;
  sku: string;
  category: "Juice" | "Dairy" | "Snacks";
  cartonPrice: number;
  unitPrice: number;
  packSize: string;
  stock: number;
  image?: string;
  hasPromo?: boolean;
}

interface CartItem {
  product: ProductItem;
  quantity: number; // in Cartons
}

const DEPOTS = [
  { id: "ikeja", name: "Lagos Main Warehouse (Ikeja Depot)", address: "14 Chivita Avenue, Ajao Estate, Ikeja, Lagos", eta: "Next-Day Dispatch" },
  { id: "kano", name: "Kano Central Logistics Hub", address: "Plot 12, Bompai Industrial Area, Kano", eta: "1-2 Days Dispatch" },
  { id: "abuja", name: "Abuja Regional DC", address: "Plot 402, Idu Industrial Layout, Abuja", eta: "24-Hour Dispatch" },
  { id: "ph", name: "Port Harcourt Staging Center", address: "Trans-Amadi Industrial Layout, Port Harcourt", eta: "2-3 Days Dispatch" },
];

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    name: "Chi Exotic Pineapple & Coconut 1L",
    subName: "12 packs / carton • Premium Tetra Pak",
    sku: "CHI-EXC-PC-1L",
    category: "Juice",
    cartonPrice: 14400,
    unitPrice: 1200,
    packSize: "12 × 1L",
    stock: 4500,
    hasPromo: true,
    image: "https://fromatoz.com.ng/wp-content/uploads/2024/03/WhatsApp-Image-2024-07-12-at-4.21.26-PM.jpeg",
  },
  {
    id: "2",
    name: "Chivita 100% Real Orange 1L",
    subName: "12 packs / carton • No Added Sugar • Pure Juice",
    sku: "CHI-100-OR-1L",
    category: "Juice",
    cartonPrice: 14400,
    unitPrice: 1200,
    packSize: "12 × 1L",
    stock: 2800,
    hasPromo: true,
    image: "https://www.supermart.ng/cdn/shop/files/spbvju1615.png?v=1688839382",
  },
  {
    id: "3",
    name: "Chivita 100% Real Apple 1L",
    subName: "12 packs / carton • 100% Fruit Juice",
    sku: "CHI-100-AP-1L",
    category: "Juice",
    cartonPrice: 13800,
    unitPrice: 1150,
    packSize: "12 × 1L",
    stock: 950,
    image: "https://www.supermart.ng/cdn/shop/files/111.jpg?v=1689901590",
  },
  {
    id: "4",
    name: "Hollandia Yoghurt Strawberry 1L",
    subName: "10 packs / carton • Real Fruit Dairy Blend",
    sku: "HOL-YOG-ST-1L",
    category: "Dairy",
    cartonPrice: 14000,
    unitPrice: 1400,
    packSize: "10 × 1L",
    stock: 3100,
    image: "https://www.supermart.ng/cdn/shop/files/spbvyo2101.jpg?v=1762254219",
  },
  {
    id: "5",
    name: "Hollandia Yoghurt Strawberry 500ml",
    subName: "16 packs / carton • Probiotic Daily Drink",
    sku: "HOL-YOG-ST-500",
    category: "Dairy",
    cartonPrice: 12500,
    unitPrice: 781,
    packSize: "16 × 500ml",
    stock: 1600,
    image: "https://www.supermart.ng/cdn/shop/files/spbvyo2101.jpg?v=1762254219",
  },
  {
    id: "6",
    name: "Hollandia Evaporated Milk 200g",
    subName: "48 tins / carton • Full Cream Evaporated Milk",
    sku: "HOL-EVP-MILK-200",
    category: "Dairy",
    cartonPrice: 16500,
    unitPrice: 344,
    packSize: "48 × 200g",
    stock: 5200,
    hasPromo: true,
    image: "https://www.supermart.ng/cdn/shop/files/spdpmp1685.jpg?v=1762253812",
  },
  {
    id: "7",
    name: "Capri-Sun Orange 200ml",
    subName: "24 pouches / carton • Ready to Drink Pouch",
    sku: "CAP-SUN-OR-200",
    category: "Juice",
    cartonPrice: 6800,
    unitPrice: 283,
    packSize: "24 × 200ml",
    stock: 3800,
    image: "https://www.capri-sun.com/assets/Uploads/pages/products/TP_Orange_clean-3__ScaleMaxHeightWzYyN10.png",
  },
  {
    id: "8",
    name: "Chi Happy Hour Tropical 500ml",
    subName: "24 packs / carton • Vitamin Enriched Fruit Drink",
    sku: "CHI-HH-TR-500",
    category: "Juice",
    cartonPrice: 9200,
    unitPrice: 383,
    packSize: "24 × 500ml",
    stock: 1400,
    image: "https://www.supermart.ng/cdn/shop/files/spbvju1615.png?v=1688839382",
  },
  {
    id: "9",
    name: "SuperBite Sausage Roll 100g",
    subName: "30 rolls / carton • Premium Baked Beef Roll",
    sku: "SUP-BIT-SAU-100",
    category: "Snacks",
    cartonPrice: 5400,
    unitPrice: 180,
    packSize: "30 × 100g",
    stock: 8500,
    image: "https://martking.ng/wp-content/uploads/2022/08/Martking-Online-Store-superbite.jpg",
  },
  {
    id: "10",
    name: "Chi Snacks Plantain Chips 50g",
    subName: "40 packs / carton • Crispy Naturally Sweet Plantain",
    sku: "CHI-SN-PB-50",
    category: "Snacks",
    cartonPrice: 10000,
    unitPrice: 250,
    packSize: "40 × 50g",
    stock: 4200,
    image: "https://martking.ng/wp-content/uploads/2022/08/Martking-Online-Store-superbite.jpg",
  },
];

export default function ShopPage() {
  const { tokens, config } = useAppearance();
  const isDark = config.theme === "dark";

  const [selectedDepot, setSelectedDepot] = useState(DEPOTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Juice" | "Dairy" | "Snacks">("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  // Stepper state for each product card: productId -> cartons quantity
  const [cardQuantities, setCardQuantities] = useState<Record<string, number>>({});

  // Minimum Order Quantity (MOQ)
  const [storeMoq, setStoreMoq] = useState(10);
  const [bannerText, setBannerText] = useState(
    "⚡ Chi Limited Direct Wholesaler Portal • Minimum Order Quantity (MOQ): 10 Cartons • Next-Day Factory Dispatch Across Nigeria • Direct Manufacturer Invoicing"
  );

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    deliveryMethod: "depot" as "depot" | "delivery",
    address: "",
    notes: "",
    paymentTerm: "transfer" as "transfer" | "credit" | "depot_cash",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load custom storefront settings from localStorage if Chi configured them in /settings
  useEffect(() => {
    try {
      const savedMoq = localStorage.getItem("tradon_storefront_moq");
      if (savedMoq) {
        const parsed = parseInt(savedMoq, 10);
        if (!isNaN(parsed) && parsed > 0) setStoreMoq(parsed);
      }
      const savedBanner = localStorage.getItem("tradon_storefront_banner");
      if (savedBanner) setBannerText(savedBanner);
    } catch {
      // ignore
    }
  }, []);

  // Filtered product catalog
  const filteredProducts = useMemo(() => {
    return DEFAULT_PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Cart calculations
  const totalCartons = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const rawSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.cartonPrice * item.quantity, 0);
  }, [cart]);

  // Volume Rebate:
  // 50 - 99 cartons: 5%
  // 100+ cartons: 10%
  const rebatePercent = useMemo(() => {
    if (totalCartons >= 100) return 10;
    if (totalCartons >= 50) return 5;
    return 0;
  }, [totalCartons]);

  const rebateAmount = useMemo(() => {
    return (rawSubtotal * rebatePercent) / 100;
  }, [rawSubtotal, rebatePercent]);

  const discountedSubtotal = rawSubtotal - rebateAmount;
  const vatAmount = discountedSubtotal * 0.075; // 7.5% Nigerian VAT
  const logisticsFee = checkoutForm.deliveryMethod === "delivery" ? 25000 : 0; // Free for depot pickup
  const finalTotal = discountedSubtotal + vatAmount + logisticsFee;

  // Add / Update cart
  const handleAddToCart = (product: ProductItem) => {
    const qty = cardQuantities[product.id] || storeMoq;
    if (qty < 1) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });

    showToast(`Added ${qty} cartons of ${product.name} to Wholesale Cart!`);
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const getCardQuantity = (productId: string) => {
    return cardQuantities[productId] ?? storeMoq;
  };

  const setCardQuantity = (productId: string, qty: number) => {
    setCardQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty),
    }));
  };

  // Submit Order & Sync to Chi Dashboard
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (totalCartons < storeMoq) {
      alert(`Wholesale Minimum Order Quantity is ${storeMoq} Cartons. Please adjust your order.`);
      return;
    }

    if (!checkoutForm.businessName.trim() || !checkoutForm.phone.trim()) {
      alert("Please enter your Registered Business Name and Contact Phone Number.");
      return;
    }

    const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const paymentTermLabel =
      checkoutForm.paymentTerm === "transfer"
        ? "NIBSS Bank Transfer"
        : checkoutForm.paymentTerm === "credit"
        ? "30 Days Trade Credit"
        : "Cash on Depot Inspection";

    const formattedOrder = {
      id: String(Date.now()),
      orderId: orderNumber,
      date: today,
      distributor: checkoutForm.businessName,
      contactPerson: checkoutForm.contactName || "Store Representative",
      phone: checkoutForm.phone,
      status: "Processing" as const,
      total: `₦${finalTotal.toLocaleString()}`,
      depot: selectedDepot.name,
      paymentTerm: paymentTermLabel,
      source: "B2B Storefront",
      deliveryMethod: checkoutForm.deliveryMethod === "depot" ? "Depot Self-Pickup" : "Factory Truck Delivery",
      destinationAddress: checkoutForm.deliveryMethod === "depot" ? selectedDepot.address : checkoutForm.address,
      items: cart.map((item) => ({
        sku: item.product.sku,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: `₦${item.product.cartonPrice.toLocaleString()}`,
        total: `₦${(item.product.cartonPrice * item.quantity).toLocaleString()}`,
      })),
      summary: {
        rawSubtotal: `₦${rawSubtotal.toLocaleString()}`,
        rebate: rebateAmount > 0 ? `₦${rebateAmount.toLocaleString()} (${rebatePercent}%)` : "₦0",
        vat: `₦${vatAmount.toLocaleString()}`,
        logistics: logisticsFee > 0 ? `₦${logisticsFee.toLocaleString()}` : "Free (Depot Pickup)",
        grandTotal: `₦${finalTotal.toLocaleString()}`,
        totalCartons,
      },
    };

    // 1. Sync to tradon_orders in localStorage so Chi Manufacturer sees it immediately
    try {
      const existingOrdersRaw = localStorage.getItem("tradon_orders");
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      const updatedOrders = [formattedOrder, ...existingOrders];
      localStorage.setItem("tradon_orders", JSON.stringify(updatedOrders));

      // 2. Add in-app notification for Chi team
      const notifKey = "tradon_notifications";
      const existingNotifs = JSON.parse(localStorage.getItem(notifKey) || "[]");
      const newNotif = {
        id: `notif_${Date.now()}`,
        title: "New B2B Wholesaler Order Received",
        message: `${checkoutForm.businessName} placed order #${orderNumber} (${totalCartons} cartons • ₦${finalTotal.toLocaleString()}) via Storefront.`,
        time: "Just now",
        read: false,
        type: "order",
      };
      localStorage.setItem(notifKey, JSON.stringify([newNotif, ...existingNotifs]));

      // 3. Dispatch global browser events for real-time dashboard reactivity
      window.dispatchEvent(new Event("tradon_order_created"));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Storage sync error:", err);
    }

    // Set confirmed state
    setOrderConfirmed(formattedOrder);
    setIsCheckoutOpen(false);
    setCart([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            backgroundColor: "#0E3E2B",
            color: "#FFFFFF",
            padding: "14px 22px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(14, 62, 43, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: 600,
            animation: "slideIn 0.2s ease-out",
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Factory Announcement Bar */}
      <div
        style={{
          backgroundColor: "#0A2D1F",
          color: "#E2E8F0",
          padding: "9px 16px",
          fontSize: "12.5px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <Sparkles size={14} color="#F59E0B" />
          <span>{bannerText}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#10B981", fontSize: "11.5px", fontWeight: 700 }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#10B981" }} />
            Factory Line Active
          </span>
          <Link
            href="/orders"
            style={{
              color: "#94A3B8",
              textDecoration: "none",
              fontSize: "11.5px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Chi Admin Portal <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Brand Logo & Wholesaler Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              {(config.logoStyle === "icon" || config.logoStyle === "combo" || !config.logoStyle) && (
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "#0E3E2B",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 900,
                    fontSize: "16px",
                    boxShadow: "0 4px 10px rgba(14, 62, 43, 0.15)",
                  }}
                >
                  CHI
                </div>
              )}
              {(config.logoStyle === "wordmark" || config.logoStyle === "combo" || !config.logoStyle) && (
                <span style={{ fontSize: "22px", fontWeight: 800, color: "#0E3E2B", letterSpacing: "-0.5px" }}>
                  Chi Limited
                </span>
              )}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    backgroundColor: "#F1F5F9",
                    color: "#475569",
                    fontSize: "11px",
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  Direct B2B Portal
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                Wholesale Carton Distribution & Factory Gate Dispatch
              </p>
            </div>
          </div>

          {/* Depot Selector Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FFFFFF",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
              }}
            >
              <Building2 size={16} color="#64748B" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "11px", fontWeight: 500, color: "#94A3B8" }}>
                  Dispatching Depot
                </span>
                <select
                  value={selectedDepot.id}
                  onChange={(e) => {
                    const found = DEPOTS.find((d) => d.id === e.target.value);
                    if (found) setSelectedDepot(found);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#334155",
                    outline: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {DEPOTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search SKU or Product */}
          <div
            style={{
              flex: "1 1 260px",
              maxWidth: "380px",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={16}
              color="#64748B"
              style={{ position: "absolute", left: "12px", pointerEvents: "none" }}
            />
            <input
              type="text"
              placeholder="Search Chi SKUs, juices, dairy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px 9px 36px",
                fontSize: "13.5px",
                backgroundColor: "#F8FAFC",
                border: "1px solid #CBD5E1",
                borderRadius: "9px",
                outline: "none",
                color: "#0F172A",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94A3B8",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              backgroundColor: totalCartons > 0 ? "#10B981" : "#FFFFFF",
              color: totalCartons > 0 ? "#FFFFFF" : "#334155",
              border: `1px solid ${totalCartons > 0 ? "#10B981" : "#E2E8F0"}`,
              padding: "9px 20px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <ShoppingBag size={18} />
            <span>Wholesale Cart</span>
            <span
              style={{
                backgroundColor: totalCartons > 0 ? "rgba(255,255,255,0.2)" : "#F1F5F9",
                color: totalCartons > 0 ? "#FFFFFF" : "#64748B",
                padding: "2px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {totalCartons}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Wholesale Banner */}
      <section
        style={{
          backgroundColor: "#FAFAFA",
          color: "#334155",
          padding: "40px 24px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "30px", flexWrap: "wrap" }}>
            <div style={{ maxWidth: "680px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  color: "#64748B",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 500,
                  marginBottom: "14px",
                }}
              >
                <ShieldCheck size={14} />
                <span>Licensed Distributors & Wholesalers Exclusive</span>
              </div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 500,
                  lineHeight: 1.2,
                  marginBottom: "12px",
                  color: "#0F172A",
                }}
              >
                Direct Ex-Factory Ordering
              </h1>
              <p
                style={{
                  fontSize: "15px",
                  color: "#64748B",
                  lineHeight: 1.55,
                  marginBottom: "20px",
                }}
              >
                Order directly in master carton lots from Chi factory gates. Benefit from automated volume discounts, genuine freshness dates, and direct dispatch to your staging depot.
              </p>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "#64748B" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Package size={16} />
                  <span>MOQ: {storeMoq} Cartons</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Truck size={16} />
                  <span>{selectedDepot.eta} ({selectedDepot.name.split(" ")[0]})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileText size={16} />
                  <span>NIBSS Instant Transfer & 30-Day Credit Line</span>
                </div>
              </div>
            </div>

            {/* Tiered Bulk Rebate Box */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "20px 24px",
                border: "1px solid #E2E8F0",
                maxWidth: "380px",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Percent size={16} color="#64748B" />
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#334155" }}>
                  Volume Rebate Schedule
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <span style={{ color: "#64748B" }}>10 – 49 Cartons</span>
                  <span style={{ fontWeight: 500, color: "#334155" }}>Standard</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <span style={{ color: "#64748B" }}>50 – 99 Cartons</span>
                  <span style={{ fontWeight: 500, color: "#10B981" }}>5% Off</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                  }}
                >
                  <span style={{ color: "#64748B" }}>100+ Cartons</span>
                  <span style={{ fontWeight: 500, color: "#10B981" }}>10% Off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px 64px 24px" }}>
        {/* Category Pills & View Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "All", label: "All Products" },
              { id: "Juice", label: "Chivita & Fruit Juices" },
              { id: "Dairy", label: "Hollandia Yoghurt & Milk" },
              { id: "Snacks", label: "Snacks & Confectionery" },
            ].map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: active ? "1px solid #0E3E2B" : "1px solid #CBD5E1",
                    backgroundColor: active ? "#0E3E2B" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#475569",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>
            Showing <strong>{filteredProducts.length}</strong> master SKUs in {selectedDepot.name.split(" ")[0]}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px dashed #CBD5E1",
            }}
          >
            <Package size={40} color="#94A3B8" style={{ margin: "0 auto 12px auto" }} />
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1E293B" }}>No wholesale products match your search</h3>
            <p style={{ fontSize: "13.5px", color: "#64748B", marginTop: "4px" }}>
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              style={{
                marginTop: "16px",
                padding: "8px 18px",
                backgroundColor: "#0E3E2B",
                color: "#FFFFFF",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredProducts.map((product) => {
              const currentQty = getCardQuantity(product.id);
              const cardTotal = product.cartonPrice * currentQty;

              return (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  {/* Minimalistic Product Image Fallback */}
                  <div
                    style={{
                      height: "160px",
                      backgroundColor: "#F8FAFC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottom: "1px solid #F1F5F9",
                      position: "relative",
                    }}
                  >
                    <div style={{ fontSize: "28px", fontWeight: 500, color: "#CBD5E1", letterSpacing: "-1px" }}>
                      {product.name.substring(0, 3).toUpperCase()}
                    </div>

                    {/* Stock Status Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        backgroundColor: product.stock > 500 ? "#DCFCE7" : "#FEF3C7",
                        color: product.stock > 500 ? "#15803D" : "#B45309",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: product.stock > 500 ? "#15803D" : "#B45309",
                        }}
                      />
                      {product.stock.toLocaleString()} Cartons Available
                    </div>

                    {/* SKU tag */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor: "#FFFFFF",
                        color: "#64748B",
                        fontSize: "11px",
                        fontWeight: 500,
                        padding: "4px 8px",
                        borderRadius: "6px",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      {product.sku}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ marginBottom: "12px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#0E3E2B",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {product.category}
                      </span>
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 500,
                          color: "#334155",
                          margin: "4px 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {product.name}
                      </h3>
                      <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0 }}>
                        {product.subName}
                      </p>
                    </div>

                    {/* Carton Price vs Unit Price */}
                    <div
                      style={{
                        backgroundColor: "#F8FAFC",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "11px", color: "#64748B", display: "block" }}>
                          Carton Ex-Factory
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: 500, color: "#334155" }}>
                          ₦{product.cartonPrice.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "11px", color: "#64748B", display: "block" }}>
                          Pack Cost ({product.packSize.split("•")[0].trim()})
                        </span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
                          ~₦{product.unitPrice.toLocaleString()} / unit
                        </span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Add Button */}
                    <div style={{ marginTop: "auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #CBD5E1",
                            borderRadius: "8px",
                            overflow: "hidden",
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          <button
                            onClick={() => setCardQuantity(product.id, currentQty - 5)}
                            style={{
                              padding: "6px 10px",
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              color: "#475569",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={currentQty}
                            onChange={(e) => setCardQuantity(product.id, parseInt(e.target.value, 10) || 1)}
                            style={{
                              width: "52px",
                              textAlign: "center",
                              border: "none",
                              outline: "none",
                              fontSize: "13.5px",
                              fontWeight: 700,
                              color: "#0F172A",
                              padding: "4px 0",
                            }}
                          />
                          <button
                            onClick={() => setCardQuantity(product.id, currentQty + 5)}
                            style={{
                              padding: "6px 10px",
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              color: "#475569",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Quick Presets */}
                        <div style={{ display: "flex", gap: "4px" }}>
                          {[10, 25, 50].map((preset) => (
                            <button
                              key={preset}
                              onClick={() => setCardQuantity(product.id, preset)}
                              style={{
                                padding: "5px 8px",
                                fontSize: "11px",
                                fontWeight: 700,
                                border: currentQty === preset ? "1px solid #0E3E2B" : "1px solid #E2E8F0",
                                backgroundColor: currentQty === preset ? "#DCFCE7" : "#FFFFFF",
                                color: currentQty === preset ? "#0E3E2B" : "#64748B",
                                borderRadius: "6px",
                                cursor: "pointer",
                              }}
                            >
                              +{preset}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          width: "100%",
                          padding: "10px 18px",
                          backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          cursor: "pointer",
                          boxShadow: "none",
                          transition: "background-color 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#059669" : "#125139")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#10B981" : "#0E3E2B")}
                      >
                        <ShoppingBag size={15} />
                        <span>Add {currentQty} Cartons (₦{cardTotal.toLocaleString()})</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Wholesale Cart Slide-over Drawer */}
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "100%",
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 25px rgba(0, 0, 0, 0.15)",
              animation: "slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F8FAFC",
              }}
            >
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#334155", margin: 0 }}>
                  Wholesale Order Cart
                </h2>
                <span style={{ fontSize: "12.5px", color: "#64748B" }}>
                  {totalCartons} Cartons • {cart.length} Master SKUs
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748B",
                  cursor: "pointer",
                  padding: "6px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <ShoppingBag size={48} color="#CBD5E1" style={{ margin: "0 auto 12px auto" }} />
                  <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#334155" }}>
                    Your wholesale cart is empty
                  </h4>
                  <p style={{ fontSize: "13px", color: "#64748B", marginTop: "4px" }}>
                    Add at least {storeMoq} cartons from the product catalog to begin checkout.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      style={{
                        display: "flex",
                        gap: "14px",
                        padding: "14px",
                        borderRadius: "10px",
                        border: "1px solid #E2E8F0",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: "#F8FAFC",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          border: "1px solid #F1F5F9",
                          fontSize: "16px",
                          color: "#CBD5E1",
                          fontWeight: 500,
                        }}
                      >
                        {item.product.name.substring(0, 3).toUpperCase()}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <h4 style={{ fontSize: "14px", fontWeight: 500, color: "#334155", margin: "0 0 4px 0" }}>
                              {item.product.name}
                            </h4>
                            <span style={{ fontSize: "11px", color: "#64748B" }}>
                              SKU: {item.product.sku}
                            </span>
                          </div>
                          <button
                            onClick={() => updateCartItemQuantity(item.product.id, 0)}
                            style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "2px" }}
                            title="Remove"
                          >
                            <X size={15} />
                          </button>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          {/* Stepper */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid #CBD5E1",
                              borderRadius: "6px",
                              overflow: "hidden",
                              height: "28px",
                            }}
                          >
                            <button
                              onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 5)}
                              style={{ padding: "0 8px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ padding: "0 10px", fontSize: "13px", fontWeight: 500 }}>
                              {item.quantity} ctn
                            </span>
                            <button
                              onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 5)}
                              style={{ padding: "0 8px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span style={{ fontSize: "14px", fontWeight: 500, color: "#334155" }}>
                            ₦{(item.product.cartonPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer / Summary */}
            {cart.length > 0 && (
              <div
                style={{
                  padding: "20px 24px",
                  borderTop: "1px solid #E2E8F0",
                  backgroundColor: "#F8FAFC",
                }}
              >
                {/* MOQ Status */}
                {totalCartons < storeMoq && (
                  <div
                    style={{
                      padding: "10px 12px",
                      backgroundColor: "#FEF2F2",
                      border: "1px solid #FCA5A5",
                      borderRadius: "8px",
                      marginBottom: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12.5px",
                      color: "#991B1B",
                    }}
                  >
                    <AlertCircle size={16} color="#DC2626" />
                    <span>
                      MOQ Requirement: Add <strong>{storeMoq - totalCartons} more cartons</strong> to reach minimum factory order.
                    </span>
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B" }}>
                    <span>Gross Subtotal ({totalCartons} Cartons)</span>
                    <span style={{ color: "#0F172A", fontWeight: 600 }}>₦{rawSubtotal.toLocaleString()}</span>
                  </div>

                  {rebateAmount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#059669", fontWeight: 700 }}>
                      <span>Automated Bulk Rebate ({rebatePercent}%)</span>
                      <span>-₦{rebateAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B" }}>
                    <span>Statutory VAT (7.5%)</span>
                    <span style={{ color: "#0F172A", fontWeight: 600 }}>₦{vatAmount.toLocaleString()}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B" }}>
                    <span>Depot Dispatch & Staging</span>
                    <span style={{ color: "#10B981", fontWeight: 700 }}>Free (Depot Pickup)</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0E3E2B",
                      borderTop: "1px solid #E2E8F0",
                      paddingTop: "10px",
                      marginTop: "6px",
                    }}
                  >
                    <span>Estimated Total</span>
                    <span>₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  disabled={totalCartons < storeMoq}
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    backgroundColor: totalCartons >= storeMoq ? (isDark ? "#10B981" : "#0E3E2B") : "#94A3B8",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: totalCartons >= storeMoq ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "none",
                  }}
                >
                  <span>Proceed to Wholesale Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wholesale B2B Checkout Modal */}
      {isCheckoutOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsCheckoutOpen(false)}
        >
          <div
            style={{
              backgroundColor: isDark ? "#11241B" : "#FFFFFF",
              borderRadius: "18px",
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #E2E8F0",
              color: isDark ? "#F1F5F9" : "#0F172A",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: isDark ? "#10B981" : "#0E3E2B", textTransform: "uppercase" }}>
                  Official B2B Order Form
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: isDark ? "#F1F5F9" : "#0F172A", margin: "2px 0 0 0" }}>
                  Confirm Direct Factory Order
                </h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Distributor Business Details */}
              <div style={{ backgroundColor: "#F8FAFC", padding: "16px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "12px" }}>
                  1. Registered Business & Contact Information
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                      Registered Business / Enterprise Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. MegaStores Wholesalers Ltd"
                      value={checkoutForm.businessName}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, businessName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        fontSize: "13px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                      Contact Representative Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alhaji Ibrahim / Chief Okafor"
                      value={checkoutForm.contactName}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, contactName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        fontSize: "13px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                      Official Phone Number (Waybill SMS) *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+234 803 000 0000"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        fontSize: "13px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                      Email for Proforma Invoice & VAT
                    </label>
                    <input
                      type="email"
                      placeholder="procurement@business.ng"
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        fontSize: "13px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery / Depot Option */}
              <div style={{ backgroundColor: "#F8FAFC", padding: "16px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "12px" }}>
                  2. Dispatch & Logistics Method
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                  <label
                    style={{
                      border: checkoutForm.deliveryMethod === "depot" ? "1.5px solid #0E3E2B" : "1px solid #CBD5E1",
                      backgroundColor: checkoutForm.deliveryMethod === "depot" ? "#DCFCE7" : "#FFFFFF",
                      padding: "12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={checkoutForm.deliveryMethod === "depot"}
                      onChange={() => setCheckoutForm({ ...checkoutForm, deliveryMethod: "depot" })}
                      style={{ marginTop: "3px" }}
                    />
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", display: "block" }}>
                        Depot Self-Pickup (Free)
                      </span>
                      <span style={{ fontSize: "11.5px", color: "#64748B" }}>
                        Collect at {selectedDepot.name.split(" ")[0]} loading bay with your truck.
                      </span>
                    </div>
                  </label>

                  <label
                    style={{
                      border: checkoutForm.deliveryMethod === "delivery" ? "1.5px solid #0E3E2B" : "1px solid #CBD5E1",
                      backgroundColor: checkoutForm.deliveryMethod === "delivery" ? "#DCFCE7" : "#FFFFFF",
                      padding: "12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={checkoutForm.deliveryMethod === "delivery"}
                      onChange={() => setCheckoutForm({ ...checkoutForm, deliveryMethod: "delivery" })}
                      style={{ marginTop: "3px" }}
                    />
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", display: "block" }}>
                        Factory Truck Dispatch
                      </span>
                      <span style={{ fontSize: "11.5px", color: "#64748B" }}>
                        Chi Logistics truck delivers to your warehouse address (+₦25,000).
                      </span>
                    </div>
                  </label>
                </div>

                {checkoutForm.deliveryMethod === "delivery" && (
                  <div>
                    <label style={{ fontSize: "11.5px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>
                      Wholesale Warehouse Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Street, City, State, Landmark for offloading"
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        fontSize: "12.5px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        outline: "none",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Payment Terms */}
              <div style={{ backgroundColor: "#F8FAFC", padding: "16px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "12px" }}>
                  3. Settlement & Payment Terms
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { id: "transfer", title: "Direct NIBSS Instant Bank Transfer (Recommended)", desc: "Zenith Bank Virtual Escrow Account generated on invoice confirmation." },
                    { id: "credit", title: "30-Day Verified Trade Credit Line", desc: "For Chi Limited authorized distributor network partners with active credit limits." },
                    { id: "depot_cash", title: "Depot Bank Draft / Cashier Point", desc: "Pay at factory loading bay prior to pallet dispatch." },
                  ].map((term) => (
                    <label
                      key={term.id}
                      style={{
                        border: checkoutForm.paymentTerm === term.id ? "1.5px solid #0E3E2B" : "1px solid #CBD5E1",
                        backgroundColor: checkoutForm.paymentTerm === term.id ? "#DCFCE7" : "#FFFFFF",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentTerm"
                        checked={checkoutForm.paymentTerm === term.id}
                        onChange={() => setCheckoutForm({ ...checkoutForm, paymentTerm: term.id as any })}
                        style={{ marginTop: "3px" }}
                      />
                      <div>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", display: "block" }}>
                          {term.title}
                        </span>
                        <span style={{ fontSize: "11.5px", color: "#64748B" }}>{term.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Final Total Review */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "#0A2D1F",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <span style={{ fontSize: "11.5px", color: "#94A3B8", textTransform: "uppercase" }}>
                    Total Invoiced Order Value
                  </span>
                  <div style={{ fontSize: "22px", fontWeight: 900 }}>₦{finalTotal.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 700, display: "block" }}>
                    {totalCartons} Cartons Total
                  </span>
                  <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                    {selectedDepot.name.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: isDark ? "#162E23" : "#F1F5F9",
                    color: isDark ? "#CBD5E1" : "#475569",
                    border: isDark ? "1px solid rgba(255,255,255,0.15)" : "none",
                    borderRadius: "9999px",
                    fontSize: "13.5px",
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
                    flex: 2,
                    padding: "12px",
                    backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "none",
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Transmit Official Wholesale Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Confirmed Success Modal */}
      {orderConfirmed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 120,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: isDark ? "#11241B" : "#FFFFFF",
              borderRadius: "18px",
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid #E2E8F0",
              maxWidth: "560px",
              width: "100%",
              padding: "32px",
              textAlign: "center",
              boxShadow: "none",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: isDark ? "rgba(16, 185, 129, 0.2)" : "#DCFCE7",
                color: isDark ? "#10B981" : "#166534",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
              }}
            >
              <CheckCircle2 size={36} color={isDark ? "#10B981" : "#166534"} />
            </div>

            <span
              style={{
                backgroundColor: isDark ? "rgba(16, 185, 129, 0.2)" : "#DCFCE7",
                color: isDark ? "#34D399" : "#166534",
                fontSize: "11px",
                fontWeight: 800,
                padding: "3px 12px",
                borderRadius: "9999px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Order Transmitted to Chi Limited
            </span>

            <h2 style={{ fontSize: "22px", fontWeight: 800, color: isDark ? "#F1F5F9" : "#0F172A", margin: "14px 0 8px 0" }}>
              Order #{orderConfirmed.orderId} Confirmed
            </h2>
            <p style={{ fontSize: "13.5px", color: isDark ? "#CBD5E1" : "#475569", margin: 0, lineHeight: 1.55 }}>
              Thank you, <strong style={{ color: isDark ? "#F1F5F9" : "#0F172A" }}>{orderConfirmed.distributor}</strong>. Your wholesale order of{" "}
              <strong style={{ color: isDark ? "#F1F5F9" : "#0F172A" }}>{orderConfirmed.summary.totalCartons} cartons</strong> has been routed to the{" "}
              <strong style={{ color: isDark ? "#F1F5F9" : "#0F172A" }}>{orderConfirmed.depot}</strong> for staging.
            </p>

            {/* Invoiced Details Box */}
            <div
              style={{
                margin: "20px 0",
                padding: "16px",
                backgroundColor: isDark ? "#162E23" : "#F8FAFC",
                borderRadius: "12px",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #E2E8F0",
                textAlign: "left",
                fontSize: "12.5px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: isDark ? "#94A3B8" : "#64748B" }}>Order Value</span>
                <span style={{ fontWeight: 800, color: isDark ? "#10B981" : "#0E3E2B" }}>{orderConfirmed.total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: isDark ? "#94A3B8" : "#64748B" }}>Payment Terms</span>
                <span style={{ fontWeight: 600, color: isDark ? "#F1F5F9" : "#0F172A" }}>{orderConfirmed.paymentTerm}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: isDark ? "#94A3B8" : "#64748B" }}>Settlement Account</span>
                <span style={{ fontWeight: 700, color: isDark ? "#F1F5F9" : "#0F172A" }}>Zenith Bank #1029482910</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: isDark ? "#94A3B8" : "#64748B" }}>Fulfillment Depot</span>
                <span style={{ fontWeight: 600, color: isDark ? "#F1F5F9" : "#0F172A" }}>{orderConfirmed.depot}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link
                href="/orders"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  borderRadius: "9999px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "none",
                }}
              >
                <span>View in Chi Manufacturer Dashboard (`/orders`)</span>
                <ExternalLink size={14} />
              </Link>

              <button
                onClick={() => {
                  setOrderConfirmed(null);
                }}
                style={{
                  width: "100%",
                  padding: "11px",
                  backgroundColor: "transparent",
                  color: isDark ? "#E2E8F0" : "#475569",
                  border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #CBD5E1",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "none",
                }}
              >
                Back to Wholesale Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#0A2D1F",
          color: "#94A3B8",
          padding: "36px 24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: "12.5px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span style={{ fontWeight: 700, color: "#FFFFFF" }}>Chi Limited Direct Wholesale Commerce</span>
            <p style={{ margin: "4px 0 0 0" }}>
              14 Chivita Avenue, Ajao Estate, Lagos, Nigeria • CAC RC 12345 • Powered by Tradon Distribution OS
            </p>
          </div>
          <div style={{ display: "flex", gap: "18px" }}>
            <Link href="/settings" style={{ color: "#E2E8F0", textDecoration: "none" }}>
              Storefront Settings
            </Link>
            <Link href="/orders" style={{ color: "#E2E8F0", textDecoration: "none" }}>
              Manufacturer Orders
            </Link>
            <Link href="/login" style={{ color: "#E2E8F0", textDecoration: "none" }}>
              Distributor Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
