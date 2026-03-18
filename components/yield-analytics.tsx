"use client";

import { useMemo } from "react";
import {
  TrendingUp,
  Scale,
  ArrowRight,
  DollarSign,
  Percent,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Mock Data for Processing Yield Analytics
const YIELD_DATA = [
  {
    id: "IN-001",
    supplier: "Nordic Seas",
    species: "Atlantic Salmon",
    rawWeight: 5000,
    yieldWeight: 3250,
    rawCost: 25000,
    finalValue: 48750,
    date: "2026-03-01",
  },
  {
    id: "IN-002",
    supplier: "Pacific Catch",
    species: "King Crab",
    rawWeight: 2000,
    yieldWeight: 1100,
    rawCost: 40000,
    finalValue: 71500,
    date: "2026-03-02",
  },
  {
    id: "IN-003",
    supplier: "Oceanic Farms",
    species: "Atlantic Salmon",
    rawWeight: 4500,
    yieldWeight: 2700,
    rawCost: 21600,
    finalValue: 40500,
    date: "2026-03-03",
  },
  {
    id: "IN-004",
    supplier: "Gulf Harvesters",
    species: "Oysters",
    rawWeight: 1500,
    yieldWeight: 1350,
    rawCost: 12000,
    finalValue: 24300,
    date: "2026-03-05",
  },
  {
    id: "IN-005",
    supplier: "Nordic Seas",
    species: "Scallops",
    rawWeight: 1200,
    yieldWeight: 960,
    rawCost: 18000,
    finalValue: 33600,
    date: "2026-03-06",
  },
  {
    id: "IN-006",
    supplier: "Pacific Catch",
    species: "Yellowfin Tuna",
    rawWeight: 3000,
    yieldWeight: 1950,
    rawCost: 36000,
    finalValue: 68250,
    date: "2026-03-08",
  },
  {
    id: "IN-007",
    supplier: "Oceanic Farms",
    species: "Atlantic Salmon",
    rawWeight: 5200,
    yieldWeight: 3380,
    rawCost: 24960,
    finalValue: 50700,
    date: "2026-03-10",
  },
];

export function YieldAnalytics() {
  const processedData = useMemo(() => {
    return YIELD_DATA.map((item) => {
      const yieldPercent = (item.yieldWeight / item.rawWeight) * 100;
      const profitRatio = item.finalValue / item.rawCost;
      const grossProfit = item.finalValue - item.rawCost;
      return {
        ...item,
        yieldPercent: Number(yieldPercent.toFixed(1)),
        profitRatio: Number(profitRatio.toFixed(2)),
        grossProfit,
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const totals = useMemo(() => {
    const totalRaw = processedData.reduce(
      (sum, item) => sum + item.rawWeight,
      0,
    );
    const totalYield = processedData.reduce(
      (sum, item) => sum + item.yieldWeight,
      0,
    );
    const totalCost = processedData.reduce(
      (sum, item) => sum + item.rawCost,
      0,
    );
    const totalValue = processedData.reduce(
      (sum, item) => sum + item.finalValue,
      0,
    );

    return {
      avgYield: ((totalYield / totalRaw) * 100).toFixed(1),
      avgProfitRatio: (totalValue / totalCost).toFixed(2),
      totalProcessed: totalRaw.toLocaleString(),
      totalGrossProfit: (totalValue - totalCost).toLocaleString(),
    };
  }, [processedData]);

  // Group by supplier for chart
  const supplierData = useMemo(() => {
    const groups = processedData.reduce(
      (acc, item) => {
        if (!acc[item.supplier]) {
          acc[item.supplier] = {
            name: item.supplier,
            totalCost: 0,
            totalValue: 0,
            count: 0,
          };
        }
        acc[item.supplier].totalCost += item.rawCost;
        acc[item.supplier].totalValue += item.finalValue;
        acc[item.supplier].count += 1;
        return acc;
      },
      {} as Record<string, any>,
    );

    return Object.values(groups)
      .map((g) => ({
        name: g.name,
        avgProfitRatio: Number((g.totalValue / g.totalCost).toFixed(2)),
      }))
      .sort((a, b) => b.avgProfitRatio - a.avgProfitRatio);
  }, [processedData]);

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto bg-stone-50">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-stone-800 tracking-tight">
          Processing Yield Analytics
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          Analyze material yield and profit ratios across incoming shipments and
          suppliers.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              {totals.totalProcessed}{" "}
              <span className="text-sm font-normal text-stone-500">kg</span>
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Total Raw Processed
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              {totals.avgYield}%
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Average Yield
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              {totals.avgProfitRatio}x
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Avg Profit Ratio
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              ${totals.totalGrossProfit}
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Total Gross Profit
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Chart */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-stone-200 p-5 shadow-sm flex flex-col min-h-[300px]">
          <div className="mb-6">
            <h3 className="font-semibold text-stone-800">
              Profit Ratio by Supplier
            </h3>
            <p className="text-xs text-stone-500 font-mono mt-1">
              Final Value / Raw Cost
            </p>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={supplierData}
                layout="vertical"
                margin={{ top: 0, right: 30, bottom: 0, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  domain={[0, "dataMax + 0.5"]}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#374151", fontWeight: 500 }}
                  width={100}
                />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: any) => [`${value}x`, "Profit Ratio"]}
                />
                <Bar
                  dataKey="avgProfitRatio"
                  radius={[0, 4, 4, 0]}
                  barSize={32}
                >
                  {supplierData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.avgProfitRatio > 1.8 ? "#3b82f6" : "#93c5fd"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col overflow-hidden min-h-[400px]">
          <div className="p-4 border-b border-stone-200 bg-stone-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-stone-800">
              Completed Shipments Ledger
            </h3>
            <span className="text-xs font-medium text-stone-500 px-2 py-1 bg-stone-200/50 rounded-md">
              Last 30 Days
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-semibold sticky top-0 z-10">
                  <th className="p-4 font-medium">Shipment ID</th>
                  <th className="p-4 font-medium">Supplier & Species</th>
                  <th className="p-4 font-medium text-right">Raw Weight</th>
                  <th className="p-4 font-medium text-right">Yield</th>
                  <th className="p-4 font-medium text-right">Raw Cost</th>
                  <th className="p-4 font-medium text-right">Final Value</th>
                  <th className="p-4 font-medium text-right">Profit Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {processedData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-stone-50/80 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-mono text-sm font-medium text-stone-800">
                        {row.id}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">
                        {row.date}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-stone-800 text-sm">
                        {row.supplier}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {row.species}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-sm text-stone-800">
                        {row.rawWeight.toLocaleString()} kg
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-sm font-medium text-stone-800">
                        {row.yieldPercent}%
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {row.yieldWeight.toLocaleString()} kg
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-sm text-stone-800">
                        ${row.rawCost.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-sm font-medium text-emerald-600">
                        ${row.finalValue.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          row.profitRatio >= 1.8
                            ? "bg-blue-100 text-blue-700"
                            : row.profitRatio >= 1.5
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {row.profitRatio}x
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
