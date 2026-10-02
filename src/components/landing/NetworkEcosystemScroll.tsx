"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CardSpec {
  id: number;
  row: "top" | "bottom";
  col: number;
  leftPx: number; // X coordinate inside 1300px stage
  topPx: number;  // Y coordinate inside 820px stage
  width: number;
  height: number;
  type: "hero-video-target" | "video" | "image";
  title: string;
  imageSrc?: string;
  videoSrc?: string;
}

// 4 Columns across 1300px width container:
// Card width: 220px, Card height: 148px, Radius: 22px
// Col 1: 0px | Col 2: 360px | Col 3: 720px | Col 4: 1080px
// Top row: Col 2 & 4 (higher): 30px | Col 1 & 3 (lower): 130px
// Center Headline: 345px (Y = 345px)
// Bottom row: Col 2 & 4 (higher): 415px (Slot 6 target) | Col 1 & 3 (lower): 515px
const ECOSYSTEM_CARDS: CardSpec[] = [
  // Top Row (4 cards)
  {
    id: 1,
    row: "top",
    col: 1,
    leftPx: 0,
    topPx: 130,
    width: 220,
    height: 148,
    type: "image",
    title: "Regional Depot Hub",
    imageSrc: "/images/fmcg_depot_warehouse.jpg",
  },
  {
    id: 2,
    row: "top",
    col: 2,
    leftPx: 360,
    topPx: 30,
    width: 220,
    height: 148,
    type: "video",
    title: "Live Fleet Telematics",
    videoSrc: "/videos/fleet_telematics.mp4",
  },
  {
    id: 3,
    row: "top",
    col: 3,
    leftPx: 720,
    topPx: 130,
    width: 220,
    height: 148,
    type: "image",
    title: "Retailer Order Sync",
    imageSrc: "/images/tradon_mobile_app.jpg",
  },
  {
    id: 4,
    row: "top",
    col: 4,
    leftPx: 1080,
    topPx: 30,
    width: 220,
    height: 148,
    type: "image",
    title: "National Pallet Tracking",
  },

  // Bottom Row (4 cards)
  {
    id: 5,
    row: "bottom",
    col: 1,
    leftPx: 0,
    topPx: 515,
    width: 220,
    height: 148,
    type: "image",
    title: "Automated Reconciliation",
  },
  {
    // Slot 6: Target where Hero Video animates into!
    id: 6,
    row: "bottom",
    col: 2,
    leftPx: 360,
    topPx: 415,
    width: 220,
    height: 148,
    type: "hero-video-target",
    title: "Warehouse Operations",
    imageSrc: "/images/warehouse_team.png",
  },
  {
    id: 7,
    row: "bottom",
    col: 3,
    leftPx: 720,
    topPx: 515,
    width: 220,
    height: 148,
    type: "image",
    title: "Primary Distributor Clearing",
  },
  {
    id: 8,
    row: "bottom",
    col: 4,
    leftPx: 1080,
    topPx: 415,
    width: 220,
    height: 148,
    type: "image",
    title: "Sub-Dealer Credit Settlement",
  },
];

export const NetworkEcosystemScroll: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pinnedProgress, setPinnedProgress] = useState(0);
  const [canvasScale, setCanvasScale] = useState(1);

  // Responsive stage scaling for smaller screens (< 1300px)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const sidePadding = w < 640 ? 40 : w < 1024 ? 80 : 140;
      const availableW = w - sidePadding;
      if (availableW < 1300) {
        setCanvasScale(Math.max(0.24, availableW / 1300));
      } else {
        setCanvasScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!stageRef.current) return;
          const rect = stageRef.current.getBoundingClientRect();
          // Navbar height is 92px
          const stickyTop = 92;
          const totalPinnedDistance = rect.height - (window.innerHeight - stickyTop);

          if (totalPinnedDistance > 0) {
            // How far past stickyTop has the stage scrolled?
            const pinnedScrolled = stickyTop - rect.top;
            const progress = Math.min(Math.max(pinnedScrolled / totalPinnedDistance, 0), 1);
            setPinnedProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- PINNED STAGE MOTION TIMINGS ---
  // Phase 1 (0.0 -> 0.22): Full-Stage Video Presentation
  //   - Video remains locked at full size (1300px x 620px) and centered.
  //   - User scrolls through and absorbs the video with NO premature morphing.
  //
  // Phase 2 (0.22 -> 0.68): Morph into the 8-card grid
  //   - Video shrinks and translates into Slot 6: (360, 415, 220, 148, 22)
  //   - Surrounding 7 cards glide in from top and bottom
  //   - Center headline fades and scales in
  //
  // Phase 3 (0.68 -> 1.0): Held State
  //   - All 8 cards and center headline are locked and readable.
  const morphProgress = Math.min(Math.max((pinnedProgress - 0.22) / 0.46, 0), 1);

  const initialVideoLeft = 0;
  const initialVideoTop = 45;
  const initialVideoWidth = 1300;
  const initialVideoHeight = 620;
  const initialVideoRadius = 36;

  const targetSlot6Left = 360;
  const targetSlot6Top = 415;
  const targetSlot6Width = 220;
  const targetSlot6Height = 148;
  const targetSlot6Radius = 22;

  const heroBoxLeft = initialVideoLeft + (targetSlot6Left - initialVideoLeft) * morphProgress;
  const heroBoxTop = initialVideoTop + (targetSlot6Top - initialVideoTop) * morphProgress;
  const heroBoxWidth = initialVideoWidth - (initialVideoWidth - targetSlot6Width) * morphProgress;
  const heroBoxHeight = initialVideoHeight - (initialVideoHeight - targetSlot6Height) * morphProgress;
  const heroBoxRadius = initialVideoRadius - (initialVideoRadius - targetSlot6Radius) * morphProgress;

  // Center headline fade-in: starts at 0.26, fully in by 0.58
  const headlineOpacity = Math.min(Math.max((pinnedProgress - 0.26) / 0.32, 0), 1);
  const headlineScale = 0.92 + headlineOpacity * 0.08;

  // Surrounding 7 cards glide in: starts at 0.24, fully in by 0.62
  const cardsProgress = Math.min(Math.max((pinnedProgress - 0.24) / 0.38, 0), 1);

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Normal Document Flow - Natural Page Scroll) */}
      {/* ============================================================ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          paddingTop: "84px",
          paddingBottom: "0px",
        }}
      >
        {/* Full-Width Background Clip Path Perspective Grid - brought way down below headline */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "290px",
            width: "100%",
            height: "650px",
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <Image
            src="/clip-path.png"
            alt="Perspective Grid"
            fill
            priority
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Centered 1440px Container with responsive side padding */}
        <div
          className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[70px] box-border relative z-10"
        >
          {/* Centered Hero Text Content: Normal flow, zero artificial fading */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "860px",
            }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "#0E3E2B",
              }}
            >
              Distribute with impact.
              <br />
              Deliver at scale.
            </h1>

            <p
              className="text-base sm:text-lg lg:text-[20px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#0E3E2B",
                marginTop: "18px",
                maxWidth: "760px",
              }}
            >
              One platform where FMCG brands, distributors, and retailers manage
              <br className="hidden sm:inline" />
              {" "}every order together.
            </p>

            <div style={{ marginTop: "28px" }}>
              <Link href="/register">
                <button className="btn-hero-cta">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PINNED VIDEO & ECOSYSTEM STAGE (Pinned Scroll Morph)       */}
      {/* ============================================================ */}
      <section
        ref={stageRef}
        style={{
          position: "relative",
          width: "100%",
          height: "280vh", // Generous runway for full video absorption then morph
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Sticky Stage Container pinned under 92px navbar */}
        <div
          style={{
            position: "sticky",
            top: "92px",
            width: "100%",
            height: "calc(100vh - 92px)",
            minHeight: canvasScale < 1 ? `${Math.round(820 * canvasScale)}px` : "820px",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* Subtle Continuous Perspective Grid in Pinned Stage */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "30px",
              width: "100%",
              height: "550px",
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 0,
              opacity: 0.35,
            }}
          >
            <Image
              src="/clip-path.png"
              alt="Perspective Grid"
              fill
              priority
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Centered 1440px Container with responsive side padding */}
          <div
            className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[70px] box-border relative z-[2] h-full flex flex-col items-center"
          >
            {/* Active 1300px Stage Canvas - Scales cleanly on smaller screens via CSS transform */}
            <div
              style={{
                position: "relative",
                width: "1300px",
                height: "820px",
                transform: canvasScale < 1 ? `scale(${canvasScale})` : undefined,
                transformOrigin: "top center",
              }}
            >
              {/* CENTER HEADLINE: Your distribution network, running on one intelligent platform. */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "345px",
                  transform: `translate(-50%, -50%) scale(${headlineScale})`,
                  width: "90%",
                  maxWidth: "840px",
                  textAlign: "center",
                  opacity: headlineOpacity,
                  pointerEvents: "auto",
                  zIndex: 20,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "38px",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    letterSpacing: "-0.02em",
                    color: "#0E3E2B",
                  }}
                >
                  Your distribution network, running on one intelligent platform.
                </h2>
              </div>

              {/* THE 7 SURROUNDING CARDS (Gliding smoothly into place during pinned morph) */}
              {ECOSYSTEM_CARDS.map((card) => {
                if (card.type === "hero-video-target") return null;

                // Top row cards glide in from above, bottom row cards glide in from below
                const offsetDirection = card.row === "top" ? -40 : 40;
                const yOffset = (1 - cardsProgress) * offsetDirection;

                return (
                  <div
                    key={card.id}
                    style={{
                      position: "absolute",
                      left: `${card.leftPx}px`,
                      top: `${card.topPx}px`,
                      width: `${card.width}px`,
                      height: `${card.height}px`,
                      borderRadius: "22px",
                      backgroundColor: "#B6A6A6", // Exact Figma card placeholder tone
                      opacity: cardsProgress,
                      transform: `translateY(${yOffset}px) scale(${0.9 + cardsProgress * 0.1})`,
                      overflow: "hidden",
                      zIndex: 10,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                      pointerEvents: "auto",
                    }}
                  >
                    {/* Slot 2: Dedicated Video Card */}
                    {card.type === "video" && (
                      <video
                        src={card.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Image Slots */}
                    {card.type === "image" && card.imageSrc && (
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    )}

                    {/* Clean wireframe placeholder gradient */}
                    {!card.imageSrc && card.type !== "video" && (
                      <div className="w-full h-full flex flex-col justify-end p-3 bg-gradient-to-t from-black/25 to-transparent">
                        <span className="text-[11px] font-normal text-white/95">
                          {card.title}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* THE HERO VIDEO: FULL STAGE FIRST, THEN SMOOTHLY MORPHS INTO SLOT 6 */}
              <div
                style={{
                  position: "absolute",
                  left: `${heroBoxLeft}px`,
                  top: `${heroBoxTop}px`,
                  width: `${heroBoxWidth}px`,
                  height: `${heroBoxHeight}px`,
                  borderRadius: `${heroBoxRadius}px`,
                  backgroundColor: "#737373",
                  overflow: "hidden",
                  zIndex: 25,
                  boxShadow: morphProgress < 0.5 ? "0 14px 40px rgba(0,0,0,0.07)" : "0 6px 20px rgba(0,0,0,0.04)",
                  pointerEvents: "auto",
                }}
              >
                {/* Continuous Media / Video Player */}
                <div className="relative w-full h-full bg-[#737373]">
                  <video
                    src="/videos/hero_distribution.mp4"
                    poster="/images/warehouse_team.png"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Hero-state indicator badge */}
                  {morphProgress < 0.25 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: "rgba(14, 62, 43, 0.4)",
                        backdropFilter: "blur(12px)",
                        padding: "6px 14px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        opacity: 1 - morphProgress * 4,
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#A3FF00",
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "12px",
                          color: "#FFFFFF",
                          fontWeight: 400,
                        }}
                      >
                        Live Tradon Ecosystem
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
