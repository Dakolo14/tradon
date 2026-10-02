"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "../common/Badge";
import {
  MapPin,
  CheckCircle2,
  Smartphone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  TrendingUp,
} from "lucide-react";

export const BentoGrid: React.FC = () => {
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      role: "user",
      text: "Why is Ibadan depot fulfillment SLA down 4% today?",
    },
    {
      role: "assistant",
      text: "Truck #08 delayed 42 mins at Ogere corridor. Tradon AI autonomously rerouted 3 secondary distribution vans via Sagamu interchange. Normal SLA restored by 14:00.",
    },
  ]);

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userText = aiInput;
    setAiInput("");
    setAiMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      {
        role: "assistant",
        text: `Analysis complete for "${userText}". All 14 regional nodes verified. Recommended action dispatched to regional territory manager.`,
      },
    ]);
  };

  return (
    <section id="bento" className="py-20 md:py-32 bg-[#F7F8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="mint">PRECISION PLATFORM</Badge>
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-tight"
            style={{ letterSpacing: "-0.03em", color: "#0E3E2B" }}
          >
            Engineered for end-to-end velocity.
          </h2>
          <p className="text-base font-light text-[#53675B]">
            Six integrated layers designed specifically for high-velocity consumer goods
            distribution across complex road networks.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Card 1: Executive KPI Cockpit (Dark Green, 7 cols) */}
          <div
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between shadow-xs"
            style={{ backgroundColor: "#0E3E2B", borderColor: "#0E3E2B", color: "#FFFFFF" }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#A8DB36] font-normal">
                  Executive Cockpit
                </span>
                <span className="text-xs text-[#A8BEB2] font-light">Real-Time Aggregation</span>
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal"
                style={{ color: "#FFFFFF" }}
              >
                Multi-Channel Revenue &amp; Depot Mix
              </h3>
              <p className="text-xs sm:text-sm font-light text-[#C4D5CC] max-w-lg">
                View instant breakdowns between Key Accounts, Modern Trade, Tier-1 Wholesale,
                and Van Sales operations nationally.
              </p>

              {/* Chart Visual Simulation */}
              <div
                className="rounded-2xl p-5 border border-white/10 space-y-4 mt-4"
                style={{ backgroundColor: "#134631" }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A8BEB2] font-light">Weekly Volume Velocity</span>
                  <span className="text-[#A8DB36] font-normal">+24.6% WoW</span>
                </div>

                {/* Minimalist Bar Graph */}
                <div className="h-28 flex items-end gap-2.5 sm:gap-4 pt-4 border-b border-white/10 pb-2">
                  {[
                    { day: "Mon", val: "45%", label: "₦82M" },
                    { day: "Tue", val: "68%", label: "₦114M" },
                    { day: "Wed", val: "85%", label: "₦142M" },
                    { day: "Thu", val: "92%", label: "₦165M" },
                    { day: "Fri", val: "100%", label: "₦188M" },
                    { day: "Sat", val: "72%", label: "₦120M" },
                    { day: "Sun", val: "30%", label: "₦48M" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
                      <div className="text-[9px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.label}
                      </div>
                      <div
                        className="w-full bg-[#A8DB36] rounded-t-sm transition-all duration-300 group-hover:bg-white"
                        style={{ height: bar.val }}
                      />
                      <span className="text-[10px] text-[#A8BEB2] font-light">{bar.day}</span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#A8BEB2] font-light pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A8DB36]" />
                    <span>Direct Distributors (58%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A3D9B1]" />
                    <span>Modern Trade (26%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/40" />
                    <span>Van Sales (16%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 flex items-center justify-between text-xs text-[#A8BEB2] font-light">
              <span>National MTD: ₦842.6M</span>
              <span className="text-[#A8DB36] font-normal hover:underline cursor-pointer flex items-center gap-1">
                View Full Executive Brief <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Dynamic Route Optimization (White Card, 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#ECEAE3] flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#7A8F83] font-normal">
                  Field Telemetry
                </span>
                <MapPin className="w-4 h-4 text-[#0E3E2B]" />
              </div>
              <h3
                className="text-xl sm:text-2xl font-normal"
                style={{ color: "#0E3E2B" }}
              >
                Dynamic GPS Route Optimization
              </h3>
              <p className="text-xs sm:text-sm font-light text-[#53675B]">
                Algorithmic beat planning factors in retail replenishment urgency, traffic
                patterns, and cash settlement thresholds.
              </p>

              {/* Waypoints Visual */}
              <div className="bg-[#F7F8F4] rounded-2xl p-4 border border-[#ECEAE3] space-y-3 mt-4">
                <div className="flex items-center justify-between text-xs font-normal text-[#0E3E2B]">
                  <span>Active Van Fleet #14 (Oshodi - Ikeja)</span>
                  <span className="text-[10px] bg-[#F2F9E6] text-[#0E3E2B] px-2 py-0.5 rounded border border-[#CBEA8C]">
                    96% On-Time
                  </span>
                </div>

                <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ECEAE3]">
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#0E3E2B]" />
                    <p className="text-xs font-normal text-[#0E3E2B]">Ikeja Buffer Depot</p>
                    <p className="text-[10px] text-[#7A8F83] font-light">Dispatched 07:15 AM • 800 Crates</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#A8DB36]" />
                    <p className="text-xs font-normal text-[#0E3E2B]">Wholesale Dealer Hub #04</p>
                    <p className="text-[10px] text-[#7A8F83] font-light">Delivered 09:30 AM • ₦1.8M Collected</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#A3D9B1] animate-ping" />
                    <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#A3D9B1]" />
                    <p className="text-xs font-normal text-[#0E3E2B]">Allen Avenue Kiosk Cluster</p>
                    <p className="text-[10px] text-[#7A8F83] font-light">In Progress (Stop 18/24)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 flex items-center justify-between text-xs text-[#53675B] font-light">
              <span>Fuel saved: -18%</span>
              <span
                className="font-normal hover:underline cursor-pointer flex items-center gap-1"
                style={{ color: "#0E3E2B" }}
              >
                Explore Beat Engine <ArrowRight className="w-3.5 h-3.5 text-[#0E3E2B]" />
              </span>
            </div>
          </div>

          {/* Card 3: Demand Velocity Curve (White, 4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#ECEAE3] flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#7A8F83] font-normal">
                  Predictive Inventory
                </span>
                <TrendingUp className="w-4 h-4 text-[#A8DB36]" />
              </div>
              <h3 className="text-lg font-normal" style={{ color: "#0E3E2B" }}>
                Demand Velocity Forecasting
              </h3>
              <p className="text-xs font-light text-[#53675B]">
                Anticipate regional surges before stockout occurs at retail shelves.
              </p>

              {/* Curve visual */}
              <div className="bg-[#F7F8F4] p-4 rounded-xl border border-[#ECEAE3] space-y-2 mt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#7A8F83] font-light">Abuja Commercial Hub</span>
                  <span className="font-normal" style={{ color: "#0E3E2B" }}>Surge Alert</span>
                </div>
                {/* SVG Curve */}
                <div className="h-16 w-full flex items-center">
                  <svg viewBox="0 0 200 60" className="w-full h-full stroke-[#A8DB36] fill-none" strokeWidth="2.5">
                    <path d="M 0 50 Q 40 45, 70 30 T 130 25 T 200 8" />
                    <circle cx="200" cy="8" r="4" fill="#0E3E2B" />
                  </svg>
                </div>
                <div className="text-[10px] text-[#53675B] font-light flex items-center justify-between">
                  <span>Current Stock: 1,850 Units</span>
                  <span className="font-normal" style={{ color: "#0E3E2B" }}>Auto-Reorder in 36h</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECEAE3] text-[11px] text-[#7A8F83] font-light">
              Mean absolute percentage error: &lt; 2.1%
            </div>
          </div>

          {/* Card 4: Automated Bank & Paystack Reconciliation (White, 4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#ECEAE3] flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#7A8F83] font-normal">
                  Finance Automation
                </span>
                <ShieldCheck className="w-4 h-4 text-[#A8DB36]" />
              </div>
              <h3 className="text-lg font-normal" style={{ color: "#0E3E2B" }}>
                Automated Bank &amp; Paystack Reconciliation
              </h3>
              <p className="text-xs font-light text-[#53675B]">
                Match incoming NIBSS transfers and driver cash handovers against pending orders.
              </p>

              {/* Transactions pill list */}
              <div className="bg-[#F7F8F4] p-3 rounded-xl border border-[#ECEAE3] space-y-2 mt-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A8DB36]" />
                    <span className="font-light text-[#182B22]">Paystack Instant #8931</span>
                  </div>
                  <span className="font-normal" style={{ color: "#0E3E2B" }}>₦4,250,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A8DB36]" />
                    <span className="font-light text-[#182B22]">Zenith NIBSS Transfer</span>
                  </div>
                  <span className="font-normal" style={{ color: "#0E3E2B" }}>₦12,800,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A8DB36]" />
                    <span className="font-light text-[#182B22]">GTBank POS Van Drop</span>
                  </div>
                  <span className="font-normal" style={{ color: "#0E3E2B" }}>₦890,000</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECEAE3] text-[11px] font-light flex items-center justify-between">
              <span className="text-[#7A8F83]">Unallocated Receipts: 0</span>
              <span className="font-normal" style={{ color: "#0E3E2B" }}>100% Matched</span>
            </div>
          </div>

          {/* Card 5: Tradon AI Assistant (Dark Green, 4 cols) */}
          <div
            className="lg:col-span-4 rounded-3xl p-6 border flex flex-col justify-between shadow-xs"
            style={{ backgroundColor: "#0E3E2B", borderColor: "#0E3E2B", color: "#FFFFFF" }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A8DB36]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#A8DB36] font-normal">
                    Tradon AI Copilot
                  </span>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-[#A8DB36]">
                  Live Data
                </span>
              </div>
              <h3 className="text-lg font-normal" style={{ color: "#FFFFFF" }}>
                Conversational Supply Chain Intel
              </h3>

              {/* Chat simulation */}
              <div
                className="p-3 rounded-2xl border border-white/10 space-y-2.5 mt-2 max-h-44 overflow-y-auto"
                style={{ backgroundColor: "#134631" }}
              >
                {aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-2.5 rounded-xl ${
                      msg.role === "user"
                        ? "bg-white/15 text-white ml-3 font-light"
                        : "bg-[#0E3E2B] text-[#DCEAE2] mr-2 border border-white/10 font-light"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Interactive prompt input */}
              <form onSubmit={handleSendAi} className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask Tradon AI about any route or depot..."
                  className="w-full bg-[#134631] border border-white/15 rounded-full px-3 py-1.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#A8DB36]"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-full bg-[#A8DB36] text-[#0E3E2B] hover:bg-white transition-colors cursor-pointer"
                  aria-label="Send query"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-[#A8BEB2] font-light">
              Grounded in live ERP &amp; depot telemetry
            </div>
          </div>

          {/* Card 6: Field Rep Mobile App (12 cols) */}
          <div className="lg:col-span-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#ECEAE3] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
            <div className="md:col-span-7 space-y-4">
              <Badge variant="lime" icon={<Smartphone className="w-3.5 h-3.5" />}>
                Offline-First Mobile App
              </Badge>
              <h3
                className="text-2xl sm:text-3xl font-normal tracking-tight"
                style={{ color: "#0E3E2B" }}
              >
                Empower your field sales reps with zero friction.
              </h3>
              <p className="text-sm font-light text-[#53675B] max-w-xl leading-relaxed">
                Whether in high-density urban open markets or low-connectivity rural highways,
                the Tradon Rep app logs orders offline, verifies retail kiosk GPS boundaries,
                and prints instant receipts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#F7F8F4] p-3.5 rounded-xl border border-[#ECEAE3]">
                  <div className="text-lg font-normal" style={{ color: "#0E3E2B" }}>Offline Mode</div>
                  <p className="text-[11px] text-[#53675B] font-light mt-0.5">
                    Full sync when phone reconnects to 2G/3G/4G
                  </p>
                </div>
                <div className="bg-[#F7F8F4] p-3.5 rounded-xl border border-[#ECEAE3]">
                  <div className="text-lg font-normal" style={{ color: "#0E3E2B" }}>Barcode Scan</div>
                  <p className="text-[11px] text-[#53675B] font-light mt-0.5">
                    Instant carton and case verification
                  </p>
                </div>
                <div className="bg-[#F7F8F4] p-3.5 rounded-xl border border-[#ECEAE3]">
                  <div className="text-lg font-normal" style={{ color: "#0E3E2B" }}>Instant Ledger</div>
                  <p className="text-[11px] text-[#53675B] font-light mt-0.5">
                    Retailer credit and balance check on the spot
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile App Image preview matching the reference design */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#ECEAE3] shadow-md group">
                <Image
                  src="/images/tradon_mobile_app.jpg"
                  alt="Tradon Field Rep Mobile App"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E3E2B]/75 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <span className="text-[10px] uppercase tracking-wider text-[#A8DB36] font-normal block">
                      Tradon Rep iOS &amp; Android
                    </span>
                    <p className="text-xs font-light text-white/95">
                      Live Field Order Taking &amp; Receipt Dispatch
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
