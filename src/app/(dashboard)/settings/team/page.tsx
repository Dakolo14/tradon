"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  Key, 
  CheckCircle2, 
  XCircle, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Lock, 
  ChevronRight, 
  Building2, 
  HelpCircle,
  Eye,
  Edit,
  Trash2,
  Sliders,
  Check,
  X,
  Crown,
  ArrowRightLeft,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface RoleDefinition {
  id: string;
  name: string;
  level: "Full Access" | "Managerial" | "Operational" | "Restricted";
  badgeBg: string;
  badgeColor: string;
  description: string;
  activeUsersCount: number;
  permissions: {
    distributors: "Manage & Approve" | "View & Edit" | "View Only" | "No Access";
    pricingAndPromos: "Full Control" | "View & Propose" | "View Only" | "No Access";
    salesAndOrders: "Approve & Dispatch" | "Book Orders" | "View Only" | "No Access";
    fieldWorkforce: "Assign & Track" | "Self Only" | "View Only" | "No Access";
    financialSettlements: "Credit Authorizer" | "View Only" | "No Access";
    systemAndTeam: "Full Owner" | "Invite Only" | "No Access";
  };
  details: string[];
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  territory: string;
  status: "Active" | "Invite Pending" | "Suspended";
  lastActive: string;
  twoFactorEnabled: boolean;
}

const roles: RoleDefinition[] = [
  {
    id: "owner",
    name: "Workspace Owner",
    level: "Full Access",
    badgeBg: "#0E3E2B",
    badgeColor: "#A3FF00",
    description: "Highest authority on TRADON. Sole authority over billing, bank account integration, role creations, and master credit limits.",
    activeUsersCount: 1,
    permissions: {
      distributors: "Manage & Approve",
      pricingAndPromos: "Full Control",
      salesAndOrders: "Approve & Dispatch",
      fieldWorkforce: "Assign & Track",
      financialSettlements: "Credit Authorizer",
      systemAndTeam: "Full Owner",
    },
    details: [
      "Can invite, assign, edit, and revoke any team member or managerial role",
      "Authorizes multi-million Naira revolving credit terms for Gold distributors",
      "Full ownership of ERP, banking payouts, and master company secrets",
      "Can transfer workspace ownership or archive business entity",
    ],
  },
  {
    id: "regional_sales_head",
    name: "National / Regional Sales Director",
    level: "Managerial",
    badgeBg: "#EFF6FF",
    badgeColor: "#2563EB",
    description: "Controls wholesale distribution quotas, price adjustments within brand guardrails, and territory allocations.",
    activeUsersCount: 3,
    permissions: {
      distributors: "Manage & Approve",
      pricingAndPromos: "Full Control",
      salesAndOrders: "Approve & Dispatch",
      fieldWorkforce: "Assign & Track",
      financialSettlements: "Credit Authorizer",
      systemAndTeam: "Invite Only",
    },
    details: [
      "Approves wholesale discounts and volume flash sales",
      "Sets monthly sales quotas for field agents and state managers",
      "Can recommend distributor credit limit increases up to ₦10M",
      "Can invite Field Reps and Area Sales Managers (cannot edit Owner settings)",
    ],
  },
  {
    id: "area_sales_manager",
    name: "Area Sales Manager (ASM)",
    level: "Operational",
    badgeBg: "#FFFBEB",
    badgeColor: "#D97706",
    description: "Oversees field representatives, daily route schedules (PJP), retailer disputes, and order validation in assigned states.",
    activeUsersCount: 8,
    permissions: {
      distributors: "View & Edit",
      pricingAndPromos: "View & Propose",
      salesAndOrders: "Approve & Dispatch",
      fieldWorkforce: "Assign & Track",
      financialSettlements: "View Only",
      systemAndTeam: "No Access",
    },
    details: [
      "Configures permanent journey plans (PJP) and geofencing tolerances",
      "Approves field agent expense claims and order overrides",
      "Monitors live GPS tracking and receives instant breach alerts",
      "Cannot access company finance ledger, bank payouts, or system billing",
    ],
  },
  {
    id: "finance_officer",
    name: "Credit & Accounts Controller",
    level: "Operational",
    badgeBg: "#F0FDF4",
    badgeColor: "#16A34A",
    description: "Manages distributor ledger balances, overdue recovery, invoice approvals, and trade rebate payouts.",
    activeUsersCount: 4,
    permissions: {
      distributors: "View & Edit",
      pricingAndPromos: "View Only",
      salesAndOrders: "View Only",
      fieldWorkforce: "View Only",
      financialSettlements: "Credit Authorizer",
      systemAndTeam: "No Access",
    },
    details: [
      "Applies loyalty rebate credit notes to distributor accounts",
      "Places accounts on hold when invoices exceed 28-day overdue terms",
      "Reconciles POS, bank transfers, and cash collected by reps",
      "Cannot edit journey plans, field tracking, or product catalogs",
    ],
  },
  {
    id: "field_rep",
    name: "Field Sales Representative",
    level: "Restricted",
    badgeBg: "#F8F9FA",
    badgeColor: "#64748B",
    description: "Mobile frontline app account. Books orders during beat visits, uploads shelf audit photos, and logs cash.",
    activeUsersCount: 48,
    permissions: {
      distributors: "View Only",
      pricingAndPromos: "View Only",
      salesAndOrders: "Book Orders",
      fieldWorkforce: "Self Only",
      financialSettlements: "No Access",
      systemAndTeam: "No Access",
    },
    details: [
      "Books wholesale orders and logs retail visits with GPS proof",
      "Uploads retail shelf display photos and competitor prices",
      "Views their own target commission and route sequencer",
      "Cannot view other reps' accounts, financial balances, or margin data",
    ],
  },
];

const mockMembers: TeamMember[] = [
  {
    id: "1",
    name: "Adebayo Damilare",
    email: "adebayo@chilimited.com",
    roleId: "owner",
    roleName: "Workspace Owner",
    territory: "HQ / National",
    status: "Active",
    lastActive: "Active Now",
    twoFactorEnabled: true,
  },
  {
    id: "2",
    name: "Ibrahim Kazeem",
    email: "kazeem.i@chilimited.com",
    roleId: "regional_sales_head",
    roleName: "National / Regional Sales Director",
    territory: "Northern Region (Kano / Abuja)",
    status: "Active",
    lastActive: "25 mins ago",
    twoFactorEnabled: true,
  },
  {
    id: "3",
    name: "Folake Adebayo",
    email: "folake.a@chilimited.com",
    roleId: "finance_officer",
    roleName: "Credit & Accounts Controller",
    territory: "HQ Finance",
    status: "Active",
    lastActive: "1 hour ago",
    twoFactorEnabled: true,
  },
  {
    id: "4",
    name: "Chidi Nnamdi",
    email: "chidi.n@chilimited.com",
    roleId: "area_sales_manager",
    roleName: "Area Sales Manager (ASM)",
    territory: "Lagos Mainland & West",
    status: "Active",
    lastActive: "14 mins ago",
    twoFactorEnabled: false,
  },
  {
    id: "5",
    name: "Tunde Bakare",
    email: "tunde.bakare@chilimited.com",
    roleId: "field_rep",
    roleName: "Field Sales Representative",
    territory: "Ikeja Beat 01",
    status: "Active",
    lastActive: "11 mins ago (Field App)",
    twoFactorEnabled: false,
  },
  {
    id: "6",
    name: "Grace Ojo",
    email: "grace.ojo@chilimited.com",
    roleId: "field_rep",
    roleName: "Field Sales Representative",
    territory: "Ibadan South Beat 03",
    status: "Invite Pending",
    lastActive: "Invite sent 2 hrs ago",
    twoFactorEnabled: false,
  },
];

export default function PermissionsAndRolesPage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"members" | "roles" | "matrix">("members");
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [roleList, setRoleList] = useState<RoleDefinition[]>(roles);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<RoleDefinition>(roles[0]);

  // Ownership Succession & Step Down State
  const [isSuccessionModalOpen, setIsSuccessionModalOpen] = useState(false);
  const [selectedSuccessorId, setSelectedSuccessorId] = useState<string>("2"); // Defaults to Ibrahim Kazeem (Regional Sales Director)
  const [successionReason, setSuccessionReason] = useState<string>("Executive Resignation");
  const [formerOwnerRoleChoice, setFormerOwnerRoleChoice] = useState<"director" | "advisor" | "resign">("director");
  const [handoverNotes, setHandoverNotes] = useState<string>("Handing over all ERP, billing credentials, revolving credit authorizer keys, and bank integration secrets.");
  const [isHandoverProcessing, setIsHandoverProcessing] = useState(false);
  const [lastHandoverEvent, setLastHandoverEvent] = useState<{
    formerOwner: string;
    newOwner: string;
    newRole: string;
    date: string;
    reason: string;
  } | null>(null);

  // Actions and Edit Modals
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingRoleScopes, setEditingRoleScopes] = useState<RoleDefinition | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Invite Form State
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState(roles[4].id);
  const [newMemberTerritory, setNewMemberTerritory] = useState("Lagos State");
  const [inviteSuccessMsg, setInviteSuccessMsg] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExecuteSuccession = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHandoverProcessing(true);

    setTimeout(() => {
      const currentOwner = members.find(m => m.roleId === "owner");
      const successor = members.find(m => m.id === selectedSuccessorId);

      if (!currentOwner || !successor) {
        setIsHandoverProcessing(false);
        setIsSuccessionModalOpen(false);
        return;
      }

      // Determine former owner's new position
      let updatedFormerOwner: TeamMember;
      if (formerOwnerRoleChoice === "director") {
        updatedFormerOwner = {
          ...currentOwner,
          roleId: "regional_sales_head",
          roleName: "National / Regional Sales Director",
          territory: successor.territory || "Southern / Regional Hub",
          status: "Active",
          lastActive: "Active Now",
        };
      } else if (formerOwnerRoleChoice === "advisor") {
        updatedFormerOwner = {
          ...currentOwner,
          roleId: "advisor",
          roleName: "Executive Advisor / Board Member",
          territory: "Corporate Advisory",
          status: "Active",
          lastActive: "Active Now",
        };
      } else {
        // Resignation / Relinquish
        updatedFormerOwner = {
          ...currentOwner,
          roleId: "resigned",
          roleName: "Former Owner (Resigned)",
          status: "Suspended",
          lastActive: "Stepped down / Resigned",
        };
      }

      // Updated successor becomes Workspace Owner
      const updatedSuccessor: TeamMember = {
        ...successor,
        roleId: "owner",
        roleName: "Workspace Owner",
        territory: "HQ / National",
        status: "Active",
        lastActive: "Active Now (New Owner)",
        twoFactorEnabled: true,
      };

      // Update members list
      const newMembers = members.map(m => {
        if (m.id === currentOwner.id) return updatedFormerOwner;
        if (m.id === successor.id) return updatedSuccessor;
        return m;
      });

      setMembers(newMembers);

      // Update AuthContext if the logged in user was the former owner
      if (user && (user.userName === currentOwner.name || user.email === currentOwner.email)) {
        updateUser({
          workspaceRole: updatedFormerOwner.roleName,
        });
      }

      setLastHandoverEvent({
        formerOwner: currentOwner.name,
        newOwner: successor.name,
        newRole: updatedFormerOwner.roleName,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        reason: successionReason,
      });

      setIsHandoverProcessing(false);
      setIsSuccessionModalOpen(false);
      showToast(`Ownership successfully transferred to ${successor.name}. ${currentOwner.name} has stepped down as Workspace Owner.`);
    }, 900);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedRole = roleList.find(r => r.id === newMemberRole);
    const newMember: TeamMember = {
      id: String(Date.now()),
      name: newMemberName,
      email: newMemberEmail,
      roleId: newMemberRole,
      roleName: matchedRole?.name || "Field Sales Representative",
      territory: newMemberTerritory,
      status: "Invite Pending",
      lastActive: "Just invited",
      twoFactorEnabled: false,
    };

    setMembers([newMember, ...members]);
    setInviteSuccessMsg(true);
    setTimeout(() => {
      setInviteSuccessMsg(false);
      setIsInviteModalOpen(false);
      setNewMemberName("");
      setNewMemberEmail("");
      showToast(`Invited ${newMember.name} as ${newMember.roleName}`);
    }, 900);
  };

  const handleUpdateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    const matchedRole = roleList.find(r => r.id === editingMember.roleId);
    const updated = {
      ...editingMember,
      roleName: matchedRole?.name || editingMember.roleName
    };
    setMembers(members.map(m => m.id === updated.id ? updated : m));
    showToast(`Updated permissions for ${updated.name}`);
    setEditingMember(null);
  };

  const handleToggleMemberStatus = (id: string) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === "Active" ? "Suspended" : "Active";
        return { ...m, status: nextStatus as any };
      }
      return m;
    }));
    setActiveMenuId(null);
    showToast("Updated team member account status");
  };

  const handleDeleteMember = (id: string) => {
    const target = members.find(m => m.id === id);
    if (target?.roleId === "owner") {
      alert("Cannot delete the Workspace Owner.");
      return;
    }
    setMembers(members.filter(m => m.id !== id));
    setActiveMenuId(null);
    showToast(`Removed user from organization`);
  };

  const handleSaveRoleScopes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoleScopes) return;
    setRoleList(roleList.map(r => r.id === editingRoleScopes.id ? editingRoleScopes : r));
    showToast(`Updated scopes for ${editingRoleScopes.name}`);
    setEditingRoleScopes(null);
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.territory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", position: "relative", paddingBottom: "36px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Team Roles & Permissions</h1>
            <span style={{ backgroundColor: "#A3FF00", color: "#0E3E2B", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px" }}>
              ENTERPRISE RBAC
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "rgba(14,62,43,0.6)", margin: 0 }}>
            The Workspace Owner holds master control over FMCG operations, inviting staff and configuring granular departmental privileges.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setActiveTab("matrix")}
            style={{ 
              height: "40px", 
              padding: "0 18px", 
              backgroundColor: "transparent", 
              border: "1px solid rgba(14,62,43,0.2)", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: "#0E3E2B", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px" 
            }} 
            className="hover:bg-black/5 transition-colors"
          >
            <Sliders size={14} />
            Permission Matrix
          </button>
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            style={{ 
              height: "40px", 
              padding: "0 20px", 
              backgroundColor: "#0E3E2B", 
              border: "none", 
              borderRadius: "9999px", 
              fontSize: "13px", 
              fontWeight: 600, 
              color: "#FFFFFF", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }} 
            className="hover:bg-[#08281B] transition-colors"
          >
            <UserPlus size={16} />
            Invite Team Member
          </button>
        </div>
      </div>

      {/* Workspace Owner Authority Banner */}
      <div 
        style={{ 
          backgroundColor: "#0E3E2B", 
          borderRadius: "16px", 
          padding: "24px 32px", 
          color: "#FFFFFF", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap", 
          gap: "24px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", right: "-30px", top: "-30px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(163,255,0,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(163,255,0,0.15)", color: "#A3FF00", padding: "4px 12px", borderRadius: "9999px", fontSize: "11px", fontWeight: 700, marginBottom: "8px" }}>
            <Key size={12} />
            WORKSPACE OWNER GOVERNANCE
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0, marginBottom: "6px" }}>Full Access Governance & Executive Line of Succession</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: "560px", lineHeight: "1.5" }}>
            The active Workspace Owner maintains master authority over billing, ERP, and credit policies. In the event of resignation or leave, ownership can be formally handed over to the National / Regional Sales Director.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Total Seats</span>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#A3FF00", margin: "2px 0 0" }}>64 Seats</p>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.08)", padding: "12px 18px", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Security Score</span>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", margin: "2px 0 0" }}>100% 2FA</p>
          </div>

          <button
            onClick={() => setIsSuccessionModalOpen(true)}
            style={{
              height: "46px",
              padding: "0 18px",
              backgroundColor: "#A3FF00",
              color: "#0E3E2B",
              border: "none",
              borderRadius: "12px",
              fontSize: "12.5px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(163,255,0,0.3)",
              transition: "all 0.2s ease",
            }}
            className="hover:brightness-95 hover:scale-[1.02]"
            title="Owner resignation or executive succession"
          >
            <Crown size={16} />
            <span>Step Down / Transfer Ownership</span>
          </button>
        </div>
      </div>

      {/* Handover Log Notice (Shown when a transfer has taken place) */}
      {lastHandoverEvent && (
        <div style={{ 
          backgroundColor: "#F0FDF4", 
          border: "1px solid rgba(22,163,74,0.3)", 
          borderRadius: "14px", 
          padding: "16px 20px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          flexWrap: "wrap", 
          gap: "12px",
          boxShadow: "0 2px 8px rgba(22,163,74,0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#16A34A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Crown size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#0E3E2B" }}>
                  Governance Succession Recorded: {lastHandoverEvent.newOwner} is now Workspace Owner
                </span>
                <span style={{ fontSize: "11px", fontWeight: 600, backgroundColor: "#DCFCE7", color: "#166534", padding: "1px 7px", borderRadius: "9999px" }}>
                  Active Governance
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(14,62,43,0.7)", margin: "3px 0 0" }}>
                Former Owner <strong>{lastHandoverEvent.formerOwner}</strong> stepped down ({lastHandoverEvent.reason}) and transitioned to <strong>{lastHandoverEvent.newRole}</strong>.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "11.5px", color: "rgba(14,62,43,0.6)", fontWeight: 500 }}>
              {lastHandoverEvent.date}
            </span>
            <button
              onClick={() => setLastHandoverEvent(null)}
              style={{ background: "none", border: "none", color: "rgba(14,62,43,0.4)", cursor: "pointer", padding: "4px" }}
              className="hover:text-[#0E3E2B]"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid rgba(14,62,43,0.08)", paddingBottom: "12px" }}>
        <button
          onClick={() => setActiveTab("members")}
          style={{
            background: "none",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === "members" ? 700 : 500,
            color: activeTab === "members" ? "#0E3E2B" : "rgba(14,62,43,0.6)",
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
          }}
        >
          Staff & Representatives ({mockMembers.length})
          {activeTab === "members" && (
            <div style={{ position: "absolute", bottom: "-13px", left: 0, right: 0, height: "2px", backgroundColor: "#0E3E2B" }} />
          )}
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          style={{
            background: "none",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === "roles" ? 700 : 500,
            color: activeTab === "roles" ? "#0E3E2B" : "rgba(14,62,43,0.6)",
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
          }}
        >
          Defined Roles & Scopes ({roles.length})
          {activeTab === "roles" && (
            <div style={{ position: "absolute", bottom: "-13px", left: 0, right: 0, height: "2px", backgroundColor: "#0E3E2B" }} />
          )}
        </button>

        <button
          onClick={() => setActiveTab("matrix")}
          style={{
            background: "none",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === "matrix" ? 700 : 500,
            color: activeTab === "matrix" ? "#0E3E2B" : "rgba(14,62,43,0.6)",
            cursor: "pointer",
            padding: "4px 0",
            position: "relative",
          }}
        >
          Permissions Matrix
          {activeTab === "matrix" && (
            <div style={{ position: "absolute", bottom: "-13px", left: 0, right: 0, height: "2px", backgroundColor: "#0E3E2B" }} />
          )}
        </button>
      </div>

      {/* TAB 1: MEMBERS DIRECTORY */}
      {activeTab === "members" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ position: "relative", flexGrow: 1, maxWidth: "380px" }}>
              <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(14,62,43,0.4)" }}>
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search member name, email, role, territory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  paddingLeft: "42px",
                  paddingRight: "16px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(14,62,43,0.15)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "13px",
                  color: "#0E3E2B",
                  outline: "none",
                }}
                className="focus:border-[#0E3E2B]/40 transition-colors"
              />
            </div>
          </div>

          {/* Members Table */}
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "950px", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", whiteSpace: "nowrap" }}>
                    <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Member</th>
                    <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Assigned Role</th>
                    <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Territory Jurisdiction</th>
                    <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Last Session</th>
                    <th style={{ padding: "16px 24px", width: "50px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, idx) => (
                    <tr key={member.id} style={{ borderBottom: idx !== filteredMembers.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }} className="hover:bg-black/5 transition-colors">
                      <td style={{ padding: "16px 24px", minWidth: "220px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: member.roleId === "owner" ? "#0E3E2B" : "rgba(14,62,43,0.08)", color: member.roleId === "owner" ? "#A3FF00" : "#0E3E2B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700 }}>
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B", whiteSpace: "nowrap" }}>{member.name}</div>
                            <div style={{ fontSize: "12px", color: "rgba(14,62,43,0.5)", whiteSpace: "nowrap" }}>{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ 
                            fontSize: "12px", 
                            fontWeight: 600, 
                            backgroundColor: member.roleId === "owner" ? "#0E3E2B" : member.roleId === "regional_sales_head" ? "#EFF6FF" : "#F8FAF8", 
                            color: member.roleId === "owner" ? "#A3FF00" : member.roleId === "regional_sales_head" ? "#2563EB" : "rgba(14,62,43,0.8)", 
                            padding: "4px 10px", 
                            borderRadius: "6px",
                            border: member.roleId === "owner" ? "none" : "1px solid rgba(14,62,43,0.08)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px"
                          }}>
                            {member.roleId === "owner" && <Crown size={12} />}
                            {member.roleName}
                          </span>
                          {member.roleId === "regional_sales_head" && (
                            <span 
                              title="Primary designated successor if the Workspace Owner resigns or steps down"
                              style={{ 
                                fontSize: "10px", 
                                fontWeight: 700, 
                                backgroundColor: "#FEF3C7", 
                                color: "#92400E", 
                                padding: "2px 7px", 
                                borderRadius: "9999px",
                                border: "1px solid rgba(245,158,11,0.3)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "3px"
                              }}
                            >
                              <Sparkles size={10} />
                              1st Successor
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "13px", color: "#0E3E2B", fontWeight: 500 }}>
                        {member.territory}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <span style={{ 
                          display: "inline-flex", 
                          alignItems: "center", 
                          gap: "4px", 
                          backgroundColor: member.status === "Active" ? "#F0FDF4" : "#FFFBEB", 
                          color: member.status === "Active" ? "#16A34A" : "#D97706", 
                          fontSize: "11px", 
                          fontWeight: 600, 
                          padding: "3px 8px", 
                          borderRadius: "9999px" 
                        }}>
                          {member.status === "Active" ? <CheckCircle2 size={12} /> : <HelpCircle size={12} />}
                          {member.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "12px", color: "rgba(14,62,43,0.6)" }}>
                        {member.lastActive}
                      </td>
                      <td style={{ padding: "16px 24px", textAlign: "right", position: "relative" }}>
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === member.id ? null : member.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.4)" }} 
                          className="hover:text-[#0E3E2B]"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {/* Member Action Dropdown */}
                        {activeMenuId === member.id && (
                          <div 
                            style={{ 
                              position: "absolute", 
                              right: "24px", 
                              top: "45px", 
                              zIndex: 50, 
                              backgroundColor: "#FFFFFF", 
                              borderRadius: "12px", 
                              boxShadow: "0 10px 25px rgba(0,0,0,0.15)", 
                              border: "1px solid rgba(14,62,43,0.1)", 
                              minWidth: "210px", 
                              padding: "6px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                              textAlign: "left"
                            }}
                          >
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                setEditingMember(member);
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#0E3E2B",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                width: "100%",
                                textAlign: "left"
                              }}
                              className="hover:bg-black/5"
                            >
                              <Edit size={13} />
                              Edit Role & Scopes
                            </button>

                            {/* Owner Step Down Action */}
                            {member.roleId === "owner" && (
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  setIsSuccessionModalOpen(true);
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "8px 12px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: "#0E3E2B",
                                  backgroundColor: "rgba(163,255,0,0.15)",
                                  border: "none",
                                  cursor: "pointer",
                                  width: "100%",
                                  textAlign: "left",
                                  marginTop: "2px"
                                }}
                                className="hover:bg-[#A3FF00]/30 transition-colors"
                              >
                                <Crown size={13} style={{ color: "#0E3E2B" }} />
                                <span>Step Down as Owner</span>
                              </button>
                            )}

                            {/* Regional Sales Director Succession Promotion Action */}
                            {member.roleId === "regional_sales_head" && (
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  setSelectedSuccessorId(member.id);
                                  setIsSuccessionModalOpen(true);
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "8px 12px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: "#2563EB",
                                  backgroundColor: "#EFF6FF",
                                  border: "none",
                                  cursor: "pointer",
                                  width: "100%",
                                  textAlign: "left",
                                  marginTop: "2px"
                                }}
                                className="hover:bg-blue-100 transition-colors"
                              >
                                <ArrowRightLeft size={13} />
                                <span>Promote to Owner (Handover)</span>
                              </button>
                            )}

                            {member.roleId !== "owner" && (
                              <>
                                <button
                                  onClick={() => handleToggleMemberStatus(member.id)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#D97706",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    width: "100%",
                                    textAlign: "left"
                                  }}
                                  className="hover:bg-black/5"
                                >
                                  <Lock size={13} />
                                  {member.status === "Active" ? "Suspend Account" : "Activate Account"}
                                </button>

                                <button
                                  onClick={() => handleDeleteMember(member.id)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#EF4444",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    width: "100%",
                                    textAlign: "left"
                                  }}
                                  className="hover:bg-red-50"
                                >
                                  <Trash2 size={13} />
                                  Remove User
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: DETAILED ROLES BREAKDOWN */}
      {activeTab === "roles" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
          {roleList.map((role) => (
            <div
              key={role.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid rgba(14,62,43,0.08)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: role.badgeBg, color: role.badgeColor, padding: "3px 8px", borderRadius: "9999px" }}>
                      {role.level}
                    </span>
                    {role.id === "regional_sales_head" && (
                      <span style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontSize: "10.5px", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px", border: "1px solid rgba(245,158,11,0.3)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Sparkles size={11} />
                        1st In Line of Succession
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E3E2B", margin: "8px 0 2px" }}>{role.name}</h3>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(14,62,43,0.5)" }}>
                  {role.activeUsersCount} active users
                </span>
              </div>

              <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.7)", margin: 0, lineHeight: "1.5" }}>
                {role.description}
              </p>

              <div style={{ borderTop: "1px solid rgba(14,62,43,0.06)", paddingTop: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(14,62,43,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Detailed Privileges & Authority
                </span>
                <ul style={{ paddingLeft: "16px", margin: "8px 0 0", fontSize: "12px", color: "#0E3E2B", lineHeight: "1.8" }}>
                  {role.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(14,62,43,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>System Role ID: <code>{role.id}</code></span>
                {role.id === "owner" ? (
                  <button 
                    onClick={() => setIsSuccessionModalOpen(true)}
                    style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "12px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px" }} 
                    className="hover:underline"
                  >
                    <Crown size={13} />
                    <span>Succession Protocol</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setEditingRoleScopes(role)}
                    style={{ background: "none", border: "none", color: "#0E3E2B", fontSize: "12px", fontWeight: 600, cursor: "pointer" }} 
                    className="hover:underline"
                  >
                    Edit Scopes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PERMISSIONS MATRIX */}
      {activeTab === "matrix" && (
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid rgba(14,62,43,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(14,62,43,0.08)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>RBAC Access Control Matrix</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.5)", margin: "4px 0 0" }}>
              Exact module breakdown across functional responsibilities in TRADON.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "1050px", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(14,62,43,0.02)", whiteSpace: "nowrap" }}>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#0E3E2B" }}>Role Name</th>
                  <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Distributors</th>
                  <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Pricing & Deals</th>
                  <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Sales & Orders</th>
                  <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Field Workforce</th>
                  <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Financial Settlement</th>
                  <th style={{ padding: "16px 20px", fontSize: "11px", fontWeight: 600, color: "rgba(14,62,43,0.5)", textTransform: "uppercase" }}>Team & Owner</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, idx) => (
                  <tr key={role.id} style={{ borderBottom: idx !== roles.length - 1 ? "1px solid rgba(14,62,43,0.04)" : "none" }}>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0E3E2B" }}>{role.name}</div>
                      <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.5)" }}>{role.level}</div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 600, color: role.permissions.distributors.includes("Manage") ? "#0E3E2B" : "rgba(14,62,43,0.6)" }}>
                      {role.permissions.distributors}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 600, color: role.permissions.pricingAndPromos.includes("Full") ? "#0E3E2B" : "rgba(14,62,43,0.6)" }}>
                      {role.permissions.pricingAndPromos}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 600, color: role.permissions.salesAndOrders.includes("Approve") ? "#0E3E2B" : "rgba(14,62,43,0.6)" }}>
                      {role.permissions.salesAndOrders}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 600, color: role.permissions.fieldWorkforce.includes("Assign") ? "#0E3E2B" : "rgba(14,62,43,0.6)" }}>
                      {role.permissions.fieldWorkforce}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 600, color: role.permissions.financialSettlements.includes("Authorizer") ? "#16A34A" : "rgba(14,62,43,0.6)" }}>
                      {role.permissions.financialSettlements}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "12px", fontWeight: 600, color: role.permissions.systemAndTeam === "Full Owner" ? "#0E3E2B" : "rgba(14,62,43,0.4)" }}>
                      {role.permissions.systemAndTeam}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INVITE MEMBER MODAL */}
      {isInviteModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.4)" }}
              className="hover:text-[#0E3E2B]"
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#F0F5ED", display: "flex", alignItems: "center", justifyContent: "center", color: "#0E3E2B", marginBottom: "12px" }}>
                <UserPlus size={20} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>Create User Account / Invite Staff</h3>
              <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: "4px 0 0" }}>
                As Workspace Owner, you dictate which role, territory, and privileges this employee will receive.
              </p>
            </div>

            {inviteSuccessMsg ? (
              <div style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "20px", textAlign: "center", color: "#16A34A" }}>
                <CheckCircle2 size={32} style={{ margin: "0 auto 8px" }} />
                <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Invitation Dispatched Successfully</h4>
                <p style={{ fontSize: "13px", margin: "4px 0 0", color: "#15803D" }}>An onboarding link and credentials setup email have been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babatunde Lawal"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "8px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", color: "#0E3E2B" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>Company Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="babatunde@chilimited.com"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "8px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", color: "#0E3E2B" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>Select Role & Authority Level</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "8px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", color: "#0E3E2B", backgroundColor: "#FFFFFF" }}
                  >
                    {roles.filter(r => r.id !== "owner").map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#0E3E2B", display: "block", marginBottom: "6px" }}>Assigned Territory</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos Island / Idumota Beat"
                    value={newMemberTerritory}
                    onChange={(e) => setNewMemberTerritory(e.target.value)}
                    style={{ width: "100%", height: "42px", padding: "0 16px", borderRadius: "8px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", color: "#0E3E2B" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    style={{ height: "40px", padding: "0 20px", backgroundColor: "transparent", border: "1px solid rgba(14,62,43,0.2)", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ height: "40px", padding: "0 24px", backgroundColor: "#0E3E2B", border: "none", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                    className="hover:bg-[#08281B]"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* MODAL 2: EDIT MEMBER ROLE & SCOPES */}
      {editingMember && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "500px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setEditingMember(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>Edit User Role & Permissions</h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Reassign role authority level or geographical territory for <strong>{editingMember.name}</strong>.
            </p>

            <form onSubmit={handleUpdateMember} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Assigned System Role</label>
                <select
                  value={editingMember.roleId}
                  onChange={(e) => setEditingMember({ ...editingMember, roleId: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  {roleList.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.level})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Assigned Beat / Territory</label>
                <input
                  type="text"
                  required
                  value={editingMember.territory}
                  onChange={(e) => setEditingMember({ ...editingMember, territory: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Save Role Scopes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT ROLE SCOPES */}
      {editingRoleScopes && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", width: "100%", maxWidth: "520px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }}>
            <button 
              onClick={() => setEditingRoleScopes(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.5)" }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0, marginBottom: "6px" }}>
              Configure Scopes: {editingRoleScopes.name}
            </h3>
            <p style={{ fontSize: "13px", color: "rgba(14,62,43,0.6)", margin: 0, marginBottom: "20px" }}>
              Adjust authority level and functional module access for this system role.
            </p>

            <form onSubmit={handleSaveRoleScopes} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Role Display Name</label>
                <input
                  type="text"
                  required
                  value={editingRoleScopes.name}
                  onChange={(e) => setEditingRoleScopes({ ...editingRoleScopes, name: e.target.value })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Authority Tier</label>
                <select
                  value={editingRoleScopes.level}
                  onChange={(e) => setEditingRoleScopes({ ...editingRoleScopes, level: e.target.value as any })}
                  style={{ width: "100%", height: "42px", padding: "0 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                >
                  <option value="Full Access">Full Access (Root Executive)</option>
                  <option value="Managerial">Managerial (Department Lead / ASM)</option>
                  <option value="Operational">Operational (Officer / Accountant)</option>
                  <option value="Restricted">Restricted (Field Staff / Rep)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "6px" }}>Role Summary</label>
                <textarea
                  rows={2}
                  value={editingRoleScopes.description}
                  onChange={(e) => setEditingRoleScopes({ ...editingRoleScopes, description: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(14,62,43,0.15)", outline: "none", fontSize: "13px", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setEditingRoleScopes(null)}
                  style={{ height: "42px", padding: "0 20px", borderRadius: "9999px", border: "1px solid rgba(14,62,43,0.2)", backgroundColor: "transparent", fontSize: "13px", fontWeight: 600, color: "#0E3E2B", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: "42px", padding: "0 24px", borderRadius: "9999px", border: "none", backgroundColor: "#0E3E2B", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", cursor: "pointer" }}
                  className="hover:bg-[#08281B]"
                >
                  Save Scopes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: OWNER SUCCESSION & STEP DOWN PROTOCOL */}
      {isSuccessionModalOpen && (() => {
        const currentOwner = members.find(m => m.roleId === "owner") || members[0];
        const eligibleSuccessors = members.filter(m => m.id !== currentOwner.id);
        const activeSuccessor = members.find(m => m.id === selectedSuccessorId) || eligibleSuccessors[0];

        return (
          <div 
            style={{ 
              position: "fixed", 
              inset: 0, 
              zIndex: 100, 
              backgroundColor: "rgba(14, 62, 43, 0.55)", 
              backdropFilter: "blur(4px)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              padding: "16px",
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif"
            }}
          >
            <div 
              style={{ 
                backgroundColor: "#FFFFFF", 
                borderRadius: "20px", 
                width: "100%", 
                maxWidth: "600px", 
                maxHeight: "92vh",
                overflowY: "auto",
                padding: "28px 32px", 
                boxShadow: "0 25px 50px -12px rgba(14,62,43,0.35)", 
                position: "relative",
                border: "1px solid rgba(14,62,43,0.12)"
              }}
            >
              <button 
                onClick={() => setIsSuccessionModalOpen(false)}
                disabled={isHandoverProcessing}
                style={{ position: "absolute", right: "24px", top: "24px", background: "none", border: "none", cursor: "pointer", color: "rgba(14,62,43,0.4)" }}
                className="hover:text-[#0E3E2B]"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#0E3E2B", color: "#A3FF00", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Crown size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0E3E2B", margin: 0 }}>
                    Executive Succession Protocol
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "rgba(14,62,43,0.6)", margin: "2px 0 0" }}>
                    Facilitate executive handover when the Workspace Owner resigns or steps down.
                  </p>
                </div>
              </div>

              {/* Notice Banner */}
              <div style={{ 
                backgroundColor: "#FFFBEB", 
                border: "1px solid rgba(245,158,11,0.3)", 
                borderRadius: "12px", 
                padding: "12px 16px", 
                marginBottom: "20px",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start"
              }}>
                <AlertTriangle size={17} color="#D97706" style={{ flexShrink: 0, marginTop: "2px" }} />
                <p style={{ fontSize: "12px", color: "#92400E", margin: 0, lineHeight: "1.5" }}>
                  By default, corporate policy designates the <strong>National / Regional Sales Director</strong> as the first successor. Upon stepping down, root ERP permissions, master credit limit authority, and banking controls transfer immediately.
                </p>
              </div>

              <form onSubmit={handleExecuteSuccession} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                
                {/* Stepping Down Owner Profile */}
                <div style={{ padding: "12px 16px", backgroundColor: "#F8FAF8", borderRadius: "12px", border: "1px solid rgba(14,62,43,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "10.5px", fontWeight: 700, color: "rgba(14,62,43,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Current Stepping-Down Owner
                    </span>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E3E2B", margin: "2px 0 0" }}>
                      {currentOwner.name}
                    </p>
                    <p style={{ fontSize: "11.5px", color: "rgba(14,62,43,0.6)", margin: 0 }}>
                      {currentOwner.email} · {currentOwner.territory}
                    </p>
                  </div>
                  <span style={{ backgroundColor: "#0E3E2B", color: "#A3FF00", fontSize: "10.5px", fontWeight: 700, padding: "3px 8px", borderRadius: "9999px" }}>
                    Active Owner
                  </span>
                </div>

                {/* Successor Selection */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#0E3E2B" }}>
                      Appoint New Workspace Owner (Successor)
                    </label>
                    <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#2563EB", backgroundColor: "#EFF6FF", padding: "2px 8px", borderRadius: "9999px" }}>
                      Policy Line 1: Regional Sales Director
                    </span>
                  </div>

                  <select
                    value={selectedSuccessorId}
                    onChange={(e) => setSelectedSuccessorId(e.target.value)}
                    style={{ 
                      width: "100%", 
                      height: "44px", 
                      padding: "0 14px", 
                      borderRadius: "10px", 
                      border: "1px solid rgba(14,62,43,0.2)", 
                      outline: "none", 
                      fontSize: "13px", 
                      fontWeight: 600,
                      color: "#0E3E2B", 
                      backgroundColor: "#FFFFFF" 
                    }}
                  >
                    {eligibleSuccessors.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} — {member.roleName} ({member.territory})
                        {member.roleId === "regional_sales_head" ? " ★ [RECOMMENDED SUCCESSOR]" : ""}
                      </option>
                    ))}
                  </select>

                  {activeSuccessor && (
                    <div style={{ marginTop: "6px", fontSize: "11.5px", color: "rgba(14,62,43,0.65)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <CheckCircle2 size={13} color="#16A34A" />
                      <span>
                        Promoting <strong>{activeSuccessor.name}</strong> will grant them highest authority over TRADON operations.
                      </span>
                    </div>
                  )}
                </div>

                {/* Reason for Handover */}
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0E3E2B", marginBottom: "6px" }}>
                    Executive Event / Reason for Stepping Down
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {[
                      { id: "Executive Resignation", label: "Executive Resignation", desc: "Owner leaving company" },
                      { id: "Board Restructuring", label: "Corporate Restructuring", desc: "Planned rotation" },
                      { id: "Leave of Absence", label: "Temporary Proxy", desc: "Operational leave" },
                      { id: "Retirement", label: "Executive Retirement", desc: "Permanent succession" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSuccessionReason(item.id)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: successionReason === item.id ? "2px solid #0E3E2B" : "1px solid rgba(14,62,43,0.12)",
                          backgroundColor: successionReason === item.id ? "rgba(14,62,43,0.04)" : "#FFFFFF",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#0E3E2B" }}>{item.label}</div>
                        <div style={{ fontSize: "10.5px", color: "rgba(14,62,43,0.55)" }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Former Owner's Next Position */}
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#0E3E2B", marginBottom: "6px" }}>
                    {currentOwner.name}&apos;s New Status in Workspace
                  </label>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      padding: "10px 14px", 
                      borderRadius: "10px", 
                      border: formerOwnerRoleChoice === "director" ? "1.5px solid #0E3E2B" : "1px solid rgba(14,62,43,0.1)", 
                      backgroundColor: formerOwnerRoleChoice === "director" ? "rgba(14,62,43,0.03)" : "#FFFFFF",
                      cursor: "pointer" 
                    }}>
                      <input 
                        type="radio" 
                        name="formerOwnerRole" 
                        checked={formerOwnerRoleChoice === "director"} 
                        onChange={() => setFormerOwnerRoleChoice("director")} 
                      />
                      <div>
                        <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#0E3E2B" }}>
                          Step down to National / Regional Sales Director
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>
                          Swaps roles with the promoted director. Retains operational leadership over regional quotas.
                        </div>
                      </div>
                    </label>

                    <label style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      padding: "10px 14px", 
                      borderRadius: "10px", 
                      border: formerOwnerRoleChoice === "advisor" ? "1.5px solid #0E3E2B" : "1px solid rgba(14,62,43,0.1)", 
                      backgroundColor: formerOwnerRoleChoice === "advisor" ? "rgba(14,62,43,0.03)" : "#FFFFFF",
                      cursor: "pointer" 
                    }}>
                      <input 
                        type="radio" 
                        name="formerOwnerRole" 
                        checked={formerOwnerRoleChoice === "advisor"} 
                        onChange={() => setFormerOwnerRoleChoice("advisor")} 
                      />
                      <div>
                        <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#0E3E2B" }}>
                          Transition to Executive Advisor / Board Member
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(14,62,43,0.6)" }}>
                          Non-executive oversight seat with read access to reports and financial audits.
                        </div>
                      </div>
                    </label>

                    <label style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      padding: "10px 14px", 
                      borderRadius: "10px", 
                      border: formerOwnerRoleChoice === "resign" ? "1.5px solid #DC2626" : "1px solid rgba(14,62,43,0.1)", 
                      backgroundColor: formerOwnerRoleChoice === "resign" ? "#FEF2F2" : "#FFFFFF",
                      cursor: "pointer" 
                    }}>
                      <input 
                        type="radio" 
                        name="formerOwnerRole" 
                        checked={formerOwnerRoleChoice === "resign"} 
                        onChange={() => setFormerOwnerRoleChoice("resign")} 
                      />
                      <div>
                        <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#DC2626" }}>
                          Full Resignation & Deactivation
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(220,38,38,0.7)" }}>
                          Relinquish seat immediately. Access credentials will be archived.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Handover Documentation Note */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#0E3E2B", marginBottom: "4px" }}>
                    Handover Log Notes & Directives
                  </label>
                  <textarea
                    rows={2}
                    value={handoverNotes}
                    onChange={(e) => setHandoverNotes(e.target.value)}
                    placeholder="Enter governance notes, handoff details, or board resolution references..."
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(14,62,43,0.15)",
                      outline: "none",
                      fontSize: "12.5px",
                      color: "#0E3E2B",
                      resize: "none"
                    }}
                  />
                </div>

                {/* Modal Buttons */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px", borderTop: "1px solid rgba(14,62,43,0.08)", paddingTop: "16px" }}>
                  <button
                    type="button"
                    disabled={isHandoverProcessing}
                    onClick={() => setIsSuccessionModalOpen(false)}
                    style={{ 
                      height: "44px", 
                      padding: "0 22px", 
                      borderRadius: "9999px", 
                      border: "1px solid rgba(14,62,43,0.2)", 
                      backgroundColor: "transparent", 
                      fontSize: "13px", 
                      fontWeight: 600, 
                      color: "#0E3E2B", 
                      cursor: "pointer" 
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isHandoverProcessing}
                    style={{ 
                      height: "44px", 
                      padding: "0 26px", 
                      borderRadius: "9999px", 
                      border: "none", 
                      backgroundColor: "#0E3E2B", 
                      fontSize: "13px", 
                      fontWeight: 700, 
                      color: "#FFFFFF", 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(14,62,43,0.25)"
                    }}
                    className="hover:bg-[#08281B]"
                  >
                    {isHandoverProcessing ? (
                      <>
                        <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid #FFFFFF", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                        <span>Transferring Ownership...</span>
                      </>
                    ) : (
                      <>
                        <Crown size={15} style={{ color: "#A3FF00" }} />
                        <span>Execute Handover & Step Down</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        );
      })()}

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 1000,
          backgroundColor: "#0E3E2B",
          color: "#FFFFFF",
          padding: "12px 20px",
          borderRadius: "9999px",
          boxShadow: "0 10px 25px rgba(14,62,43,0.3)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "13px",
          fontWeight: 600,
        }}>
          <CheckCircle2 size={16} color="#A3FF00" />
          {toastMessage}
        </div>
      )}

    </div>
  );
}
