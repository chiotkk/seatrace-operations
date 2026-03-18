"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Clock,
  FileCheck,
  TrendingDown,
  TrendingUp,
  Minus,
  PhoneCall,
  Send,
  QrCode,
  ShieldCheck,
  Anchor,
  MapPin,
  Calendar,
  Thermometer,
  Link,
  ChevronLeft,
  MessageCircle,
} from "lucide-react";

// Mock Data
const ATP_INVENTORY = [
  {
    id: "LOT-882",
    species: "Atlantic Salmon",
    origin: "Faroe Islands",
    available: 450,
    incoming: 1200,
    price: 12.5,
    trend: "up",
  },
  {
    id: "LOT-883",
    species: "Yellowfin Tuna",
    origin: "Hawaii, USA",
    available: 85,
    incoming: 0,
    price: 24.0,
    trend: "down",
  },
  {
    id: "LOT-884",
    species: "King Crab Legs",
    origin: "Dutch Harbor, AK",
    available: 320,
    incoming: 500,
    price: 38.0,
    trend: "stable",
  },
  {
    id: "LOT-885",
    species: "Mahi Mahi",
    origin: "Ecuador",
    available: 120,
    incoming: 300,
    price: 14.25,
    trend: "up",
  },
  {
    id: "LOT-886",
    species: "Sea Scallops",
    origin: "Hokkaido, JP",
    available: 60,
    incoming: 200,
    price: 28.5,
    trend: "down",
  },
  {
    id: "LOT-887",
    species: "Halibut",
    origin: "Nova Scotia, CA",
    available: 210,
    incoming: 150,
    price: 19.0,
    trend: "stable",
  },
];

const PUSH_LIST = [
  {
    id: "LOT-701",
    species: "Wild Sockeye Salmon",
    qty: 45,
    hoursLeft: 36,
    origPrice: 16.0,
    pushPrice: 11.5,
    suggestedBuyer: "Bistro 42",
    buyerPhone: "+1 (555) 019-2834",
    buyers: [
      {
        name: "Bistro 42",
        contact: "Chef Marcus",
        phone: "+1 (555) 019-2834",
        match: 98,
      },
      {
        name: "Ocean Grill",
        contact: "Sarah Jenkins",
        phone: "+1 (555) 827-1029",
        match: 85,
      },
      {
        name: "Fresh Catch Markets",
        contact: "Mike Chen",
        phone: "+1 (555) 112-3344",
        match: 72,
      },
    ],
  },
  {
    id: "LOT-705",
    species: "Swordfish Steaks",
    qty: 28,
    hoursLeft: 24,
    origPrice: 18.5,
    pushPrice: 12.0,
    suggestedBuyer: "Ocean Grill",
    buyerPhone: "+1 (555) 827-1029",
    buyers: [
      {
        name: "Ocean Grill",
        contact: "Sarah Jenkins",
        phone: "+1 (555) 827-1029",
        match: 95,
      },
      {
        name: "The Pearl",
        contact: "Elena Rodriguez",
        phone: "+1 (555) 334-9921",
        match: 88,
      },
      {
        name: "Seafood Express",
        contact: "David Kim",
        phone: "+1 (555) 445-5566",
        match: 65,
      },
    ],
  },
  {
    id: "LOT-712",
    species: "Live Oysters (Dozen)",
    qty: 15,
    hoursLeft: 48,
    origPrice: 22.0,
    pushPrice: 18.0,
    suggestedBuyer: "The Pearl",
    buyerPhone: "+1 (555) 334-9921",
    buyers: [
      {
        name: "The Pearl",
        contact: "Elena Rodriguez",
        phone: "+1 (555) 334-9921",
        match: 99,
      },
      {
        name: "Bistro 42",
        contact: "Chef Marcus",
        phone: "+1 (555) 019-2834",
        match: 82,
      },
      {
        name: "Coastal Dining",
        contact: "James Wilson",
        phone: "+1 (555) 778-8899",
        match: 75,
      },
    ],
  },
];

export function SalesCommandCenter() {
  const [selectedPassport, setSelectedPassport] = useState<string | null>(null);
  const [selectedPushItem, setSelectedPushItem] = useState<
    (typeof PUSH_LIST)[0] | null
  >(null);

  const activePassport = ATP_INVENTORY.find(
    (item) => item.id === selectedPassport,
  );

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto bg-stone-50">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-stone-800 tracking-tight">
          Sales Command Center
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          Live Available-to-Promise (ATP) inventory, automated push lists, and
          traceability passports.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              $142,850
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Total ATP Value
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-amber-200 p-4 shadow-sm flex items-center gap-4 bg-amber-50/30">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-amber-700">
              {PUSH_LIST.length} Items
            </div>
            <div className="text-xs font-medium text-amber-600 uppercase tracking-wider">
              On Push List (&lt;48h)
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">24</div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Passports Sent Today
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left Column: ATP Inventory */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col overflow-hidden min-h-[400px]">
          <div className="p-4 border-b border-stone-200 bg-stone-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-stone-800">
                Available to Promise (ATP)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Real-time inventory adjusted for live processing yields.
              </p>
            </div>
            <span className="text-xs font-medium text-emerald-600 px-2 py-1 bg-emerald-50 rounded-md border border-emerald-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
              Live Sync
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-semibold sticky top-0 z-10">
                  <th className="p-4 font-medium">Lot & Species</th>
                  <th className="p-4 font-medium text-right">Available (kg)</th>
                  <th className="p-4 font-medium text-right">Incoming (kg)</th>
                  <th className="p-4 font-medium text-right">Price / kg</th>
                  <th className="p-4 font-medium text-right">Trend</th>
                  <th className="p-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {ATP_INVENTORY.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-stone-50/80 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-stone-800 text-sm">
                        {row.species}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5 font-mono">
                        {row.id} • {row.origin}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div
                        className={`text-sm font-bold ${row.available < 100 ? "text-amber-600" : "text-stone-800"}`}
                      >
                        {row.available.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-sm text-stone-500">
                        +{row.incoming.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-sm font-medium text-stone-800">
                        ${row.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end">
                        {row.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ) : row.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-400" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedPassport(row.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          selectedPassport === row.id
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900 shadow-sm"
                        }`}
                      >
                        <QrCode className="w-3.5 h-3.5" /> Passport
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Push List & Passport Preview */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Passport Preview (Conditional) */}
          {activePassport && (
            <div className="bg-white rounded-xl border border-blue-200 shadow-md overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-blue-600 p-4 text-white flex justify-between items-start">
                <div>
                  <h3 className="font-bold tracking-tight">
                    Traceability Passport
                  </h3>
                  <p className="text-blue-100 text-xs mt-0.5 opacity-90">
                    Catch-to-Plate Verification
                  </p>
                </div>
                <QrCode className="w-8 h-8 opacity-80" />
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-lg font-semibold text-stone-800">
                    {activePassport.species}
                  </div>
                  <div className="text-sm text-stone-500 font-mono mt-1">
                    Lot: {activePassport.id}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                      <Anchor className="w-3 h-3" /> Vessel
                    </div>
                    <div className="text-sm font-medium text-stone-800">
                      F/V Ocean Queen
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Catch Date
                    </div>
                    <div className="text-sm font-medium text-stone-800">
                      Mar 09, 2026
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Origin
                    </div>
                    <div className="text-sm font-medium text-stone-800">
                      {activePassport.origin}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Method
                    </div>
                    <div className="text-sm font-medium text-stone-800">
                      Line Caught
                    </div>
                  </div>
                </div>

                {/* Cryptographic Cold Chain Verification */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      Cold Chain Verified
                    </div>
                    <div className="text-[10px] font-mono bg-stone-100 text-stone-500 px-2 py-1 rounded flex items-center gap-1">
                      <Link className="w-3 h-3" />
                      0x8f4a...3b92
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-lg p-3 border border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-medium text-stone-600 flex items-center gap-1">
                        <Thermometer className="w-3 h-3" /> Immutable Sensor Log
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono">
                        ID: SN-8492
                      </div>
                    </div>

                    {/* Mock Sparkline / Timeline */}
                    <div className="relative h-10 w-full flex items-end gap-0.5 mb-2">
                      <div className="absolute top-2 w-full border-t border-dashed border-red-300"></div>
                      <div className="absolute top-8 w-full border-t border-dashed border-blue-300"></div>

                      {/* Fake bars representing temp readings */}
                      {[
                        4, 5, 4, 6, 5, 4, 3, 4, 5, 4, 5, 6, 5, 4, 5, 4, 3, 4, 5,
                        4, 5, 4, 4, 5,
                      ].map((val, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-emerald-400 rounded-t-sm opacity-80"
                          style={{ height: `${val * 10}%` }}
                        ></div>
                      ))}
                    </div>

                    <div className="flex justify-between text-[9px] text-stone-400 uppercase tracking-wider mt-1">
                      <span>Origin</span>
                      <span>Transit</span>
                      <span>Facility</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send to Client
                  </button>
                  <button
                    onClick={() => setSelectedPassport(null)}
                    className="px-4 bg-stone-100 hover:bg-stone-200 text-stone-600 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Push List */}
          <div className="bg-white rounded-xl border border-amber-200 shadow-sm flex flex-col flex-1 min-h-[300px]">
            {selectedPushItem ? (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-4 border-b border-amber-100 bg-amber-50/50 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPushItem(null)}
                    className="p-1 hover:bg-amber-100 rounded-md text-amber-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="font-semibold text-amber-900 flex items-center gap-2">
                      Push Details
                    </h3>
                    <p className="text-xs text-amber-700/70 mt-0.5">
                      {selectedPushItem.species} • {selectedPushItem.id}
                    </p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="mb-5 flex justify-between items-center bg-stone-50 p-3 rounded-lg border border-stone-200">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
                        Quantity
                      </div>
                      <div className="text-xl font-bold text-stone-800">
                        {selectedPushItem.qty} kg
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
                        Push Price
                      </div>
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="text-xl font-bold text-emerald-600">
                          ${selectedPushItem.pushPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          ${selectedPushItem.origPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Recommended Buyers
                  </h4>

                  <div className="space-y-3">
                    {selectedPushItem.buyers.map((buyer, idx) => (
                      <div
                        key={idx}
                        className="border border-stone-200 rounded-lg p-3 bg-white shadow-sm flex flex-col gap-3 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-stone-800 text-sm">
                              {buyer.name}
                            </div>
                            <div className="text-xs text-stone-500 mt-0.5">
                              {buyer.contact}
                            </div>
                          </div>
                          <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">
                            {buyer.match}% Match
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-[#25D366] hover:bg-[#1ebd5b] text-white py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                          </button>
                          <button className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                            <PhoneCall className="w-3.5 h-3.5" /> Call
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-amber-100 bg-amber-50/50">
                  <h3 className="font-semibold text-amber-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" /> Actionable Push
                    List
                  </h3>
                  <p className="text-xs text-amber-700/70 mt-0.5">
                    Items nearing shelf-life limit. Suggested markdowns applied.
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {PUSH_LIST.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPushItem(item)}
                      className="border border-stone-200 rounded-lg p-3 hover:border-amber-400 cursor-pointer transition-colors bg-white shadow-sm group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-stone-800 text-sm group-hover:text-amber-700 transition-colors">
                            {item.species}
                          </div>
                          <div className="text-xs text-stone-500 font-mono mt-0.5">
                            {item.id} • {item.qty} kg
                          </div>
                        </div>
                        <div
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.hoursLeft <= 24
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.hoursLeft}h Left
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
                            Suggested Price
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-bold text-emerald-600">
                              ${item.pushPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-stone-400 line-through">
                              ${item.origPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
                            Top Match
                          </div>
                          <div className="text-xs font-medium text-blue-600 flex items-center justify-end gap-1">
                            {item.suggestedBuyer}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
