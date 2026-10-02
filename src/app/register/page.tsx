"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { Step1BusinessInfo } from "@/components/auth/Step1BusinessInfo";
import { Step2BusinessType } from "@/components/auth/Step2BusinessType";
import { Step3StoreAddress } from "@/components/auth/Step3StoreAddress";
import { Step4SelectPlan } from "@/components/auth/Step4SelectPlan";
import { Step4Finalize } from "@/components/auth/Step4Finalize";
import { Step5Success } from "@/components/auth/Step5Success";
import { RegisterFormData, initialRegisterData } from "@/components/auth/types";

function RegisterContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayStep, setDisplayStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>(initialRegisterData);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-select plan if passed via URL (e.g. from landing page)
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam === "starter" || planParam === "pro" || planParam === "enterprise") {
      setFormData((prev) => ({ ...prev, selectedPlan: planParam }));
    }
  }, [searchParams]);

  const updateFormData = (updates: Partial<RegisterFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const animateToStep = (newStep: number, dir: "forward" | "backward") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);

    // After fade-out, swap the content
    timeoutRef.current = setTimeout(() => {
      setDisplayStep(newStep);
      setStep(newStep);
      // Trigger fade-in
      setTimeout(() => {
        setIsAnimating(false);
      }, 30);
    }, 250);
  };

  const nextStep = () => animateToStep(Math.min(step + 1, 6), "forward");
  const prevStep = () => animateToStep(Math.max(step - 1, 1), "backward");
  const submitForm = () => animateToStep(6, "forward");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const slideOffset = isAnimating
    ? direction === "forward"
      ? "-16px"
      : "16px"
    : "0px";

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

      {/* Right dynamic form area with animation */}
      <div
        style={{
          flexGrow: 1,
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            opacity: isAnimating ? 0 : 1,
            transform: `translateY(${slideOffset})`,
            transition: "opacity 0.25s ease, transform 0.3s ease",
          }}
        >
          {displayStep === 1 && (
            <Step1BusinessInfo
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
            />
          )}
          {displayStep === 2 && (
            <Step2BusinessType
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {displayStep === 3 && (
            <Step3StoreAddress
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {displayStep === 4 && (
            <Step4SelectPlan
              data={formData}
              updateData={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {displayStep === 5 && (
            <Step4Finalize
              data={formData}
              updateData={updateFormData}
              onSubmit={submitForm}
              onPrev={prevStep}
            />
          )}
          {displayStep === 6 && <Step5Success data={formData} />}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }} />}>
      <RegisterContent />
    </Suspense>
  );
}
