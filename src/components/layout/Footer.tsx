"use client";

import React from "react";
import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "QUICKLINKS",
    links: [
      { name: "Features", href: "#features" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Resources", href: "#resources" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      { name: "FMCG Brands", href: "#fmcg-brands" },
      { name: "Distributors", href: "#distributors" },
      { name: "Field Teams", href: "#field-teams" },
      { name: "Financing", href: "#financing" },
    ],
  },
  {
    title: "QUICKLINKS",
    links: [
      { name: "Features", href: "#features" },
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Resources", href: "#resources" },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#0E3E2B",
        color: "#FFFFFF",
        paddingTop: "96px",
        paddingBottom: "48px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        className="page-container"
        style={{
          width: "100%",
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* ============================================================ */}
        {/* TOP SECTION: 4 Navigation Columns                             */}
        {/* ============================================================ */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          style={{
            paddingBottom: "64px",
          }}
        >
          {FOOTER_COLUMNS.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  marginBottom: "28px",
                  marginTop: 0,
                }}
              >
                {col.title}
              </h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#FFFFFF",
                        opacity: 0.8,
                        textDecoration: "none",
                        transition: "opacity 0.2s ease, color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.color = "#A3DBB5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.8";
                        e.currentTarget.style.color = "#FFFFFF";
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* MIDDLE ROW: Divider Lines + Copyright + Legal Links          */}
        {/* ============================================================ */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
            paddingBottom: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Copyright notice */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
              opacity: 0.75,
              margin: 0,
            }}
          >
            &copy; 2026 Tradon Ltd. All rights reserved.
          </p>

          {/* Legal Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
              flexWrap: "wrap",
            }}
          >
            {[
              { name: "Privacy Policy", href: "#privacy" },
              { name: "Terms Of Service", href: "#terms" },
              { name: "Cookie Policy", href: "#cookies" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  opacity: 0.75,
                  textDecoration: "none",
                  transition: "opacity 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "#A3DBB5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.75";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM GRAPHIC: Giant Outlined TRADON Watermark              */}
        {/* ============================================================ */}
        <div
          style={{
            width: "100%",
            paddingTop: "48px",
            paddingBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 1800 420"
            width="100%"
            height="auto"
            style={{
              display: "block",
              width: "100%",
              maxHeight: "320px",
            }}
          >
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="none"
              stroke="#A3DBB5"
              strokeWidth="1"
              paintOrder="stroke fill"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "360px",
                fontStyle: "italic",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              TRADON
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
};
