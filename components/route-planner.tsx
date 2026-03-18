"use client";

import { useState } from "react";
import { Map, Sparkles, Clock, Truck, ArrowRight } from "lucide-react";
import { OUTBOUND_NODES } from "@/lib/data";

export function RoutePlanner() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimized(true);
    }, 2500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-stone-200 bg-white/50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            AI Route Optimization
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Plan delivery routes with AI suggestions based on real-time traffic
            and delivery windows.
          </p>
        </div>
        <button
          onClick={handleOptimize}
          disabled={isOptimizing || optimized}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-stone-200 disabled:text-stone-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          {isOptimizing
            ? "Analyzing Routes..."
            : optimized
              ? "Routes Optimized"
              : "Generate AI Routes"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!optimized && !isOptimizing && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-4">
              <Map className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-medium text-stone-700 mb-2">
              Ready to Optimize
            </h3>
            <p className="text-stone-500 max-w-md mx-auto">
              Click the button above to let AI analyze {OUTBOUND_NODES.length}{" "}
              pending deliveries and suggest the most efficient routes.
            </p>
          </div>
        )}

        {isOptimizing && (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-16 h-16 relative mb-6">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-stone-700 mb-2">
              AI is analyzing variables...
            </h3>
            <div className="flex flex-col gap-2 text-sm text-stone-500">
              <span className="animate-pulse">
                Checking real-time traffic conditions...
              </span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "0.5s" }}
              >
                Aligning delivery time windows...
              </span>
              <span className="animate-pulse" style={{ animationDelay: "1s" }}>
                Optimizing vehicle load capacity...
              </span>
            </div>
          </div>
        )}

        {optimized && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex gap-4 items-start">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-emerald-800 font-medium mb-1">
                  AI Optimization Complete
                </h4>
                <p className="text-sm text-emerald-600">
                  Reduced total estimated driving time by 45 minutes and
                  consolidated 2 vehicles. High-priority delivery (Tsukiji
                  Export) has been prioritized in Route 1.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Route 1 */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm">
                <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900">
                        Route 1: Airport Express
                      </h3>
                      <p className="text-xs text-stone-500">
                        Vehicle: SG-8832 • Est. Time: 1h 15m
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-medium">
                    High Priority
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  <RouteStop
                    number={1}
                    title="Tsukiji Export"
                    subtitle="Overseas Airfreight"
                    time="14:00"
                    status="critical"
                  />
                  <RouteStop
                    number={2}
                    title="Hong Kong Express"
                    subtitle="Overseas Airfreight"
                    time="15:30"
                  />
                  <RouteStop
                    number={3}
                    title="Sydney Fish Market"
                    subtitle="Overseas Airfreight"
                    time="16:45"
                    isLast
                  />
                </div>
              </div>

              {/* Route 2 */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-sm">
                <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-900">
                        Route 2: City Center Loop
                      </h3>
                      <p className="text-xs text-stone-500">
                        Vehicle: SG-9104 • Est. Time: 2h 30m
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium">
                    Standard
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  <RouteStop
                    number={1}
                    title="Odette"
                    subtitle="Fine Dining"
                    time="15:00"
                  />
                  <RouteStop
                    number={2}
                    title="Marina Bay Sands"
                    subtitle="Local Hotel"
                    time="16:00"
                  />
                  <RouteStop
                    number={3}
                    title="Jumbo Seafood"
                    subtitle="Local Restaurant"
                    time="18:00"
                    isLast
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RouteStop({
  number,
  title,
  subtitle,
  time,
  status = "normal",
  isLast = false,
}: any) {
  return (
    <div className="flex gap-4 relative">
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-[-16px] w-0.5 bg-stone-200"></div>
      )}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 shrink-0 ${
          status === "critical"
            ? "bg-red-600 text-white ring-4 ring-red-100"
            : "bg-stone-100 text-stone-500 border border-stone-300"
        }`}
      >
        {number}
      </div>
      <div className="flex-1 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-medium text-stone-900">{title}</h4>
            <p className="text-xs text-stone-500">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-50 px-2 py-1 rounded-md border border-stone-200">
            <Clock className="w-3 h-3" />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
