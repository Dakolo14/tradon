"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TradonLogo } from "../common/TradonLogo";
import { ChevronDown, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#0E3E2B]/10 sticky top-0 z-50">
      <div
        className="navbar-container flex items-center justify-between h-[92px]"
      >
        {/* Exact 196x50px Logo with guaranteed 70px left padding from frame */}
        <Link href="/" className="hover:opacity-90 transition-opacity shrink-0 flex items-center">
          <TradonLogo />
        </Link>

        {/* Desktop Nav Items: Poppins Regular 18px */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          <div className="relative group cursor-pointer flex items-center gap-1.5 text-[18px] font-normal text-[#0E3E2B] hover:opacity-80 transition-opacity">
            <span>Products</span>
            <ChevronDown className="w-4 h-4 text-[#0E3E2B] transition-transform group-hover:translate-y-0.5" />
          </div>

          <div className="relative group cursor-pointer flex items-center gap-1.5 text-[18px] font-normal text-[#0E3E2B] hover:opacity-80 transition-opacity">
            <span>Businesses</span>
            <ChevronDown className="w-4 h-4 text-[#0E3E2B] transition-transform group-hover:translate-y-0.5" />
          </div>

          <Link
            href="#features"
            className="text-[18px] font-normal text-[#0E3E2B] hover:opacity-80 transition-opacity"
          >
            Features
          </Link>

          <Link
            href="#pricing"
            className="text-[18px] font-normal text-[#0E3E2B] hover:opacity-80 transition-opacity"
          >
            Pricing
          </Link>

          <Link
            href="#contact"
            className="text-[18px] font-normal text-[#0E3E2B] hover:opacity-80 transition-opacity"
          >
            Contact
          </Link>
        </nav>

        {/* Right side: Sign In and Get Started with exact 42px gap */}
        <div className="hidden lg:flex items-center" style={{ gap: "42px" }}>
          <Link
            href="#signin"
            className="text-[18px] font-normal text-[#0E3E2B] hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>

          <Link href="/register">
            <button className="btn-tradon-nav">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile menu hamburger */}
        <button
          className="lg:hidden p-2 text-[#0E3E2B]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#0E3E2B]/10 px-6 py-6 space-y-4 shadow-sm">
          <nav className="flex flex-col space-y-3 text-[18px] text-[#0E3E2B]">
            <Link href="#products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link href="#businesses" onClick={() => setMobileMenuOpen(false)}>Businesses</Link>
            <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </nav>
          <div className="pt-4 border-t border-[#0E3E2B]/10 flex flex-col gap-3">
            <Link href="#signin" className="text-center text-[18px] text-[#0E3E2B]">Sign In</Link>
            <Link href="/register">
              <button className="btn-tradon-nav w-full">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
