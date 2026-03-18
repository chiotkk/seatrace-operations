"use client";

import { useMemo, useState, useEffect } from "react";
import { NodeCard } from "./node-card";
import { Alert, NodeData } from "@/lib/types";
import {
  INBOUND_NODES,
  PROCESSING_NODES,
  OUTBOUND_NODES,
  ALL_NODES,
  EDGES,
} from "@/lib/data";
import { ArrowLeft, RefreshCw, Clock, CheckCircle2, X } from "lucide-react";
import { AlertPanel } from "./alert-panel";
import Xarrow, { Xwrapper } from "react-xarrows";

interface LifecycleViewProps {
  focusNodeId: string;
  onBack: () => void;
  alerts: Alert[];
  onResolveAlert: (id: string) => void;
}

const getConnectedNodes = (startNodeId: string) => {
  const connected = new Set<string>([startNodeId]);

  const traverseForward = (nodeId: string, activeFlows: string[] | null) => {
    EDGES.filter((e) => e.source === nodeId).forEach((e) => {
      const edgeFlows = (e as any).flows || [];
      const intersection =
        activeFlows === null
          ? edgeFlows
          : edgeFlows.filter((f: string) => activeFlows.includes(f));

      if (intersection.length > 0) {
        connected.add(e.target);
        traverseForward(e.target, intersection);
      }
    });
  };

  const traverseBackward = (nodeId: string, activeFlows: string[] | null) => {
    EDGES.filter((e) => e.target === nodeId).forEach((e) => {
      const edgeFlows = (e as any).flows || [];
      const intersection =
        activeFlows === null
          ? edgeFlows
          : edgeFlows.filter((f: string) => activeFlows.includes(f));

      if (intersection.length > 0) {
        connected.add(e.source);
        traverseBackward(e.source, intersection);
      }
    });
  };

  traverseForward(startNodeId, null);
  traverseBackward(startNodeId, null);

  return connected;
};

export function LifecycleView({
  focusNodeId,
  onBack,
  alerts,
  onResolveAlert,
}: LifecycleViewProps) {
  const [manuallyVisible, setManuallyVisible] = useState<Set<string>>(() => {
    return getConnectedNodes(focusNodeId);
  });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [drilledDownNodeId, setDrilledDownNodeId] = useState<string | null>(
    null,
  );

  const visibleNodes = manuallyVisible;

  // Find if there's an active alert for the focused node
  const activeAlert = alerts.find(
    (a) => a.status === "active" && a.impactedNodes.includes(focusNodeId),
  );

  const highlightedNodes = useMemo(() => {
    if (activeAlert) {
      const highlighted = new Set<string>();
      activeAlert.impactedNodes.forEach((id) => highlighted.add(id));
      return highlighted;
    }

    const triggerNode = hoveredNodeId || focusNodeId;
    return getConnectedNodes(triggerNode);
  }, [focusNodeId, hoveredNodeId, activeAlert]);

  const isDimmed = (id: string) => {
    return !highlightedNodes.has(id);
  };

  const isAlertImpacted = (id: string) => {
    return activeAlert?.impactedNodes.includes(id) ?? false;
  };

  const handleExpandUpstream = (nodeId: string) => {
    const newVisible = new Set(manuallyVisible);
    EDGES.filter((e) => e.target === nodeId).forEach((e) =>
      newVisible.add(e.source),
    );
    setManuallyVisible(newVisible);
  };

  const handleExpandDownstream = (nodeId: string) => {
    const newVisible = new Set(manuallyVisible);
    EDGES.filter((e) => e.source === nodeId).forEach((e) =>
      newVisible.add(e.target),
    );
    setManuallyVisible(newVisible);
  };

  const visibleInbound = INBOUND_NODES.filter((n) => visibleNodes.has(n.id));
  const visibleProcessing = PROCESSING_NODES.filter((n) =>
    visibleNodes.has(n.id),
  );
  const visibleOutbound = OUTBOUND_NODES.filter((n) => visibleNodes.has(n.id));

  const focusNode = ALL_NODES.find((n) => n.id === focusNodeId);

  return (
    <div className="h-full flex flex-col relative">
      {/* Grounded Top Header Panel */}
      <div className="flex-none p-6 border-b border-stone-200 bg-white/90 backdrop-blur-md z-30 flex flex-col lg:flex-row gap-8 shadow-sm">
        {/* Left: Back & Focused Node */}
        <div className="flex flex-col gap-4 w-full lg:w-80 shrink-0">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-50 text-stone-700 text-sm font-medium rounded-xl border border-stone-200 transition-all w-fit shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </button>
          {focusNode && (
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                Focused Node
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-stone-900">
                  {focusNode.title}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-stone-500 border border-stone-200">
                  {focusNode.id}
                </span>
              </div>
              <p className="text-sm text-stone-500 mt-1">
                {focusNode.subtitle}
              </p>
            </div>
          )}
        </div>

        {/* Right: Workflow Status */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Workflow Status
            </h3>
            <button
              onClick={() => {
                setManuallyVisible(getConnectedNodes(focusNodeId));
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-stone-50 text-stone-600 text-xs font-medium rounded-lg border border-stone-200 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3 h-3" />
              Reset View
            </button>
          </div>

          <div className="flex-1">
            {activeAlert ? (
              <AlertPanel
                alert={activeAlert}
                isActive={true}
                onClick={() => {}}
                onResolve={() => onResolveAlert(activeAlert.id)}
              />
            ) : focusNode?.status === "warning" ? (
              <div className="h-full p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-amber-800 font-medium mb-1">
                    Warning Detected
                  </h4>
                  <p className="text-sm text-amber-700/80 leading-relaxed">
                    {focusNode.details.eta === "Delayed" &&
                      "Shipment is currently delayed. Awaiting updated ETA from freight forwarder."}
                    {focusNode.details.status === "Maintenance Due" &&
                      "Equipment requires scheduled maintenance. Operating at reduced capacity."}
                    {focusNode.details.edd === "At Risk" &&
                      "Delivery deadline is at risk due to upstream delays. Expedited shipping may be required."}
                    {!["Delayed", "Maintenance Due", "At Risk"].includes(
                      focusNode.details.eta ||
                        focusNode.details.status ||
                        focusNode.details.edd ||
                        "",
                    ) &&
                      "Minor irregularities detected in this node. Monitoring closely."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-emerald-800 font-medium">
                    System Normal
                  </h4>
                  <p className="text-sm text-emerald-700/80 mt-0.5">
                    All operations for this workflow are proceeding on schedule.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flowchart Area */}
      <div className="flex-1 overflow-auto p-12 flex justify-center items-center min-w-max">
        <Xwrapper>
          <div className="grid grid-cols-3 gap-32 relative">
            {/* Column 1: Inbound */}
            <div className="flex flex-col gap-6 relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 font-mono text-sm font-bold">
                  01
                </div>
                <h2 className="text-lg font-medium text-stone-800 tracking-tight">
                  Inbound Transit
                </h2>
              </div>
              {visibleInbound.map((node) => {
                const hiddenDownstreamCount = EDGES.filter(
                  (e) => e.source === node.id && !visibleNodes.has(e.target),
                ).length;
                return (
                  <NodeCard
                    key={node.id}
                    data={node}
                    isDimmed={isDimmed(node.id)}
                    isAlertImpacted={isAlertImpacted(node.id)}
                    isSelected={focusNodeId === node.id}
                    hiddenUpstreamCount={0}
                    hiddenDownstreamCount={hiddenDownstreamCount}
                    onExpandUpstream={() => {}}
                    onExpandDownstream={() => handleExpandDownstream(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={() => setDrilledDownNodeId(node.id)}
                  />
                );
              })}
            </div>

            {/* Column 2: Processing */}
            <div className="flex flex-col gap-6 relative z-10 mt-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 font-mono text-sm font-bold">
                  02
                </div>
                <h2 className="text-lg font-medium text-stone-800 tracking-tight">
                  Shopfloor Processing
                </h2>
              </div>
              {visibleProcessing.map((node) => {
                const hiddenUpstreamCount = EDGES.filter(
                  (e) => e.target === node.id && !visibleNodes.has(e.source),
                ).length;
                const hiddenDownstreamCount = EDGES.filter(
                  (e) => e.source === node.id && !visibleNodes.has(e.target),
                ).length;
                return (
                  <NodeCard
                    key={node.id}
                    data={node}
                    isDimmed={isDimmed(node.id)}
                    isAlertImpacted={isAlertImpacted(node.id)}
                    isSelected={focusNodeId === node.id}
                    hiddenUpstreamCount={hiddenUpstreamCount}
                    hiddenDownstreamCount={hiddenDownstreamCount}
                    onExpandUpstream={() => handleExpandUpstream(node.id)}
                    onExpandDownstream={() => handleExpandDownstream(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={() => setDrilledDownNodeId(node.id)}
                  />
                );
              })}
            </div>

            {/* Column 3: Outbound */}
            <div className="flex flex-col gap-6 relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 font-mono text-sm font-bold">
                  03
                </div>
                <h2 className="text-lg font-medium text-stone-800 tracking-tight">
                  Outbound Delivery
                </h2>
              </div>
              {visibleOutbound.map((node) => {
                const hiddenUpstreamCount = EDGES.filter(
                  (e) => e.target === node.id && !visibleNodes.has(e.source),
                ).length;
                return (
                  <NodeCard
                    key={node.id}
                    data={node}
                    isDimmed={isDimmed(node.id)}
                    isAlertImpacted={isAlertImpacted(node.id)}
                    isSelected={focusNodeId === node.id}
                    hiddenUpstreamCount={hiddenUpstreamCount}
                    hiddenDownstreamCount={0}
                    onExpandUpstream={() => handleExpandUpstream(node.id)}
                    onExpandDownstream={() => {}}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={() => setDrilledDownNodeId(node.id)}
                  />
                );
              })}
            </div>
          </div>
          {EDGES.map((edge) => {
            if (
              visibleNodes.has(edge.source) &&
              visibleNodes.has(edge.target)
            ) {
              const isHighlighted =
                highlightedNodes.has(edge.source) &&
                highlightedNodes.has(edge.target);
              return (
                <Xarrow
                  key={`${edge.source}-${edge.target}`}
                  start={edge.source}
                  end={edge.target}
                  color={isHighlighted ? "#3b82f6" : "#e7e5e4"}
                  strokeWidth={isHighlighted ? 3 : 2}
                  path="smooth"
                  showHead={true}
                  headSize={4}
                  curveness={0.3}
                  dashness={isHighlighted ? { animation: true } : false}
                />
              );
            }
            return null;
          })}
        </Xwrapper>
      </div>

      {/* Drill Down Modal */}
      {drilledDownNodeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
              <h3 className="font-semibold text-stone-900">Node Details</h3>
              <button
                onClick={() => setDrilledDownNodeId(null)}
                className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {(() => {
                const node = ALL_NODES.find((n) => n.id === drilledDownNodeId);
                if (!node) return null;
                return (
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        ID: {node.id}
                      </div>
                      <h2 className="text-2xl font-bold text-stone-900">
                        {node.title}
                      </h2>
                      <p className="text-stone-500 mt-1">{node.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(node.details).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-3 rounded-xl bg-stone-50 border border-stone-200"
                        >
                          <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
                            {key}
                          </div>
                          <div className="font-medium text-stone-900">
                            {value as string}
                          </div>
                        </div>
                      ))}
                    </div>

                    {isAlertImpacted(node.id) && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                        <h4 className="text-sm font-semibold text-red-800 mb-1">
                          Active Alert Impact
                        </h4>
                        <p className="text-sm text-red-600">
                          This node is currently impacted by an active alert.
                          Please check the workflow status panel for more
                          information.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
