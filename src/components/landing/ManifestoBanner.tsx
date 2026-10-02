import React from "react";

export const ManifestoBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#0E3E2B] text-white py-20 md:py-28 relative overflow-hidden">
      {/* Subtle geometric lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#A8DB36" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Main Statement Left */}
          <div className="lg:col-span-7 space-y-4">
            <span
              className="text-xs uppercase tracking-widest text-[#A8DB36] font-normal"
              style={{ letterSpacing: "0.15em" }}
            >
              The Distribution Imperative
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.18]"
              style={{ letterSpacing: "-0.03em" }}
            >
              FMCG supply chains are won and lost at the{" "}
              <span className="text-[#A8DB36] font-normal">distribution layer</span>. Tradon is
              the operating system that unifies logistics, credit, and trust.
            </h2>
          </div>

          {/* Right Supporting Commentary */}
          <div className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-white/15 pt-8 lg:pt-0 lg:pl-10">
            <p className="text-base sm:text-lg font-light text-[#CBE0D5] leading-relaxed">
              From high-capacity primary manufacturing plants to Tier-1 distributors, van sales
              fleets, and neighborhood retail kiosks—give your brand HQ real-time operational
              truth.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-light text-[#A8BEB2]">
              <div className="border-l border-[#A8DB36] pl-3">
                <span className="block text-xl font-normal text-[#A8DB36]">0</span>
                <span>Phantom stockouts</span>
              </div>
              <div className="border-l border-[#A8DB36] pl-3">
                <span className="block text-xl font-normal text-[#A8DB36]">100%</span>
                <span>Audit trail verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
