"use client";

import React from "react";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Left fixed panel */}
      <div
        style={{
          width: "40%",
          height: "100%",
          flexShrink: 0,
        }}
        className="hidden lg:block"
      >
        <AuthLeftPanel />
      </div>

      {/* Right form area */}
      <div
        style={{
          flexGrow: 1,
          height: "100%",
          position: "relative",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
