"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Package, 
  ArrowRightLeft, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Trash2, 
  TrendingDown, 
  TrendingUp,
  Warehouse
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  location: string;
  stockLevel: number;
  minThreshold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastRestocked: string;
  image?: string;
}

const initialInventory: InventoryItem[] = [
  { 
    id: "1", 
    name: "Chi Exotic Pineapple & Coconut 1L", 
    sku: "CHI-EXC-PC-1L", 
    location: "Lagos Main Warehouse", 
    stockLevel: 4500, 
    minThreshold: 500, 
    status: "In Stock", 
    lastRestocked: "2 days ago",
    image: "https://fromatoz.com.ng/wp-content/uploads/2024/03/WhatsApp-Image-2024-07-12-at-4.21.26-PM.jpeg"
  },
  { 
    id: "2", 
    name: "Chivita 100% Apple 1L", 
    sku: "CHI-100-AP-1L", 
    location: "Lagos Main Warehouse", 
    stockLevel: 120, 
    minThreshold: 300, 
    status: "Low Stock", 
    lastRestocked: "10 days ago",
    image: "https://www.supermart.ng/cdn/shop/files/111.jpg?v=1689901590"
  },
  { 
    id: "3", 
    name: "Hollandia Yoghurt Strawberry 500ml", 
    sku: "HOL-YOG-ST-500", 
    location: "Abuja Distribution Center", 
    stockLevel: 0, 
    minThreshold: 400, 
    status: "Out of Stock", 
    lastRestocked: "3 weeks ago",
    image: "https://www.supermart.ng/cdn/shop/files/spbvyo2101.jpg?v=1762254219"
  },
  { 
    id: "4", 
    name: "Hollandia Evaporated Milk 200g", 
    sku: "HOL-EVP-MILK-200", 
    location: "Kano Depot", 
    stockLevel: 3200, 
    minThreshold: 600, 
    status: "In Stock", 
    lastRestocked: "Yesterday",
    image: "https://www.supermart.ng/cdn/shop/files/spdpmp1685.jpg?v=1762253812"
  },
  { 
    id: "5", 
    name: "Chi Happy Hour Tropical 500ml", 
    sku: "CHI-HH-TR-500", 
    location: "Lagos Main Warehouse", 
    stockLevel: 850, 
    minThreshold: 300, 
    status: "In Stock", 
    lastRestocked: "4 days ago",
    image: "https://www.supermart.ng/cdn/shop/files/spbvju1615.png?v=1688839382"
  },
  { 
    id: "6", 
    name: "Capri-Sun Orange 200ml", 
    sku: "CAP-SUN-OR-200", 
    location: "Port Harcourt Hub", 
    stockLevel: 45, 
    minThreshold: 200, 
    status: "Low Stock", 
    lastRestocked: "12 days ago",
    image: "https://www.capri-sun.com/assets/Uploads/pages/products/TP_Orange_clean-3__ScaleMaxHeightWzYyN10.png"
  },
  { 
    id: "7", 
    name: "SuperBite Sausage Roll 100g", 
    sku: "SUP-BIT-SAU-100", 
    location: "Abuja Distribution Center", 
    stockLevel: 12000, 
    minThreshold: 1500, 
    status: "In Stock", 
    lastRestocked: "Today",
    image: "https://martking.ng/wp-content/uploads/2022/08/Martking-Online-Store-superbite.jpg"
  },
];

function ProductThumbnail({ src, alt, size = 42 }: { src?: string; alt: string; size?: number }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          minWidth: `${size}px`,
          backgroundColor: "rgba(14,62,43,0.05)", 
          borderRadius: "10px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          color: "#0E3E2B",
          border: "1px solid rgba(14,62,43,0.08)"
        }}
      >
        <Package size={Math.round(size * 0.45)} />
      </div>
    );
  }

  return (
    <div 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        minWidth: `${size}px`,
        borderRadius: "10px", 
        border: "1px solid rgba(14,62,43,0.1)", 
        backgroundColor: "#FFFFFF", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
      }}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        style={{ width: "100%", height: "100%", objectFit: "contain", padding: "2px" }}
      />
    </div>
  );
}

const depotLocations = [
  "All Warehouses",
  "Lagos Main Warehouse",
  "Abuja Distribution Center",
  "Kano Depot",
  "Port Harcourt Hub",
  "Ibadan Staging Center"
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Warehouses");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [adjustingItem, setAdjustingItem] = useState<InventoryItem | null>(null);
  const [adjustQty, setAdjustQty] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState("Stock Audit Verification");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Transfer Form
  const [transferSKU, setTransferSKU] = useState(initialInventory[0]?.sku || "");
  const [fromDepot, setFromDepot] = useState("Lagos Main Warehouse");
  const [toDepot, setToDepot] = useState("Abuja Distribution Center");
  const [transferQty, setTransferQty] = useState(100);
  const [driverRef, setDriverRef] = useState("TRK-LOG-881 (Musa Ibrahim)");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStockTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromDepot === toDepot) {
      alert("Source and Destination depots cannot be the same.");
      return;
    }

    const item = inventory.find(i => i.sku === transferSKU);
    if (!item) return;

    if (item.stockLevel < transferQty) {
      alert(`Insufficient stock at ${fromDepot}. Available: ${item.stockLevel} ctns.`);
      return;
    }

    // Deduct source and either update or notify
    setInventory(inventory.map(i => {
      if (i.sku === transferSKU && i.location === fromDepot) {
        const newStock = Math.max(0, i.stockLevel - transferQty);
        return {
          ...i,
          stockLevel: newStock,
          status: newStock === 0 ? "Out of Stock" : newStock < i.minThreshold ? "Low Stock" : "In Stock"
        };
      }
      return i;
    }));

    setIsTransferModalOpen(false);
    showToast(`Transferred ${transferQty} ctns of ${item.name} to ${toDepot}`);
  };

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingItem) return;

    const newStock = Math.max(0, Number(adjustQty));
    const newStatus: InventoryItem["status"] = 
      newStock === 0 ? "Out of Stock" : newStock < adjustingItem.minThreshold ? "Low Stock" : "In Stock";

    setInventory(inventory.map(item => {
      if (item.id === adjustingItem.id) {
        return {
          ...item,
          stockLevel: newStock,
          status: newStatus,
          lastRestocked: "Just now"
        };
      }
      return item;
    }));

    showToast(`Adjusted ${adjustingItem.name} to ${newStock} cartons (${adjustReason})`);
    setAdjustingItem(null);
    setActiveMenuId(null);
  };

  const handleMarkOutOfStock = (id: string) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        return { ...item, stockLevel: 0, status: "Out of Stock" };
      }
      return item;
    }));
    setActiveMenuId(null);
    showToast("SKU marked as Out of Stock");
  };

  const handleDeleteItem = (id: string) => {
    setInventory(inventory.filter(i => i.id !== id));
    setActiveMenuId(null);
    showToast("Removed SKU inventory record");
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = 
      selectedLocation === "All Warehouses" || item.location === selectedLocation;

    return matchesSearch && matchesLocation;
  });

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock": return { bg: "#F0FDF4", text: "#16A34A" };
      case "Low Stock": return { bg: "#FFFBEB", text: "#D97706" };
      case "Out of Stock": return { bg: "#FEF2F2", text: "#EF4444" };
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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Depot Inventory & Stock Levels</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Track physical carton stock, safety thresholds, and execute cross-depot transfers across regions.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setIsTransferModalOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#0E3E2B",
              color: "#FFFFFF",
              padding: "10px 22px",
              borderRadius: "9999px",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            className="hover:bg-[#08281B]"
          >
            <ArrowRightLeft size={16} />
            Stock Transfer
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}>
          <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search by Product Name, SKU, or Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "40px",
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
          <Filter size={16} color="rgba(14,62,43,0.6)" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{
              height: "40px",
              padding: "0 16px",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(14,62,43,0.15)",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#0E3E2B",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {depotLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1000px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(14,62,43,0.08)", backgroundColor: "rgba(14,62,43,0.02)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product SKU</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Location Depot</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Current Stock</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Safety Buffer</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, index) => (
              <tr key={item.id} style={{ borderBottom: index !== filteredInventory.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                <td style={{ padding: "16px 24px", minWidth: "260px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <ProductThumbnail src={item.image} alt={item.name} size={44} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{item.name}</span>
                      <span style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(14,62,43,0.6)", whiteSpace: "nowrap" }}>{item.sku} • Restocked {item.lastRestocked}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Warehouse size={14} color="#0E3E2B" opacity={0.6} />
                    <span style={{ fontSize: "13px", color: "#0E3E2B", fontWeight: 500 }}>{item.location}</span>
                  </div>
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#0E3E2B" }}>{item.stockLevel.toLocaleString()} ctns</span>
                </td>
                <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)" }}>Min: {item.minThreshold.toLocaleString()} ctns</span>
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
                    backgroundColor: getStatusColor(item.status).bg,
                    color: getStatusColor(item.status).text
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                    <button
                      title="Adjust Stock Count"
                      onClick={() => {
                        setAdjustingItem(item);
                        setAdjustQty(item.stockLevel);
                      }}
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
                        gap: "4px",
                      }}
                      className="hover:bg-black/5"
                    >
                      <Sliders size={13} />
                      Adjust
                    </button>

                    <button 
                      title="More Options"
                      onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
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
                  {activeMenuId === item.id && (
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
                          setAdjustingItem(item);
                          setAdjustQty(item.stockLevel);
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
                        <Sliders size={14} />
                        Count Audit / Adjust
                      </button>

                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          setTransferSKU(item.sku);
                          setFromDepot(item.location);
                          setIsTransferModalOpen(true);
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
                        <ArrowRightLeft size={14} />
                        Transfer from this Depot
                      </button>

                      <button
                        onClick={() => handleMarkOutOfStock(item.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#D97706",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          width: "100%",
                          textAlign: "left"
                        }}
                        className="hover:bg-black/5"
                      >
                        <TrendingDown size={14} />
                        Mark as Out of Stock
                      </button>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
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
                        <Trash2 size={14} />
                        Delete Record
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "48px 24px", textAlign: "center", color: "rgba(14,62,43,0.5)", fontSize: "14px" }}>
                  No inventory records found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: STOCK TRANSFER */}
      {isTransferModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsTransferModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Initiate Inter-Depot Transfer</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Dispatch pallet cartons between warehouses to prevent regional stockouts.
            </p>

            <form onSubmit={handleStockTransfer} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Select Product SKU *</label>
                <select
                  value={transferSKU}
                  onChange={(e) => setTransferSKU(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  {inventory.map(i => (
                    <option key={i.id} value={i.sku}>{i.name} ({i.sku})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Source Depot *</label>
                  <select
                    value={fromDepot}
                    onChange={(e) => setFromDepot(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    {depotLocations.filter(l => l !== "All Warehouses").map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Destination Depot *</label>
                  <select
                    value={toDepot}
                    onChange={(e) => setToDepot(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    {depotLocations.filter(l => l !== "All Warehouses").map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Transfer Qty (Cartons) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={transferQty}
                    onChange={(e) => setTransferQty(Number(e.target.value))}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Carrier / Driver Reference</label>
                  <input
                    type="text"
                    value={driverRef}
                    onChange={(e) => setDriverRef(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Confirm & Dispatch Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADJUST STOCK COUNT */}
      {adjustingItem && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "480px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setAdjustingItem(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Adjust Inventory Level</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Set audited stock count for <strong>{adjustingItem.name}</strong> at {adjustingItem.location}.
            </p>

            <form onSubmit={handleAdjustStock} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>New Physical Stock Count (Cartons) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "14px", fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Adjustment Reason</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Stock Audit Verification">Stock Audit Verification</option>
                  <option value="Damaged / Broken Cartons Write-off">Damaged / Broken Cartons Write-off</option>
                  <option value="Returned Goods from Distributor">Returned Goods from Distributor</option>
                  <option value="New Factory Production Delivery">New Factory Production Delivery</option>
                  <option value="Expired Batch Disposal">Expired Batch Disposal</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setAdjustingItem(null)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Save Stock Count
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
