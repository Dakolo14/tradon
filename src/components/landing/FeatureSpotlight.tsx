"use client";

import React, { useState } from "react";
import { Badge } from "../common/Badge";
import { Check, ArrowRight, Truck, Layers, Zap } from "lucide-react";

export const FeatureSpotlight: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const points = [
    {
      title: "Real-time stock sync across all depots",
      desc: "Synchronize factory output, hub depots, and distributor warehouses with instant balance updates.",
    },
    {
      title: "Dynamic route optimization for field reps",
      desc: "Algorithmic beat planning based on retail store purchase frequency and stockout risk.",
    },
    {
      title: "Automated distributor credit scoring & approvals",
      desc: "Dynamic credit limits tied to historical repayment velocity and collateral ratios.",
    },
    {
      title: "Direct reconciliation with Paystack & bank rails",
      desc: "Automated payment receipt matching so accounts receivable is always current.",
    },
  ];

  return (
    <section id="platform" className="py-20 md:py-32 bg-[#F7F8F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="mint">Factory-to-Shelf Visibility</Badge>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.12]"
              style={{ letterSpacing: "-0.03em", color: "#0E3E2B" }}
            >
              Real-time visibility from factory floor to retail shelf.
            </h2>

            <p className="text-base sm:text-lg font-light text-[#53675B] leading-relaxed">
              Eliminate stockouts, automate distributor credit allocation, and streamline
              van sales fulfillment across every depot and rural route in your supply chain.
            </p>

            {/* Checklist items */}
            <div className="pt-2 space-y-4">
              {points.map((pt, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeTab === idx
                      ? "bg-white border-[#CBEA8C] shadow-xs"
                      : "bg-white/70 border-[#ECEAE3] hover:bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        activeTab === idx
                          ? "bg-[#A8DB36] text-[#0E3E2B]"
                          : "bg-[#EAF5EE] text-[#0E3E2B]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4
                        className="text-sm font-normal"
                        style={{ color: "#0E3E2B" }}
                      >
                        {pt.title}
                      </h4>
                      <p className="text-xs font-light text-[#53675B] mt-1 leading-normal">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Solid Mint Green Container Card matching the design image */}
          <div className="lg:col-span-6">
            <div
              className="rounded-3xl p-6 sm:p-8 md:p-10 border border-[#89C79A] relative overflow-hidden shadow-xs"
              style={{ backgroundColor: "#A3D9B1" }}
            >
              {/* Inner container with solid white background */}
              <div className="bg-white rounded-2xl p-6 border border-[#ECEAE3] space-y-6 shadow-sm">
                {/* Header in card */}
                <div className="flex items-center justify-between border-b border-[#ECEAE3] pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A8F83] font-normal">
                      Algorithmic Dispatch Engine
                    </span>
                    <h4
                      className="text-base font-normal mt-0.5"
                      style={{ color: "#0E3E2B" }}
                    >
                      Lagos Island &amp; Lekki Van Cluster
                    </h4>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#F2F9E6] text-[#0E3E2B] font-normal border border-[#CBEA8C]">
                    98.9% Efficiency
                  </span>
                </div>

                {/* Simulated Visual Route Tree */}
                <div className="space-y-3">
                  <div className="bg-[#F7F8F4] p-3 rounded-xl border border-[#ECEAE3] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#0E3E2B] text-white flex items-center justify-center text-xs">
                        <Truck className="w-3.5 h-3.5 text-[#A8DB36]" />
                      </div>
                      <div>
                        <p className="font-normal" style={{ color: "#0E3E2B" }}>
                          Van Route #12 (42 Retailers)
                        </p>
                        <p className="text-[10px] text-[#7A8F83] font-light">
                          Driver: Babatunde A. • 1,240 Units Dispatched
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#0E3E2B] font-normal bg-[#A8DB36]/30 px-2 py-0.5 rounded">
                      On Beat (Stop 28/42)
                    </span>
                  </div>

                  <div className="bg-[#F7F8F4] p-3 rounded-xl border border-[#ECEAE3] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#0E3E2B] flex items-center justify-center text-xs">
                        <Layers className="w-3.5 h-3.5 text-[#0E3E2B]" />
                      </div>
                      <div>
                        <p className="font-normal" style={{ color: "#0E3E2B" }}>
                          Apapa Mother Depot
                        </p>
                        <p className="text-[10px] text-[#7A8F83] font-light">
                          Automatic replenishment trigger: 85% safety threshold
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#53675B] font-light">
                      Stock: Optimal
                    </span>
                  </div>

                  <div className="bg-[#F7F8F4] p-3 rounded-xl border border-[#ECEAE3] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#F2F9E6] text-[#0E3E2B] flex items-center justify-center text-xs">
                        <Zap className="w-3.5 h-3.5 text-[#0E3E2B]" />
                      </div>
                      <div>
                        <p className="font-normal" style={{ color: "#0E3E2B" }}>
                          Instant Paystack Auto-Match
                        </p>
                        <p className="text-[10px] text-[#7A8F83] font-light">
                          ₦4.8M reconciled across 16 transfers today
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#0E3E2B] font-normal">
                      100% Settled
                    </span>
                  </div>
                </div>

                {/* Bottom interactive indicator */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#53675B] font-light border-t border-[#ECEAE3]">
                  <span>Telemetry Latency: 42ms</span>
                  <span
                    className="font-normal flex items-center gap-1 hover:underline cursor-pointer"
                    style={{ color: "#0E3E2B" }}
                  >
                    Live Dispatch Console <ArrowRight className="w-3.5 h-3.5 text-[#0E3E2B]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
