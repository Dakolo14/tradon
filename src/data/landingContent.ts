export interface BrandPartner {
  name: string;
  tag: string;
  category: string;
  initials: string;
}

export interface CoreModule {
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  metric: { value: string; label: string };
  previewType: "distributor" | "field_rep" | "inventory";
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export const BRAND_PARTNERS: BrandPartner[] = [
  { name: "Chi Limited", tag: "National Depot Sync", category: "Beverages & Dairy", initials: "CHI" },
  { name: "Dufil Prima Foods", tag: "1,400+ Van Fleets", category: "Packaged Foods", initials: "DPF" },
  { name: "Unilever West Africa", tag: "Key Account Direct", category: "Personal & Home Care", initials: "UNI" },
  { name: "Dangote FMCG", tag: "Tier-1 Depots", category: "Consumer Commodities", initials: "DAN" },
  { name: "Nestlé Distribution", tag: "Rural Route Execution", category: "Nutrition & Foods", initials: "NES" },
  { name: "Promasidor", tag: "Sub-Dealer Credit Sync", category: "Dairy & Seasoning", initials: "PRO" },
];

export const CORE_MODULES: CoreModule[] = [
  {
    tag: "CREDIT & RISK GOVERNANCE",
    title: "Distributor Management & Dynamic Credit Scoring",
    description:
      "Mitigate bad debt and eliminate manual reconciliation. Set automated credit limits, monitor 30/60/90-day aging buckets, and approve limit requests instantly.",
    highlights: [
      "Real-time credit exposure & collateral tracking",
      "Automated hold on overdue distributor accounts",
      "One-click Paystack & direct NIBSS bank settlement",
    ],
    metric: { value: "₦1.4B+", label: "Managed Monthly Credit" },
    previewType: "distributor",
  },
  {
    tag: "LAST-MILE EXECUTION",
    title: "Field Rep Tracking & Retail Store Execution",
    description:
      "Empower your on-the-ground reps with a lightweight offline-first order app. Verify store visits via geo-fencing, audit shelf-share, and log instant cash-and-carry orders.",
    highlights: [
      "GPS-verified visit logs and beat routing",
      "Shelf-share audit with photo verification",
      "Instant offline order capture for rural kiosks",
    ],
    metric: { value: "98.7%", label: "Route Compliance Rate" },
    previewType: "field_rep",
  },
  {
    tag: "DEPOT & WAREHOUSE SYNC",
    title: "Real-Time Depot Inventory & Van Sales Fulfillment",
    description:
      "End the nightmare of phantom stock. Sync primary manufacturing plants, regional hub warehouses, and secondary distributor stockrooms in a single verifiable ledger.",
    highlights: [
      "Automated reorder triggers before depot stockout",
      "Batch & lot tracking with expiration alerts",
      "End-of-day van sales reconciliations & cash handovers",
    ],
    metric: { value: "<0.4%", label: "Stock Discrepancy Rate" },
    previewType: "inventory",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For emerging FMCG brands formalizing regional distributor routes.",
    priceMonthly: 490,
    priceAnnual: 390,
    popular: false,
    features: [
      "Up to 25 verified Tier-1 distributors",
      "15 Field sales representative seats",
      "2 Central warehouse depots",
      "Daily automated Morning Brief report",
      "Basic credit limit alerts & overdue notifications",
      "Standard CSV & Excel export integrations",
      "Email & in-app support (12h SLA)",
    ],
    ctaText: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For national brands demanding complete visibility and dynamic credit control.",
    priceMonthly: 1290,
    priceAnnual: 990,
    popular: true,
    features: [
      "Up to 120 verified distributors & sub-dealers",
      "60 Field sales representative seats",
      "Unlimited regional depots & van sales routes",
      "Automated credit risk scoring & Paystack sync",
      "Tradon AI Copilot (live query & predictive replenishment)",
      "GPS route planner & shelf-share photo auditing",
      "2-Way ERP bridge (SAP, Business Central, Sage)",
      "Priority 24/7 dedicated distributor success team",
    ],
    ctaText: "Claim Growth Plan",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For multi-category conglomerates managing nationwide distribution.",
    priceMonthly: 2890,
    priceAnnual: 2390,
    popular: false,
    features: [
      "Unlimited distributors, retailers & field sales reps",
      "Unlimited nationwide plants, depots & cold-chain hubs",
      "Custom algorithmic credit underwriting models",
      "On-premise or dedicated private cloud deployment",
      "Full API & bi-directional legacy ERP connectors",
      "Custom compliance & CAC/TIN verification workflows",
      "Dedicated Technical Account Manager & SLA guarantee",
      "Custom field training for regional sales managers",
    ],
    ctaText: "Contact Enterprise HQ",
  },
];
