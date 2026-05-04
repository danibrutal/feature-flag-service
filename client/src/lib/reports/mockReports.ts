export type DamageReport = {
  id: string;
  title: string;
  vehicle: string;
  status: "draft" | "submitted" | "in_review";
  description: string;
  damageSeverity: "low" | "medium" | "high";
};

export const mockReports: DamageReport[] = [
  {
    id: "1",
    title: "Front bumper damage",
    vehicle: "Toyota Yaris",
    status: "submitted",
    description:
      "Front bumper has scratches and a small dent after parking incident.",
    damageSeverity: "medium",
  },
  {
    id: "2",
    title: "Rear door scratch",
    vehicle: "Volkswagen Golf",
    status: "draft",
    description: "Visible scratch on rear passenger door.",
    damageSeverity: "low",
  },
];
