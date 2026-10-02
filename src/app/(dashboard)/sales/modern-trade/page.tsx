"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  Search, 
  ShoppingBag, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  FileCheck, 
  CheckCircle2, 
  X, 
  Clock, 
  Trash2, 
  Calendar,
  Building2,
  Check
} from "lucide-react";

interface ModernTradeOrder {
  id: string;
  poNumber: string;
  chain: string;
  branch: string;
  contactPerson: string;
  cartons: number;
  grossAmount: string;
  deliverySlot: string;
  status: "PO Confirmed" | "Dispatched" | "GRN Signed" | "Invoiced" | "Cancelled";
}

const initialModernTradeOrders: ModernTradeOrder[] = [
  {
    id: "MT-1",
    poNumber: "PO-SHP-2026-441",
    chain: "Shoprite Nigeria",
    branch: "Ikeja City Mall (ICM), Lagos",
    contactPerson: "Folake Adebayo (Store Receiving Mgr)",
    cartons: 850,
    grossAmount: "₦11,475,000",
    deliverySlot: "Sep 07, 2026 (06:00 - 09:00 AM)",
    status: "Dispatched",
  },
  {
    id: "MT-2",
    poNumber: "PO-SPR-2026-109",
    chain: "Spar Hypermarket",
    branch: "Victoria Island Mega Store",
    contactPerson: "Kelechi Obi (Procurement Lead)",
    cartons: 1200,
    grossAmount: "₦16,200,000",
    deliverySlot: "Sep 08, 2026 (07:00 - 11:00 AM)",
    status: "PO Confirmed",
  },
  {
    id: "MT-3",
    poNumber: "PO-EBN-2026-302",
    chain: "Prince Ebeano Supermarket",
    branch: "Lekki Phase 1 Branch",
    contactPerson: "Chinedu Nnamdi (Inventory Supervisor)",
    cartons: 640,
    grossAmount: "₦8,640,000",
    deliverySlot: "Sep 05, 2026 (Delivered)",
    status: "GRN Signed",
  },
  {
    id: "MT-4",
    poNumber: "PO-JST-2026-884",
    chain: "Justrite Superstores",
    branch: "Abule Egba Regional Hub",
    contactPerson: "Mrs. Olanrewaju (Category Buyer)",
    cartons: 920,
    grossAmount: "₦12,420,000",
    deliverySlot: "Sep 04, 2026 (Settled)",
    status: "Invoiced",
  },
  {
    id: "MT-5",
    poNumber: "PO-HBM-2026-055",
    chain: "Hubmart Stores",
    branch: "Adeola Odeku, VI",
    contactPerson: "David Adele (Receiving Bay)",
    cartons: 450,
    grossAmount: "₦6,075,000",
    deliverySlot: "Sep 09, 2026 (08:00 - 10:00 AM)",
    status: "PO Confirmed",
  },
];

export default function ModernTradePage() {
  const [orders, setOrders] = useState<ModernTradeOrder[]>(initialModernTradeOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals state
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isNewPOModalOpen, setIsNewPOModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<ModernTradeOrder | null>(null);
  const [statusOrder, setStatusOrder] = useState<ModernTradeOrder | null>(null);
  const [grnOrder, setGrnOrder] = useState<ModernTradeOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New PO form
  const [newChain, setNewChain] = useState("Shoprite Nigeria");
  const [newBranch, setNewBranch] = useState("");
  const [newCartons, setNewCartons] = useState("750");
  const [newDeliveryDate, setNewDeliveryDate] = useState("Sep 10, 2026 (07:00 AM)");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.chain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch) {
      alert("Please enter store branch location");
      return;
    }
    const ctns = parseInt(newCartons) || 500;
    const gross = ctns * 13500;
    const newEntry: ModernTradeOrder = {
      id: `MT-${Date.now().toString().slice(-4)}`,
      poNumber: `PO-${newChain.slice(0, 3).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`,
      chain: newChain,
      branch: newBranch,
      contactPerson: "Central Receiving Bay",
      cartons: ctns,
      grossAmount: `₦${gross.toLocaleString()}`,
      deliverySlot: newDeliveryDate,
      status: "PO Confirmed",
    };

    setOrders([newEntry, ...orders]);
    setIsNewPOModalOpen(false);
    setNewBranch("");
    showToast(`Key Account Purchase Order ${newEntry.poNumber} logged!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
    showToast(`Modern trade order ${editingOrder.poNumber} updated!`);
  };

  const handleUpdateStatus = (newStatus: ModernTradeOrder["status"]) => {
    if (!statusOrder) return;
    setOrders(orders.map(o => o.id === statusOrder.id ? { ...o, status: newStatus } : o));
    setStatusOrder(null);
    showToast(`Status updated to "${newStatus}" for ${statusOrder.poNumber}`);
  };

  const handleDeleteOrder = (orderId: string, poNum: string) => {
    if (confirm(`Cancel and remove PO ${poNum}?`)) {
      setOrders(orders.filter(o => o.id !== orderId));
      setActiveDropdownId(null);
      showToast(`Purchase order ${poNum} cancelled.`);
    }
  };

  const getStatusBadge = (status: ModernTradeOrder["status"]) => {
    switch (status) {
      case "Invoiced":
        return { bg: "#F0FDF4", text: "#16A34A", border: "rgba(22,163,74,0.2)" };
      case "GRN Signed":
        return { bg: "#EFF6FF", text: "#2563EB", border: "rgba(37,99,235,0.2)" };
      case "Dispatched":
        return { bg: "#FFFBEB", text: "#D97706", border: "rgba(217,119,6,0.2)" };
      case "PO Confirmed":
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
        }}>
          <CheckCircle2 size={18} color="#A3FF00" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
        <div>
          <h1 style={{ fontWeight: 700, color: "#0E3E2B", margin: 0 }} className="text-xl sm:text-2xl">
            Modern Trade & Key Accounts
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Supermarket chains (Shoprite, Spar, Ebeano, Justrite) PO tracking, GRN verification, and delivery slots.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => setIsNewPOModalOpen(true)}
            style={{ 
              backgroundColor: "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px" 
            }} 
            className="h-9 sm:h-10 px-3.5 sm:px-5 text-xs sm:text-sm hover:bg-[#154E38] transition-colors"
          >
            <Plus size={15} />
            Log purchase order
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "18px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Key Accounts Volume</span>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", marginTop: "6px" }}>₦48.2M</div>
          <div style={{ fontSize: "12px", color: "#16A34A", marginTop: "4px", fontWeight: 500 }}>+18.4% vs last week</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "18px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Pending GRN Signed</span>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#D97706", marginTop: "6px" }}>8 Orders</div>
          <div style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", marginTop: "4px" }}>Awaiting warehouse scan</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "18px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Active PO Filings</span>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", marginTop: "6px" }}>14 Stores</div>
          <div style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", marginTop: "4px" }}>Lagos, Abuja & PH hubs</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", width: "100%" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
              <Search size={15} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search PO #, Supermarket chain or branch"
              style={{ width: "100%", height: "38px", paddingLeft: "38px", paddingRight: "16px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.1)", backgroundColor: "transparent", fontSize: "12.5px", color: "#0E3E2B", outline: "none" }}
              className="focus:border-[#0E3E2B]/40 transition-colors"
            />
          </div>

          <div style={{ display: "flex", gap: "6px", overflowX: "auto", maxWidth: "100%", paddingBottom: "2px", whiteSpace: "nowrap" }} className="no-scrollbar">
            {["All", "PO Confirmed", "Dispatched", "GRN Signed", "Invoiced"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  height: "34px",
                  padding: "0 12px",
                  borderRadius: "9999px",
                  border: "1px solid",
                  borderColor: statusFilter === st ? "#0E3E2B" : "rgba(14,62,43,0.12)",
                  backgroundColor: statusFilter === st ? "#0E3E2B" : "transparent",
                  color: statusFilter === st ? "#FFFFFF" : "#0E3E2B",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1100px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>PO Number</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Key Account Chain</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Store Branch</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Cartons</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Gross Invoice</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Delivery Window</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "rgba(14,62,43,0.5)", fontSize: "14px" }}>
                  No modern trade orders found matching your search.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, idx) => {
                const badge = getStatusBadge(order.status);
                const isMenuOpen = activeDropdownId === order.id;

                return (
                  <tr key={order.id} style={{ borderBottom: idx !== filteredOrders.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/[0.01] transition-colors">
                    <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{order.poNumber}</span>
                    </td>
                    <td style={{ padding: "16px 20px", minWidth: "180px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{order.chain}</div>
                      <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{order.contactPerson}</div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", color: "rgba(14,62,43,0.8)", minWidth: "160px" }}>
                      {order.branch}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                      {order.cartons.toLocaleString()} ctns
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                      {order.grossAmount}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", color: "rgba(14,62,43,0.8)", whiteSpace: "nowrap" }}>
                      {order.deliverySlot}
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
                          onClick={() => setGrnOrder(order)}
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
                          <FileCheck size={12} />
                          GRN Note
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
                            Edit PO & Delivery Slot
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
                            <ShoppingBag size={14} color="#2563EB" />
                            Update Status
                          </button>

                          <button
                            onClick={() => {
                              setGrnOrder(order);
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
                            <FileCheck size={14} color="#16A34A" />
                            Inspect GRN Voucher
                          </button>

                          <div style={{ height: "1px", backgroundColor: "rgba(14,62,43,0.06)", margin: "4px 0" }} />

                          <button
                            onClick={() => handleDeleteOrder(order.id, order.poNumber)}
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
                            Cancel / Void PO
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

      {/* Modal: Log New Key Account PO */}
      {isNewPOModalOpen && (
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
                  <Building2 size={18} color="#0E3E2B" />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Log Key Account Purchase Order
                </h3>
              </div>
              <button 
                onClick={() => setIsNewPOModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePO} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Supermarket Chain
                </label>
                <select
                  value={newChain}
                  onChange={(e) => setNewChain(e.target.value)}
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
                  <option value="Shoprite Nigeria">Shoprite Nigeria</option>
                  <option value="Spar Hypermarket">Spar Hypermarket</option>
                  <option value="Prince Ebeano Supermarket">Prince Ebeano Supermarket</option>
                  <option value="Justrite Superstores">Justrite Superstores</option>
                  <option value="Hubmart Stores">Hubmart Stores</option>
                  <option value="Addide Supermarkets">Addide Supermarkets</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Store Branch Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festival Mall, Festac Town, Lagos"
                  value={newBranch}
                  onChange={(e) => setNewBranch(e.target.value)}
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
                    Cartons Booked
                  </label>
                  <input
                    type="number"
                    min="50"
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
                    Gross Amount
                  </label>
                  <div style={{ height: "42px", display: "flex", alignItems: "center", padding: "0 14px", backgroundColor: "#F8FAF8", borderRadius: "10px", fontSize: "14px", fontWeight: 700, color: "#0E3E2B" }}>
                    ₦{((parseInt(newCartons) || 0) * 13500).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Scheduled Delivery Slot
                </label>
                <input
                  type="text"
                  required
                  value={newDeliveryDate}
                  onChange={(e) => setNewDeliveryDate(e.target.value)}
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

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewPOModalOpen(false)}
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
                  Confirm Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit PO Details */}
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
                Edit PO: {editingOrder.poNumber}
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
                  Store Branch
                </label>
                <input
                  type="text"
                  required
                  value={editingOrder.branch}
                  onChange={(e) => setEditingOrder({ ...editingOrder, branch: e.target.value })}
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
                  Branch Receiving Contact
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
                    Delivery Window
                  </label>
                  <input
                    type="text"
                    value={editingOrder.deliverySlot}
                    onChange={(e) => setEditingOrder({ ...editingOrder, deliverySlot: e.target.value })}
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
                  Save PO Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Update PO Status */}
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
                Update PO Status
              </h3>
              <button 
                onClick={() => setStatusOrder(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 16px 0" }}>
              Current stage for <strong>{statusOrder.poNumber}</strong> ({statusOrder.chain}):
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(["PO Confirmed", "Dispatched", "GRN Signed", "Invoiced", "Cancelled"] as ModernTradeOrder["status"][]).map((st) => (
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

      {/* Modal: GRN Note */}
      {grnOrder && (
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
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>GOODS RECEIVED NOTE (GRN)</span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{grnOrder.poNumber}</h3>
              </div>
              <button 
                onClick={() => setGrnOrder(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Key Account Client</span>
                  <p style={{ fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{grnOrder.chain}</p>
                  <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", margin: "2px 0 0" }}>{grnOrder.branch}</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Offloading & Receiving Slot</span>
                  <p style={{ fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>{grnOrder.deliverySlot}</p>
                  <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", margin: "2px 0 0" }}>Signed by: {grnOrder.contactPerson}</p>
                </div>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F0FDF4", borderRadius: "10px", border: "1px solid rgba(22,163,74,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 600, color: "#16A34A" }}>Physical Count Verified</span>
                  <span style={{ fontWeight: 700, color: "#16A34A" }}>{grnOrder.cartons} Cartons Accepted</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 600, color: "#0E3E2B" }}>Total Invoice Valuation</span>
                  <span style={{ fontWeight: 700, color: "#0E3E2B" }}>{grnOrder.grossAmount}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  window.print();
                  showToast("GRN Voucher sent to printer!");
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
                Print Voucher
              </button>
              <button
                onClick={() => {
                  setGrnOrder(null);
                  showToast("GRN attached and invoiced to Key Account Head Office!");
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
                Generate Corporate Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
