"use client";

import React, { useState } from "react";
import { 
  Route, 
  MapPin, 
  Calendar, 
  Plus, 
  Search, 
  ChevronRight, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  RotateCcw,
  X,
  Edit2
} from "lucide-react";
import Link from "next/link";

interface JourneyPlan {
  id: string;
  routeName: string;
  territory: string;
  assignedRep: string;
  frequency: "Daily" | "Weekly" | "Bi-Weekly";
  totalOutlets: number;
  scheduledTime: string;
  complianceRate: number;
  stops: {
    sequence: number;
    outletName: string;
    type: "Wholesale Depot" | "Supermarket" | "Kiosk / Retailer";
    targetOrder: string;
    address: string;
  }[];
}

const initialPlans: JourneyPlan[] = [
  {
    id: "1",
    routeName: "Ikeja Commercial Wholesale Loop",
    territory: "Lagos Mainland",
    assignedRep: "Tunde Bakare",
    frequency: "Daily",
    totalOutlets: 22,
    scheduledTime: "08:30 AM - 04:30 PM",
    complianceRate: 94,
    stops: [
      { sequence: 1, outletName: "Goodluck Supermarket", type: "Supermarket", targetOrder: "₦350,000", address: "14 Allen Avenue, Ikeja" },
      { sequence: 2, outletName: "Alhaji Bello Beverage Stores", type: "Wholesale Depot", targetOrder: "₦1,200,000", address: "Oba Akran Road" },
      { sequence: 3, outletName: "De-Choice Provision Store", type: "Kiosk / Retailer", targetOrder: "₦85,000", address: "Oregun Junction" },
      { sequence: 4, outletName: "Prince Ebeano Supermarket", type: "Supermarket", targetOrder: "₦650,000", address: "Isaac John St, GRA" },
    ],
  },
  {
    id: "2",
    routeName: "Idumota Core FMCG Corridor",
    territory: "Lagos Island",
    assignedRep: "Emeka Okafor",
    frequency: "Daily",
    totalOutlets: 28,
    scheduledTime: "08:00 AM - 05:00 PM",
    complianceRate: 98,
    stops: [
      { sequence: 1, outletName: "Lagos Island Beverages Central", type: "Wholesale Depot", targetOrder: "₦2,500,000", address: "Idumota Wholesale Line 4" },
      { sequence: 2, outletName: "Chief Okoro Packaging & Provisions", type: "Wholesale Depot", targetOrder: "₦1,800,000", address: "Nnamdi Azikiwe St" },
      { sequence: 3, outletName: "Mama Chichi Retail Haven", type: "Kiosk / Retailer", targetOrder: "₦120,000", address: "Balogun Market Gate 2" },
    ],
  },
  {
    id: "3",
    routeName: "Fagge & Sabon Gari Bulk Route",
    territory: "Kano Central",
    assignedRep: "Amina Yusuf",
    frequency: "Weekly",
    totalOutlets: 20,
    scheduledTime: "09:00 AM - 04:00 PM",
    complianceRate: 91,
    stops: [
      { sequence: 1, outletName: "Alhaji Musa Main Depot", type: "Wholesale Depot", targetOrder: "₦4,000,000", address: "Fagge Market Gate 1" },
      { sequence: 2, outletName: "Bata Stores Co.", type: "Supermarket", targetOrder: "₦500,000", address: "France Road, Sabon Gari" },
    ],
  },
];

export default function BeatPlanningPage() {
  const [plans, setPlans] = useState<JourneyPlan[]>(initialPlans);
  const [selectedPlan, setSelectedPlan] = useState<JourneyPlan>(initialPlans[0]);
  const [activeDay, setActiveDay] = useState("Monday");

  // Modals
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanTerritory, setNewPlanTerritory] = useState("Lagos Mainland");
  const [newPlanRep, setNewPlanRep] = useState("Tunde Bakare");
  const [newPlanFreq, setNewPlanFreq] = useState<JourneyPlan["frequency"]>("Daily");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOptimize = () => {
    showToast("Route sequence optimized using real-time traffic: 18% less travel time saved");
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanName) return;

    const plan: JourneyPlan = {
      id: String(Date.now()),
      routeName: newPlanName,
      territory: newPlanTerritory,
      assignedRep: newPlanRep,
      frequency: newPlanFreq,
      totalOutlets: 15,
      scheduledTime: "08:30 AM - 04:30 PM",
      complianceRate: 100,
      stops: [
        { sequence: 1, outletName: "Central Wholesale Hub", type: "Wholesale Depot", targetOrder: "₦1,500,000", address: "Commercial Area Gate 1" },
        { sequence: 2, outletName: "Prime Retail Supermarket", type: "Supermarket", targetOrder: "₦420,000", address: "Main Expressway" },
      ]
    };

    setPlans([...plans, plan]);
    setSelectedPlan(plan);
    setIsCreatePlanOpen(false);
    setNewPlanName("");
    showToast(`Created Journey Plan: ${plan.routeName}`);
  };

  const handleUpdatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setPlans(plans.map(p => p.id === selectedPlan.id ? selectedPlan : p));
    setIsEditPlanOpen(false);
    showToast(`Updated Journey Plan: ${selectedPlan.routeName}`);
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Permanent Journey Plans (PJP) & Routes</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Design optimal retail visit sequences, set minimum order benchmarks, and monitor beat compliance.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={handleOptimize}
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
            <RotateCcw size={14} />
            Optimize Sequences
          </button>
          <button 
            onClick={() => setIsCreatePlanOpen(true)}
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
            Create Journey Plan
          </button>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "12px", overflowX: "auto" }}>
        <Link href="/field-reps" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#FFFFFF", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.15)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }} className="hover:bg-black/5">
            Rep Directory
          </button>
        </Link>
        <Link href="/field-reps/tracking" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#FFFFFF", color: "#0E3E2B", border: "1px solid rgba(14,62,43,0.15)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }} className="hover:bg-black/5">
            Live GPS Tracking
          </button>
        </Link>
        <Link href="/field-reps/routes" style={{ textDecoration: "none" }}>
          <button style={{ height: "36px", padding: "0 16px", borderRadius: "9999px", backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
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

      {/* Day Selector Pills */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            style={{
              height: "36px",
              padding: "0 18px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              border: activeDay === day ? "none" : "1px solid rgba(14,62,43,0.15)",
              backgroundColor: activeDay === day ? "#0E3E2B" : "#FFFFFF",
              color: activeDay === day ? "#FFFFFF" : "rgba(14,62,43,0.7)",
              transition: "all 0.15s ease",
            }}
          >
            {day} Beat
          </button>
        ))}
      </div>

      {/* Main Grid: Plans List on Left, Selected Plan Timeline on Right */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr", gap: "24px" }}>
        
        {/* Left Side: Route Plans List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {plans.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: isSelected ? "2px solid #0E3E2B" : "1px solid rgba(14,62,43,0.08)",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  boxShadow: isSelected ? "0 4px 14px rgba(14,62,43,0.08)" : "0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 0.15s ease",
                }}
                className="hover:shadow-md"
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.6)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {plan.territory}
                    </span>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: "4px 0 0" }}>
                      {plan.routeName}
                    </h3>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#F0FDF4", color: "#16A34A", padding: "3px 8px", borderRadius: "9999px" }}>
                    {plan.complianceRate}% adherence
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px", color: "rgba(14,62,43,0.7)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Users size={14} />
                    <span>{plan.assignedRep}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={14} />
                    <span>{plan.scheduledTime}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={14} />
                    <span>{plan.totalOutlets} outlets</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(14,62,43,0.06)", paddingTop: "10px", marginTop: "4px", fontSize: "12px" }}>
                  <span style={{ color: "rgba(14,62,43,0.5)" }}>Frequency: <strong>{plan.frequency}</strong></span>
                  <span style={{ color: "#0E3E2B", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}>
                    View stops <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Route Stops Sequencer */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", padding: "24px", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "16px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "#A3FF00", padding: "3px 8px", borderRadius: "4px" }}>
                SELECTED JOURNEY PLAN
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 4px" }}>{selectedPlan.routeName}</h3>
              <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0 }}>
                Target visit order configured for maximum fuel efficiency and retailer stocking windows.
              </p>
            </div>
            <button 
              onClick={() => setIsEditPlanOpen(true)}
              style={{ height: "36px", padding: "0 16px", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }} 
              className="hover:bg-black/5"
            >
              <Edit2 size={13} />
              Edit Plan
            </button>
          </div>

          {/* Timeline Sequence */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {selectedPlan.stops.map((stop, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "16px", position: "relative" }}>
                
                {/* Sequence Indicator Number */}
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#0E3E2B", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, flexShrink: 0, zIndex: 2 }}>
                  {stop.sequence}
                </div>

                {/* Vertical Connector Line */}
                {idx !== selectedPlan.stops.length - 1 && (
                  <div style={{ position: "absolute", left: "15px", top: "32px", bottom: "-16px", width: "2px", backgroundColor: "rgba(14,62,43,0.1)", zIndex: 1 }} />
                )}

                {/* Outlet Card */}
                <div style={{ flex: 1, backgroundColor: "#F8FAF8", padding: "14px 16px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#0E3E2B" }}>{stop.outletName}</span>
                      <span style={{ fontSize: "10px", fontWeight: 600, backgroundColor: "#FFFFFF", padding: "2px 6px", borderRadius: "4px", border: "1px solid rgba(14,62,43,0.08)", color: "rgba(14,62,43,0.7)" }}>
                        {stop.type}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)", marginTop: "2px" }}>
                      {stop.address}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", display: "block" }}>Order Target</span>
                    <strong style={{ fontSize: "13px", color: "#0E3E2B" }}>{stop.targetOrder}</strong>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL 1: CREATE JOURNEY PLAN */}
      {isCreatePlanOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "480px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsCreatePlanOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Create Permanent Journey Plan</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Define a new scheduled route corridor for field sales reps.
            </p>

            <form onSubmit={handleCreatePlan} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Route Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surulere Retail Wholesale Beat"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Territory</label>
                  <input
                    type="text"
                    required
                    value={newPlanTerritory}
                    onChange={(e) => setNewPlanTerritory(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Assigned Rep</label>
                  <input
                    type="text"
                    required
                    value={newPlanRep}
                    onChange={(e) => setNewPlanRep(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Frequency</label>
                <select
                  value={newPlanFreq}
                  onChange={(e) => setNewPlanFreq(e.target.value as any)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsCreatePlanOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT JOURNEY PLAN */}
      {isEditPlanOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "480px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsEditPlanOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Edit Journey Plan</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Update route parameters for <strong>{selectedPlan.routeName}</strong>.
            </p>

            <form onSubmit={handleUpdatePlan} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Route Name</label>
                <input
                  type="text"
                  required
                  value={selectedPlan.routeName}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, routeName: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Assigned Rep</label>
                  <input
                    type="text"
                    required
                    value={selectedPlan.assignedRep}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, assignedRep: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Operating Window</label>
                  <input
                    type="text"
                    required
                    value={selectedPlan.scheduledTime}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, scheduledTime: e.target.value })}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsEditPlanOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
