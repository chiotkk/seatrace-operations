"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Ship,
  Factory,
  Truck,
  Activity,
  Bell,
  AlertTriangle,
  Map,
  Thermometer,
  TrendingUp,
  BadgeDollarSign,
} from "lucide-react";
import { ListView } from "./list-view";
import { LifecycleView } from "./lifecycle-view";
import { RoutePlanner } from "./route-planner";
import { ColdChainDashboard } from "./cold-chain-dashboard";
import { YieldAnalytics } from "./yield-analytics";
import { SalesCommandCenter } from "./sales-command-center";
import { INITIAL_ALERTS } from "@/lib/data";
import { Alert } from "@/lib/types";

export type TabType =
  | "alerts"
  | "inbound"
  | "processing"
  | "outbound"
  | "routes"
  | "cold-chain"
  | "yield-analytics"
  | "sales";

export function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [activeTab, setActiveTab] = useState<TabType>("alerts");
  const [drilledNodeId, setDrilledNodeId] = useState<string | null>(null);

  const activeAlertsCount = alerts.filter((a) => a.status === "active").length;

  const handleResolveAlert = (id: string) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, status: "resolved" } : a)),
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white/80 backdrop-blur-md z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 flex items-center justify-center">
            <Image
              src="https://drive.google.com/thumbnail?id=1WY9Llqv18fENMbMeNtWm5ynvC4P4Ui8E&sz=w1000"
              alt="Boon Teck Seafood"
              width={160}
              height={64}
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="pl-4 border-l border-stone-200">
            <h1 className="text-lg font-semibold tracking-tight text-stone-800">
              SeaTrace
            </h1>
            <p className="text-xs text-stone-500 font-mono">
              Operations Control // SIN-HQ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>System Normal</span>
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-stone-400" />
            {activeAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-bold flex items-center justify-center text-white border-2 border-white">
                {activeAlertsCount}
              </span>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-medium text-stone-600">
            OP
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-64 border-r border-stone-200 bg-stone-50/50 flex flex-col z-10">
          <div className="p-4 space-y-2">
            <NavItem
              icon={<AlertTriangle className="w-4 h-4" />}
              label="Active Alerts"
              isActive={activeTab === "alerts"}
              onClick={() => {
                setActiveTab("alerts");
                setDrilledNodeId(null);
              }}
              badge={activeAlertsCount}
              badgeColor="bg-red-600"
            />
            <div className="h-4" />
            <div className="px-3 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Lifecycle Stages
            </div>
            <NavItem
              icon={<Ship className="w-4 h-4" />}
              label="Inbound Transit"
              isActive={activeTab === "inbound"}
              onClick={() => {
                setActiveTab("inbound");
                setDrilledNodeId(null);
              }}
            />
            <NavItem
              icon={<Factory className="w-4 h-4" />}
              label="Shopfloor Processing"
              isActive={activeTab === "processing"}
              onClick={() => {
                setActiveTab("processing");
                setDrilledNodeId(null);
              }}
            />
            <NavItem
              icon={<Truck className="w-4 h-4" />}
              label="Outbound Delivery"
              isActive={activeTab === "outbound"}
              onClick={() => {
                setActiveTab("outbound");
                setDrilledNodeId(null);
              }}
            />
            <div className="h-4" />
            <div className="px-3 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Sales & Client Ops
            </div>
            <NavItem
              icon={<BadgeDollarSign className="w-4 h-4" />}
              label="Sales Command Center"
              isActive={activeTab === "sales"}
              onClick={() => {
                setActiveTab("sales");
                setDrilledNodeId(null);
              }}
            />
            <div className="h-4" />
            <div className="px-3 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Analytics & Monitoring
            </div>
            <NavItem
              icon={<Thermometer className="w-4 h-4" />}
              label="Live Cold Chain"
              isActive={activeTab === "cold-chain"}
              onClick={() => {
                setActiveTab("cold-chain");
                setDrilledNodeId(null);
              }}
            />
            <NavItem
              icon={<TrendingUp className="w-4 h-4" />}
              label="Yield Analytics"
              isActive={activeTab === "yield-analytics"}
              onClick={() => {
                setActiveTab("yield-analytics");
                setDrilledNodeId(null);
              }}
            />
            <div className="h-4" />
            <div className="px-3 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Planning & Logistics
            </div>
            <NavItem
              icon={<Map className="w-4 h-4" />}
              label="AI Route Optimization"
              isActive={activeTab === "routes"}
              onClick={() => {
                setActiveTab("routes");
                setDrilledNodeId(null);
              }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden bg-stone-50">
          {drilledNodeId ? (
            <LifecycleView
              key={drilledNodeId}
              focusNodeId={drilledNodeId}
              onBack={() => setDrilledNodeId(null)}
              alerts={alerts}
              onResolveAlert={handleResolveAlert}
            />
          ) : activeTab === "routes" ? (
            <RoutePlanner />
          ) : activeTab === "cold-chain" ? (
            <ColdChainDashboard />
          ) : activeTab === "yield-analytics" ? (
            <YieldAnalytics />
          ) : activeTab === "sales" ? (
            <SalesCommandCenter />
          ) : (
            <ListView
              tab={activeTab}
              alerts={alerts}
              onDrillDown={setDrilledNodeId}
              onResolveAlert={handleResolveAlert}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick, badge, badgeColor }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
        isActive
          ? "bg-white text-blue-700 shadow-sm border border-stone-200"
          : "text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={isActive ? "text-blue-600" : "text-stone-500"}>
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge > 0 && (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
