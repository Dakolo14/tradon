"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Bot,
  Truck,
  Package,
  Layers,
  ShoppingBag,
  Users,
  CreditCard,
  BarChart3,
  Search,
  Bell,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"brief" | "regions" | "credit">("brief");

  return (
    <div className="w-full rounded-2xl bg-white border border-[#ECEAE3] shadow-lg shadow-[#0E3E2B]/5 overflow-hidden text-[#182B22]">
      {/* Top Application Bar */}
      <div className="bg-white border-b border-[#ECEAE3] px-4 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
          </div>
          <span className="h-4 w-px bg-[#ECEAE3]" />
          <div className="flex items-center gap-2 text-[#53675B]">
            <span className="font-normal text-[#0E3E2B]">Chi Limited HQ</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F2F9E6] text-[#0E3E2B] font-normal border border-[#CBEA8C]">
              Enterprise HQ
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="hidden sm:flex items-center gap-2 bg-[#F7F8F4] border border-[#ECEAE3] px-3 py-1.5 rounded-full w-72 text-[#7A8F83]">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs font-light">Search distributors, SKU, routes...</span>
          <span className="ml-auto text-[10px] bg-white border border-[#ECEAE3] px-1.5 py-0.2 rounded text-[#53675B]">
            ⌘F
          </span>
        </div>

        {/* Right Status Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#EAF5EE] border border-[#A3D9B1]/60 text-[#0E3E2B] px-2.5 py-1 rounded-full text-[11px] font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8DB36] animate-pulse" />
            Live Mode (Verified)
          </div>
          <div className="relative p-1.5 text-[#53675B] hover:text-[#0E3E2B] cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#A8DB36] rounded-full ring-2 ring-white" />
          </div>
          <div className="w-7 h-7 rounded-full bg-[#0E3E2B] text-white flex items-center justify-center text-xs font-normal">
            HQ
          </div>
        </div>
      </div>

      {/* Main Preview Body with Mock Sidebar + Cockpit Content */}
      <div className="flex flex-col lg:flex-row bg-[#F7F8F4]">
        {/* Mock Sidebar (Desktop) */}
        <div className="hidden md:flex flex-col w-56 bg-white border-r border-[#ECEAE3] p-3 shrink-0 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-[#7A8F83] px-3 mb-2 font-normal">
            General
          </div>
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#F2F9E6] text-[#0E3E2B] border-l-[3px] border-[#A8DB36] font-normal">
              <LayoutDashboard className="w-4 h-4 text-[#0E3E2B]" />
              <span>Brand HQ Brief</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#53675B] hover:bg-[#F7F8F4] font-light cursor-pointer">
              <Bot className="w-4 h-4" />
              <span>Tradon AI</span>
              <span className="ml-auto text-[9px] bg-[#A8DB36] text-[#0E3E2B] px-1 rounded font-normal">
                Live
              </span>
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-wider text-[#7A8F83] px-3 mb-2 font-normal">
            Supply Chain Tools
          </div>
          <div className="space-y-1 mb-4 text-[#53675B]">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#F7F8F4] cursor-pointer font-light">
              <Truck className="w-4 h-4" />
              <span>Distributors</span>
              <span className="ml-auto text-[10px] text-[#7A8F83]">284</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#F7F8F4] cursor-pointer font-light">
              <Layers className="w-4 h-4" />
              <span>Depot Inventory</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#F7F8F4] cursor-pointer font-light">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders in Motion</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#F7F8F4] cursor-pointer font-light">
              <Users className="w-4 h-4" />
              <span>Field Sales Reps</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#F7F8F4] cursor-pointer font-light">
              <CreditCard className="w-4 h-4" />
              <span>Credit & Aging</span>
            </div>
          </div>

          {/* Footer User Profile in Sidebar */}
          <div className="mt-auto pt-3 border-t border-[#ECEAE3] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#EAF5EE] border border-[#A3D9B1] text-[#0E3E2B] flex items-center justify-center text-[10px] font-normal">
              CL
            </div>
            <div className="truncate">
              <p className="text-xs font-normal text-[#0E3E2B] truncate">Chi FMCG Group</p>
              <p className="text-[10px] text-[#7A8F83] truncate">hq-ops@chi.com</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 space-y-5 overflow-hidden">
          {/* Morning Brief Card */}
          <div className="bg-[#0E3E2B] text-white p-4 sm:p-5 rounded-xl border border-[#0E3E2B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#A8DB36] font-normal">
                  HQ Morning Executive Brief
                </span>
                <span className="text-[10px] text-white/50">• 08:30 AM Sync</span>
              </div>
              <p className="text-sm font-light text-[#E0EFE8] max-w-xl">
                All 14 manufacturing depots online. National fulfillment velocity at{" "}
                <span className="text-[#A8DB36] font-normal">98.4%</span>. 3 van sales routes
                rerouted in Ibadan corridor to prevent stockouts.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-light text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A8DB36]" />
                Zero Critical Stockouts
              </div>
            </div>
          </div>

          {/* 4 Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-[#ECEAE3]">
              <div className="text-[11px] text-[#7A8F83] font-light">Month-to-Date Revenue</div>
              <div className="text-lg sm:text-xl font-normal text-[#0E3E2B] mt-0.5">
                ₦842.6M
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#0E3E2B] mt-1 font-light">
                <TrendingUp className="w-3 h-3 text-[#A8DB36]" />
                <span className="text-[#0E3E2B] font-normal">+18.4%</span> vs target
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#ECEAE3]">
              <div className="text-[11px] text-[#7A8F83] font-light">Orders in Motion</div>
              <div className="text-lg sm:text-xl font-normal text-[#0E3E2B] mt-0.5">
                1,420 Active
              </div>
              <div className="text-[11px] text-[#53675B] mt-1 font-light">
                99.1% dispatched &lt; 2h
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#ECEAE3]">
              <div className="text-[11px] text-[#7A8F83] font-light">Active Distributors</div>
              <div className="text-lg sm:text-xl font-normal text-[#0E3E2B] mt-0.5">
                284 / 310
              </div>
              <div className="text-[11px] text-[#53675B] mt-1 font-light">
                ₦1.2M avg daily credit draw
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#ECEAE3]">
              <div className="text-[11px] text-[#7A8F83] font-light">Days Sales Out (DSO)</div>
              <div className="text-lg sm:text-xl font-normal text-[#0E3E2B] mt-0.5">
                14.2 Days
              </div>
              <div className="text-[11px] text-[#0E3E2B] mt-1 font-light">
                <span className="text-[#0E3E2B] font-normal">-6.8 days</span> via auto Paystack
              </div>
            </div>
          </div>

          {/* Regional Performance & Stock Health Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Top performing regions list */}
            <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-[#ECEAE3] space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-normal text-[#0E3E2B]">
                  Top Regional Depots by Target Attainment
                </div>
                <span className="text-[10px] text-[#7A8F83] font-light">Live Sync</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { region: "Lagos Central & Ikeja Hub", rev: "₦312M", target: "118%", width: "95%" },
                  { region: "Kano Commercial Depot", rev: "₦198M", target: "106%", width: "86%" },
                  { region: "Port Harcourt Coastal Corridor", rev: "₦164M", target: "102%", width: "81%" },
                  { region: "Ibadan South-West Depot", rev: "₦114M", target: "94%", width: "74%" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-light text-[#182B22]">
                        <span className="text-[#7A8F83] mr-2">#{idx + 1}</span>
                        {item.region}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-normal text-[#0E3E2B]">{item.rev}</span>
                        <span className="text-[11px] font-normal text-[#0E3E2B] bg-[#F2F9E6] px-1.5 py-0.5 rounded border border-[#CBEA8C]">
                          {item.target}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-[#F3F4F0] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#A8DB36] h-full rounded-full"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tradon AI Live Telemetry Prompt */}
            <div className="bg-[#134631] text-white p-4 rounded-xl border border-[#0E3E2B] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#A8DB36]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#A8DB36] font-normal">
                    Tradon AI Flag
                  </span>
                </div>
                <p className="text-xs font-light text-[#DCEAE2] leading-relaxed">
                  &ldquo;Distributor #48 (Kaduna North) has reached 92% of their ₦25M credit limit.
                  3 truck dispatches pending confirmation.&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#A8BEB2] font-light">Auto Risk Score: 94/100</span>
                <span className="text-[11px] font-normal text-[#A8DB36] hover:underline cursor-pointer flex items-center gap-1">
                  Approve Limit <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
