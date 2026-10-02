"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  Search, 
  Truck, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  FileText, 
  CheckCircle2, 
  X, 
  Clock, 
  Trash2, 
  Filter,
  Check
} from "lucide-react";

interface WholesaleOrder {
  id: string;
  orderNumber: string;
  distributor: string;
  contactPerson: string;
  cartons: number;
  totalAmount: string;
  depot: string;
  paymentTerms: "Advance Transfer" | "Credit (14 Days)" | "Credit (30 Days)" | "Cash on Delivery";
  status: "Pending Dispatch" | "Processing" | "In Transit" | "Delivered" | "Cancelled";
  date: string;
}

const initialWholesaleOrders: WholesaleOrder[] = [
  {
    id: "WS-101",
    orderNumber: "WHO-2026-0891",
    distributor: "Alhaji Musa & Sons FMCG Depot",
    contactPerson: "Alhaji Musa (0803 219 4481)",
    cartons: 1450,
    totalAmount: "₦18,850,000",
    depot: "Ikeja Central Depot",
    paymentTerms: "Credit (14 Days)",
    status: "Processing",
    date: "Sep 06, 2026 08:30 AM",
  },
  {
    id: "WS-102",
    orderNumber: "WHO-2026-0890",
    distributor: "Eko FMCG Mega Hub",
    contactPerson: "Bisi Adeleke (0802 551 8892)",
    cartons: 2200,
    totalAmount: "₦28,600,000",
    depot: "Apapa Main Warehouse",
    paymentTerms: "Advance Transfer",
    status: "In Transit",
    date: "Sep 05, 2026 04:15 PM",
  },
  {
    id: "WS-103",
    orderNumber: "WHO-2026-0889",
    distributor: "Kano Central Distribution Co.",
    contactPerson: "Ibrahim Bello (0809 333 1124)",
    cartons: 3100,
    totalAmount: "₦40,300,000",
    depot: "Kano Northern Hub",
    paymentTerms: "Credit (30 Days)",
    status: "Pending Dispatch",
    date: "Sep 05, 2026 11:20 AM",
  },
  {
    id: "WS-104",
    orderNumber: "WHO-2026-0888",
    distributor: "Onitsha Main Market Beverage Ltd",
    contactPerson: "Chief Chukwuma (0806 441 9900)",
    cartons: 1800,
    totalAmount: "₦23,400,000",
    depot: "Onitsha Regional Hub",
    paymentTerms: "Advance Transfer",
    status: "Delivered",
    date: "Sep 04, 2026 02:45 PM",
  },
  {
    id: "WS-105",
    orderNumber: "WHO-2026-0887",
    distributor: "Port Harcourt Bulk Wholesalers",
    contactPerson: "Tonye George (0818 776 2210)",
    cartons: 950,
    totalAmount: "₦12,350,000",
    depot: "Port Harcourt Trans-Amadi",
    paymentTerms: "Cash on Delivery",
    status: "Delivered",
    date: "Sep 03, 2026 09:10 AM",
  },
];

export default function WholesaleOrdersPage() {
  const [orders, setOrders] = useState<WholesaleOrder[]>(initialWholesaleOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals state
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<WholesaleOrder | null>(null);
  const [statusOrder, setStatusOrder] = useState<WholesaleOrder | null>(null);
  const [waybillOrder, setWaybillOrder] = useState<WholesaleOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New order form
  const [newDistributor, setNewDistributor] = useState("");
  const [newCartons, setNewCartons] = useState("1200");
  const [newDepot, setNewDepot] = useState("Ikeja Central Depot");
  const [newTerms, setNewTerms] = useState<WholesaleOrder["paymentTerms"]>("Credit (14 Days)");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.distributor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.depot.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDistributor) {
      alert("Please enter a distributor name");
      return;
    }
    const cartonNum = parseInt(newCartons) || 500;
    const amountVal = cartonNum * 13000;
    const newEntry: WholesaleOrder = {
      id: `WS-${Date.now().toString().slice(-4)}`,
      orderNumber: `WHO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      distributor: newDistributor,
      contactPerson: "Operations Desk (0800 555 1212)",
      cartons: cartonNum,
      totalAmount: `₦${amountVal.toLocaleString()}`,
      depot: newDepot,
      paymentTerms: newTerms,
      status: "Processing",
      date: "Just now",
    };

    setOrders([newEntry, ...orders]);
    setIsNewOrderModalOpen(false);
    setNewDistributor("");
    showToast(`Wholesale order ${newEntry.orderNumber} created successfully!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
    showToast(`Order ${editingOrder.orderNumber} details updated`);
  };

  const handleUpdateStatus = (newStatus: WholesaleOrder["status"]) => {
    if (!statusOrder) return;
    setOrders(orders.map(o => o.id === statusOrder.id ? { ...o, status: newStatus } : o));
    setStatusOrder(null);
    showToast(`Status updated to "${newStatus}" for ${statusOrder.orderNumber}`);
  };

  const handleDeleteOrder = (orderId: string, orderNum: string) => {
    if (confirm(`Are you sure you want to cancel and delete order ${orderNum}?`)) {
      setOrders(orders.filter(o => o.id !== orderId));
      setActiveDropdownId(null);
      showToast(`Order ${orderNum} cancelled and deleted.`);
    }
  };

  const getStatusBadge = (status: WholesaleOrder["status"]) => {
    switch (status) {
      case "Delivered":
        return { bg: "#F0FDF4", text: "#16A34A", border: "rgba(22,163,74,0.2)" };
      case "In Transit":
        return { bg: "#EFF6FF", text: "#2563EB", border: "rgba(37,99,235,0.2)" };
      case "Processing":
        return { bg: "#FFFBEB", text: "#D97706", border: "rgba(217,119,6,0.2)" };
      case "Pending Dispatch":
        return { bg: "#F5F3FF", text: "#7C3AED", border: "rgba(124,58,237,0.2)" };
      case "Cancelled":
        return { bg: "#FEF2F2", text: "#DC2626", border: "rgba(220,38,38,0.2)" };
    }
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
          animation: "fadeIn 0.2s ease-in-out"
        }}>
          <CheckCircle2 size={18} color="#A3FF00" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Wholesale Orders</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Manage bulk distributor orders, depot fulfillment, waybills, and credit dispatch.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setIsNewOrderModalOpen(true)}
            style={{ 
              height: "40px", 
              padding: "0 20px", 
              backgroundColor: "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontSize: "14px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }} 
            className="hover:bg-[#154E38] transition-colors"
          >
            <Plus size={16} />
            + New wholesale order
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Total Wholesale GMV</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>₦123.5M</h3>
          <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 500 }}>9,500 Cartons in queue</span>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>In Transit / Dispatch</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>
            {orders.filter(o => o.status === "In Transit" || o.status === "Processing").length} Orders
          </h3>
          <span style={{ fontSize: "12px", color: "#2563EB", fontWeight: 500 }}>Live GPS waybill tracking</span>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Pending Clearance</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#D97706", margin: "8px 0 2px" }}>
            {orders.filter(o => o.status === "Pending Dispatch").length} Orders
          </h3>
          <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>Credit limit verification</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", flex: 1 }}>
          <div style={{ position: "relative", width: "320px" }}>
            <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search order number, distributor or depot"
              style={{ width: "100%", height: "40px", paddingLeft: "42px", paddingRight: "16px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.1)", backgroundColor: "transparent", fontSize: "13px", color: "#0E3E2B", outline: "none" }}
              className="focus:border-[#0E3E2B]/40 transition-colors"
            />
          </div>

          <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
            {["All", "Processing", "In Transit", "Delivered", "Pending Dispatch"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  height: "36px",
                  padding: "0 14px",
                  borderRadius: "9999px",
                  border: "1px solid",
                  borderColor: statusFilter === st ? "#0E3E2B" : "rgba(14,62,43,0.12)",
                  backgroundColor: statusFilter === st ? "#0E3E2B" : "transparent",
                  color: statusFilter === st ? "#FFFFFF" : "#0E3E2B",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Order Ref</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Distributor</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Cartons</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Amount</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Fulfillment Depot</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "rgba(14,62,43,0.5)", fontSize: "14px" }}>
                  No wholesale orders found matching your filters.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, idx) => {
                const badge = getStatusBadge(order.status);
                const isMenuOpen = activeDropdownId === order.id;

                return (
                  <tr key={order.id} style={{ borderBottom: idx !== filteredOrders.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/[0.01] transition-colors">
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{order.orderNumber}</span>
                      <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px" }}>{order.date}</div>
                    </td>
                    <td style={{ padding: "16px 20px", minWidth: "180px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{order.distributor}</div>
                      <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{order.contactPerson}</div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                      {order.cartons.toLocaleString()} ctns
                    </td>
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{order.totalAmount}</div>
                      <span style={{ fontSize: "10px", color: "rgba(14,62,43,0.6)", backgroundColor: "#F0F5ED", padding: "2px 6px", borderRadius: "4px" }}>
                        {order.paymentTerms}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(14,62,43,0.8)", whiteSpace: "nowrap" }}>
                      {order.depot}
                    </td>
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <span style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center"
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <button
                          onClick={() => setWaybillOrder(order)}
                          style={{
                            height: "32px",
                            padding: "0 12px",
                            backgroundColor: "#F0F5ED",
                            border: "1px solid rgba(14,62,43,0.15)",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#0E3E2B",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                          className="hover:bg-[#E0EBDC]"
                        >
                          <FileText size={12} />
                          Waybill
                        </button>

                        <button
                          onClick={() => setActiveDropdownId(isMenuOpen ? null : order.id)}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            border: "1px solid rgba(14,62,43,0.15)",
                            backgroundColor: isMenuOpen ? "#0E3E2B" : "#FFFFFF",
                            color: isMenuOpen ? "#FFFFFF" : "#0E3E2B",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="hover:border-[#0E3E2B]"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "52px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            border: "1px solid rgba(14,62,43,0.1)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                            zIndex: 50,
                            width: "210px",
                            padding: "6px",
                            textAlign: "left",
                          }}
                        >
                          <button
                            onClick={() => {
                              setEditingOrder({ ...order });
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
                            <Edit size={14} color="#0E3E2B" />
                            Edit Order Details
                          </button>

                          <button
                            onClick={() => {
                              setStatusOrder(order);
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
                            <Truck size={14} color="#2563EB" />
                            Update Status
                          </button>

                          <button
                            onClick={() => {
                              setWaybillOrder(order);
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
                            Official Waybill & Receipt
                          </button>

                          <div style={{ height: "1px", backgroundColor: "rgba(14,62,43,0.06)", margin: "4px 0" }} />

                          <button
                            onClick={() => handleDeleteOrder(order.id, order.orderNumber)}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              backgroundColor: "transparent",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#EF4444",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                            className="hover:bg-red-50"
                          >
                            <Trash2 size={14} color="#EF4444" />
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Create Wholesale Order */}
      {isNewOrderModalOpen && (
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
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#F0F5ED", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Truck size={18} color="#0E3E2B" />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Create Wholesale Order
                </h3>
              </div>
              <button 
                onClick={() => setIsNewOrderModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Distributor Account Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Balogun Mega Distribution Ltd"
                  value={newDistributor}
                  onChange={(e) => setNewDistributor(e.target.value)}
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
                    Carton Quantity
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={newCartons}
                    onChange={(e) => setNewCartons(e.target.value)}
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
                    Estimated Total
                  </label>
                  <div style={{ height: "42px", display: "flex", alignItems: "center", padding: "0 14px", backgroundColor: "#F8FAF8", borderRadius: "10px", fontSize: "14px", fontWeight: 700, color: "#0E3E2B" }}>
                    ₦{((parseInt(newCartons) || 0) * 13000).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Dispatching Depot
                </label>
                <select
                  value={newDepot}
                  onChange={(e) => setNewDepot(e.target.value)}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="Ikeja Central Depot">Ikeja Central Depot (Lagos)</option>
                  <option value="Apapa Main Warehouse">Apapa Main Warehouse (Lagos)</option>
                  <option value="Kano Northern Hub">Kano Northern Hub</option>
                  <option value="Onitsha Regional Hub">Onitsha Regional Hub</option>
                  <option value="Port Harcourt Trans-Amadi">Port Harcourt Trans-Amadi</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Payment Terms
                </label>
                <select
                  value={newTerms}
                  onChange={(e) => setNewTerms(e.target.value as any)}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="Advance Transfer">Advance Bank Transfer (100% Prepayment)</option>
                  <option value="Credit (14 Days)">Credit (14 Days Approved Terms)</option>
                  <option value="Credit (30 Days)">Credit (30 Days Super Tier)</option>
                  <option value="Cash on Delivery">Cash / POS on Depot Collection</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
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
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Wholesale Order */}
      {editingOrder && (
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
                Edit Wholesale Order: {editingOrder.orderNumber}
              </h3>
              <button 
                onClick={() => setEditingOrder(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Distributor Name
                </label>
                <input
                  type="text"
                  required
                  value={editingOrder.distributor}
                  onChange={(e) => setEditingOrder({ ...editingOrder, distributor: e.target.value })}
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
                  Contact Representative
                </label>
                <input
                  type="text"
                  required
                  value={editingOrder.contactPerson}
                  onChange={(e) => setEditingOrder({ ...editingOrder, contactPerson: e.target.value })}
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
                    Cartons
                  </label>
                  <input
                    type="number"
                    value={editingOrder.cartons}
                    onChange={(e) => setEditingOrder({ ...editingOrder, cartons: parseInt(e.target.value) || 0 })}
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
                    Total Invoiced Amount
                  </label>
                  <input
                    type="text"
                    value={editingOrder.totalAmount}
                    onChange={(e) => setEditingOrder({ ...editingOrder, totalAmount: e.target.value })}
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

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Dispatching Depot
                </label>
                <select
                  value={editingOrder.depot}
                  onChange={(e) => setEditingOrder({ ...editingOrder, depot: e.target.value })}
                  style={{
                    width: "100%",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(14,62,43,0.2)",
                    fontSize: "13px",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="Ikeja Central Depot">Ikeja Central Depot</option>
                  <option value="Apapa Main Warehouse">Apapa Main Warehouse</option>
                  <option value="Kano Northern Hub">Kano Northern Hub</option>
                  <option value="Onitsha Regional Hub">Onitsha Regional Hub</option>
                  <option value="Port Harcourt Trans-Amadi">Port Harcourt Trans-Amadi</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Update Status */}
      {statusOrder && (
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
            padding: "24px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                Update Fulfillment Status
              </h3>
              <button 
                onClick={() => setStatusOrder(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Select current logistics status for <strong>{statusOrder.orderNumber}</strong> ({statusOrder.distributor}):
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(["Pending Dispatch", "Processing", "In Transit", "Delivered", "Cancelled"] as WholesaleOrder["status"][]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleUpdateStatus(st)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid",
                    borderColor: statusOrder.status === st ? "#0E3E2B" : "rgba(14,62,43,0.1)",
                    backgroundColor: statusOrder.status === st ? "#F0F5ED" : "#FFFFFF",
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
                  {statusOrder.status === st && <Check size={16} color="#0E3E2B" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Official Waybill & Receipt */}
      {waybillOrder && (
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
            maxWidth: "550px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "16px", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#16A34A", textTransform: "uppercase" }}>CHI FMCG OFFICIAL WAYBILL</span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{waybillOrder.orderNumber}</h3>
              </div>
              <button 
                onClick={() => setWaybillOrder(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Recipient Depot</span>
                  <p style={{ fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{waybillOrder.distributor}</p>
                  <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", margin: "2px 0 0" }}>{waybillOrder.contactPerson}</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Issuing Depot</span>
                  <p style={{ fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{waybillOrder.depot}</p>
                  <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", margin: "2px 0 0" }}>Issued: {waybillOrder.date}</p>
                </div>
              </div>

              <div style={{ overflowX: "auto", width: "100%", marginBottom: "16px" }}>
                <table style={{ width: "100%", minWidth: "450px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(14,62,43,0.1)", color: "rgba(14,62,43,0.5)", fontSize: "11px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      <th style={{ padding: "8px 0", textAlign: "left" }}>Description</th>
                      <th style={{ padding: "8px 0", textAlign: "right" }}>Quantity</th>
                      <th style={{ padding: "8px 0", textAlign: "right" }}>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid rgba(14,62,43,0.06)", whiteSpace: "nowrap" }}>
                      <td style={{ padding: "10px 0", fontWeight: 600, color: "#0E3E2B" }}>Chivita 100% Real Fruit Juice 1L (Cartons)</td>
                      <td style={{ padding: "10px 0", textAlign: "right", fontWeight: 600, color: "#0E3E2B" }}>{waybillOrder.cartons} ctns</td>
                      <td style={{ padding: "10px 0", textAlign: "right", fontWeight: 700, color: "#0E3E2B" }}>{waybillOrder.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", backgroundColor: "#F0F5ED", borderRadius: "8px" }}>
                <span style={{ fontWeight: 600, color: "#0E3E2B" }}>Payment Terms</span>
                <span style={{ fontWeight: 700, color: "#0E3E2B" }}>{waybillOrder.paymentTerms}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  window.print();
                  showToast("Waybill sent to printer!");
                }}
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
                Print Waybill
              </button>
              <button
                onClick={() => {
                  setWaybillOrder(null);
                  showToast("Waybill dispatched to distributor WhatsApp!");
                }}
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
                Send to Customer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
