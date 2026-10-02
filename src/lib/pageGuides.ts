export interface PageGuideInfo {
  title: string;
  category: string;
  description: string;
  keyAction: string;
}

export const PAGE_GUIDES: Record<string, PageGuideInfo> = {
  "/dashboard": {
    title: "Executive Command Center",
    category: "OVERVIEW",
    description: "Your daily FMCG mission control. Review morning AI briefs, monitor revenue velocity across 18 states, track overdue distributor balances, and spot out-of-stock risks in real time.",
    keyAction: "Review the morning brief and check overdue distributor balances before authorizing warehouse dispatches.",
  },
  "/products": {
    title: "Products & Master SKU Catalog",
    category: "CATALOG",
    description: "Manage your consumer goods catalog, carton configurations, wholesale pack sizes, and Tier-1 distributor price schedules.",
    keyAction: "Update SKU wholesale pricing or configure pack size discounts.",
  },
  "/inventory": {
    title: "Warehouse Inventory & Safety Stock",
    category: "WAREHOUSE",
    description: "Monitor depot stock levels, batch numbers, expiry dates, and automated safety stock alerts to prevent production stockouts.",
    keyAction: "Check SKU reorder thresholds before accepting new truckload orders.",
  },
  "/distributors": {
    title: "Distributors Directory",
    category: "PARTNERS",
    description: "Maintain your verified Tier-1 distributor network, active credit terms, state allocations, and primary contact dispatchers.",
    keyAction: "Verify distributor credit status before releasing pending orders.",
  },
  "/distributors/segments": {
    title: "Distributor Segmentation",
    category: "TRADE TIERS",
    description: "Categorize trade partners into Gold, Silver, and Key Account tiers to automatically enforce volume discounts and credit terms.",
    keyAction: "Allocate high-volume partners to Gold tiers for priority dispatch.",
  },
  "/distributors/loyalty": {
    title: "Loyalty & Volume Rebates",
    category: "INCENTIVES",
    description: "Incentivize bulk purchasing with volume-based rebate targets, quarterly milestones, and prompt-payment bonuses.",
    keyAction: "Review rebate payout accruals for distributors meeting quarterly targets.",
  },
  "/distributors/reputation": {
    title: "Distributor Trade Reputation",
    category: "RISK & COMPLIANCE",
    description: "Track distributor fulfillment reliability, payment cycle adherence, and bad-debt risk scores across your wholesale network.",
    keyAction: "Identify partners with high default risk or delayed settlements.",
  },
  "/sales/summary": {
    title: "Daily Sales Summary",
    category: "SALES RECONCILIATION",
    description: "Track daily gross sales across retail and wholesale channels, carton volumes shipped, and revenue collections.",
    keyAction: "Compare today's carton run rate against monthly revenue targets.",
  },
  "/sales/wholesale": {
    title: "Wholesale & Truckload Orders",
    category: "WHOLESALE",
    description: "Process large-volume distributor purchase orders, generate dispatch notes, and verify bank payment receipts.",
    keyAction: "Approve pending warehouse order dispatches.",
  },
  "/sales/modern-trade": {
    title: "Modern Trade & Key Accounts",
    category: "RETAIL CHAINS",
    description: "Manage supermarket chains (Shoprite, Spar), consignment reconciliations, shelf compliance, and trade credit.",
    keyAction: "Audit supermarket replenishment purchase orders and shelf stock.",
  },
  "/sales/field-reps": {
    title: "Field Reps & Van Sales",
    category: "FIELD OPERATIONS",
    description: "Oversee van sales teams, retail store check-ins, spot orders, and daily cash-in-hand reconciliations.",
    keyAction: "Verify rep route coverage and daily carton delivery targets.",
  },
  "/field-reps": {
    title: "Field Sales Operations",
    category: "FIELD OPERATIONS",
    description: "Manage retail merchandisers, GPS route compliance, van inventory, and store visit audits.",
    keyAction: "Review live route progress and store coverage.",
  },
  "/field-reps/tracking": {
    title: "Field Rep GPS Live Tracking",
    category: "FIELD OPERATIONS",
    description: "Live map of field sales officers, active routes, check-ins, and geo-fenced retailer visits.",
    keyAction: "Track on-field rep compliance and active route completion.",
  },
  "/field-reps/routes": {
    title: "Route Planning & Beat Assignment",
    category: "FIELD OPERATIONS",
    description: "Design optimized delivery routes and retail beat schedules to maximize daily store visits per sales rep.",
    keyAction: "Optimize van delivery routes to reduce fuel and transit delays.",
  },
  "/field-reps/performance": {
    title: "Sales Rep Performance Leaderboard",
    category: "FIELD OPERATIONS",
    description: "Evaluate rep sales quotas, strike rates, new retail door activations, and carton volume bonuses.",
    keyAction: "Recognize top-performing reps and address underperforming beats.",
  },
  "/field-reps/audits": {
    title: "Retail Merchandising & Shelf Audits",
    category: "FIELD OPERATIONS",
    description: "Audit retail store presence, share-of-shelf percentage, competitor pricing, and planogram compliance.",
    keyAction: "Review photo audits submitted by field merchandisers.",
  },
  "/finance/reports": {
    title: "Financial Reports & P&L",
    category: "FINANCE",
    description: "Audit gross profit margins, trade discount costs, Days Sales Outstanding (DSO), and net cash flow.",
    keyAction: "Analyze gross margin per SKU and promotional trade spend.",
  },
  "/finance/invoices": {
    title: "Invoicing & Receivables",
    category: "FINANCE",
    description: "Generate commercial tax invoices, monitor outstanding aging debts (30/60/90 days), and send automated payment reminders.",
    keyAction: "Follow up on overdue invoices past standard payment terms.",
  },
  "/finance/reconciliation": {
    title: "Bank & Cash Reconciliation",
    category: "FINANCE",
    description: "Match bank deposits, teller slips, and electronic transfers with distributor purchase orders and delivery notes.",
    keyAction: "Reconcile unallocated bank deposits with pending distributor orders.",
  },
  "/finance": {
    title: "Finance & Cash Operations",
    category: "FINANCE",
    description: "Consolidated overview of revenue, collections, outstanding distributor credits, and operating margins.",
    keyAction: "Review daily cash collections and bank settlements.",
  },
  "/billing": {
    title: "Subscription & Billing",
    category: "BILLING",
    description: "Manage your Tradon platform subscription tier, add or remove user seats, and download tax invoices.",
    keyAction: "Switch between Monthly or Annual billing (with 20% savings).",
  },
  "/marketing/campaigns": {
    title: "Trade Marketing Campaigns",
    category: "MARKETING",
    description: "Launch targeted trade marketing blitzes, discount announcements, and seasonal promotions via SMS and WhatsApp directly to distributors.",
    keyAction: "Broadcast a new trade promo blast to your Gold distributors.",
  },
  "/marketing/automations": {
    title: "Trade Marketing Automations",
    category: "AUTOMATIONS",
    description: "Set up automated triggers for stock reorder reminders, payment deadline alerts, and inactive distributor re-engagement.",
    keyAction: "Activate automated stockout warning triggers.",
  },
  "/promos/deals": {
    title: "Trade Deals & Discounts",
    category: "PROMOTIONS",
    description: "Create buy-10-cartons-get-1-free offers, end-of-quarter volume bonuses, and distributor discount codes.",
    keyAction: "Create a limited-time trade promotion.",
  },
  "/promos/smart-pricing": {
    title: "AI Smart Pricing",
    category: "SMART PRICING",
    description: "Dynamically adjust wholesale pricing based on seasonal demand, raw material price shifts, and local competitor rates.",
    keyAction: "Review AI recommended price adjustments for slow-moving SKUs.",
  },
  "/settings/team": {
    title: "Team & Role Access",
    category: "ADMINISTRATION",
    description: "Manage staff accounts, assign warehouse, sales manager, or finance permissions, and audit user activity.",
    keyAction: "Invite colleagues or update access permissions.",
  },
  "/orders": {
    title: "Master Orders Registry",
    category: "ORDERS",
    description: "Centralized ledger of all wholesale, modern trade, and van sales orders across all company depots.",
    keyAction: "Filter orders by status (Pending, Dispatched, Delivered, Paid).",
  },
  "/support": {
    title: "Helpdesk & Enterprise Support",
    category: "SUPPORT & SLA",
    description: "Access your dedicated FMCG technical account team, track operational resolution tickets, browse offline runbooks, and monitor live microservices.",
    keyAction: "Open an operational ticket or contact your assigned account lead for emergency field escalation.",
  },
  "/appearance": {
    title: "Interface Appearance & Display",
    category: "DISPLAY & PREFERENCES",
    description: "Configure workspace themes, high-glare van sales modes, primary brand accents, table density, and distributor portal branding.",
    keyAction: "Select your preferred theme and density, then click 'Save Changes'.",
  },
  "/settings": {
    title: "Settings",
    category: "WORKSPACE & COMPANY",
    description: "Manage your distributor portal URLs, official company credentials, master catalog policies, tax parameters, and notification triggers.",
    keyAction: "Review company profile details and configure alert preferences.",
  },
};

export const getPageGuide = (pathname: string): PageGuideInfo => {
  if (!pathname) return PAGE_GUIDES["/dashboard"];
  if (PAGE_GUIDES[pathname]) return PAGE_GUIDES[pathname];

  // Try prefix matching
  for (const [route, guide] of Object.entries(PAGE_GUIDES)) {
    if (route !== "/dashboard" && pathname.startsWith(route)) {
      return guide;
    }
  }

  // Fallback generic guide
  const segment = pathname.split("/").filter(Boolean).pop() || "Dashboard";
  const formattedTitle = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
  
  return {
    title: formattedTitle,
    category: "MANAGEMENT",
    description: `Manage and track ${formattedTitle.toLowerCase()} workflows, status updates, and operational records for your distribution network.`,
    keyAction: "Review recent entries and take action on pending tasks.",
  };
};
