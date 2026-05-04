export type DamageReport = {
  id: number;
  title: string;
  vehicle: string;
  status: "draft" | "submitted" | "in_review";
  damage_severity: "low" | "medium" | "high";
  description: string;
};

export async function getReports(): Promise<DamageReport[]> {
  const res = await fetch(`${getServerApiUrl()}/reports`, {
    cache: "no-store",
  });

  return res.json();
}

export async function getReport(id: string): Promise<DamageReport | null> {
  const res = await fetch(`${getServerApiUrl()}/reports/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export async function createReport(data: Omit<DamageReport, "id" | "status">) {
  const res = await fetch(`${getClientApiUrl()}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.status === 403) {
    throw new Error("This feature is no longer available.");
  }

  return res.json();
}

export async function updateReport(
  id: string,
  data: Omit<DamageReport, "id" | "status">,
) {
  const res = await fetch(`${getClientApiUrl()}/reports/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // basic way of handling for now
  if (res.status === 403) {
    throw new Error("This feature is no longer available.");
  }

  return res.json();
}

function getServerApiUrl() {
  return process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
}

function getClientApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL;
}
