export type NodeData = {
  id: string;
  type: "inbound" | "processing" | "outbound";
  title: string;
  subtitle: string;
  details: Record<string, string>;
  status: "normal" | "warning" | "success";
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  impactedNodes: string[];
  remediation: string;
  status: "active" | "resolved";
};
