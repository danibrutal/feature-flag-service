import type { FeatureFlags } from "./types";

// for demo purposes
const DEMO_USER_ID = "demo-user-1";

export async function getFeatureFlags(): Promise<FeatureFlags> {
  const apiUrl = process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("apiUrl not defined");
    return {};
  }

  try {
    const response = await fetch(
      `${apiUrl}/feature-flags?user_id=${DEMO_USER_ID}`,
      {
        next: { revalidate: 30 },
      },
    );

    if (!response.ok) {
      return {};
    }

    return response.json();
  } catch (error) {
    console.error("Feature flag fetch failed", error);
    return {};
  }
}
