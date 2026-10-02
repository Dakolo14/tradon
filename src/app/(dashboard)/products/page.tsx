"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Box, 
  AlertTriangle, 
  TrendingUp, 
  Tags, 
  Download, 
  Upload, 
  X, 
  CheckCircle2, 
  MoreHorizontal, 
  Check,
  Link as LinkIcon,
  UploadCloud,
  Image as ImageIcon
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  subName: string;
  sku: string;
  category: string;
  cartonPrice: string;
  unitPrice: string;
  stock: number;
  status: "active" | "low" | "out";
  hasPromo?: boolean;
  image?: string;
}

const initialProducts: Product[] = [
  { 
    id: "1", 
    name: "Chi Exotic Pineapple & Coconut 1L", 
    subName: "12/carton • Tetra Pak", 
    sku: "CHI-EXC-PC-1L", 
    category: "Juice", 
    cartonPrice: "₦14,400", 
    unitPrice: "₦1,200", 
    stock: 4500, 
    status: "active", 
    hasPromo: true,
    image: "https://fromatoz.com.ng/wp-content/uploads/2024/03/WhatsApp-Image-2024-07-12-at-4.21.26-PM.jpeg"
  },
  { 
    id: "2", 
    name: "Chivita 100% Apple 1L", 
    subName: "12/carton • No Added Sugar", 
    sku: "CHI-100-AP-1L", 
    category: "Juice", 
    cartonPrice: "₦13,800", 
    unitPrice: "₦1,150", 
    stock: 120, 
    status: "low",
    image: "https://www.supermart.ng/cdn/shop/files/111.jpg?v=1689901590"
  },
  { 
    id: "3", 
    name: "Hollandia Yoghurt Strawberry 500ml", 
    subName: "16/carton • Probiotic", 
    sku: "HOL-YOG-ST-500", 
    category: "Dairy", 
    cartonPrice: "₦12,500", 
    unitPrice: "₦750", 
    stock: 0, 
    status: "out",
    image: "https://www.supermart.ng/cdn/shop/files/spbvyo2101.jpg?v=1762254219"
  },
  { 
    id: "4", 
    name: "Hollandia Evaporated Milk 200g", 
    subName: "48/carton • Full Cream", 
    sku: "HOL-EVP-MILK-200", 
    category: "Dairy", 
    cartonPrice: "₦16,500", 
    unitPrice: "₦380", 
    stock: 3200, 
    status: "active",
    image: "https://www.supermart.ng/cdn/shop/files/spdpmp1685.jpg?v=1762253812"
  },
  { 
    id: "5", 
    name: "Chi Happy Hour Tropical 500ml", 
    subName: "24/carton • Fruit Drink", 
    sku: "CHI-HH-TR-500", 
    category: "Juice", 
    cartonPrice: "₦9,200", 
    unitPrice: "₦400", 
    stock: 850, 
    status: "active", 
    hasPromo: true,
    image: "https://www.supermart.ng/cdn/shop/files/spbvju1615.png?v=1688839382"
  },
  { 
    id: "6", 
    name: "Capri-Sun Orange 200ml", 
    subName: "24/carton • Pouch with Straw", 
    sku: "CAP-SUN-OR-200", 
    category: "Juice", 
    cartonPrice: "₦6,800", 
    unitPrice: "₦280", 
    stock: 45, 
    status: "low",
    image: "https://www.capri-sun.com/assets/Uploads/pages/products/TP_Orange_clean-3__ScaleMaxHeightWzYyN10.png"
  },
  { 
    id: "7", 
    name: "SuperBite Sausage Roll 100g", 
    subName: "30/carton • Beef Roll", 
    sku: "SUP-BIT-SAU-100", 
    category: "Snacks", 
    cartonPrice: "₦5,400", 
    unitPrice: "₦180", 
    stock: 12000, 
    status: "active",
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
        <Box size={Math.round(size * 0.45)} />
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Image Upload Mode
  const [newUploadMode, setNewUploadMode] = useState<"link" | "file">("link");
  const [editUploadMode, setEditUploadMode] = useState<"link" | "file">("link");
  const newFileInputRef = React.useRef<HTMLInputElement>(null);
  const editFileInputRef = React.useRef<HTMLInputElement>(null);

  // New product form
  const [newForm, setNewForm] = useState({
    name: "",
    subName: "24/carton",
    sku: "",
    category: "Juice",
    cartonPrice: "₦10,000",
    unitPrice: "₦500",
    stock: 500,
    hasPromo: false,
    image: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file (PNG, JPG, WEBP)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.sku) return;

    const stockNum = Number(newForm.stock) || 0;
    const newProduct: Product = {
      id: String(Date.now()),
      name: newForm.name,
      subName: newForm.subName,
      sku: newForm.sku.toUpperCase(),
      category: newForm.category,
      cartonPrice: newForm.cartonPrice.startsWith("₦") ? newForm.cartonPrice : `₦${newForm.cartonPrice}`,
      unitPrice: newForm.unitPrice.startsWith("₦") ? newForm.unitPrice : `₦${newForm.unitPrice}`,
      stock: stockNum,
      status: stockNum === 0 ? "out" : stockNum < 300 ? "low" : "active",
      hasPromo: newForm.hasPromo,
      image: newForm.image ? newForm.image.trim() : undefined,
    };

    setProducts([newProduct, ...products]);
    setIsNewModalOpen(false);
    setNewForm({
      name: "",
      subName: "24/carton",
      sku: "",
      category: "Juice",
      cartonPrice: "₦10,000",
      unitPrice: "₦500",
      stock: 500,
      hasPromo: false,
      image: "",
    });
    showToast(`Added ${newProduct.name} to catalog`);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const stockNum = Number(editingProduct.stock) || 0;
    const updated: Product = {
      ...editingProduct,
      status: stockNum === 0 ? "out" : stockNum < 300 ? "low" : "active",
    };

    setProducts(products.map(p => p.id === updated.id ? updated : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = () => {
    if (!deleteConfirmProduct) return;
    setProducts(products.filter(p => p.id !== deleteConfirmProduct.id));
    const name = deleteConfirmProduct.name;
    setDeleteConfirmProduct(null);
    setActiveMenuId(null);
    showToast(`Deleted ${name} from catalog`);
  };

  const handleTogglePromo = (id: string) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, hasPromo: !p.hasPromo };
      }
      return p;
    }));
    setActiveMenuId(null);
  };

  // Filtered
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === "Active") return p.status === "active";
    if (activeTab === "Low stock") return p.status === "low";
    if (activeTab === "Out of stock") return p.status === "out";
    return true;
  });

  const totalSKUs = products.length;
  const lowStockCount = products.filter(p => p.status === "low" || p.status === "out").length;
  const promoCount = products.filter(p => p.hasPromo).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", paddingBottom: "36px" }}>
      
      {/* Toast Notification */}
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Product Catalog</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Manage finished goods SKUs, wholesale carton pricing, packaging specs, and inventory alerts.
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
            Export Catalog
          </button>
          <button 
            onClick={() => setIsNewModalOpen(true)}
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
            <Plus size={16} />
            New product
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "16px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F8F9FA", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
            <Box size={20} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>TOTAL SKUS</p>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>{totalSKUs}</h3>
          </div>
        </div>
        
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "16px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444" }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>LOW / OUT OF STOCK</p>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#EF4444", margin: 0 }}>{lowStockCount}</h3>
          </div>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "16px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", color: "#16A34A" }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>INVENTORY VALUE</p>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>₦48.6M</h3>
          </div>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "16px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center", color: "#D97706" }}>
            <Tags size={20} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>ON PROMOTION</p>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>{promoCount}</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ position: "relative", flexGrow: 1, maxWidth: "400px" }}>
          <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search SKU, product name, or category..."
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

        <div style={{ display: "flex", gap: "8px" }}>
          {["All", "Active", "Low stock", "Out of stock"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                height: "36px",
                padding: "0 16px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                border: activeTab === tab ? "none" : "1px solid rgba(14,62,43,0.12)",
                backgroundColor: activeTab === tab ? "#0E3E2B" : "#FFFFFF",
                color: activeTab === tab ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                transition: "all 0.15s ease",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "1150px", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>SKU</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Carton Price</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit Price</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Stock</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, index) => (
                <tr key={p.id} style={{ borderBottom: index !== filteredProducts.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                  <td style={{ padding: "16px 24px", minWidth: "260px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <ProductThumbnail src={p.image} alt={p.name} size={44} />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E3E2B" }}>{p.name}</span>
                        <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{p.subName}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "12px", fontFamily: "monospace", color: "rgba(14,62,43,0.8)", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {p.sku}
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <span style={{ backgroundColor: "#F1F5F9", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", color: "#475569", fontWeight: 500 }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>
                    {p.cartonPrice}
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 500, color: "rgba(14,62,43,0.7)", whiteSpace: "nowrap" }}>
                    {p.unitPrice}
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 700, color: p.stock > 500 ? "#16A34A" : p.stock === 0 ? "#EF4444" : "#D97706", whiteSpace: "nowrap" }}>
                    {p.stock.toLocaleString()} ctns
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {p.status === "active" && (
                        <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", padding: "3px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>Active</span>
                      )}
                      {p.status === "low" && (
                        <span style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "3px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>Low Stock</span>
                      )}
                      {p.status === "out" && (
                        <span style={{ backgroundColor: "#FEE2E2", color: "#EF4444", padding: "3px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>Out of Stock</span>
                      )}
                      {p.hasPromo && (
                        <span style={{ backgroundColor: "#FFEDD5", color: "#EA580C", padding: "3px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>Promo</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                      <button 
                        title="Edit product"
                        onClick={() => setEditingProduct(p)}
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
                          color: "#0E3E2B"
                        }} 
                        className="hover:bg-black/5"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button 
                        title="Delete product"
                        onClick={() => setDeleteConfirmProduct(p)}
                        style={{ 
                          width: "32px", 
                          height: "32px", 
                          borderRadius: "8px", 
                          border: "1px solid rgba(239,68,68,0.2)", 
                          backgroundColor: "#FEF2F2", 
                          cursor: "pointer", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          color: "#EF4444"
                        }} 
                        className="hover:bg-[#FEE2E2]"
                      >
                        <Trash2 size={14} />
                      </button>

                      <button 
                        title="More options"
                        onClick={() => setActiveMenuId(activeMenuId === p.id ? null : p.id)}
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

                    {/* Row Menu Dropdown */}
                    {activeMenuId === p.id && (
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
                          minWidth: "180px", 
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
                            setEditingProduct(p);
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
                          <Edit2 size={14} />
                          Edit SKU Details
                        </button>

                        <button
                          onClick={() => handleTogglePromo(p.id)}
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
                          <Tags size={14} />
                          {p.hasPromo ? "Remove Promo Tag" : "Mark as Promo Deal"}
                        </button>

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            setDeleteConfirmProduct(p);
                          }}
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
                          Delete Product
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: "48px 24px", textAlign: "center", color: "rgba(14,62,43,0.5)", fontSize: "14px" }}>
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ADD NEW PRODUCT */}
      {isNewModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsNewModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Add New Product SKU</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Configure product details, wholesale pack units, and inventory threshold.
            </p>

            <form onSubmit={handleCreateProduct} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chivita 100% Real Apple 1L"
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              {/* Product Image Input (URL or Local File) */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B" }}>
                    Product Image
                  </label>
                  <div style={{ display: "flex", gap: "4px", backgroundColor: "rgba(14,62,43,0.06)", padding: "2px", borderRadius: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setNewUploadMode("link")}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: newUploadMode === "link" ? "#0E3E2B" : "transparent",
                        color: newUploadMode === "link" ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      Web Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewUploadMode("file")}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: newUploadMode === "file" ? "#0E3E2B" : "transparent",
                        color: newUploadMode === "file" ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {newUploadMode === "link" ? (
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
                      <LinkIcon size={15} />
                    </div>
                    <input
                      type="url"
                      placeholder="Paste image URL (e.g. https://...)"
                      value={newForm.image}
                      onChange={(e) => setNewForm({ ...newForm, image: e.target.value })}
                      style={{ width: "100%", height: "42px", paddingLeft: "38px", paddingRight: "14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={newFileInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (dataUrl) => setNewForm({ ...newForm, image: dataUrl }));
                        }
                      }}
                    />
                    <div
                      onClick={() => newFileInputRef.current?.click()}
                      style={{
                        border: "1.5px dashed rgba(14,62,43,0.25)",
                        borderRadius: "10px",
                        padding: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: "rgba(14,62,43,0.02)",
                        transition: "all 0.2s ease",
                      }}
                      className="hover:border-[#0E3E2B] hover:bg-black/5"
                    >
                      <UploadCloud size={20} color="#0E3E2B" style={{ margin: "0 auto 4px" }} />
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", margin: 0 }}>
                        Click to browse local image
                      </p>
                      <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", margin: "2px 0 0" }}>
                        PNG, JPG, WEBP
                      </p>
                    </div>
                  </div>
                )}

                {/* Live Preview Box */}
                {newForm.image && (
                  <div style={{ marginTop: "8px", padding: "8px 12px", borderRadius: "8px", backgroundColor: "rgba(14,62,43,0.03)", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "6px", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.1)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={newForm.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#0E3E2B" }}>Product Image Attached</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewForm({ ...newForm, image: "" })}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      <X size={14} /> Remove
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>SKU Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CH-APP-1L"
                    value={newForm.sku}
                    onChange={(e) => setNewForm({ ...newForm, sku: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Category</label>
                  <select
                    value={newForm.category}
                    onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="Juice">Juice</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Energy">Energy Drinks</option>
                    <option value="Water">Water</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Carton Price *</label>
                  <input
                    type="text"
                    required
                    placeholder="₦11,000"
                    value={newForm.cartonPrice}
                    onChange={(e) => setNewForm({ ...newForm, cartonPrice: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Pack Spec</label>
                  <input
                    type="text"
                    placeholder="24/carton"
                    value={newForm.subName}
                    onChange={(e) => setNewForm({ ...newForm, subName: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Initial Stock (Cartons)</label>
                  <input
                    type="number"
                    value={newForm.stock}
                    onChange={(e) => setNewForm({ ...newForm, stock: Number(e.target.value) })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={newForm.hasPromo}
                      onChange={(e) => setNewForm({ ...newForm, hasPromo: e.target.checked })}
                      style={{ width: "16px", height: "16px" }}
                    />
                    Mark on Promotion Deal
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Save & Publish SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PRODUCT */}
      {editingProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setEditingProduct(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Edit SKU: {editingProduct.sku}</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Update wholesale pricing, pack specifications, and active stock balance.
            </p>

            <form onSubmit={handleUpdateProduct} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              {/* Edit Product Image Input (URL or Local File) */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B" }}>
                    Product Image
                  </label>
                  <div style={{ display: "flex", gap: "4px", backgroundColor: "rgba(14,62,43,0.06)", padding: "2px", borderRadius: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setEditUploadMode("link")}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: editUploadMode === "link" ? "#0E3E2B" : "transparent",
                        color: editUploadMode === "link" ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      Web Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditUploadMode("file")}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: editUploadMode === "file" ? "#0E3E2B" : "transparent",
                        color: editUploadMode === "file" ? "#FFFFFF" : "rgba(14,62,43,0.7)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {editUploadMode === "link" ? (
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
                      <LinkIcon size={15} />
                    </div>
                    <input
                      type="url"
                      placeholder="Paste image URL (e.g. https://...)"
                      value={editingProduct.image || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      style={{ width: "100%", height: "42px", paddingLeft: "38px", paddingRight: "14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (dataUrl) => setEditingProduct({ ...editingProduct, image: dataUrl }));
                        }
                      }}
                    />
                    <div
                      onClick={() => editFileInputRef.current?.click()}
                      style={{
                        border: "1.5px dashed rgba(14,62,43,0.25)",
                        borderRadius: "10px",
                        padding: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: "rgba(14,62,43,0.02)",
                        transition: "all 0.2s ease",
                      }}
                      className="hover:border-[#0E3E2B] hover:bg-black/5"
                    >
                      <UploadCloud size={20} color="#0E3E2B" style={{ margin: "0 auto 4px" }} />
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", margin: 0 }}>
                        Click to browse local image
                      </p>
                      <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", margin: "2px 0 0" }}>
                        PNG, JPG, WEBP
                      </p>
                    </div>
                  </div>
                )}

                {/* Live Preview Box */}
                {editingProduct.image && (
                  <div style={{ marginTop: "8px", padding: "8px 12px", borderRadius: "8px", backgroundColor: "rgba(14,62,43,0.03)", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "6px", backgroundColor: "#FFFFFF", border: "1px solid rgba(14,62,43,0.1)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={editingProduct.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#0E3E2B" }}>Product Image Attached</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, image: "" })}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      <X size={14} /> Remove
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="Juice">Juice</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Energy">Energy Drinks</option>
                    <option value="Water">Water</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Pack Spec</label>
                  <input
                    type="text"
                    value={editingProduct.subName}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subName: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Carton Price</label>
                  <input
                    type="text"
                    value={editingProduct.cartonPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, cartonPrice: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Unit Price</label>
                  <input
                    type="text"
                    value={editingProduct.unitPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, unitPrice: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Stock Count (Cartons)</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={editingProduct.hasPromo || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, hasPromo: e.target.checked })}
                      style={{ width: "16px", height: "16px" }}
                    />
                    Promo Deal Active
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE CONFIRMATION */}
      {deleteConfirmProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "440px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#EF4444", margin: 0, marginBottom: "8px" }}>Delete Product SKU?</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.7)", margin: 0, lineHeight: "1.5" }}>
              Are you sure you want to remove <strong>{deleteConfirmProduct.name}</strong> ({deleteConfirmProduct.sku}) from your FMCG catalog? This action will remove it from all active orders and price lists.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmProduct(null)}
                style={{ height: "40px", padding: "0 18px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
              >
                Keep SKU
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                style={{ height: "40px", padding: "0 20px", borderRadius: "9999px", border: "none", backgroundColor: "#EF4444", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                className="hover:bg-red-700"
              >
                Yes, Delete SKU
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
