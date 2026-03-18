"use client";

import { useState, useMemo } from "react";
import {
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Mock Data
const SENSORS = [
  {
    id: "SEN-101",
    location: "Truck-A (Inbound)",
    type: "Transit",
    temp: -2.1,
    target: -2.0,
    status: "normal",
    humidity: 85,
    lastUpdated: "2 mins ago",
  },
  {
    id: "SEN-102",
    location: "Truck-B (Inbound)",
    type: "Transit",
    temp: -1.5,
    target: -2.0,
    status: "warning",
    humidity: 82,
    lastUpdated: "1 min ago",
  },
  {
    id: "SEN-201",
    location: "Freezer Zone 1 (Raw)",
    type: "Facility",
    temp: -18.5,
    target: -18.0,
    status: "normal",
    humidity: 40,
    lastUpdated: "Just now",
  },
  {
    id: "SEN-202",
    location: "Freezer Zone 2 (Processed)",
    type: "Facility",
    temp: -17.8,
    target: -18.0,
    status: "normal",
    humidity: 42,
    lastUpdated: "5 mins ago",
  },
  {
    id: "SEN-203",
    location: "Processing Floor A",
    type: "Facility",
    temp: 4.2,
    target: 4.0,
    status: "normal",
    humidity: 60,
    lastUpdated: "1 min ago",
  },
  {
    id: "SEN-301",
    location: "Truck-C (Outbound)",
    type: "Transit",
    temp: 5.5,
    target: 2.0,
    status: "critical",
    humidity: 90,
    lastUpdated: "Just now",
  },
  {
    id: "SEN-302",
    location: "Truck-D (Outbound)",
    type: "Transit",
    temp: 1.8,
    target: 2.0,
    status: "normal",
    humidity: 88,
    lastUpdated: "3 mins ago",
  },
];

const generateHistory = (
  baseTemp: number,
  variance: number,
  trend: number = 0,
) => {
  const data = [];
  let current = baseTemp;
  for (let i = 24; i >= 0; i--) {
    data.push({
      time: `${i}h ago`,
      temp: Number(
        (current + (Math.random() * variance - variance / 2)).toFixed(1),
      ),
    });
    current -= trend; // reverse trend since we go backwards in time
  }
  return data.reverse();
};

const HISTORY_DATA: Record<string, any[]> = {
  "SEN-101": generateHistory(-2.0, 0.5),
  "SEN-102": generateHistory(-2.0, 0.8, 0.1), // slowly warming
  "SEN-201": generateHistory(-18.0, 1.0),
  "SEN-202": generateHistory(-18.0, 0.5),
  "SEN-203": generateHistory(4.0, 1.0),
  "SEN-301": generateHistory(2.0, 1.5, 0.3), // rapidly warming
  "SEN-302": generateHistory(2.0, 0.4),
};

export function ColdChainDashboard() {
  const [selectedSensor, setSelectedSensor] = useState(SENSORS[0].id);

  const activeSensor = useMemo(
    () => SENSORS.find((s) => s.id === selectedSensor) || SENSORS[0],
    [selectedSensor],
  );
  const historyData = HISTORY_DATA[selectedSensor];

  const criticalCount = SENSORS.filter((s) => s.status === "critical").length;
  const warningCount = SENSORS.filter((s) => s.status === "warning").length;

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto bg-stone-50">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-stone-800 tracking-tight">
          Live IoT Cold Chain Monitoring
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          Real-time temperature and humidity tracking across all transit and
          facility zones.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              {SENSORS.length}
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Active Sensors
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              {SENSORS.length - criticalCount - warningCount}
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Normal Status
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-stone-800">
              {warningCount}
            </div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Warnings
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-red-200 p-4 shadow-sm flex items-center gap-4 bg-red-50/30">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <ThermometerSun className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-red-700">
              {criticalCount}
            </div>
            <div className="text-xs font-medium text-red-600 uppercase tracking-wider">
              Critical Alerts
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Sensor List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col overflow-hidden min-h-[400px]">
          <div className="p-4 border-b border-stone-200 bg-stone-50/50">
            <h3 className="font-semibold text-stone-800">Sensor Network</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {SENSORS.map((sensor) => (
              <button
                key={sensor.id}
                onClick={() => setSelectedSensor(sensor.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start justify-between ${
                  selectedSensor === sensor.id
                    ? "bg-blue-50 border-blue-200 shadow-sm"
                    : "border-transparent hover:bg-stone-50"
                }`}
              >
                <div>
                  <div className="font-medium text-stone-800 text-sm">
                    {sensor.location}
                  </div>
                  <div className="text-xs text-stone-500 font-mono mt-0.5">
                    {sensor.id} • {sensor.type}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-bold flex items-center justify-end gap-1 ${
                      sensor.status === "critical"
                        ? "text-red-600"
                        : sensor.status === "warning"
                          ? "text-amber-600"
                          : "text-emerald-600"
                    }`}
                  >
                    {sensor.temp}°C
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" /> {sensor.lastUpdated}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sensor Details & Chart */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Detail Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
                Current Temp
              </div>
              <div className="flex items-end gap-2">
                <span
                  className={`text-4xl font-light tracking-tighter ${
                    activeSensor.status === "critical"
                      ? "text-red-600"
                      : activeSensor.status === "warning"
                        ? "text-amber-600"
                        : "text-emerald-600"
                  }`}
                >
                  {activeSensor.temp}°C
                </span>
                <span className="text-sm text-stone-400 mb-1 font-mono">
                  Target: {activeSensor.target}°C
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
                Humidity
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-light tracking-tighter text-blue-600">
                  {activeSensor.humidity}%
                </span>
                <span className="text-sm text-stone-400 mb-1">Relative</span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
              <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
                Status
              </div>
              <div className="flex items-center gap-2 mt-2">
                {activeSensor.status === "critical" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                    <ThermometerSun className="w-4 h-4" /> Critical Deviation
                  </span>
                ) : activeSensor.status === "warning" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                    <AlertTriangle className="w-4 h-4" /> Warning
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                    <ThermometerSnowflake className="w-4 h-4" /> Optimal
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm flex-1 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-stone-800">
                  24-Hour Temperature History
                </h3>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  {activeSensor.id} • {activeSensor.location}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-stone-600">Actual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-red-400 border border-red-400 border-dashed"></div>
                  <span className="text-stone-600">Target</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historyData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    dy={10}
                    minTickGap={30}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    dx={-10}
                    domain={["dataMin - 2", "dataMax + 2"]}
                    tickFormatter={(val) => `${val}°`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    labelStyle={{
                      color: "#6b7280",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                    itemStyle={{
                      color: "#1f2937",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  />
                  <ReferenceLine
                    y={activeSensor.target}
                    stroke="#f87171"
                    strokeDasharray="4 4"
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#3b82f6",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
