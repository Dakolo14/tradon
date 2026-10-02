"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useAppearance } from "@/context/AppearanceContext";

const revenueData = [
  { name: "D1", value: 24 },
  { name: "D2", value: 26 },
  { name: "D3", value: 28 },
  { name: "D4", value: 27 },
  { name: "D5", value: 31 },
  { name: "D6", value: 36 },
  { name: "D7", value: 34 },
  { name: "D8", value: 38 },
  { name: "D9", value: 41 },
  { name: "D10", value: 39 },
  { name: "D11", value: 37 },
  { name: "D12", value: 38 },
  { name: "D13", value: 39 },
  { name: "D14", value: 40 },
];

export const RevenueTrendChart = () => {
  const { tokens, config } = useAppearance();
  const isDark = config.theme === "dark";

  return (
    <div
      style={{
        backgroundColor: tokens.bgCard,
        border: `1px solid ${tokens.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
      }}
      className="p-4 sm:p-6 rounded-2xl md:rounded-3xl h-[330px] sm:h-[400px]"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>Revenue trend</span>
          <span style={{ fontSize: "13px", color: tokens.textMuted }}>Last 14 days (₦M)</span>
        </div>
        <div
          style={{
            backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#F0FDF4",
            color: isDark ? "#34D399" : "#16A34A",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: 700,
            boxShadow: "none",
          }}
        >
          +12.4%
        </div>
      </div>

      <div style={{ flexGrow: 1, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={tokens.accentHex} stopOpacity={0.25} />
                <stop offset="95%" stopColor={tokens.accentHex} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(14,62,43,0.06)"} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: tokens.textMuted }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: tokens.textMuted }}
              domain={["dataMin - 5", "dataMax + 5"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tokens.bgCard,
                borderRadius: "8px",
                border: `1px solid ${tokens.borderSubtle}`,
                color: tokens.textPrimary,
                boxShadow: "none",
              }}
              itemStyle={{ color: tokens.textPrimary, fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isDark ? "#10B981" : "#0E3E2B"}
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const channelData = [
  { name: "Modern Trade", value: 38, color: "#15803D" },
  { name: "Open Market", value: 32, color: "#F59E0B" },
  { name: "HoReCa", value: 14, color: "#84CC16" },
  { name: "Institutional", value: 10, color: "#A3FF00" },
  { name: "WhatsApp", value: 6, color: "#10B981" },
];

export const ChannelMixChart = () => {
  const { tokens } = useAppearance();

  return (
    <div
      style={{
        backgroundColor: tokens.bgCard,
        border: `1px solid ${tokens.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
      }}
      className="p-4 sm:p-6 rounded-2xl md:rounded-3xl h-auto min-h-[380px] sm:h-[400px]"
    >
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
        <span style={{ fontSize: "16px", fontWeight: 700, color: tokens.textPrimary }}>Channel mix</span>
        <span style={{ fontSize: "13px", color: tokens.textMuted }}>Revenue share</span>
      </div>

      <div style={{ position: "relative", height: "170px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <Pie
              data={channelData}
              cx="50%"
              cy="50%"
              innerRadius={46}
              outerRadius={65}
              paddingAngle={3}
              cornerRadius={3}
              dataKey="value"
              stroke="none"
            >
              {channelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: tokens.bgCard,
                borderRadius: "8px",
                border: `1px solid ${tokens.borderSubtle}`,
                color: tokens.textPrimary,
                boxShadow: "none",
              }}
              itemStyle={{ color: tokens.textPrimary, fontWeight: 600 }}
              formatter={(value: any) => [`${value}%`, "Share"]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside donut */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 800, color: tokens.textPrimary, lineHeight: 1 }}>
            100%
          </span>
          <span style={{ fontSize: "10px", color: tokens.textMuted, fontWeight: 600, marginTop: "2px" }}>
            Mix
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
        {channelData.map((item) => (
          <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.color }} />
              <span style={{ fontSize: "12.5px", color: tokens.textSecondary }}>{item.name}</span>
            </div>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: tokens.textPrimary }}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SmallSparklineCard = ({ title, subTitle, value, label, data, color, type = "line" }: any) => {
  const { tokens } = useAppearance();

  return (
    <div
      style={{
        backgroundColor: tokens.bgCard,
        border: `1px solid ${tokens.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        boxShadow: "none",
      }}
      className="p-4 sm:p-6 rounded-2xl md:rounded-3xl"
    >
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: tokens.textPrimary }}>{title}</span>
        <span style={{ fontSize: "12px", color: tokens.textMuted }}>{subTitle}</span>
      </div>

      <div style={{ height: "60px", width: "100%", marginBottom: "16px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type={type === "step" ? "stepAfter" : "monotone"}
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={type === "step"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <span style={{ fontSize: "24px", fontWeight: 800, color: tokens.textPrimary }}>{value}</span>
        <span style={{ fontSize: "12px", color: tokens.textMuted }}>{label}</span>
      </div>
    </div>
  );
};

export const StockoutListCard = () => {
  const { tokens, config } = useAppearance();
  const isDark = config.theme === "dark";

  const stockouts = [
    { name: "Chivita Apple 1L", hub: "Alhaji Musa", cover: "2d cover", color: "#EF4444", bg: isDark ? "rgba(239,68,68,0.18)" : "#FEF2F2" },
    { name: "Hollandia UHT 1L", hub: "Eko FMCG Hub", cover: "3d cover", color: "#F59E0B", bg: isDark ? "rgba(245,158,11,0.18)" : "#FFFBEB" },
    { name: "Chi Capri-Sun 50cl", hub: "Lagos Island", cover: "4d cover", color: "#84CC16", bg: isDark ? "rgba(132,204,22,0.18)" : "#F7FEE7" },
    { name: "Chivita Tropical 1L", hub: "PH Riverside", cover: "4d cover", color: "#84CC16", bg: isDark ? "rgba(132,204,22,0.18)" : "#F7FEE7" },
  ];

  return (
    <div
      style={{
        backgroundColor: tokens.bgCard,
        border: `1px solid ${tokens.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "none",
      }}
      className="p-4 sm:p-6 rounded-2xl md:rounded-3xl"
    >
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
        <span style={{ fontSize: "14px", fontWeight: 700, color: tokens.textPrimary }}>Stockout risk</span>
        <span style={{ fontSize: "12px", color: tokens.textMuted }}>Top SKUs running low</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {stockouts.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.textPrimary }}>{item.name}</span>
              <span style={{ fontSize: "11px", color: tokens.textMuted }}>{item.hub}</span>
            </div>
            <div
              style={{
                backgroundColor: item.bg,
                color: item.color,
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "9999px",
                boxShadow: "none",
              }}
            >
              {item.cover}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
