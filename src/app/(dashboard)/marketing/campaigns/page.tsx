"use client";

import React, { useState } from "react";
import { Check, X, Send, CheckCircle2, MessageSquare, Users, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BlastCampaignsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState("");
  const [targetSegment, setTargetSegment] = useState("All Active Distributors");
  const [channel, setChannel] = useState("WhatsApp Broadcast + SMS");
  const [messageBody, setMessageBody] = useState("Dear Distributor, flash promo on all Chivita & Hollandia packs today! Order 50+ cartons for instant 15% discount.");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    showToast(`Dispatched broadcast campaign "${campaignTitle || 'FMCG Promo Blast'}" to ${targetSegment}`);
    setCampaignTitle("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>

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

      <div style={{ padding: "16px 8px 48px 8px", display: "flex", gap: "64px", alignItems: "center", position: "relative", zIndex: 1, minHeight: "calc(100vh - 120px)" }}>
        
        {/* Left Content Area */}
        <div style={{ flex: 1, maxWidth: "500px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "24px", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
            Promote your distribution with blast campaigns
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(14,62,43,0.7)", margin: 0, marginBottom: "32px", lineHeight: "1.6" }}>
            Increase wholesale orders and engage with your regional distributors by sharing special offers, new SKUs, and important updates over email and text message.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "rgba(14,62,43,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={14} color="#0E3E2B" />
              </div>
              <span style={{ fontSize: "15px", color: "rgba(14,62,43,0.9)" }}>Customize the message content to suit your brand</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "rgba(14,62,43,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={14} color="#0E3E2B" />
              </div>
              <span style={{ fontSize: "15px", color: "rgba(14,62,43,0.9)" }}>Target all regions, specific tiers, or individual reps</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "rgba(14,62,43,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={14} color="#0E3E2B" />
              </div>
              <span style={{ fontSize: "15px", color: "rgba(14,62,43,0.9)" }}>Access powerful real-time campaign reporting</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: "#0E3E2B", color: "#FFFFFF", border: "none", borderRadius: "9999px", padding: "12px 28px", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}
              className="hover:bg-[#08281B] transition-colors"
            >
              Start now
            </button>
            <button 
              onClick={() => router.push("/marketing/history")}
              style={{ background: "none", border: "none", color: "rgba(14,62,43,0.8)", fontSize: "15px", fontWeight: 600, cursor: "pointer", padding: 0 }}
              className="hover:text-[#0E3E2B] transition-colors"
            >
              View Campaign History
            </button>
          </div>
        </div>

        {/* Right Visual Area */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          
          <div style={{ position: "relative" }}>
            {/* Promo Card Mockup */}
            <div style={{ 
              backgroundColor: "#FFFFFF", 
              border: "1px solid rgba(14,62,43,0.08)",
              borderRadius: "16px", 
              padding: "32px", 
              width: "300px", 
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}>
              
              {/* Illustration Placeholder */}
              <div style={{ width: "160px", height: "160px", position: "relative", marginBottom: "24px" }}>
                <div style={{ position: "absolute", top: "10%", left: "10%", width: "40px", height: "40px", backgroundColor: "#34D399", borderRadius: "50%", opacity: 0.8 }} />
                <div style={{ position: "absolute", top: "40%", right: "10%", width: "50px", height: "70px", backgroundColor: "#FBBF24", borderRadius: "8px", transform: "rotate(15deg)", opacity: 0.8 }} />
                <div style={{ position: "absolute", bottom: "10%", left: "30%", width: "60px", height: "60px", backgroundColor: "#F87171", borderRadius: "12px", transform: "rotate(-10deg)", opacity: 0.8 }} />
                <div style={{ position: "absolute", top: "30%", left: "40%", width: "30px", height: "30px", backgroundColor: "#60A5FA", borderRadius: "50%", opacity: 0.8 }} />
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "8px" }}>
                All wholesale products 20% off!
              </h3>
              <p style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "24px" }}>
                Place your bulk order and get a massive discount for the festive season.
              </p>

              <button 
                onClick={() => setIsModalOpen(true)}
                style={{ backgroundColor: "#A3FF00", color: "#0E3E2B", border: "none", borderRadius: "9999px", padding: "10px 32px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              >
                Create blast
              </button>
            </div>

            {/* Notification Bubble Overlay */}
            <div style={{ 
              position: "absolute", 
              bottom: "-24px", 
              left: "-40px", 
              backgroundColor: "#FFFFFF", 
              borderRadius: "12px", 
              padding: "16px", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)", 
              display: "flex", 
              alignItems: "center", 
              gap: "12px", 
              width: "280px",
              border: "1px solid rgba(14,62,43,0.08)"
            }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MessageSquare size={18} color="#FFFFFF" />
              </div>
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#000000", margin: 0, marginBottom: "2px" }}>TRADON Broadcast</h4>
                <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.6)", margin: 0 }}>Special promo delivered to 142 dealers</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL: CREATE BLAST CAMPAIGN */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <span style={{ fontSize: "11px", fontWeight: 700, color: "#0E3E2B", backgroundColor: "#A3FF00", padding: "3px 8px", borderRadius: "4px" }}>
              INSTANT BROADCAST
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 4px" }}>Launch Blast Campaign</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "0 0 20px" }}>
              Send promotional notices or new product availability directly to dealers via WhatsApp and SMS.
            </p>

            <form onSubmit={handleLaunchCampaign} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Campaign Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Bulk Juice Pallet Discount"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Recipient Segment</label>
                  <select
                    value={targetSegment}
                    onChange={(e) => setTargetSegment(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="All Active Distributors">All Active Distributors (142)</option>
                    <option value="Gold Tier Wholesalers">Gold Tier Wholesalers (22)</option>
                    <option value="Lagos & Ibadan Region">Lagos & Ibadan Region (64)</option>
                    <option value="Northern Territory Hubs">Northern Territory Hubs (38)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="WhatsApp Broadcast + SMS">WhatsApp Broadcast + SMS</option>
                    <option value="WhatsApp Only">WhatsApp Only</option>
                    <option value="SMS Gateway Only">SMS Gateway Only</option>
                    <option value="Email Digest">Email Digest</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Broadcast Message</label>
                <textarea
                  rows={3}
                  required
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                  className="hover:bg-[#08281B]"
                >
                  <Send size={15} />
                  Dispatch Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
