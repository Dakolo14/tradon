"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  Download, 
  X, 
  CheckCircle2, 
  Printer, 
  Clock, 
  Truck, 
  Package, 
  AlertCircle,
  FileText,
  ExternalLink
} from "lucide-react";

interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: string;
  total: string;
}

interface Order {
  id: string;
  orderId: string;
  date: string;
  distributor: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: string;
  depot: string;
  paymentTerm: string;
  items: OrderItem[];
  source?: string;
  contactPerson?: string;
  phone?: string;
  deliveryMethod?: string;
  destinationAddress?: string;
}

const initialOrders: Order[] = [
  { 
    id: "1", 
    orderId: "ORD-2026-0901", 
    date: "Sep 01, 2026", 
    distributor: "Yusuf Ibrahim Distributors", 
    status: "Delivered", 
    total: "₦1,200,000",
    depot: "Kano Depot",
    paymentTerm: "14 Days Credit",
    items: [
      { sku: "CH-WT-75", name: "Chivita Exotic 315ml", quantity: 100, unitPrice: "₦11,000", total: "₦1,100,000" },
      { sku: "CH-SN-PB", name: "Chi Snacks Plantain", quantity: 20, unitPrice: "₦5,000", total: "₦100,000" }
    ]
  },
  { 
    id: "2", 
    orderId: "ORD-2026-0902", 
    date: "Sep 02, 2026", 
    distributor: "Emeka Okafor Enterprises", 
    status: "Shipped", 
    total: "₦850,000",
    depot: "Lagos Main Warehouse",
    paymentTerm: "Cash on Delivery",
    items: [
      { sku: "HOL-YOG-1L", name: "Hollandia Yoghurt Strawberry", quantity: 60, unitPrice: "₦14,000", total: "₦840,000" },
      { sku: "CH-SN-PB", name: "Chi Snacks Plantain", quantity: 2, unitPrice: "₦5,000", total: "₦10,000" }
    ]
  },
  { 
    id: "3", 
    orderId: "ORD-2026-0903", 
    date: "Sep 03, 2026", 
    distributor: "Alhaji Musa Traders", 
    status: "Processing", 
    total: "₦4,500,000",
    depot: "Kano Depot",
    paymentTerm: "30 Days Credit",
    items: [
      { sku: "CH-WT-75", name: "Chivita Exotic 315ml", quantity: 300, unitPrice: "₦11,000", total: "₦3,300,000" },
      { sku: "HOL-EVP-200", name: "Hollandia Evaporated Milk", quantity: 100, unitPrice: "₦12,000", total: "₦1,200,000" }
    ]
  },
  { 
    id: "4", 
    orderId: "ORD-2026-0904", 
    date: "Sep 04, 2026", 
    distributor: "Eko FMCG Hub", 
    status: "Pending", 
    total: "₦2,100,000",
    depot: "Lagos Main Warehouse",
    paymentTerm: "14 Days Credit",
    items: [
      { sku: "CH-CG-50", name: "Chi Capri-Sun Orange", quantity: 200, unitPrice: "₦8,800", total: "₦1,760,000" },
      { sku: "CH-LU-50", name: "Chi Lucozade Boost", quantity: 35, unitPrice: "₦9,600", total: "₦336,000" }
    ]
  },
  { 
    id: "5", 
    orderId: "ORD-2026-0905", 
    date: "Sep 04, 2026", 
    distributor: "PH Riverside Supplies", 
    status: "Cancelled", 
    total: "₦300,000",
    depot: "Port Harcourt Hub",
    paymentTerm: "Cash on Delivery",
    items: [
      { sku: "CH-SN-PB", name: "Chi Snacks Plantain", quantity: 60, unitPrice: "₦5,000", total: "₦300,000" }
    ]
  },
  { 
    id: "6", 
    orderId: "ORD-2026-0906", 
    date: "Sep 05, 2026", 
    distributor: "Ojo & Sons Beverages", 
    status: "Pending", 
    total: "₦950,000",
    depot: "Ibadan Staging Center",
    paymentTerm: "14 Days Credit",
    items: [
      { sku: "CH-WT-75", name: "Chivita Exotic 315ml", quantity: 80, unitPrice: "₦11,000", total: "₦880,000" },
      { sku: "CH-SN-PB", name: "Chi Snacks Plantain", quantity: 14, unitPrice: "₦5,000", total: "₦70,000" }
    ]
  },
  { 
    id: "7", 
    orderId: "ORD-2026-0907", 
    date: "Sep 05, 2026", 
    distributor: "Grace Stores Modern Trade", 
    status: "Processing", 
    total: "₦1,800,000",
    depot: "Abuja Distribution Center",
    paymentTerm: "30 Days Credit",
    items: [
      { sku: "HOL-EVP-200", name: "Hollandia Evaporated Milk", quantity: 150, unitPrice: "₦12,000", total: "₦1,800,000" }
    ]
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Sync orders from B2B Wholesaler Storefront (/shop) stored in localStorage
  useEffect(() => {
    const loadStoredOrders = () => {
      try {
        const stored = localStorage.getItem("tradon_orders");
        if (stored) {
          const parsed: Order[] = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const initialIds = new Set(initialOrders.map((o) => o.orderId));
            const newOrders = parsed.filter((o) => !initialIds.has(o.orderId));
            setOrders([...newOrders, ...initialOrders]);
          }
        }
      } catch (err) {
        console.error("Failed to load stored orders", err);
      }
    };

    loadStoredOrders();

    window.addEventListener("tradon_order_created", loadStoredOrders);
    window.addEventListener("storage", loadStoredOrders);
    return () => {
      window.removeEventListener("tradon_order_created", loadStoredOrders);
      window.removeEventListener("storage", loadStoredOrders);
    };
  }, []);

  // Modals
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<Order | null>(null);
  const [statusModalOrder, setStatusModalOrder] = useState<Order | null>(null);
  const [newStatusValue, setNewStatusValue] = useState<Order["status"]>("Processing");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Order Form
  const [newDistributor, setNewDistributor] = useState("Alhaji Musa Traders");
  const [newDepot, setNewDepot] = useState("Lagos Main Warehouse");
  const [newSKU, setNewSKU] = useState("Chivita Exotic 315ml (CH-WT-75)");
  const [newQuantity, setNewQuantity] = useState(50);
  const [newPaymentTerm, setNewPaymentTerm] = useState("14 Days Credit");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `ORD-2026-09${orders.length + 8}`;
    const unitPriceNum = 11000;
    const calcTotal = unitPriceNum * newQuantity;

    const newOrder: Order = {
      id: String(Date.now()),
      orderId: orderNumber,
      date: "Today",
      distributor: newDistributor,
      status: "Processing",
      total: `₦${calcTotal.toLocaleString()}`,
      depot: newDepot,
      paymentTerm: newPaymentTerm,
      items: [
        {
          sku: "CH-WT-75",
          name: newSKU,
          quantity: newQuantity,
          unitPrice: `₦${unitPriceNum.toLocaleString()}`,
          total: `₦${calcTotal.toLocaleString()}`
        }
      ]
    };

    setOrders([newOrder, ...orders]);
    setIsNewOrderModalOpen(false);
    showToast(`Created order ${newOrder.orderId} for ${newOrder.distributor}`);
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalOrder) return;

    setOrders(orders.map(o => {
      if (o.id === statusModalOrder.id) {
        return { ...o, status: newStatusValue };
      }
      return o;
    }));

    showToast(`Order ${statusModalOrder.orderId} status set to ${newStatusValue}`);
    setStatusModalOrder(null);
    setActiveMenuId(null);
  };

  const handleCancelOrder = (id: string) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        return { ...o, status: "Cancelled" };
      }
      return o;
    }));
    setActiveMenuId(null);
    showToast("Order marked as Cancelled");
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.distributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.depot.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered": return { bg: "#F0FDF4", text: "#16A34A" };
      case "Shipped": return { bg: "#EFF6FF", text: "#3B82F6" };
      case "Processing": return { bg: "#FFFBEB", text: "#D97706" };
      case "Pending": return { bg: "#F1F5F9", text: "#64748B" };
      case "Cancelled": return { bg: "#FEF2F2", text: "#EF4444" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", paddingBottom: "36px" }}>
      
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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
        <div>
          <h1 style={{ fontWeight: 700, color: "#0E3E2B", margin: 0 }} className="text-xl sm:text-2xl">
            Orders & Wholesale Fulfillment
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Track and dispatch wholesale dealer orders, print depot waybills, and manage fulfillment lifecycles.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }} className="gap-2 sm:gap-3">
          <Link
            href="/shop"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(14,62,43,0.06)",
              color: "#0E3E2B",
              border: "1px solid rgba(14,62,43,0.18)",
              borderRadius: "9999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
            className="h-9 sm:h-10 px-3.5 sm:px-4 text-xs sm:text-sm hover:bg-black/5"
          >
            <ExternalLink size={14} />
            Live Storefront (/shop)
          </Link>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#FFFFFF",
              color: "#0E3E2B",
              border: "1px solid rgba(14,62,43,0.2)",
              borderRadius: "9999px",
              fontWeight: 600,
              cursor: "pointer",
            }}
            className="h-9 sm:h-10 px-3.5 sm:px-4 text-xs sm:text-sm hover:bg-black/5"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#0E3E2B",
              color: "#FFFFFF",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
            className="h-9 sm:h-10 px-3.5 sm:px-5 text-xs sm:text-sm hover:bg-[#08281B]"
          >
            <Plus size={15} />
            Create Order
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", width: "100%" }}>
        <div style={{ position: "relative", flexGrow: 1, width: "100%", maxWidth: "420px" }}>
          <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
            <Search size={15} />
          </div>
          <input
            type="text"
            placeholder="Search by Order ID, Distributor, or Depot..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              height: "38px",
              paddingLeft: "38px",
              paddingRight: "16px",
              borderRadius: "9999px",
              border: "1px solid rgba(14,62,43,0.15)",
              backgroundColor: "#FFFFFF",
              fontSize: "12.5px",
              color: "#0E3E2B",
              outline: "none",
            }}
          />
        </div>
        
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", maxWidth: "100%", paddingBottom: "2px", whiteSpace: "nowrap" }} className="no-scrollbar">
          {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              style={{
                height: "34px",
                padding: "0 12px",
                borderRadius: "9999px",
                fontSize: "11.5px",
                fontWeight: 600,
                cursor: "pointer",
                border: statusFilter === tab ? "none" : "1px solid rgba(14,62,43,0.12)",
                backgroundColor: statusFilter === tab ? "#0E3E2B" : "#FFFFFF",
                color: statusFilter === tab ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                flexShrink: 0,
              }}
              className="hover:bg-black/5"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(14,62,43,0.08)", backgroundColor: "rgba(14,62,43,0.02)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Order ID</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Distributor Dealer</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Fulfillment Depot</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Amount</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o, index) => (
              <tr key={o.id} style={{ borderBottom: index !== filteredOrders.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, fontFamily: "monospace", color: "#0E3E2B" }}>{o.orderId}</span>
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "13px", color: "rgba(14,62,43,0.7)" }}>{o.date}</span>
                </td>
                <td style={{ padding: "16px 24px", minWidth: "180px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{o.distributor}</span>
                      {o.source === "B2B Storefront" && (
                        <span
                          style={{
                            backgroundColor: "#DCFCE7",
                            color: "#166534",
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "1px 6px",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                          }}
                        >
                          Direct Storefront
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{o.paymentTerm}</span>
                  </div>
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "13px", color: "#0E3E2B" }}>{o.depot}</span>
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    padding: "3px 10px", 
                    borderRadius: "9999px", 
                    fontSize: "11px", 
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    backgroundColor: getStatusColor(o.status).bg,
                    color: getStatusColor(o.status).text
                  }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#0E3E2B" }}>
                    {o.total}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right", whiteSpace: "nowrap", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                    <button
                      onClick={() => setSelectedOrderReceipt(o)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "transparent",
                        border: "1px solid rgba(14,62,43,0.2)",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0E3E2B",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                      className="hover:bg-black/5"
                    >
                      <FileText size={13} />
                      Receipt
                    </button>

                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === o.id ? null : o.id)}
                      style={{ 
                        width: "32px", 
                        height: "32px", 
                        borderRadius: "8px", 
                        border: "1px solid rgba(14,62,43,0.12)", 
                        backgroundColor: "#FFFFFF", 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        color: "rgba(14,62,43,0.6)" 
                      }} 
                      className="hover:text-[#0E3E2B]"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {activeMenuId === o.id && (
                    <div 
                      style={{ 
                        position: "absolute", 
                        right: "24px", 
                        top: "54px", 
                        zIndex: 50, 
                        backgroundColor: "#FFFFFF", 
                        borderRadius: "12px", 
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)", 
                        border: "1px solid rgba(14,62,43,0.1)", 
                        minWidth: "200px", 
                        padding: "6px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        textAlign: "left"
                      }}
                    >
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          setSelectedOrderReceipt(o);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#0E3E2B",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          width: "100%",
                          textAlign: "left"
                        }}
                        className="hover:bg-black/5"
                      >
                        <FileText size={14} />
                        View Order Details
                      </button>

                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          setStatusModalOrder(o);
                          setNewStatusValue(o.status);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#0E3E2B",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          width: "100%",
                          textAlign: "left"
                        }}
                        className="hover:bg-black/5"
                      >
                        <Truck size={14} />
                        Update Fulfillment Status
                      </button>

                      <button
                        onClick={() => handleCancelOrder(o.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#EF4444",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          width: "100%",
                          textAlign: "left"
                        }}
                        className="hover:bg-red-50"
                      >
                        <AlertCircle size={14} />
                        Cancel Order
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "48px 24px", textAlign: "center", color: "rgba(14,62,43,0.5)", fontSize: "14px" }}>
                  No orders found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: CREATE ORDER */}
      {isNewOrderModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsNewOrderModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Create Wholesale Order</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Book an incoming distributor PO and assign to a regional dispatch warehouse.
            </p>

            <form onSubmit={handleCreateOrder} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Select Distributor *</label>
                <select
                  value={newDistributor}
                  onChange={(e) => setNewDistributor(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Alhaji Musa Traders">Alhaji Musa Traders (Kano)</option>
                  <option value="Lagos Island Beverages">Lagos Island Beverages (Lagos)</option>
                  <option value="Mama Tope Stores">Mama Tope Stores (Ibadan)</option>
                  <option value="Eko FMCG Hub">Eko FMCG Hub (Lagos)</option>
                  <option value="PH Riverside Supplies">PH Riverside Supplies (Port Harcourt)</option>
                  <option value="Grace Stores Modern Trade">Grace Stores Modern Trade (Abuja)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Dispatch Depot *</label>
                  <select
                    value={newDepot}
                    onChange={(e) => setNewDepot(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="Lagos Main Warehouse">Lagos Main Warehouse</option>
                    <option value="Abuja Distribution Center">Abuja Distribution Center</option>
                    <option value="Kano Depot">Kano Depot</option>
                    <option value="Port Harcourt Hub">Port Harcourt Hub</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Payment Terms</label>
                  <select
                    value={newPaymentTerm}
                    onChange={(e) => setNewPaymentTerm(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="14 Days Credit">14 Days Credit</option>
                    <option value="30 Days Credit">30 Days Credit</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Product SKU *</label>
                  <select
                    value={newSKU}
                    onChange={(e) => setNewSKU(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="Chivita Exotic 315ml (CH-WT-75)">Chivita Exotic 315ml (₦11,000/ctn)</option>
                    <option value="Chi Capri-Sun Orange 50cl (CH-CG-50)">Chi Capri-Sun Orange 50cl (₦8,800/ctn)</option>
                    <option value="Hollandia Evaporated Milk (HOL-EVP-200)">Hollandia Evaporated Milk (₦16,500/ctn)</option>
                    <option value="Hollandia Yoghurt Strawberry (HOL-YOG-1L)">Hollandia Yoghurt 1L (₦14,000/ctn)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Qty (Cartons) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Create & Generate Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ORDER DETAILS & RECEIPT */}
      {selectedOrderReceipt && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "560px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setSelectedOrderReceipt(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            {/* Receipt Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px dashed rgba(14,62,43,0.15)", paddingBottom: "20px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "#A3FF00", padding: "3px 8px", borderRadius: "4px" }}>
                  OFFICIAL WAYBILL
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0E3E2B", margin: "8px 0 2px" }}>{selectedOrderReceipt.orderId}</h3>
                <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0 }}>Date: {selectedOrderReceipt.date} • {selectedOrderReceipt.depot}</p>
              </div>
              <span style={{
                display: "inline-flex",
                padding: "4px 12px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                backgroundColor: getStatusColor(selectedOrderReceipt.status).bg,
                color: getStatusColor(selectedOrderReceipt.status).text
              }}>
                {selectedOrderReceipt.status}
              </span>
            </div>

            {/* Distributor Info */}
            <div style={{ backgroundColor: "#F8FAF8", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 600, color: "rgba(14,62,43,0.5)" }}>Consignee Dealer</span>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0E3E2B", margin: "4px 0 2px" }}>{selectedOrderReceipt.distributor}</h4>
                  <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.7)", margin: 0 }}>Terms: {selectedOrderReceipt.paymentTerm}</p>
                </div>
                {selectedOrderReceipt.source && (
                  <span
                    style={{
                      backgroundColor: "#DCFCE7",
                      color: "#166534",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {selectedOrderReceipt.source}
                  </span>
                )}
              </div>
              {selectedOrderReceipt.destinationAddress && (
                <p style={{ fontSize: "11.5px", color: "#64748B", marginTop: "6px", marginBottom: 0 }}>
                  <strong>Dispatch Destination:</strong> {selectedOrderReceipt.destinationAddress}
                </p>
              )}
            </div>

            {/* Order Items Table */}
            <div style={{ marginBottom: "20px", overflowX: "auto" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0E3E2B", display: "block", marginBottom: "8px" }}>Ordered Line Items</span>
              <table style={{ width: "100%", minWidth: "480px", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(14,62,43,0.1)", textAlign: "left", color: "rgba(14,62,43,0.5)", fontSize: "11px", whiteSpace: "nowrap" }}>
                    <th style={{ paddingBottom: "6px" }}>Item</th>
                    <th style={{ paddingBottom: "6px" }}>Qty</th>
                    <th style={{ paddingBottom: "6px" }}>Unit Price</th>
                    <th style={{ paddingBottom: "6px", textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderReceipt.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid rgba(14,62,43,0.05)", whiteSpace: "nowrap" }}>
                      <td style={{ padding: "8px 0", color: "#0E3E2B", fontWeight: 500 }}>{item.name}</td>
                      <td style={{ padding: "8px 0", color: "#0E3E2B" }}>{item.quantity} ctns</td>
                      <td style={{ padding: "8px 0", color: "rgba(14,62,43,0.7)" }}>{item.unitPrice}</td>
                      <td style={{ padding: "8px 0", color: "#0E3E2B", fontWeight: 700, textAlign: "right" }}>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #0E3E2B", paddingTop: "12px", marginBottom: "24px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#0E3E2B" }}>Total Payable</span>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#0E3E2B" }}>{selectedOrderReceipt.total}</span>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSelectedOrderReceipt(null)}
                style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                  showToast("Sending waybill to printer queue...");
                }}
                style={{ height: "42px", padding: "0 22px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                className="hover:bg-[#08281B]"
              >
                <Printer size={16} />
                Print Waybill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: UPDATE STATUS */}
      {statusModalOrder && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "440px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setStatusModalOrder(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Update Order Status</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Change delivery status for <strong>{statusModalOrder.orderId}</strong>.
            </p>

            <form onSubmit={handleUpdateStatus} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Fulfillment Phase</label>
                <select
                  value={newStatusValue}
                  onChange={(e) => setNewStatusValue(e.target.value as Order["status"])}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Pending">Pending (Awaiting Credit Review)</option>
                  <option value="Processing">Processing (Depot Staging)</option>
                  <option value="Shipped">Shipped (In Transit with Carrier)</option>
                  <option value="Delivered">Delivered (Signed by Distributor)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setStatusModalOrder(null)}
                  style={{ height: "40px", padding: "0 18px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "40px", padding: "0 22px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
