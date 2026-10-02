import React from "react";
import Image from "next/image";
import { BRAND_PARTNERS } from "@/data/landingContent";
import { Building2, Store, Truck, ShieldCheck } from "lucide-react";

export const BrandLogos: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-y border-[#ECEAE3] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p
            className="text-xs uppercase tracking-widest text-[#7A8F83] font-normal mb-2"
            style={{ letterSpacing: "0.1em" }}
          >
            TRUSTED SUPPLY CHAINS
          </p>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#0E3E2B] tracking-tight">
            Your distribution network running as one intelligent system.
          </h2>
        </div>

        {/* Brand Grid / Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRAND_PARTNERS.map((brand, idx) => (
            <div
              key={idx}
              className="bg-[#F7F8F4] border border-[#ECEAE3] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all hover:border-[#CBEA8C] hover:bg-[#F2F9E6]/50 group"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#ECEAE3] flex items-center justify-center text-xs font-normal text-[#0E3E2B] mb-2 group-hover:border-[#A8DB36] transition-colors">
                {brand.initials}
              </div>
              <span className="text-xs font-normal text-[#0E3E2B] truncate w-full">
                {brand.name}
              </span>
              <span className="text-[10px] text-[#7A8F83] font-light mt-0.5">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Visual Depot Highlight row matching reference */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Card 1: Metric stat */}
          <div className="bg-[#F7F8F4] border border-[#ECEAE3] rounded-2xl p-6 flex flex-col justify-between h-48">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#7A8F83] font-normal">
                Depot Throughput
              </span>
              <Building2 className="w-4 h-4 text-[#0E3E2B]" />
            </div>
            <div>
              <div className="text-3xl font-normal text-[#0E3E2B]">4.2M+ Cartons</div>
              <p className="text-xs font-light text-[#53675B] mt-1">
                Dispatched monthly across 14 central depots with zero stock mismatch.
              </p>
            </div>
          </div>

          {/* Card 2: Warehouse Photo in Card as in reference image */}
          <div className="relative rounded-2xl overflow-hidden border border-[#ECEAE3] h-48 group shadow-xs">
            <Image
              src="/images/fmcg_depot_warehouse.jpg"
              alt="FMCG High-Bay Depot Warehouse"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E3E2B]/80 via-transparent to-transparent flex items-end p-5">
              <div className="text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#A8DB36] font-normal block">
                  Live Operations
                </span>
                <p className="text-xs font-light text-white/90">
                  National Pallet &amp; Inventory Hub
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Settlement speed */}
          <div className="bg-[#F7F8F4] border border-[#ECEAE3] rounded-2xl p-6 flex flex-col justify-between h-48">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#7A8F83] font-normal">
                Payment Settlement
              </span>
              <ShieldCheck className="w-4 h-4 text-[#A8DB36]" />
            </div>
            <div>
              <div className="text-3xl font-normal text-[#0E3E2B]">&lt; 3 mins</div>
              <p className="text-xs font-light text-[#53675B] mt-1">
                Automated Paystack &amp; direct bank matching for van driver cash drops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
