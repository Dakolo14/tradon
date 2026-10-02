"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardTopNav } from "@/components/dashboard/TopNav";
import { useAppearance } from "@/context/AppearanceContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { tokens, config } = useAppearance();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: tokens.bgPage,
        color: tokens.textPrimary,
        overflow: "hidden",
        position: "relative",
        transition: config.enableAnimations ? "background-color 0.2s ease, color 0.2s ease" : "none",
      }}
    >
      <div 
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <DashboardSidebar onClose={() => setIsMobileNavOpen(false)} />
      </div>

      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
          width: "100%",
          backgroundColor: tokens.bgPage,
        }}
      >
        <DashboardTopNav onMenuClick={() => setIsMobileNavOpen(true)} />
        <main
          style={{
            flexGrow: 1,
            overflowY: "auto",
            backgroundColor: tokens.bgPage,
            color: tokens.textPrimary,
            transition: config.enableAnimations ? "background-color 0.2s ease, color 0.2s ease" : "none",
          }}
          className="p-4 sm:p-6 lg:p-8 xl:px-12 xl:py-6"
        >
          <div style={{ maxWidth: "1520px", margin: "0 auto", width: "100%" }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
