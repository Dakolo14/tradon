"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 50,
        backgroundColor: "#A3FF00",
        color: "#0E3E2B",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }}
      className="hover:scale-110 hover:shadow-lg"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
