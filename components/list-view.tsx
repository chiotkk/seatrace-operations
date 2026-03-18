"use client";

import { useState } from "react";
import { ALL_NODES } from "@/lib/data";
import { TabType } from "./dashboard";
import { Alert, NodeData } from "@/lib/types";
import {
  Ship,
  Factory,
  Truck,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { AlertPanel } from "./alert-panel";

interface ListViewProps {
  tab: TabType;
  alerts: Alert[];
  onDrillDown: (id: string) => void;
  onResolveAlert: (id: string) => void;
}

export function ListView({
  tab,
  alerts,
  onDrillDown,
  onResolveAlert,
}: ListViewProps) {
  const [showWarnings, setShowWarnings] = useState(true);

  const activeAlerts = alerts.filter((a) => a.status === "active");
  const impactedNodeIds = new Set(activeAlerts.flatMap((a) => a.impactedNodes));

  let nodesToShow: NodeData[] = [];

  if (tab === "alerts") {
    nodesToShow = ALL_NODES.filter(
      (n) =>
        impactedNodeIds.has(n.id) || (showWarnings && n.status === "warning"),
    );
  } else {
    nodesToShow = ALL_NODES.filter((n) => n.type === tab);
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "inbound":
        return <Ship className="w-5 h-5" />;
      case "processing":
        return <Factory className="w-5 h-5" />;
      case "outbound":
        return <Truck className="w-5 h-5" />;
      default:
        return <Ship className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (node: NodeData) => {
    const isImpacted = impactedNodeIds.has(node.id);
    if (isImpacted) {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-medium">
          <AlertTriangle className="w-3.5 h-3.5" /> Alert Impacted
        </span>
      );
    }
    switch (node.status) {
      case "warning":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" /> Warning
          </span>
        );
      case "success":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> On Track
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-stone-200 bg-white/50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-stone-900 capitalize">
            {tab === "alerts"
              ? "Nodes Requiring Attention"
              : `${tab} Lifecycle`}
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            {tab === "alerts"
              ? "Nodes impacted by active alerts or warnings."
              : `Manage and track all ${tab} items.`}
          </p>
        </div>
        {tab === "alerts" && (
          <div className="flex items-center gap-3 bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-sm">
            <span className="text-sm text-stone-600 font-medium">
              Include Warnings
            </span>
            <button
              onClick={() => setShowWarnings(!showWarnings)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showWarnings ? "bg-blue-600" : "bg-stone-300"}`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showWarnings ? "translate-x-4" : "translate-x-0"}`}
              />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {tab === "alerts" && activeAlerts.length > 0 && (
          <div className="mb-8 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Active Alerts
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {activeAlerts.map((alert) => (
                <AlertPanel
                  key={alert.id}
                  alert={alert}
                  isActive={true}
                  onClick={() => {}}
                  onResolve={() => onResolveAlert(alert.id)}
                />
              ))}
            </div>
          </div>
        )}

        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">
          {tab === "alerts" ? "Impacted Nodes" : "All Items"}
        </h3>

        <div className="space-y-3">
          {nodesToShow.length === 0 ? (
            <div className="text-center py-12 text-stone-500 border border-dashed border-stone-300 rounded-xl bg-white/50">
              No items found.
            </div>
          ) : (
            nodesToShow.map((node) => (
              <div
                key={node.id}
                onClick={() => onDrillDown(node.id)}
                className="group flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 cursor-pointer transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                      impactedNodeIds.has(node.id)
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-stone-50 border-stone-200 text-stone-500 group-hover:text-stone-700"
                    }`}
                  >
                    {getIcon(node.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-stone-900">
                        {node.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200">
                        {node.id}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 mt-0.5">
                      {node.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="hidden md:flex gap-6 text-sm">
                    {Object.entries(node.details)
                      .slice(0, 2)
                      .map(([k, v]) => (
                        <div key={k} className="flex flex-col items-end">
                          <span className="text-[10px] uppercase tracking-wider text-stone-500">
                            {k}
                          </span>
                          <span className="text-stone-700 font-mono">{v}</span>
                        </div>
                      ))}
                  </div>
                  <div className="w-32 flex justify-end">
                    {getStatusBadge(node)}
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-600 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
