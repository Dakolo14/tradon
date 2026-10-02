"use client";

import React from "react";
import { MorningBriefCard } from "@/components/dashboard/MorningBriefCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import {
  RevenueTrendChart,
  ChannelMixChart,
  SmallSparklineCard,
  StockoutListCard,
} from "@/components/dashboard/ChartCards";
import { Package, TrendingUp, AlertTriangle, Star } from "lucide-react";

const sellThroughData = [
  { value: 900 },
  { value: 950 },
  { value: 930 },
  { value: 1000 },
  { value: 1020 },
  { value: 1050 },
  { value: 1100 },
  { value: 1080 },
  { value: 1120 },
  { value: 1150 },
  { value: 1140 },
  { value: 1184 },
];

const collectionData = [
  { value: 35 },
  { value: 34 },
  { value: 34 },
  { value: 32 },
  { value: 31 },
  { value: 33 },
  { value: 30 },
  { value: 29 },
  { value: 29 },
  { value: 28 },
  { value: 29 },
];

const promoLiftData = [
  { value: 0 },
  { value: 5 },
  { value: 10 },
  { value: 25 },
  { value: 40 },
  { value: 45 },
  { value: 42 },
  { value: 48 },
  { value: 55 },
  { value: 52 },
  { value: 58 },
];

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "48px" }}>
      <MorningBriefCard />

      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "28px",
        }}
      >
        <MetricCard
          title="ORDERS YESTERDAY"
          value="1,247"
          subText="18 states active"
          icon={<Package size={18} color="#0E3E2B" />}
        />
        <MetricCard
          title="REVENUE"
          value="₦43.2M"
          trend={{ value: "+12.4%", isPositive: true }}
          subText="vs prev. day"
          icon={<TrendingUp size={18} color="#16A34A" />}
          iconBgColor="#F0FDF4"
        />
        <MetricCard
          title="OVERDUE DISTRIBUTORS"
          value="23"
          subText={<span style={{ color: "#EF4444", fontWeight: 600 }}>₦8.1M outstanding</span>}
          icon={<AlertTriangle size={18} color="#EF4444" />}
          iconBgColor="#FEF2F2"
        />
        <MetricCard
          title="TOP REP"
          value="187%"
          subText="Emeka Okafor"
          icon={<Star size={18} color="#D97706" />}
          iconBgColor="#FFF8E6"
        />
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "28px",
        }}
        className="dashboard-charts-grid"
      >
        <div style={{ gridColumn: "span 8" }} className="col-span-12 lg:col-span-8">
          <RevenueTrendChart />
        </div>
        <div style={{ gridColumn: "span 4" }} className="col-span-12 lg:col-span-4">
          <ChannelMixChart />
        </div>
      </div>

      {/* Bottom Small Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "28px",
        }}
      >
        <SmallSparklineCard
          title="Sell-through velocity"
          subTitle="Cartons/day · last 14 days"
          value="1,184"
          label="cartons/day"
          data={sellThroughData}
          color="#F59E0B"
        />
        <StockoutListCard />
        <SmallSparklineCard
          title="Collection efficiency"
          subTitle="DSO · target 21 days"
          value="29"
          label="days"
          data={collectionData}
          color="#16A34A"
          type="step"
        />
        <SmallSparklineCard
          title="Promo lift"
          subTitle="Active promos vs baseline"
          value="+42%"
          label="avg lift"
          data={promoLiftData}
          color="#84CC16"
        />
      </div>
      
      {/* Add a style tag for responsive overrides if needed since inline styles for grid column span don't do breakpoints easily */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .dashboard-charts-grid > div {
            grid-column: span 12 !important;
          }
        }
      `}} />
    </div>
  );
}
