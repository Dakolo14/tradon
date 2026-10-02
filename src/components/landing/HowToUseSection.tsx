"use client";

import React from "react";

export const HowToUseSection: React.FC = () => {
  return (
    <section 
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <div 
        className="page-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "48px",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#0E3E2B",
            marginTop: 0,
            marginBottom: "64px",
            textAlign: "center",
          }}
        >
          The Platform In Three Clear Steps
        </h2>

        {/* 3-Column Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 w-full max-w-[1300px]"
          style={{ gap: "32px", alignItems: "stretch" }}
        >
          {/* Card 1 */}
          <div
            style={{
              borderColor: "#A3DBB5",
              borderRadius: "24px",
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "#FFFFFF",
              padding: "32px 32px 0 32px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <span 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0E3E2B",
                opacity: 0.7,
                marginBottom: "8px",
                display: "block",
              }}
            >
              Step 1
            </span>
            <h3 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "22px",
                fontWeight: 500,
                color: "#0E3E2B",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              Sign Up & Set Up Your Workspace
            </h3>
            <p 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                color: "#0E3E2B",
                opacity: 0.8,
                lineHeight: 1.6,
                marginTop: 0,
                marginBottom: "50px",
              }}
            >
              Start by setting up a workspace tailored to your team's needs, with customizable options for all types of projects.
            </p>
            {/* Image Placeholder */}
            <div 
              style={{
                width: "100%",
                marginTop: "auto",
                position: "relative",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(163, 219, 181, 0.5)",
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "220px",
                boxSizing: "border-box",
              }}
            >
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#0E3E2B",
                  opacity: 0.4,
                  textAlign: "center",
                  padding: "0 16px",
                  margin: 0,
                }}
              >
                Create New Dashboard Wireframe
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              borderColor: "#A3DBB5",
              borderRadius: "24px",
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "#FFFFFF",
              padding: "32px 32px 0 32px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <span 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0E3E2B",
                opacity: 0.7,
                marginBottom: "8px",
                display: "block",
              }}
            >
              Step 2
            </span>
            <h3 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "22px",
                fontWeight: 500,
                color: "#0E3E2B",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              Invite & Collaborate Instantly
            </h3>
            <p 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                color: "#0E3E2B",
                opacity: 0.8,
                lineHeight: 1.6,
                marginTop: 0,
                marginBottom: "50px",
              }}
            >
              Add team members, set roles, and start sharing ideas in real-time with intuitive tools designed for smooth collaboration.
            </p>
            {/* Image Placeholder */}
            <div 
              style={{
                width: "100%",
                marginTop: "auto",
                position: "relative",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(163, 219, 181, 0.5)",
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "220px",
                boxSizing: "border-box",
              }}
            >
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#0E3E2B",
                  opacity: 0.4,
                  textAlign: "center",
                  padding: "0 16px",
                  margin: 0,
                }}
              >
                Data Analysis Wireframe
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              borderColor: "#A3DBB5",
              borderRadius: "24px",
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "#FFFFFF",
              padding: "32px 32px 0 32px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <span 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0E3E2B",
                opacity: 0.7,
                marginBottom: "8px",
                display: "block",
              }}
            >
              Step 3
            </span>
            <h3 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "22px",
                fontWeight: 500,
                color: "#0E3E2B",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              Manage & Grow
            </h3>
            <p 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                color: "#0E3E2B",
                opacity: 0.8,
                lineHeight: 1.6,
                marginTop: 0,
                marginBottom: "50px",
              }}
            >
              Track progress, review feedback, and scale your projects with tools that adapt to your team's growing needs.
            </p>
            {/* Image Placeholder */}
            <div 
              style={{
                width: "100%",
                marginTop: "auto",
                position: "relative",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(163, 219, 181, 0.5)",
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "220px",
                boxSizing: "border-box",
              }}
            >
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#0E3E2B",
                  opacity: 0.4,
                  textAlign: "center",
                  padding: "0 16px",
                  margin: 0,
                }}
              >
                Active Projects Wireframe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
