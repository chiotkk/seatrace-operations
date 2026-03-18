"use client";

import {
  Ship,
  Factory,
  Truck,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { NodeData } from "@/lib/types";
import { useXarrow } from "react-xarrows";

interface NodeCardProps {
  data: NodeData;
  isDimmed: boolean;
  isAlertImpacted: boolean;
  isSelected: boolean;
  hiddenUpstreamCount: number;
  hiddenDownstreamCount: number;
  onExpandUpstream: () => void;
  onExpandDownstream: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function NodeCard({
  data,
  isDimmed,
  isAlertImpacted,
  isSelected,
  hiddenUpstreamCount,
  hiddenDownstreamCount,
  onExpandUpstream,
  onExpandDownstream,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: NodeCardProps) {
  const updateXarrow = useXarrow();

  const getIcon = () => {
    switch (data.type) {
      case "inbound":
        return <Ship className="w-5 h-5" />;
      case "processing":
        return <Factory className="w-5 h-5" />;
      case "outbound":
        return <Truck className="w-5 h-5" />;
    }
  };

  const getStatusColor = () => {
    if (isAlertImpacted) return "text-red-600 bg-red-50 border-red-200";
    switch (data.status) {
      case "warning":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "success":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default:
        return "text-stone-500 bg-stone-100 border-stone-200";
    }
  };

  const getStatusIcon = () => {
    if (isAlertImpacted)
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    switch (data.status) {
      case "warning":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      id={data.id}
      layout
      onLayoutAnimationStart={() => {
        // Update arrows during animation
        const interval = setInterval(updateXarrow, 16);
        setTimeout(() => clearInterval(interval), 400); // Stop after animation duration
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative w-80 rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
        isDimmed
          ? "opacity-40 grayscale border-stone-200 bg-stone-50"
          : isAlertImpacted
            ? "border-red-400 bg-white shadow-[0_0_20px_-5px_rgba(220,38,38,0.2)] scale-[1.02] z-20"
            : isSelected
              ? "border-stone-400 bg-white shadow-xl scale-[1.02] z-20"
              : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 shadow-sm z-10"
      }`}
    >
      {/* Connection Points & Expand Buttons */}
      {data.type !== "inbound" &&
        (hiddenUpstreamCount > 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpandUpstream();
            }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-stone-300 text-stone-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full hover:bg-stone-100 hover:text-stone-900 hover:scale-110 transition-all z-30 shadow-sm flex items-center gap-0.5"
          >
            <ChevronLeft className="w-3 h-3 -ml-1" />
            {hiddenUpstreamCount}
          </button>
        ) : (
          <div
            className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white ${isDimmed ? "bg-stone-300" : isAlertImpacted ? "bg-red-500" : "bg-stone-400"}`}
          />
        ))}

      {data.type !== "outbound" &&
        (hiddenDownstreamCount > 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpandDownstream();
            }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-stone-300 text-stone-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full hover:bg-stone-100 hover:text-stone-900 hover:scale-110 transition-all z-30 shadow-sm flex items-center gap-0.5"
          >
            {hiddenDownstreamCount}
            <ChevronRight className="w-3 h-3 -mr-1" />
          </button>
        ) : (
          <div
            className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white ${isDimmed ? "bg-stone-300" : isAlertImpacted ? "bg-red-500" : "bg-stone-400"}`}
          />
        ))}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStatusColor()}`}
          >
            {getIcon()}
          </div>
          <div>
            <h3
              className={`font-medium tracking-tight ${isAlertImpacted ? "text-red-900" : "text-stone-900"}`}
            >
              {data.title}
            </h3>
            <p className="text-xs text-stone-500">{data.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 border border-stone-200">
            {data.id}
          </span>
          {getStatusIcon()}
        </div>
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-stone-100">
        {Object.entries(data.details).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center text-xs">
            <span className="text-stone-500 capitalize">{key}</span>
            <span
              className={`font-mono ${
                isAlertImpacted &&
                (key === "eta" || key === "edd" || key === "status")
                  ? "text-red-600 font-medium"
                  : "text-stone-700"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
