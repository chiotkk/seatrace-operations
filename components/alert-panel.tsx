"use client";

import { Alert } from "@/lib/types";
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { motion } from "motion/react";

interface AlertPanelProps {
  alert: Alert;
  isActive: boolean;
  onClick: () => void;
  onResolve: () => void;
}

export function AlertPanel({
  alert,
  isActive,
  onClick,
  onResolve,
}: AlertPanelProps) {
  return (
    <motion.div
      layout
      className={`rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${
        isActive
          ? "border-red-200 bg-red-50 shadow-sm"
          : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
      }`}
      onClick={onClick}
    >
      <div className="p-4 flex gap-4">
        <div
          className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isActive ? "bg-red-100 text-red-600" : "bg-stone-100 text-stone-500"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3
              className={`font-medium truncate ${isActive ? "text-red-900" : "text-stone-900"}`}
            >
              {alert.title}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 border border-stone-200">
              {alert.id}
            </span>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            {alert.description}
          </p>
        </div>
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-red-200 bg-red-50/50 p-4"
        >
          <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-red-700 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" />
              Suggested Remediation
            </h4>
            <p className="text-sm text-red-900 leading-relaxed bg-white p-3 rounded-lg border border-red-100 shadow-sm">
              {alert.remediation}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-red-200/50">
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Awaiting Approval
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResolve();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Execute Plan
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
