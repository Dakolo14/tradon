"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Star,
  Users,
  Package,
  Layers,
  ClipboardList,
  MapPin,
  LineChart,
  Megaphone,
  Tag,
  BarChart2,
  CreditCard,
  Headphones,
  SunMedium,
  Settings,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  X,
  Check,
  LogOut,
  Building,
  Plus,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAppearance } from "@/context/AppearanceContext";

const SidebarNavContext = React.createContext<{ onClose?: () => void }>({});

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  href?: string;
  badge?: string;
  subItems?: { label: string; href: string; isActive?: boolean }[];
  onNavigate?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, href = "#", badge, subItems, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(isActive || false);
  const { onClose } = React.useContext(SidebarNavContext);
  const { tokens, accentData } = useAppearance();

  const handleNavClick = () => {
    onNavigate?.();
    onClose?.();
  };

  if (subItems && subItems.length > 0) {
    return (
      <div style={{ marginBottom: "2px" }}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderRadius: "12px",
            backgroundColor: isActive || isOpen ? tokens.navActiveBg : "transparent",
            color: isActive || isOpen ? tokens.navActiveText : tokens.textMuted,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className={isActive || isOpen ? "font-medium" : "font-normal hover:bg-black/5"}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {React.cloneElement(icon as React.ReactElement<any>, {
              size: 18,
              strokeWidth: isActive || isOpen ? 2.5 : 2,
              color: isActive || isOpen ? tokens.navActiveText : tokens.textMuted,
            })}
            <span style={{ fontSize: "14px" }}>{label}</span>
          </div>
          <ChevronDown
            size={14}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              color: isActive || isOpen ? tokens.navActiveText : tokens.textMuted
            }}
          />
        </div>
        
        {isOpen && (
          <div style={{ display: "flex", flexDirection: "column", paddingLeft: "42px", marginTop: "4px", gap: "2px" }}>
            {subItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={handleNavClick}
                style={{
                  fontSize: "13px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: item.isActive ? tokens.navActiveText : tokens.textMuted,
                  backgroundColor: item.isActive ? tokens.bgSubtle : "transparent",
                }}
                className={item.isActive ? "font-medium" : "font-normal hover:bg-black/5"}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleNavClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderRadius: "12px",
        backgroundColor: isActive ? tokens.navActiveBg : "transparent",
        color: isActive ? tokens.navActiveText : tokens.textMuted,
        textDecoration: "none",
        transition: "all 0.2s ease",
        marginBottom: "2px",
      }}
      className={isActive ? "font-medium" : "font-normal hover:bg-black/5"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {React.cloneElement(icon as React.ReactElement<any>, {
          size: 18,
          strokeWidth: isActive ? 2.5 : 2,
          color: isActive ? tokens.navActiveText : tokens.textMuted,
        })}
        <span style={{ fontSize: "14px" }}>{label}</span>
      </div>
      {badge && (
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: tokens.accentText,
            backgroundColor: tokens.accentHex,
            padding: "2px 6px",
            borderRadius: "4px",
            letterSpacing: "0.05em",
          }}
        >
          {badge}
        </span>
      )}
    </Link>
  );
};

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  const { tokens } = useAppearance();
  return (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 600,
        color: tokens.textMuted,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        padding: "24px 16px 8px",
      }}
    >
      {title}
    </div>
  );
};

export const DashboardSidebar = ({ onClose }: { onClose?: () => void }) => {
  const { user, logout, updateUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { tokens, config, updateConfig } = useAppearance();
  const isDark = config.theme === "dark";

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] = React.useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = React.useState("");
  const [newWorkspacePlan, setNewWorkspacePlan] = React.useState<"Enterprise" | "Growth" | "Starter">("Growth");

  const [workspaces, setWorkspaces] = React.useState([
    { id: "ws-1", name: "Chi Limited", plan: "Enterprise", planColor: "#10B981", role: "Workspace Owner" },
    { id: "ws-2", name: "Chi Beverages Hub", plan: "Growth", planColor: "#3B82F6", role: "Regional Admin" },
    { id: "ws-3", name: "Chi Distribution West", plan: "Starter", planColor: "#F59E0B", role: "Operations Member" },
  ]);

  const [currentWorkspace, setCurrentWorkspace] = React.useState(user?.businessName || "Chi Limited");

  const workspaceRef = React.useRef<HTMLDivElement>(null);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Sync with user businessName
  React.useEffect(() => {
    if (user?.businessName) {
      setCurrentWorkspace(user.businessName);
    }
  }, [user?.businessName]);

  // Click outside listener to dismiss menus
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workspaceRef.current && !workspaceRef.current.contains(e.target as Node)) {
        setIsWorkspaceMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwitchWorkspace = (name: string) => {
    setCurrentWorkspace(name);
    updateUser?.({ businessName: name });
    setIsWorkspaceMenuOpen(false);
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;
    const colors: Record<string, string> = {
      Enterprise: "#10B981",
      Growth: "#3B82F6",
      Starter: "#F59E0B",
    };
    const newWs = {
      id: `ws-${Date.now()}`,
      name: newWorkspaceName.trim(),
      plan: newWorkspacePlan,
      planColor: colors[newWorkspacePlan] || "#10B981",
      role: "Workspace Owner",
    };
    setWorkspaces((prev) => [...prev, newWs]);
    setCurrentWorkspace(newWs.name);
    updateUser?.({ businessName: newWs.name });
    setNewWorkspaceName("");
    setIsCreateWorkspaceModalOpen(false);
    setIsWorkspaceMenuOpen(false);
  };

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    logout();
    router.push("/login");
  };
  
  return (
    <SidebarNavContext.Provider value={{ onClose }}>
      <div
        style={{
          width: "260px",
          height: "100vh",
          backgroundColor: tokens.bgSidebar,
          borderRight: `1px solid ${tokens.borderSubtle}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          transition: config.enableAnimations ? "background-color 0.2s ease, border-color 0.2s ease" : "none",
        }}
      >
        {/* Header / Logo */}
        <div
          style={{
            height: "76px",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${tokens.borderSubtle}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            {(config.logoStyle === "icon" || config.logoStyle === "combo" || !config.logoStyle) && (
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: tokens.accentHex,
                  borderRadius: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                  color: tokens.accentText,
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                CHI
              </div>
            )}
            {(config.logoStyle === "wordmark" || config.logoStyle === "combo" || !config.logoStyle) && (
              <span style={{ fontSize: "18px", fontWeight: 800, color: tokens.textPrimary, letterSpacing: "-0.02em" }}>
                {user?.businessName || "TRADON"}
              </span>
            )}
          </div>

          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              style={{
                color: tokens.textPrimary,
                backgroundColor: tokens.bgSubtle,
                border: `1px solid ${tokens.borderSubtle}`,
              }}
              className="md:hidden flex items-center justify-center p-2 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

      {/* Navigation Scrollable Area */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "16px 12px 24px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <SectionHeader title="GENERAL" />
        <NavItem icon={<LayoutGrid />} label="Dashboard" isActive={pathname === "/dashboard"} href="/dashboard" />
        <NavItem icon={<Star />} label="Tradon AI" badge="NEW" />

        <SectionHeader title="TOOLS" />
        <NavItem 
          icon={<Users />} 
          label="Distributors" 
          isActive={pathname?.startsWith("/distributors")}
          subItems={[
            { label: "Distributors List", href: "/distributors", isActive: pathname === "/distributors" },
            { label: "Distributors Segment", href: "/distributors/segments", isActive: pathname === "/distributors/segments" },
            { label: "Client Loyalty System", href: "/distributors/loyalty", isActive: pathname === "/distributors/loyalty" },
            { label: "Online Rep", href: "/distributors/reputation", isActive: pathname === "/distributors/reputation" },
          ]}
        />
        <NavItem 
          icon={<Package />} 
          label="Catalog" 
          isActive={pathname?.startsWith("/products") || pathname?.startsWith("/inventory")}
          subItems={[
            { label: "Products (SKUs & Pricing)", href: "/products", isActive: pathname === "/products" },
            { label: "Warehouse Inventory", href: "/inventory", isActive: pathname === "/inventory" },
          ]}
        />
        <NavItem 
          icon={<ClipboardList />} 
          label="Sales" 
          isActive={pathname?.startsWith("/sales")}
          subItems={[
            { label: "Daily Sales Summary", href: "/sales/summary", isActive: pathname === "/sales/summary" },
            { label: "Wholesale Orders", href: "/sales/wholesale", isActive: pathname === "/sales/wholesale" },
            { label: "Modern Trade", href: "/sales/modern-trade", isActive: pathname === "/sales/modern-trade" },
            { label: "Field Rep Sales", href: "/sales/field-reps", isActive: pathname === "/sales/field-reps" },
          ]}
        />
        <NavItem 
          icon={<MapPin />} 
          label="Field Reps" 
          isActive={pathname?.startsWith("/field-reps")}
          subItems={[
            { label: "Reps Directory", href: "/field-reps", isActive: pathname === "/field-reps" },
            { label: "Live GPS Tracking", href: "/field-reps/tracking", isActive: pathname === "/field-reps/tracking" },
            { label: "Journey Plans (PJP)", href: "/field-reps/routes", isActive: pathname === "/field-reps/routes" },
            { label: "Target & Quotas", href: "/field-reps/performance", isActive: pathname === "/field-reps/performance" },
            { label: "Retail Audits & Shelf", href: "/field-reps/audits", isActive: pathname === "/field-reps/audits" },
          ]}
        />
        <NavItem 
          icon={<LineChart />} 
          label="Finance" 
          isActive={pathname?.startsWith("/finance")}
          subItems={[
            { label: "Financial Overview", href: "/finance", isActive: pathname === "/finance" },
            { label: "Invoices & Aging", href: "/finance/invoices", isActive: pathname === "/finance/invoices" },
            { label: "Bank Reconciliation", href: "/finance/reconciliation", isActive: pathname === "/finance/reconciliation" },
            { label: "Financial Reports", href: "/finance/reports", isActive: pathname === "/finance/reports" },
          ]}
        />
        <NavItem 
          icon={<Megaphone />} 
          label="Marketing & Integrations" 
          isActive={pathname?.startsWith("/marketing")}
          subItems={[
            { label: "Blast Campaigns", href: "/marketing/campaigns", isActive: pathname === "/marketing/campaigns" },
            { label: "Automations", href: "/marketing/automations", isActive: pathname?.startsWith("/marketing/automations") },
            { label: "Messages history", href: "/marketing/history", isActive: pathname === "/marketing/history" },
            { label: "Integrations", href: "/marketing", isActive: pathname === "/marketing" },
          ]}
        />
        <NavItem 
          icon={<Tag />} 
          label="Promos" 
          isActive={pathname?.startsWith("/promos")}
          subItems={[
            { label: "Deals", href: "/promos/deals", isActive: pathname?.startsWith("/promos/deals") },
            { label: "Smart Pricing", href: "/promos/smart-pricing", isActive: pathname?.startsWith("/promos/smart-pricing") },
          ]}
        />
        <NavItem 
          icon={<CreditCard />} 
          label="Billing & Pricing" 
          href="/billing"
          isActive={pathname?.startsWith("/billing")}
        />

        <SectionHeader title="ADMINISTRATION" />
        <NavItem 
          icon={<ShieldCheck />} 
          label="Roles & Permissions" 
          isActive={pathname?.startsWith("/settings/team")}
          href="/settings/team"
          badge="OWNER"
        />

        <SectionHeader title="SUPPORT" />
        <NavItem 
          icon={<Headphones />} 
          label="Support" 
          href="/support"
          isActive={pathname?.startsWith("/support")}
        />
        <NavItem 
          icon={<SunMedium />} 
          label="Appearance" 
          href="/appearance"
          isActive={pathname === "/appearance"}
        />
        <NavItem 
          icon={<Settings />} 
          label="Settings" 
          href="/settings"
          isActive={pathname === "/settings" || (pathname?.startsWith("/settings") && pathname !== "/settings/team")}
        />
      </div>

        {/* Keyframe animation for popovers */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes sidebarPopoverIn {
            0% {
              opacity: 0;
              transform: translateY(8px) scale(0.96);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}} />

        {/* Footer Profile Section */}
        <div
          style={{
            padding: "16px",
            borderTop: `1px solid ${tokens.borderSubtle}`,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Workspace Owner Switcher Container */}
          <div ref={workspaceRef} style={{ position: "relative" }}>
            {/* Popover */}
            {isWorkspaceMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: 0,
                  right: 0,
                  backgroundColor: tokens.bgCard,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "18px",
                  padding: "10px",
                  boxShadow: isDark ? "0 16px 40px rgba(0,0,0,0.7)" : "0 12px 30px rgba(0,0,0,0.12)",
                  zIndex: 70,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  animation: "sidebarPopoverIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px 6px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: tokens.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Workspaces
                  </span>
                  <span style={{ fontSize: "10.5px", color: tokens.textSecondary, fontWeight: 600 }}>
                    {workspaces.length} active
                  </span>
                </div>
                
                {/* Workspaces List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "3px", maxHeight: "170px", overflowY: "auto" }}>
                  {workspaces.map((ws) => {
                    const isSelected = currentWorkspace === ws.name;
                    return (
                      <button
                        key={ws.id}
                        type="button"
                        onClick={() => handleSwitchWorkspace(ws.name)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: "12px",
                          border: `1px solid ${isSelected ? tokens.borderSubtle : "transparent"}`,
                          backgroundColor: isSelected ? tokens.bgSubtle : "transparent",
                          color: tokens.textPrimary,
                          fontSize: "12.5px",
                          fontWeight: 600,
                          cursor: "pointer",
                          boxShadow: "none",
                          textAlign: "left",
                          transition: "background-color 0.15s ease",
                        }}
                        className="hover:opacity-90"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "6px",
                              backgroundColor: isSelected ? tokens.accentHex : tokens.bgSubtle,
                              color: isSelected ? tokens.accentText : tokens.textPrimary,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          >
                            {ws.name.charAt(0)}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary }}>
                              {ws.name}
                            </span>
                            <span style={{ fontSize: "10px", color: tokens.textMuted }}>
                              {ws.role}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              padding: "1px 6px",
                              borderRadius: "9999px",
                              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#F3F4F6",
                              color: ws.planColor,
                              letterSpacing: "0.03em",
                            }}
                          >
                            {ws.plan.toUpperCase()}
                          </span>
                          {isSelected && <Check size={14} color={isDark ? "#10B981" : "#0E3E2B"} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div style={{ height: "1px", backgroundColor: tokens.borderSubtle, margin: "4px 0" }} />

                {/* Create New Workspace Action */}
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateWorkspaceModalOpen(true);
                    setIsWorkspaceMenuOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: tokens.textPrimary,
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                  className="hover:opacity-85"
                >
                  <Plus size={14} color={tokens.accentHex} />
                  <span>Create New Workspace</span>
                </button>

                <Link
                  href="/settings"
                  onClick={() => setIsWorkspaceMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 10px",
                    borderRadius: "9999px",
                    color: tokens.textSecondary,
                    fontSize: "12px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  className="hover:opacity-85"
                >
                  <Settings size={13} color={tokens.textSecondary} />
                  <span>Workspace Settings</span>
                </Link>

                <Link
                  href="/settings/team"
                  onClick={() => setIsWorkspaceMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 10px",
                    borderRadius: "9999px",
                    color: tokens.textSecondary,
                    fontSize: "12px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  className="hover:opacity-85"
                >
                  <ShieldCheck size={13} color={tokens.textSecondary} />
                  <span>Roles & Permissions</span>
                </Link>
              </div>
            )}

            {/* Workspace Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen);
                setIsUserMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "8px 12px",
                backgroundColor: tokens.bgSubtle,
                border: `1px solid ${tokens.borderSubtle}`,
                borderRadius: "9999px",
                cursor: "pointer",
                boxShadow: "none",
                transition: "background-color 0.15s ease",
              }}
              className="hover:opacity-85"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: tokens.accentHex,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: tokens.accentText,
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  {currentWorkspace.charAt(0)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "12.5px", fontWeight: 600, color: tokens.textPrimary }}>{currentWorkspace}</span>
                  <span style={{ fontSize: "10px", color: tokens.textMuted }}>Workspace owner</span>
                </div>
              </div>
              {isWorkspaceMenuOpen ? (
                <ChevronUp size={14} color={tokens.textMuted} />
              ) : (
                <ChevronDown size={14} color={tokens.textMuted} />
              )}
            </button>
          </div>

          {/* User Profile Container */}
          <div ref={userMenuRef} style={{ position: "relative" }}>
            {isUserMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  left: 0,
                  right: 0,
                  backgroundColor: tokens.bgCard,
                  border: `1px solid ${tokens.borderSubtle}`,
                  borderRadius: "18px",
                  padding: "10px",
                  boxShadow: isDark ? "0 16px 40px rgba(0,0,0,0.7)" : "0 12px 30px rgba(0,0,0,0.12)",
                  zIndex: 70,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  animation: "sidebarPopoverIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                {/* User Header */}
                <div style={{ padding: "8px 10px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: tokens.textPrimary }}>
                      {user?.userName || "Adebayo Damilare"}
                    </span>
                    <span
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: "9999px",
                        backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#D1FAE5",
                        color: "#10B981",
                        letterSpacing: "0.04em",
                      }}
                    >
                      OWNER
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: tokens.textMuted, marginTop: "2px" }}>
                    {user?.email || "adebayo@chiltd.com"}
                  </div>
                  <div style={{ fontSize: "11px", color: tokens.textSecondary, fontWeight: 500, marginTop: "4px" }}>
                    {user?.workspaceRole || "National Sales Director"}
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: tokens.borderSubtle, margin: "2px 0" }} />

                {/* Navigation shortcuts */}
                <Link
                  href="/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "8px 10px",
                    borderRadius: "9999px",
                    color: tokens.textPrimary,
                    fontSize: "12.5px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  className="hover:opacity-85"
                >
                  <Settings size={14} color={tokens.textSecondary} />
                  <span>Account Settings</span>
                </Link>

                <Link
                  href="/appearance"
                  onClick={() => setIsUserMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "8px 10px",
                    borderRadius: "9999px",
                    color: tokens.textPrimary,
                    fontSize: "12.5px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  className="hover:opacity-85"
                >
                  <SunMedium size={14} color={tokens.textSecondary} />
                  <span>Appearance & Theme</span>
                </Link>

                <Link
                  href="/billing"
                  onClick={() => setIsUserMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "8px 10px",
                    borderRadius: "9999px",
                    color: tokens.textPrimary,
                    fontSize: "12.5px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  className="hover:opacity-85"
                >
                  <CreditCard size={14} color={tokens.textSecondary} />
                  <span>Billing & Plans</span>
                </Link>

                {/* Quick Theme Toggle inside menu */}
                <button
                  type="button"
                  onClick={() => {
                    updateConfig({ theme: isDark ? "light" : "dark" });
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: tokens.textPrimary,
                    fontSize: "12.5px",
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                  className="hover:opacity-85"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    {isDark ? <Sun size={14} color="#F59E0B" /> : <Moon size={14} color="#6366F1" />}
                    <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                  </div>
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: "9999px",
                      backgroundColor: tokens.bgSubtle,
                      color: tokens.textMuted,
                    }}
                  >
                    SWITCH
                  </span>
                </button>

                <div style={{ height: "1px", backgroundColor: tokens.borderSubtle, margin: "2px 0" }} />

                {/* Sign Out Action */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#EF4444",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "none",
                    textAlign: "left",
                  }}
                  className="hover:opacity-85"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* User Profile Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsWorkspaceMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "6px 8px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "9999px",
                cursor: "pointer",
                boxShadow: "none",
                transition: "opacity 0.15s ease",
              }}
              className="hover:opacity-85"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: tokens.accentHex,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: tokens.accentText,
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {user?.userName ? user.userName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase() : "AD"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "12.5px", fontWeight: 600, color: tokens.textPrimary }}>{user?.userName || "Adebayo Damilare"}</span>
                  <span style={{ fontSize: "10px", color: tokens.textMuted }}>{user?.workspaceRole || "National Sales Director"}</span>
                </div>
              </div>
              {isUserMenuOpen ? (
                <ChevronUp size={14} color={tokens.textMuted} />
              ) : (
                <ChevronDown size={14} color={tokens.textMuted} />
              )}
            </button>
          </div>
        </div>

        {/* Modal: Create New Workspace */}
        {isCreateWorkspaceModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: tokens.bgCard,
                borderRadius: "20px",
                border: `1px solid ${tokens.borderSubtle}`,
                width: "100%",
                maxWidth: "420px",
                padding: "28px",
                boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.15)",
                position: "relative",
                animation: "sidebarPopoverIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <button
                type="button"
                onClick={() => setIsCreateWorkspaceModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "22px",
                  right: "22px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: tokens.textMuted,
                }}
                className="hover:opacity-80"
              >
                <X size={18} />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "#D1FAE5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#10B981",
                  }}
                >
                  <Building size={16} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: tokens.textPrimary, margin: 0 }}>
                  Create New Workspace
                </h3>
              </div>
              <p style={{ fontSize: "13px", color: tokens.textSecondary, margin: "0 0 20px" }}>
                Set up an operational workspace for a new brand, territory, or enterprise subsidiary.
              </p>

              <form onSubmit={handleCreateWorkspace} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chi Snacks & Foods Ltd"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      border: `1px solid ${tokens.borderSubtle}`,
                      outline: "none",
                      fontSize: "13px",
                      backgroundColor: tokens.bgSubtle,
                      color: tokens.textPrimary,
                      boxShadow: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: tokens.textPrimary, display: "block", marginBottom: "6px" }}>
                    Plan Tier
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                    {(["Enterprise", "Growth", "Starter"] as const).map((tier) => {
                      const active = newWorkspacePlan === tier;
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setNewWorkspacePlan(tier)}
                          style={{
                            padding: "8px",
                            borderRadius: "9999px",
                            border: `1px solid ${active ? (isDark ? "#10B981" : "#0E3E2B") : tokens.borderSubtle}`,
                            backgroundColor: active ? (isDark ? "#10B981" : "#0E3E2B") : "transparent",
                            color: active ? "#FFFFFF" : tokens.textPrimary,
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "none",
                          }}
                        >
                          {tier}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setIsCreateWorkspaceModalOpen(false)}
                    style={{
                      height: "40px",
                      padding: "0 18px",
                      borderRadius: "9999px",
                      border: `1px solid ${tokens.borderSubtle}`,
                      backgroundColor: "transparent",
                      color: tokens.textPrimary,
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "none",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      height: "40px",
                      padding: "0 22px",
                      borderRadius: "9999px",
                      border: "none",
                      backgroundColor: isDark ? "#10B981" : "#0E3E2B",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "none",
                    }}
                    className="hover:opacity-90"
                  >
                    Create Workspace
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SidebarNavContext.Provider>
  );
};
