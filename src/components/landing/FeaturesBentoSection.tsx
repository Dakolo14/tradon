"use client";

import React from "react";

export const FeaturesBentoSection: React.FC = () => {
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
          Explore Tradon's Key Features
        </h2>

        {/* 12-Column Bento Grid Container */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-[1300px]"
          style={{ gap: "24px" }}
        >
          
          {/* ======================= ROW 1 ======================= */}
          
          {/* L1: Manage every order (Dark) -> Wide (7 cols) */}
          <div
            className="lg:col-span-7 flex flex-col rounded-[32px] overflow-hidden"
            style={{ 
              backgroundColor: "#0E3E2B", 
              padding: "40px 40px 0 40px",
              boxSizing: "border-box",
            }}
          >
            <h3 
              style={{ 
                fontFamily: "var(--font-sans)",
                fontSize: "26px",
                fontWeight: 500,
                color: "#FFFFFF",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.25,
              }}
            >
              Manage every order in real time
            </h3>
            <p 
              style={{ 
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#FFFFFF",
                opacity: 0.8,
                marginTop: 0,
                marginBottom: "50px",
              }}
            >
              Keep all your orders organized and accessible in on place, auto-confirmed.
            </p>
            {/* Image Placeholder */}
            <div 
              style={{
                width: "100%",
                marginTop: "auto",
                position: "relative",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#154f38",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
              }}
            >
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  opacity: 0.4,
                  textAlign: "center",
                  padding: "0 16px",
                  margin: 0,
                }}
              >
                Overview / Performance Wireframe
              </p>
            </div>
          </div>

          {/* R1: Real-Time Collaboration (Light) -> Narrow (5 cols) */}
          <div
            className="lg:col-span-5 flex flex-col border rounded-[32px] bg-white overflow-hidden"
            style={{ 
              borderColor: "#A3DBB5", 
              padding: "40px 40px 0 40px",
              boxSizing: "border-box",
            }}
          >
            <h3 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "26px",
                fontWeight: 500,
                color: "#0E3E2B",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.25,
              }}
            >
              Real-Time Collaboration
            </h3>
            <p 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#0E3E2B",
                opacity: 0.8,
                marginTop: 0,
                marginBottom: "50px",
              }}
            >
              Work simultaneously with your team, with instant updates.
            </p>
            {/* Image Placeholder */}
            <div 
              style={{
                width: "100%",
                marginTop: "auto",
                position: "relative",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(163, 219, 181, 0.5)",
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
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
                Collaboration Cursors Wireframe
              </p>
            </div>
          </div>


          {/* ======================= ROW 2 ======================= */}
          
          {/* L2: Analytics Dashboard (Light) -> Narrow (5 cols) */}
          <div
            className="lg:col-span-5 flex flex-col border rounded-[32px] bg-white overflow-hidden"
            style={{ 
              borderColor: "#A3DBB5", 
              padding: "40px 40px 0 40px",
              boxSizing: "border-box",
            }}
          >
            <h3 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "26px",
                fontWeight: 500,
                color: "#0E3E2B",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.25,
              }}
            >
              Analytics Dashboard
            </h3>
            <p 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#0E3E2B",
                opacity: 0.8,
                marginTop: 0,
                marginBottom: "24px",
              }}
            >
              Monitor team performance with clear, actionable insights.
            </p>
            {/* Image Placeholder - Expands to cover full remaining height */}
            <div 
              style={{
                width: "100%",
                flex: 1,
                position: "relative",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(163, 219, 181, 0.5)",
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "340px",
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
                Analytics Line Chart Wireframe
              </p>
            </div>
          </div>

          {/* R2 & R3 Wrapper: Integrations & Security -> Wide (7 cols) */}
          <div 
            className="lg:col-span-7"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            
            {/* R2: Seamless Integrations (Light) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: "32px",
                border: "1px solid #A3DBB5",
                backgroundColor: "#FFFFFF",
                overflow: "hidden",
                padding: "32px 32px 0 32px",
                boxSizing: "border-box",
              }}
            >
              <h3 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "#0E3E2B",
                  marginTop: 0,
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                Seamless Integrations
              </h3>
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "#0E3E2B",
                  opacity: 0.8,
                  marginTop: 0,
                  marginBottom: "40px",
                }}
              >
                Connect with popular tools to streamline workflows.
              </p>
              {/* Image Placeholder */}
              <div 
                style={{
                  width: "100%",
                  marginTop: "auto",
                  position: "relative",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(163, 219, 181, 0.5)",
                  borderBottom: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "140px",
                }}
              >
                <p 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#0E3E2B",
                    opacity: 0.4,
                    textAlign: "center",
                    padding: "0 16px",
                    margin: 0,
                  }}
                >
                  Integrations Banner Wireframe
                </p>
              </div>
            </div>

            {/* R3: Secure File Sharing (Light) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: "32px",
                border: "1px solid #A3DBB5",
                backgroundColor: "#FFFFFF",
                overflow: "hidden",
                padding: "32px 32px 0 32px",
                boxSizing: "border-box",
              }}
            >
              <h3 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "#0E3E2B",
                  marginTop: 0,
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                Secure File Sharing
              </h3>
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "#0E3E2B",
                  opacity: 0.8,
                  marginTop: 0,
                  marginBottom: "40px",
                }}
              >
                Share files with confidence using secure, encrypted storage.
              </p>
              {/* Image Placeholder */}
              <div 
                style={{
                  width: "100%",
                  marginTop: "auto",
                  position: "relative",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(163, 219, 181, 0.5)",
                  borderBottom: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "140px",
                }}
              >
                <p 
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#0E3E2B",
                    opacity: 0.4,
                    textAlign: "center",
                    padding: "0 16px",
                    margin: 0,
                  }}
                >
                  Secure Storage Banner Wireframe
                </p>
              </div>
            </div>
            
          </div>


          {/* ======================= ROW 3 ======================= */}

          {/* L3: Tradon AI Brief (Dark) -> Wide (7 cols) */}
          <div
            className="lg:col-span-7 flex flex-col rounded-[32px] overflow-hidden"
            style={{ 
              backgroundColor: "#0E3E2B", 
              padding: "40px 40px 0 40px",
              boxSizing: "border-box",
            }}
          >
            <h3 
              style={{ 
                fontFamily: "var(--font-sans)",
                fontSize: "26px",
                fontWeight: 500,
                color: "#FFFFFF",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.25,
              }}
            >
              Tradon AI Brief
            </h3>
            <p 
              style={{ 
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#FFFFFF",
                opacity: 0.8,
                marginTop: 0,
                marginBottom: "50px",
              }}
            >
              Communicate with Tiro; Our AI Agent who gives you top analytics on your business in real time.
            </p>
            {/* Image Placeholder */}
            <div 
              style={{
                width: "100%",
                marginTop: "auto",
                position: "relative",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#154f38",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
              }}
            >
              <p 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  opacity: 0.4,
                  textAlign: "center",
                  padding: "0 16px",
                  margin: 0,
                }}
              >
                AI Chat Interface Wireframe
              </p>
            </div>
          </div>

          {/* R4: Mobile Access (Light) -> Narrow (5 cols) */}
          <div
            className="lg:col-span-5 flex flex-col border rounded-[32px] bg-white overflow-hidden"
            style={{ 
              borderColor: "#A3DBB5", 
              padding: "40px 40px 0 40px",
              boxSizing: "border-box",
            }}
          >
            <h3 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "26px",
                fontWeight: 500,
                color: "#0E3E2B",
                marginTop: 0,
                marginBottom: "12px",
                lineHeight: 1.25,
              }}
            >
              Mobile Access
            </h3>
            <p 
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#0E3E2B",
                opacity: 0.8,
                marginTop: 0,
                marginBottom: "50px",
              }}
            >
              Stay connected on the go with a fully optimized mobile web app.
            </p>
            {/* Image Placeholder */}
            <div 
              style={{
                width: "100%",
                marginTop: "auto",
                position: "relative",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(163, 219, 181, 0.5)",
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
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
                Mobile Web Wireframe
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
