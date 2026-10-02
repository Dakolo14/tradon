"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  businessName: string;
  userName: string;
  workspaceRole: string;
  email: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // For the sake of the mockup, we will pre-fill with the default dummy data 
  // so the dashboard looks populated even if they didn't go through the login flow.
  // In a real app, this would check localStorage or an API on mount.
  useEffect(() => {
    const storedUser = localStorage.getItem("tradon_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Default mockup user
      setUser({
        businessName: "Chi Limited",
        userName: "Adebayo Damilare",
        workspaceRole: "Growth plan",
        email: "adebayo@chiltd.com",
      });
    }
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem("tradon_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tradon_user");
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem("tradon_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
