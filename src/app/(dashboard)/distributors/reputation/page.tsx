"use client";

import React, { useState } from "react";
import { 
  Star, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  ExternalLink, 
  RefreshCw, 
  Plus, 
  ThumbsUp, 
  Building2,
  X,
  Send
} from "lucide-react";
import { useAppearance } from "@/context/AppearanceContext";

interface DistributorListing {
  id: string;
  name: string;
  location: string;
  city: string;
  googleStatus: "Connected" | "Needs Verification" | "Disconnected";
  rating: number;
  reviewCount: number;
  latestReview: {
    author: string;
    comment: string;
    date: string;
    rating: number;
  };
  phone: string;
}

const initialListings: DistributorListing[] = [
  {
    id: "1",
    name: "Alhaji Musa Wholesale Depot",
    location: "Kano Market Road, Fagge",
    city: "Kano",
    googleStatus: "Connected",
    rating: 4.8,
    reviewCount: 142,
    latestReview: {
      author: "Ibrahim Bello",
      comment: "Always stocked with original cartons. Best wholesale distributor in Kano.",
      date: "2 days ago",
      rating: 5,
    },
    phone: "+234 802 334 1109",
  },
  {
    id: "2",
    name: "Lagos Island Beverages Central",
    location: "Idumota Wholesale Hub",
    city: "Lagos",
    googleStatus: "Connected",
    rating: 4.6,
    reviewCount: 310,
    latestReview: {
      author: "Folake Adebayo",
      comment: "Quick dispatch for pallet orders. Friendly loading bay staff.",
      date: "1 week ago",
      rating: 5,
    },
    phone: "+234 803 891 0021",
  },
  {
    id: "3",
    name: "Mama Tope Stores & Depot",
    location: "Bodija Market, Ibadan",
    city: "Ibadan",
    googleStatus: "Connected",
    rating: 4.3,
    reviewCount: 88,
    latestReview: {
      author: "Kunle Shittu",
      comment: "Good wholesale prices on dairy and juice packs.",
      date: "3 weeks ago",
      rating: 4,
    },
    phone: "+234 805 112 4433",
  },
  {
    id: "4",
    name: "PH Riverside Distribution Hub",
    location: "Trans-Amadi Industrial Layout",
    city: "Port Harcourt",
    googleStatus: "Needs Verification",
    rating: 4.1,
    reviewCount: 42,
    latestReview: {
      author: "Chukwudi Eze",
      comment: "Stock is always fresh directly from factory. Need faster POS receipts.",
      date: "1 month ago",
      rating: 4,
    },
    phone: "+234 809 778 1234",
  },
];

export default function OnlineRepPage() {
  const { tokens, config } = useAppearance();
  const isDark = config.theme === "dark";
  const [listings, setListings] = useState<DistributorListing[]>(initialListings);
  const [syncing, setSyncing] = useState(false);

  // Modals
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [managingListing, setManagingListing] = useState<DistributorListing | null>(null);
  const [replyText, setReplyText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Connect Form
  const [connectName, setConnectName] = useState("");
  const [connectCity, setConnectCity] = useState("Lagos");
  const [connectAddress, setConnectAddress] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showToast("Synchronized reviews with Google Business Profile API");
    }, 1200);
  };

  const handleConnectProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectName) return;

    const newListing: DistributorListing = {
      id: String(Date.now()),
      name: connectName,
      location: connectAddress || "Depot Logistics Hub",
      city: connectCity,
      googleStatus: "Connected",
      rating: 5.0,
      reviewCount: 1,
      latestReview: {
        author: "Verified Customer",
        comment: "Authorized distribution depot for FMCG brand goods.",
        date: "Just now",
        rating: 5,
      },
      phone: "+234 800 TRADON",
    };

    setListings([newListing, ...listings]);
    setIsConnectModalOpen(false);
    setConnectName("");
    setConnectAddress("");
    showToast(`Connected Google Business Profile for ${newListing.name}`);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;
    showToast(`Published official depot reply to ${managingListing?.latestReview.author}`);
    setReplyText("");
    setManagingListing(null);
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
          backgroundColor: isDark ? "#10B981" : "#0E3E2B",
          color: "#FFFFFF",
          padding: "12px 20px",
          borderRadius: "9999px",
          boxShadow: isDark ? "0 10px 25px rgba(0,0,0,0.5)" : "0 10px 25px rgba(14,62,43,0.2)",
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>Online Reputation & Local SEO</h1>
          <p style={{ fontSize: "14px", color: tokens.textSecondary, margin: 0, marginTop: "4px" }}>
            Connect and manage Google Business Profiles for your authorized distributor depots nationwide.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={handleSync}
            style={{ 
              height: "40px", 
              padding: "0 18px", 
              backgroundColor: "transparent", 
              border: `1px solid ${tokens.borderSubtle}`, 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: tokens.textPrimary, 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              boxShadow: "none"
            }} 
            className="hover:opacity-80 transition-opacity"
          >
            <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing Reviews..." : "Sync Reviews"}
          </button>
          <button 
            onClick={() => setIsConnectModalOpen(true)}
            style={{ 
              height: "40px", 
              padding: "0 20px", 
              backgroundColor: isDark ? "#10B981" : "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              boxShadow: "none"
            }} 
            className="hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Connect Google Profile
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: tokens.bgCard, borderRadius: "16px", padding: "20px", border: `1px solid ${tokens.borderSubtle}`, boxShadow: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase" }}>Average Depot Rating</span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: isDark ? "rgba(245,158,11,0.15)" : "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
              <Star size={16} fill="#F59E0B" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <h3 style={{ fontSize: "28px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>4.6</h3>
            <span style={{ fontSize: "13px", color: tokens.textMuted }}>/ 5.0</span>
          </div>
          <p style={{ fontSize: "12px", color: "#10B981", margin: "4px 0 0", fontWeight: 500 }}>+0.2 pts this quarter</p>
        </div>

        <div style={{ backgroundColor: tokens.bgCard, borderRadius: "16px", padding: "20px", border: `1px solid ${tokens.borderSubtle}`, boxShadow: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase" }}>Total Verified Reviews</span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981" }}>
              <ThumbsUp size={16} />
            </div>
          </div>
          <h3 style={{ fontSize: "28px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>582</h3>
          <p style={{ fontSize: "12px", color: tokens.textMuted, margin: "4px 0 0" }}>Across 4 regional hubs</p>
        </div>

        <div style={{ backgroundColor: tokens.bgCard, borderRadius: "16px", padding: "20px", border: `1px solid ${tokens.borderSubtle}`, boxShadow: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase" }}>Connected Profiles</span>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: isDark ? "rgba(37,99,235,0.15)" : "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#3B82F6" }}>
              <Globe size={16} />
            </div>
          </div>
          <h3 style={{ fontSize: "28px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>{listings.length}</h3>
          <p style={{ fontSize: "12px", color: "#10B981", margin: "4px 0 0", fontWeight: 500 }}>Live on Google Maps</p>
        </div>
      </div>

      {/* Depot Locations List */}
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: tokens.textPrimary, margin: "0 0 16px" }}>Connected Authorized Depots</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {listings.map((listing) => (
            <div
              key={listing.id}
              style={{
                backgroundColor: tokens.bgCard,
                borderRadius: "16px",
                border: `1px solid ${tokens.borderSubtle}`,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>{listing.name}</h4>
                    <span style={{ 
                      fontSize: "11px", 
                      fontWeight: 600, 
                      backgroundColor: listing.googleStatus === "Connected" 
                        ? (isDark ? "rgba(16,185,129,0.15)" : "#F0FDF4") 
                        : (isDark ? "rgba(245,158,11,0.15)" : "#FFFBEB"), 
                      color: listing.googleStatus === "Connected" 
                        ? "#10B981" 
                        : (isDark ? "#FBBF24" : "#D97706"), 
                      padding: "3px 10px", 
                      borderRadius: "9999px" 
                    }}>
                      {listing.googleStatus}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: "4px 0 0" }}>
                    {listing.location} • {listing.city}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: isDark ? "rgba(245,158,11,0.15)" : "#FFFBEB", border: isDark ? "1px solid rgba(245,158,11,0.3)" : "none", padding: "6px 12px", borderRadius: "9999px" }}>
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: isDark ? "#FBBF24" : "#92400E" }}>{listing.rating}</span>
                    <span style={{ fontSize: "12px", color: isDark ? "#FCD34D" : "#B45309" }}>({listing.reviewCount})</span>
                  </div>
                  <button
                    onClick={() => setManagingListing(listing)}
                    style={{
                      height: "36px",
                      padding: "0 16px",
                      backgroundColor: "transparent",
                      border: `1px solid ${tokens.borderSubtle}`,
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: tokens.textPrimary,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "none"
                    }}
                    className="hover:opacity-80"
                  >
                    Manage
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>

              {/* Latest Review Snippet */}
              <div style={{ backgroundColor: tokens.bgSubtle, border: `1px solid ${tokens.borderSubtle}`, padding: "14px 18px", borderRadius: "12px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MessageSquare size={16} color={tokens.textMuted} style={{ marginTop: "2px", flexShrink: 0 }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary }}>{listing.latestReview.author}</span>
                    <span style={{ fontSize: "11px", color: tokens.textMuted }}>{listing.latestReview.date}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, fontStyle: "italic" }}>
                    "{listing.latestReview.comment}"
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: CONNECT PROFILE */}
      {isConnectModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "480px", 
            padding: "28px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setIsConnectModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: 0, marginBottom: "6px" }}>Connect Google Business Profile</h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: 0, marginBottom: "20px" }}>
              Link your authorized distributor depot location to Google Search and Google Maps.
            </p>

            <form onSubmit={handleConnectProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Business / Depot Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TRADON FMCG Hub - Ikeja Depot"
                  value={connectName}
                  onChange={(e) => setConnectName(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>City / State *</label>
                <select
                  value={connectCity}
                  onChange={(e) => setConnectCity(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Kano">Kano</option>
                  <option value="Ibadan">Ibadan</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Physical Address</label>
                <input
                  type="text"
                  required
                  placeholder="Plot 12 Commercial Avenue, Ikeja"
                  value={connectAddress}
                  onChange={(e) => setConnectAddress(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: `1px solid ${tokens.borderSubtle}`, backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: isDark ? "#10B981" : "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", boxShadow: "none" }}
                  className="hover:opacity-90"
                >
                  Authorize Google Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: MANAGE LISTING & REPLY TO REVIEWS */}
      {managingListing && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            backgroundColor: tokens.bgCard, 
            borderRadius: "20px", 
            border: `1px solid ${tokens.borderSubtle}`,
            width: "100%", 
            maxWidth: "520px", 
            padding: "28px", 
            boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => setManagingListing(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: tokens.textMuted }}
              className="hover:opacity-80"
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: "11px", fontWeight: 700, color: "#10B981", backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#F0FDF4", padding: "4px 10px", borderRadius: "9999px" }}>
              GOOGLE PROFILE SYNC
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: tokens.textPrimary, margin: "8px 0 2px" }}>
              {managingListing.name}
            </h3>
            <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: "0 0 20px" }}>
              {managingListing.location} • Rating: {managingListing.rating} / 5.0 ({managingListing.reviewCount} reviews)
            </p>

            <div style={{ backgroundColor: tokens.bgSubtle, border: `1px solid ${tokens.borderSubtle}`, padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: tokens.textMuted, textTransform: "uppercase" }}>Latest Review</span>
              <p style={{ fontSize: "13px", fontStyle: "italic", color: tokens.textPrimary, margin: "4px 0" }}>
                "{managingListing.latestReview.comment}"
              </p>
              <span style={{ fontSize: "11px", color: tokens.textMuted }}>By {managingListing.latestReview.author} • {managingListing.latestReview.date}</span>
            </div>

            <form onSubmit={handleSendReply} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, marginBottom: "6px" }}>Post Official Business Owner Reply</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Thank the customer or address fulfillment feedback..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${tokens.borderSubtle}`, outline: "none", fontSize: "13px", resize: "none", backgroundColor: tokens.bgSubtle, color: tokens.textPrimary, boxShadow: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setManagingListing(null)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: `1px solid ${tokens.borderSubtle}`, backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: tokens.textPrimary, cursor: "pointer", boxShadow: "none" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: isDark ? "#10B981" : "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", boxShadow: "none" }}
                  className="hover:opacity-90"
                >
                  <Send size={14} />
                  Post Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
