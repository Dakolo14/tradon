"use client";

import React from "react";
import { Badge } from "../common/Badge";
import { CORE_MODULES } from "@/data/landingContent";
import {
  CreditCard,
  MapPin,
  PackageCheck,
  ArrowUpRight,
  TrendingDown,
  CheckCircle2,
  Sliders,
} from "lucide-react";

export const CoreModules: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 md:py-28 bg-white border-b border-[#ECEAE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="subtle">SUPPLY CHAIN ARCHITECTURE</Badge>
          <h2
            className="text-3xl sm:text-4xl font-normal text-[#0E3E2B] tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Built for every node in the FMCG supply chain.
          </h2>
          <p className="text-base font-light text-[#53675B] max-w-xl mx-auto">
            Give manufacturing brand HQ complete governance while equipping regional
            distributors and field reps with frictionless operational tools.
          </p>
        </div>

        {/* 3 Core Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Distributor Management */}
          <div className="rounded-2xl border border-[#ECEAE3] bg-[#F7F8F4] p-6 flex flex-col justify-between hover:border-[#CBEA8C] transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#7A8F83] font-normal">
                  Dealer Governance
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-[#ECEAE3] flex items-center justify-center text-[#0E3E2B]">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-normal text-[#0E3E2B] group-hover:text-[#0E3E2B] transition-colors">
                Distributor Management &amp; Dynamic Credit
              </h3>

              <p className="text-xs font-light text-[#53675B] leading-relaxed">
                Automate dealer credit scoring, adjust credit limits in real-time, and
                enforce automated hold rules based on 30/60/90-day aging buckets.
              </p>

              {/* Interactive Mockup Element */}
              <div className="bg-white rounded-xl p-4 border border-[#ECEAE3] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-light text-[#7A8F83]">Alhaji Musa Ltd (Kano)</span>
                  <span className="font-normal text-[#0E3E2B]">₦45,000,000 Limit</span>
                </div>
                <div className="w-full bg-[#F3F4F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#A8DB36] h-full rounded-full" style={{ width: "68%" }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#53675B]">
                  <span>Utilized: ₦30.6M (68%)</span>
                  <span className="text-[#0E3E2B] font-normal flex items-center gap-0.5">
                    <Sliders className="w-3 h-3 text-[#0E3E2B]" /> Adjust Limit
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECEAE3] flex items-center justify-between text-xs">
              <span className="text-[#7A8F83] font-light">₦1.4B+ Managed Credit</span>
              <span className="text-[#0E3E2B] font-normal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Credit Engine <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Field Reps */}
          <div className="rounded-2xl border border-[#ECEAE3] bg-[#F7F8F4] p-6 flex flex-col justify-between hover:border-[#CBEA8C] transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#7A8F83] font-normal">
                  Field Operations
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-[#ECEAE3] flex items-center justify-center text-[#0E3E2B]">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-normal text-[#0E3E2B]">
                Field Rep Tracking &amp; Retail Store Beat
              </h3>

              <p className="text-xs font-light text-[#53675B] leading-relaxed">
                Equip field sales reps with offline order taking, GPS geo-fenced store
                check-ins, and photographic shelf-share compliance verification.
              </p>

              {/* Interactive Mockup Element */}
              <div className="bg-white rounded-xl p-4 border border-[#ECEAE3] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-light text-[#7A8F83]">Surulere Beat #4</span>
                  <span className="font-normal text-[#0E3E2B] bg-[#F2F9E6] px-2 py-0.5 rounded border border-[#CBEA8C]">
                    34/38 Stores Audited
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-light text-[#53675B]">
                  <CheckCircle2 className="w-4 h-4 text-[#A8DB36] shrink-0" />
                  <span>GPS timestamp verified within 15 meters of retail kiosk</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7A8F83]">
                  <span>Rep: Tolu O.</span>
                  <span className="text-[#0E3E2B] font-normal">₦2.4M Orders Logged</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECEAE3] flex items-center justify-between text-xs">
              <span className="text-[#7A8F83] font-light">98.7% Audit Accuracy</span>
              <span className="text-[#0E3E2B] font-normal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Rep App <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Depot Inventory */}
          <div className="rounded-2xl border border-[#ECEAE3] bg-[#F7F8F4] p-6 flex flex-col justify-between hover:border-[#CBEA8C] transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#7A8F83] font-normal">
                  Warehouse Ledgers
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-[#ECEAE3] flex items-center justify-center text-[#0E3E2B]">
                  <PackageCheck className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-normal text-[#0E3E2B]">
                Real-Time Depot Inventory &amp; Van Fulfillment
              </h3>

              <p className="text-xs font-light text-[#53675B] leading-relaxed">
                Connect central factory lines with regional buffer depots. Automatic stockout
                prevention, lot-level batch tracking, and end-of-day van sales reconciliations.
              </p>

              {/* Interactive Mockup Element */}
              <div className="bg-white rounded-xl p-4 border border-[#ECEAE3] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-light text-[#7A8F83]">Ikeja Main Depot</span>
                  <span className="font-normal text-[#0E3E2B]">42,800 Cartons</span>
                </div>
                <div className="w-full bg-[#F3F4F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0E3E2B] h-full rounded-full" style={{ width: "88%" }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#53675B]">
                  <span>Safety Stock: 14 Days</span>
                  <span className="text-[#0E3E2B] font-normal">0 Discrepancies</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ECEAE3] flex items-center justify-between text-xs">
              <span className="text-[#7A8F83] font-light">&lt;0.4% Discrepancy</span>
              <span className="text-[#0E3E2B] font-normal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Depot Sync <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
