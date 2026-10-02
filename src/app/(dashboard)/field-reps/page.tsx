"use client";

import React, { useState } from "react";
import { 
  Users, 
  MapPin, 
  Search, 
  Plus, 
  Filter, 
  Navigation, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  MoreHorizontal,
  Battery,
  ShieldCheck,
  ShoppingBag,
  X,
  Edit2,
  Trash2
} from "lucide-react";
import Link from "next/link";

interface FieldRep {
  id: string;
  name: string;
  code: string;
  territory: string;
  assignedOutlets: number;
  visitedToday: number;
  targetVisits: number;
  ordersLogged: number;
  totalSalesToday: string;
  batteryLevel: number;
  status: "In Field" | "En Route" | "At Depot" | "Offline";
  lastCheckIn: string;
  accuracyScore: number;
}

const initialReps: FieldRep[] = [
  {
    id: "1",
    name: "Tunde Bakare",
    code: "REP-LAG-01",
    territory: "Lagos Mainland (Ikeja & Ogba)",
    assignedOutlets: 28,
    visitedToday: 19,
    targetVisits: 22,
    ordersLogged: 14,
    totalSalesToday: "₦1,850,000",
    batteryLevel: 82,
    status: "In Field",
    lastCheckIn: "12 mins ago @ Ikeja City Mall",
    accuracyScore: 98,
  },
  {
    id: "2",
    name: "Emeka Okafor",
    code: "REP-LAG-04",
    territory: "Lagos Island (Idumota & Marina)",
    assignedOutlets: 35,
    visitedToday: 24,
    targetVisits: 25,
    ordersLogged: 21,
    totalSalesToday: "₦3,420,000",
    batteryLevel: 65,
    status: "In Field",
    lastCheckIn: "5 mins ago @ Idumota Market",
    accuracyScore: 99,
  },
  {
    id: "3",
    name: "Amina Yusuf",
    code: "REP-KAN-02",
    territory: "Kano Central (Fagge & Sabon Gari)",
    assignedOutlets: 30,
    visitedToday: 16,
    targetVisits: 20,
    ordersLogged: 12,
    totalSalesToday: "₦2,150,000",
    batteryLevel: 45,
    status: "En Route",
    lastCheckIn: "24 mins ago @ Bata Junction",
    accuracyScore: 95,
  },
  {
    id: "4",
    name: "Segun Adeleke",
    code: "REP-IBD-01",
    territory: "Ibadan Core (Bodija & Dugbe)",
    assignedOutlets: 24,
    visitedToday: 18,
    targetVisits: 18,
    ordersLogged: 15,
    totalSalesToday: "₦1,420,000",
    batteryLevel: 90,
    status: "In Field",
    lastCheckIn: "8 mins ago @ Bodija Market",
    accuracyScore: 100,
  },
  {
    id: "5",
    name: "Chukwudi Eze",
    code: "REP-PH-03",
    territory: "Port Harcourt (Trans-Amadi & Mile 1)",
    assignedOutlets: 26,
    visitedToday: 8,
    targetVisits: 20,
    ordersLogged: 5,
    totalSalesToday: "₦780,000",
    batteryLevel: 32,
    status: "En Route",
    lastCheckIn: "45 mins ago @ Garrison Road",
    accuracyScore: 91,
  },
  {
    id: "6",
    name: "Blessing Danjuma",
    code: "REP-ABJ-01",
    territory: "Abuja Municipal (Wuse 2 & Garki)",
    assignedOutlets: 22,
    visitedToday: 0,
    targetVisits: 18,
    ordersLogged: 0,
    totalSalesToday: "₦0",
    batteryLevel: 100,
    status: "At Depot",
    lastCheckIn: "Stock dispatch @ Abuja Hub",
    accuracyScore: 100,
  },
];

const territories = [
  "All",
  "Lagos Mainland (Ikeja & Ogba)",
  "Lagos Island (Idumota & Marina)",
  "Kano Central (Fagge & Sabon Gari)",
  "Ibadan Core (Bodija & Dugbe)",
  "Port Harcourt (Trans-Amadi & Mile 1)",
  "Abuja Municipal (Wuse 2 & Garki)",
];

export default function FieldRepsDirectoryPage() {
  const [reps, setReps] = useState<FieldRep[]>(initialReps);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTerritory, setSelectedTerritory] = useState("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [editingRep, setEditingRep] = useState<FieldRep | null>(null);
  const [reassignRep, setReassignRep] = useState<FieldRep | null>(null);
  const [newTerritoryValue, setNewTerritoryValue] = useState(territories[1]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Onboard Form
  const [newRepName, setNewRepName] = useState("");
  const [newRepCode, setNewRepCode] = useState("");
  const [newRepTerritory, setNewRepTerritory] = useState(territories[1]);
  const [newRepTarget, setNewRepTarget] = useState(20);
  const [newRepOutlets, setNewRepOutlets] = useState(25);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOnboardRep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepName) return;

    const code = newRepCode || `REP-LAG-0${reps.length + 1}`;
    const newRep: FieldRep = {
      id: String(Date.now()),
      name: newRepName,
      code: code,
      territory: newRepTerritory,
      assignedOutlets: newRepOutlets,
      visitedToday: 0,
      targetVisits: newRepTarget,
      ordersLogged: 0,
      totalSalesToday: "₦0",
      batteryLevel: 100,
      status: "At Depot",
      lastCheckIn: "Just enrolled @ Territory Office",
      accuracyScore: 100,
    };

    setReps([newRep, ...reps]);
    setIsOnboardModalOpen(false);
    setNewRepName("");
    setNewRepCode("");
    showToast(`Onboarded ${newRep.name} (${newRep.code})`);
  };

  const handleUpdateRep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRep) return;

    setReps(reps.map(r => r.id === editingRep.id ? editingRep : r));
    showToast(`Updated profile for ${editingRep.name}`);
    setEditingRep(null);
  };

  const handleReassignTerritory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reassignRep) return;

    setReps(reps.map(r => {
      if (r.id === reassignRep.id) {
        return { ...r, territory: newTerritoryValue, lastCheckIn: "Reassigned beat" };
      }
      return r;
    }));

    showToast(`Reassigned ${reassignRep.name} to ${newTerritoryValue}`);
    setReassignRep(null);
    setActiveMenuId(null);
  };

  const handleToggleStatus = (id: string) => {
    setReps(reps.map(r => {
      if (r.id === id) {
        const nextStatus: FieldRep["status"] = 
          r.status === "In Field" ? "At Depot" : r.status === "At Depot" ? "Offline" : "In Field";
        return { ...r, status: nextStatus };
      }
      return r;
    }));
    setActiveMenuId(null);
    showToast("Updated representative status");
  };

  const handleDeleteRep = (id: string) => {
    setReps(reps.filter(r => r.id !== id));
    setActiveMenuId(null);
    showToast("Deactivated representative record");
  };

  const filteredReps = reps.filter(rep => {
    const matchesSearch = rep.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rep.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rep.territory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTerritory = selectedTerritory === "All" || rep.territory.includes(selectedTerritory);
    return matchesSearch && matchesTerritory;
  });

  const getStatusBadge = (status: FieldRep["status"]) => {
    switch (status) {
      case "In Field":
        return { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E" };
      case "En Route":
        return { bg: "#EFF6FF", text: "#2563EB", dot: "#3B82F6" };
      case "At Depot":
        return { bg: "#FFFBEB", text: "#D97706", dot: "#F59E0B" };
      case "Offline":
        return { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444" };
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Field Sales Representatives</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Real-time workforce management, territory coverage, GPS geofencing, and live daily order bookings.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            href="/field-reps/tracking"
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
              gap: "6px",
              textDecoration: "none"
            }} 
            className="hover:bg-black/5 transition-colors"
          >
            <Navigation size={14} />
            Live Map View
          </Link>
          <button 
            onClick={() => setIsOnboardModalOpen(true)}
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
            Onboard Representative
          </button>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "12px", overflowX: "auto" }}>
        <Link href="/field-reps" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Rep Directory
          </button>
        </Link>
        <Link href="/field-reps/tracking" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#FFFFFF", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.15)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }} className="hover:bg-black/5">
            Live GPS Tracking
          </button>
        </Link>
        <Link href="/field-reps/routes" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#FFFFFF", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.15)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }} className="hover:bg-black/5">
            Journey Plans (PJP)
          </button>
        </Link>
        <Link href="/field-reps/audits" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#FFFFFF", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.15)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }} className="hover:bg-black/5">
            Outlet Audits
          </button>
        </Link>
        <Link href="/field-reps/performance" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#FFFFFF", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.15)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }} className="hover:bg-black/5">
            Incentives & Targets
          </button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "rgba(14,62,43,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0E3E2B" }}>
            <Users size={22} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>Total Active Reps</p>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>{reps.length}</h3>
          </div>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", color: "#16A34A" }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>Bookings Today</p>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>₦9.62M</h3>
          </div>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB" }}>
            <MapPin size={22} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>Outlets Visited</p>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>85 / 123</h3>
          </div>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "20px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#FDF4FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#A855F7" }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, marginBottom: "4px" }}>Avg GPS Accuracy</p>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>97.2%</h3>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ position: "relative", flexGrow: 1, maxWidth: "420px" }}>
          <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search rep name, employee code, or territory..."
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

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Filter size={16} color="rgba(14,62,43,0.5)" />
          <select
            value={selectedTerritory}
            onChange={(e) => setSelectedTerritory(e.target.value)}
            style={{
              height: "40px",
              padding: "0 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(14,62,43,0.15)",
              backgroundColor: "#FFFFFF",
              fontSize: "13px",
              color: "#0E3E2B",
              outline: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {territories.map(t => (
              <option key={t} value={t}>{t === "All" ? "All Territories" : t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reps Directory Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", borderBottom: "1px solid rgba(14,62,43,0.08)", whiteSpace: "nowrap" }}>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Representative</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Territory Beat</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Today's Visits</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Sales Booked</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Last GPS Ping</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Field Status</th>
              <th style={{ padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReps.map((rep, idx) => {
              const badge = getStatusBadge(rep.status);
              const visitPercent = Math.round((rep.visitedToday / rep.targetVisits) * 100);

              return (
                <tr key={rep.id} style={{ borderBottom: idx !== filteredReps.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                  <td style={{ padding: "16px 24px", minWidth: "220px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(14,62,43,0.08)", color: "#0E3E2B", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>
                        {rep.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B" }}>{rep.name}</div>
                        <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", fontFamily: "monospace", whiteSpace: "nowrap" }}>{rep.code}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", minWidth: "180px" }}>
                    <div style={{ fontSize: "13px", color: "#0E3E2B", fontWeight: 500 }}>{rep.territory}</div>
                    <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px", whiteSpace: "nowrap" }}>{rep.assignedOutlets} assigned retailers</div>
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "80px", height: "6px", backgroundColor: "rgba(14,62,43,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${Math.min(visitPercent, 100)}%`, height: "100%", backgroundColor: visitPercent >= 80 ? "#10B981" : "#F59E0B" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B" }}>
                        {rep.visitedToday}/{rep.targetVisits}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{rep.totalSalesToday}</div>
                    <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", marginTop: "2px" }}>{rep.ordersLogged} orders booked</div>
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <div style={{ fontSize: "12px", color: "rgba(14,62,43,0.8)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={12} color="rgba(14,62,43,0.4)" />
                      {rep.lastCheckIn}
                    </div>
                    <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 500, marginTop: "2px" }}>
                      {rep.accuracyScore}% GPS match
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: badge.bg,
                        color: badge.text,
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: badge.dot }} />
                      {rep.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right", position: "relative", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                      <button
                        onClick={() => setEditingRep(rep)}
                        title="Edit Representative"
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
                        title="More actions"
                        onClick={() => setActiveMenuId(activeMenuId === rep.id ? null : rep.id)}
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
                    {activeMenuId === rep.id && (
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
                            setEditingRep(rep);
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
                          Edit Profile Details
                        </button>

                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            setReassignRep(rep);
                            setNewTerritoryValue(rep.territory);
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
                          <MapPin size={14} />
                          Reassign Territory Beat
                        </button>

                        <button
                          onClick={() => handleToggleStatus(rep.id)}
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
                          <Clock size={14} />
                          Toggle Field Status
                        </button>

                        <button
                          onClick={() => handleDeleteRep(rep.id)}
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
                          Deactivate Rep
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}

            {filteredReps.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: "48px 24px", textAlign: "center", color: "rgba(14,62,43,0.5)", fontSize: "14px" }}>
                  No field representatives match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: ONBOARD REPRESENTATIVE */}
      {isOnboardModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "500px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsOnboardModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Onboard Field Representative</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Provision mobile app login, allocate territory beat, and set daily visit targets.
            </p>

            <form onSubmit={handleOnboardRep} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Sanusi"
                  value={newRepName}
                  onChange={(e) => setNewRepName(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Territory Beat *</label>
                <select
                  value={newRepTerritory}
                  onChange={(e) => setNewRepTerritory(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  {territories.filter(t => t !== "All").map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Target Daily Outlets</label>
                  <input
                    type="number"
                    min={1}
                    value={newRepTarget}
                    onChange={(e) => setNewRepTarget(Number(e.target.value))}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Total Assigned Stores</label>
                  <input
                    type="number"
                    min={1}
                    value={newRepOutlets}
                    onChange={(e) => setNewRepOutlets(Number(e.target.value))}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsOnboardModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Confirm & Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT REPRESENTATIVE */}
      {editingRep && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "500px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setEditingRep(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Edit Profile: {editingRep.name}</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Update employee details, performance quotas, and active territory.
            </p>

            <form onSubmit={handleUpdateRep} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={editingRep.name}
                  onChange={(e) => setEditingRep({ ...editingRep, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Territory Beat</label>
                <select
                  value={editingRep.territory}
                  onChange={(e) => setEditingRep({ ...editingRep, territory: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  {territories.filter(t => t !== "All").map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Daily Target Visits</label>
                  <input
                    type="number"
                    min={1}
                    value={editingRep.targetVisits}
                    onChange={(e) => setEditingRep({ ...editingRep, targetVisits: Number(e.target.value) })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Assigned Stores</label>
                  <input
                    type="number"
                    min={1}
                    value={editingRep.assignedOutlets}
                    onChange={(e) => setEditingRep({ ...editingRep, assignedOutlets: Number(e.target.value) })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditingRep(null)}
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

      {/* MODAL 3: REASSIGN TERRITORY */}
      {reassignRep && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "460px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setReassignRep(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Reassign Territory Zone</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Move <strong>{reassignRep.name}</strong> to a different sales beat.
            </p>

            <form onSubmit={handleReassignTerritory} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>New Territory Beat</label>
                <select
                  value={newTerritoryValue}
                  onChange={(e) => setNewTerritoryValue(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  {territories.filter(t => t !== "All").map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setReassignRep(null)}
                  style={{ height: "40px", padding: "0 18px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "40px", padding: "0 22px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Confirm Reassignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
