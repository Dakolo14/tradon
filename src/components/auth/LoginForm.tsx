import React, { useState } from "react";
import { FormInput } from "@/components/common/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setShowErrors(true);
      return;
    }
    
    // Set mock user data
    login({
      businessName: "New Business",
      userName: "Admin User",
      workspaceRole: "Owner",
      email: email
    });
    
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
        marginInline: "auto",
        paddingBlock: "40px",
        paddingInline: "16px",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#0E3E2B", textDecoration: "none", fontSize: "14px", fontWeight: 500, marginBottom: "24px" }}>
          <ArrowLeft size={16} />
          Back
        </Link>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#0E3E2B",
            marginBottom: "8px",
            lineHeight: 1.2,
          }}
        >
          Sign in to Tradon
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "rgba(14,62,43,0.7)",
            margin: 0,
          }}
        >
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <FormInput
          label="Work Email"
          placeholder="you@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={showErrors && !email ? "Required" : ""}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <FormInput
            label="Password"
            placeholder="Password"
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={showErrors && !password ? "Required" : ""}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="/forgot-password"
              style={{
                fontSize: "14px",
                color: "#0E3E2B",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            height: "56px",
            borderRadius: "9999px",
            backgroundColor: "#0E3E2B",
            color: "#FFFFFF",
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            marginTop: "8px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#154E38")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E3E2B")}
        >
          Sign In
        </button>
      </form>

      <div style={{ marginTop: "32px", textAlign: "left" }}>
        <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.7)" }}>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "#0E3E2B", fontWeight: 600, textDecoration: "none" }}>
            Register Your Business
          </Link>
        </p>
      </div>
    </div>
  );
};
