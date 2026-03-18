import { NodeData, Alert } from "./types";

export const INITIAL_ALERTS: Alert[] = [
  {
    id: "ALT-01",
    title: "Vessel Delayed: Pacific Catch",
    description:
      "IN-002 (Bluefin Tuna) delayed by 6 hours due to port congestion at origin.",
    impactedNodes: ["IN-002", "PR-B", "OUT-103"],
    remediation:
      "Release 800kg of reserve Bluefin Tuna from Cold Room 2 to Line B. Rebook Tsukiji Export (OUT-103) to evening cargo flight SQ812.",
    status: "active",
  },
  {
    id: "ALT-02",
    title: "Equipment Fault: Line A",
    description:
      "Filleting machine on Line A reporting irregular vibration. Potential breakdown imminent.",
    impactedNodes: ["PR-A", "IN-001", "OUT-101", "OUT-102", "OUT-108"],
    remediation:
      "Reroute 50% of IN-001 (Atlantic Salmon) to Line C. Dispatch maintenance team to Line A immediately.",
    status: "active",
  },
];

export const INBOUND_NODES: NodeData[] = [
  {
    id: "IN-001",
    type: "inbound",
    title: "Oceanic 1",
    subtitle: "Atlantic Salmon",
    details: { origin: "Norway", qty: "5,000 kg", eta: "Today 14:00" },
    status: "normal",
  },
  {
    id: "IN-002",
    type: "inbound",
    title: "Pacific Catch",
    subtitle: "Bluefin Tuna",
    details: { origin: "Japan", qty: "1,200 kg", eta: "Delayed" },
    status: "warning",
  },
  {
    id: "IN-003",
    type: "inbound",
    title: "Local Trawler",
    subtitle: "Tiger Prawns",
    details: { origin: "Singapore", qty: "800 kg", eta: "Arrived" },
    status: "success",
  },
  {
    id: "IN-004",
    type: "inbound",
    title: "Nordic Star",
    subtitle: "King Crab",
    details: { origin: "Norway", qty: "450 kg", eta: "Tomorrow 09:00" },
    status: "normal",
  },
  {
    id: "IN-005",
    type: "inbound",
    title: "Bering Sea",
    subtitle: "Scallops",
    details: { origin: "USA", qty: "2,000 kg", eta: "Today 16:00" },
    status: "normal",
  },
  {
    id: "IN-006",
    type: "inbound",
    title: "Tasman Bay",
    subtitle: "Oysters",
    details: { origin: "Australia", qty: "600 kg", eta: "Arrived" },
    status: "normal",
  },
  {
    id: "IN-007",
    type: "inbound",
    title: "Mekong Delta",
    subtitle: "Barramundi",
    details: { origin: "Vietnam", qty: "3,000 kg", eta: "Tomorrow 12:00" },
    status: "normal",
  },
  {
    id: "IN-008",
    type: "inbound",
    title: "Scottish Isles",
    subtitle: "Haddock",
    details: { origin: "UK", qty: "1,500 kg", eta: "Wed 08:00" },
    status: "normal",
  },
];

export const PROCESSING_NODES: NodeData[] = [
  {
    id: "PR-A",
    type: "processing",
    title: "Line A",
    subtitle: "Filleting & Portioning",
    details: { capacity: "85%", status: "Maintenance Due" },
    status: "warning",
  },
  {
    id: "PR-B",
    type: "processing",
    title: "Line B",
    subtitle: "Premium Cut",
    details: { capacity: "40%", status: "Waiting Input" },
    status: "normal",
  },
  {
    id: "PR-C",
    type: "processing",
    title: "Line C",
    subtitle: "Sorting & Packing",
    details: { capacity: "92%", status: "Active" },
    status: "success",
  },
  {
    id: "PR-D",
    type: "processing",
    title: "Line D",
    subtitle: "Shellfish Cleaning",
    details: { capacity: "60%", status: "Active" },
    status: "normal",
  },
  {
    id: "PR-E",
    type: "processing",
    title: "Line E",
    subtitle: "Blast Freezing",
    details: { capacity: "15%", status: "Standby" },
    status: "normal",
  },
];

export const OUTBOUND_NODES: NodeData[] = [
  {
    id: "OUT-101",
    type: "outbound",
    title: "Jumbo Seafood",
    subtitle: "Local Restaurant",
    details: { items: "Salmon Portions", edd: "Today 18:00" },
    status: "normal",
  },
  {
    id: "OUT-102",
    type: "outbound",
    title: "FairPrice Finest",
    subtitle: "Local Retail",
    details: { items: "Salmon Fillets", edd: "Tomorrow 08:00" },
    status: "normal",
  },
  {
    id: "OUT-103",
    type: "outbound",
    title: "Tsukiji Export",
    subtitle: "Overseas Airfreight",
    details: { items: "Tuna Saku", edd: "At Risk" },
    status: "warning",
  },
  {
    id: "OUT-104",
    type: "outbound",
    title: "Marina Bay Sands",
    subtitle: "Local Hotel",
    details: { items: "Mixed Premium", edd: "Today 16:00" },
    status: "success",
  },
  {
    id: "OUT-105",
    type: "outbound",
    title: "Sydney Fish Market",
    subtitle: "Overseas Airfreight",
    details: { items: "Tiger Prawns", edd: "Wed 10:00" },
    status: "normal",
  },
  {
    id: "OUT-106",
    type: "outbound",
    title: "Cold Storage",
    subtitle: "Local Retail",
    details: { items: "Scallops", edd: "Tomorrow 14:00" },
    status: "normal",
  },
  {
    id: "OUT-107",
    type: "outbound",
    title: "Odette",
    subtitle: "Fine Dining",
    details: { items: "Oysters, King Crab", edd: "Today 15:00" },
    status: "normal",
  },
  {
    id: "OUT-108",
    type: "outbound",
    title: "Hong Kong Express",
    subtitle: "Overseas Airfreight",
    details: { items: "Barramundi", edd: "Thu 06:00" },
    status: "normal",
  },
  {
    id: "OUT-109",
    type: "outbound",
    title: "Local Distributor",
    subtitle: "Wholesale",
    details: { items: "Haddock", edd: "Wed 12:00" },
    status: "normal",
  },
];

export const ALL_NODES = [
  ...INBOUND_NODES,
  ...PROCESSING_NODES,
  ...OUTBOUND_NODES,
];

export const EDGES = [
  { source: "IN-001", target: "PR-A", flows: ["salmon"] },
  { source: "IN-001", target: "PR-C", flows: ["salmon"] },
  { source: "IN-002", target: "PR-B", flows: ["tuna"] },
  { source: "IN-003", target: "PR-C", flows: ["prawns"] },
  { source: "IN-004", target: "PR-B", flows: ["crab"] },
  { source: "IN-004", target: "PR-D", flows: ["crab"] },
  { source: "IN-005", target: "PR-D", flows: ["scallops"] },
  { source: "IN-006", target: "PR-D", flows: ["oysters"] },
  { source: "IN-007", target: "PR-A", flows: ["barramundi"] },
  { source: "IN-008", target: "PR-E", flows: ["haddock"] },
  { source: "PR-A", target: "OUT-101", flows: ["salmon"] },
  { source: "PR-A", target: "OUT-102", flows: ["salmon"] },
  { source: "PR-A", target: "OUT-108", flows: ["barramundi"] },
  { source: "PR-B", target: "OUT-103", flows: ["tuna"] },
  { source: "PR-B", target: "OUT-107", flows: ["crab"] },
  { source: "PR-C", target: "OUT-104", flows: ["salmon", "prawns"] },
  { source: "PR-C", target: "OUT-105", flows: ["prawns"] },
  { source: "PR-D", target: "OUT-106", flows: ["scallops"] },
  { source: "PR-D", target: "OUT-107", flows: ["crab", "oysters"] },
  { source: "PR-E", target: "OUT-109", flows: ["haddock"] },
];
