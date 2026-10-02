"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Battery, 
  Phone, 
  ChevronRight, 
  Layers, 
  RefreshCw,
  Eye,
  CheckCircle2,
  X,
  Radio,
  Sliders
} from "lucide-react";

interface LiveRepLocation {
  id: string;
  name: string;
  code: string;
  phone: string;
  territory: string;
  currentStop: string;
  checkInTime: string;
  battery: number;
  speed: string;
  status: "At Outlet" | "Traveling" | "Idle / Paused" | "Geofence Breach";
  stopsCompleted: number;
  totalStops: number;
  lat: number;
  lng: number;
}

const liveReps: LiveRepLocation[] = [
  {
    id: "1",
    name: "Tunde Bakare",
    code: "REP-LAG-01",
    phone: "+234 803 124 5581",
    territory: "Ikeja Wholesale Beat",
    currentStop: "Goodluck Supermarket, Allen Ave",
    checkInTime: "11 mins ago (10:14 AM)",
    battery: 84,
    speed: "0 km/h (In-store)",
    status: "At Outlet",
    stopsCompleted: 14,
    totalStops: 22,
    lat: 6.5965,
    lng: 3.3533,
  },
  {
    id: "2",
    name: "Emeka Okafor",
    code: "REP-LAG-04",
    phone: "+234 802 991 3340",
    territory: "Idumota / Marina FMCG Beat",
    currentStop: "Alhaji Musa Depot, Balogun",
    checkInTime: "4 mins ago (10:21 AM)",
    battery: 68,
    speed: "0 km/h (In-store)",
    status: "At Outlet",
    stopsCompleted: 18,
    totalStops: 25,
    lat: 6.4549,
    lng: 3.3891,
  },
  {
    id: "3",
    name: "Amina Yusuf",
    code: "REP-KAN-02",
    phone: "+234 809 441 7720",
    territory: "Fagge Market Corridor",
    currentStop: "Bata Roundabout En-route Sabon Gari",
    checkInTime: "Transit ping 2 mins ago",
    battery: 48,
    speed: "28 km/h (Motorbike)",
    status: "Traveling",
    stopsCompleted: 11,
    totalStops: 20,
    lat: 12.0022,
    lng: 8.592,
  },
  {
    id: "4",
    name: "Chukwudi Eze",
    code: "REP-PH-03",
    phone: "+234 818 554 9911",
    territory: "Trans-Amadi Industrial",
    currentStop: "Outside Assigned Zone (Mile 1)",
    checkInTime: "Check-in attempted 35 mins ago",
    battery: 30,
    speed: "0 km/h",
    status: "Geofence Breach",
    stopsCompleted: 5,
    totalStops: 20,
    lat: 4.8156,
    lng: 7.0498,
  },
];

export default function LiveTrackingPage() {
  const [reps, setReps] = useState<LiveRepLocation[]>(liveReps);
  const [selectedRep, setSelectedRep] = useState<LiveRepLocation>(liveReps[0]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals
  const [isGeofenceModalOpen, setIsGeofenceModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [geofenceRadius, setGeofenceRadius] = useState("50");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Live GPS telemetry refreshed for all field reps");
    }, 800);
  };

  const getStatusColor = (status: LiveRepLocation["status"]) => {
    switch (status) {
      case "At Outlet":
        return { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E" };
      case "Traveling":
        return { bg: "#EFF6FF", text: "#2563EB", dot: "#3B82F6" };
      case "Idle / Paused":
        return { bg: "#FFFBEB", text: "#D97706", dot: "#F59E0B" };
      case "Geofence Breach":
        return { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444" };
    }
  };

  const filteredReps = reps.filter(r => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Breaches") return r.status === "Geofence Breach";
    return r.status === filterStatus;
  });

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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Live GPS Workforce Tracking</h1>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0, marginTop: "4px" }}>
            Real-time breadcrumb trails, geofence radius verification, and active field agent telemetry.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={handleRefreshFeed}
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
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            Refresh GPS Feed
          </button>
          <button 
            onClick={() => setIsGeofenceModalOpen(true)}
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
            <ShieldCheck size={16} />
            Geofence Policies
          </button>
        </div>
      </div>

      {/* Main Split Interface */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5"
        style={{ minHeight: "640px" }}
      >
        
        {/* Left Side: Reps Feed */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid rgba(14,62,43,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>Field Agents Feed ({reps.length})</span>
              <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22C55E" }} />
                Live GPS Sync
              </span>
            </div>
            
            <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
              {["All", "At Outlet", "Traveling", "Breaches"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    border: "1px solid",
                    borderColor: filterStatus === status ? "#0E3E2B" : "rgba(14,62,43,0.1)",
                    backgroundColor: filterStatus === status ? "#0E3E2B" : "transparent",
                    color: filterStatus === status ? "#FFFFFF" : "#0E3E2B",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowY: "auto", flexGrow: 1 }}>
            {filteredReps.map((rep) => {
              const badge = getStatusColor(rep.status);
              const isSelected = selectedRep.id === rep.id;

              return (
                <div
                  key={rep.id}
                  onClick={() => setSelectedRep(rep)}
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid rgba(14,62,43,0.06)",
                    backgroundColor: isSelected ? "#F0F5ED" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  className="hover:bg-black/[0.02]"
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "6px" }}>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>{rep.name}</h4>
                      <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{rep.code} • {rep.territory}</span>
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        backgroundColor: badge.bg,
                        color: badge.text,
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: badge.dot }} />
                      {rep.status}
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "#0E3E2B", margin: "4px 0", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
                    <MapPin size={12} color="rgba(14,62,43,0.4)" />
                    {rep.currentStop}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px", fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>
                    <span>{rep.checkInTime}</span>
                    <span style={{ fontWeight: 600, color: "#0E3E2B" }}>{rep.stopsCompleted}/{rep.totalStops} visits</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Map Canvas Simulation with Geofence & Rep Diagnostics */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", minHeight: "480px" }}>
          
          {/* Simulated Map Visual */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "#F3F6F3", backgroundImage: "radial-gradient(#0E3E2B 0.75px, transparent 0.75px), radial-gradient(#0E3E2B 0.75px, #F3F6F3 0.75px)", backgroundSize: "30px 30px", backgroundPosition: "0 0, 15px 15px", opacity: 0.25 }} />

          {/* Map Controls Overlay */}
          <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 10, display: "flex", gap: "8px" }}>
            <div style={{ backgroundColor: "#FFFFFF", padding: "8px 16px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.1)", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              Territory: <strong>{selectedRep.territory}</strong>
            </div>
            <div style={{ backgroundColor: "#FFFFFF", padding: "8px 16px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.1)", fontSize: "12px", fontWeight: 600, color: "#16A34A", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={14} />
              Geofence: {geofenceRadius}m Radius Active
            </div>
          </div>

          {/* Map Marker Pin in Center */}
          <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 5 }}>
            
            {/* Geofence Circle */}
            <div style={{ width: "240px", height: "240px", borderRadius: "50%", backgroundColor: "rgba(163,255,0,0.15)", border: "2px dashed #0E3E2B", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              
              {/* Ping Animation */}
              <div style={{ position: "absolute", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(14,62,43,0.15)", animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              
              {/* Rep Pin Marker */}
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#0E3E2B", color: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px rgba(0,0,0,0.2)", border: "3px solid #A3FF00", zIndex: 10 }}>
                <Navigation size={20} color="#A3FF00" />
              </div>

              {/* Pin Callout Box */}
              <div style={{ position: "absolute", bottom: "-50px", backgroundColor: "#FFFFFF", padding: "8px 16px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center", whiteSpace: "nowrap" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#0E3E2B" }}>{selectedRep.name}</div>
                <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>{selectedRep.speed}</div>
              </div>
            </div>

          </div>

          {/* Bottom Telemetry Card */}
          <div style={{ padding: "20px", backgroundColor: "#FFFFFF", borderTop: "1px solid rgba(14,62,43,0.08)", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", fontWeight: 600, textTransform: "uppercase" }}>Current Outlet</span>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B", margin: "4px 0 0" }}>{selectedRep.currentStop}</p>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", fontWeight: 600, textTransform: "uppercase" }}>Battery & Device</span>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B", margin: "4px 0 0", display: "flex", alignItems: "center", gap: "6px" }}>
                <Battery size={14} color={selectedRep.battery < 40 ? "#EF4444" : "#10B981"} />
                {selectedRep.battery}% Charged (Samsung A15)
              </p>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", fontWeight: 600, textTransform: "uppercase" }}>GPS Coordinates</span>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(14,62,43,0.8)", margin: "4px 0 0" }}>
                {selectedRep.lat.toFixed(4)}° N, {selectedRep.lng.toFixed(4)}° E
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
              <button 
                onClick={() => setIsCallModalOpen(true)}
                style={{ height: "36px", padding: "0 14px", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }} 
                className="hover:bg-black/5"
              >
                <Phone size={12} />
                Call Agent
              </button>
              <button 
                onClick={() => setIsAuditModalOpen(true)}
                style={{ height: "36px", padding: "0 16px", backgroundColor: "#0E3E2B", border: "none", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }} 
                className="hover:bg-[#08281B]"
              >
                View Full Audit
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Modal: Geofence Policies */}
      {isGeofenceModalOpen && (
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
            maxWidth: "460px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={20} color="#0E3E2B" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Geofence Compliance Policies
                </h3>
              </div>
              <button 
                onClick={() => setIsGeofenceModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>
                  Store Check-in Radius Tolerance
                </label>
                <select
                  value={geofenceRadius}
                  onChange={(e) => setGeofenceRadius(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.2)", fontSize: "13px", outline: "none", backgroundColor: "#FFFFFF" }}
                >
                  <option value="25">25 Meters (Ultra-strict mall/store checkin)</option>
                  <option value="50">50 Meters (Recommended FMCG standard)</option>
                  <option value="100">100 Meters (Wholesale markets & dense alleys)</option>
                  <option value="200">200 Meters (Rural highway distributor depots)</option>
                </select>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F0F5ED", borderRadius: "10px", fontSize: "12px", color: "rgba(14,62,43,0.8)", lineHeight: "1.5" }}>
                <p style={{ margin: 0, fontWeight: 600, color: "#0E3E2B" }}>Mock GPS Location Spoofing Protection</p>
                <p style={{ margin: "4px 0 0" }}>Android developer mock locations and mock mockers are automatically blocked. Orders cannot be logged without valid cellular cell-tower triangulation.</p>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsGeofenceModalOpen(false)}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", color: "#0E3E2B", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsGeofenceModalOpen(false);
                    showToast(`Geofence radius set to ${geofenceRadius}m across all mobile handsets!`);
                  }}
                  style={{ flex: 1, height: "44px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", color: "#FFFFFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Call Field Agent */}
      {isCallModalOpen && (
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
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={18} color="#0E3E2B" />
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Contact Field Agent
                </h3>
              </div>
              <button 
                onClick={() => setIsCallModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "16px", backgroundColor: "#F8FAF8", borderRadius: "12px", marginBottom: "20px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>{selectedRep.name}</h4>
              <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.6)", margin: "2px 0 10px" }}>{selectedRep.code} • {selectedRep.territory}</p>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B" }}>{selectedRep.phone}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`tel:${selectedRep.phone}`}
                onClick={() => {
                  setIsCallModalOpen(false);
                  showToast(`Calling ${selectedRep.name}...`);
                }}
                style={{
                  height: "44px",
                  borderRadius: "9999px",
                  backgroundColor: "#0E3E2B",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textDecoration: "none"
                }}
              >
                <Phone size={16} />
                Dial Cellular Phone
              </a>
              <button
                onClick={() => {
                  setIsCallModalOpen(false);
                  showToast(`High-priority push alert sent to ${selectedRep.name}'s handset!`);
                }}
                style={{
                  height: "44px",
                  borderRadius: "9999px",
                  backgroundColor: "#F0F5ED",
                  color: "#0E3E2B",
                  border: "1px solid rgba(14,62,43,0.15)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Send Direct Alert Ping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Outlet Audit Inspector */}
      {isAuditModalOpen && (
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
            maxWidth: "480px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                  Active Audit: {selectedRep.currentStop}
                </h3>
                <span style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)" }}>Logged by {selectedRep.name}</span>
              </div>
              <button 
                onClick={() => setIsAuditModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "14px", backgroundColor: "#F0F5ED", borderRadius: "10px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Daily Route Progress</span>
                  <p style={{ margin: "2px 0 0", fontSize: "16px", fontWeight: 700, color: "#0E3E2B" }}>{selectedRep.stopsCompleted}/{selectedRep.totalStops} Visited</p>
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>Status</span>
                  <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: 700, color: selectedRep.status === "Geofence Breach" ? "#EF4444" : "#16A34A" }}>
                    {selectedRep.status}
                  </p>
                </div>
              </div>

              <div style={{ padding: "14px", backgroundColor: "#F8FAF8", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Geofence Radius Check</span>
                <p style={{ margin: "4px 0 0", fontWeight: 600, color: "#0E3E2B" }}>
                  {selectedRep.status === "Geofence Breach" ? "Agent is 1.4km outside assigned retail zone!" : "Within 20m of store coordinates"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAuditModalOpen(false)}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "9999px",
                border: "none",
                backgroundColor: "#0E3E2B",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
