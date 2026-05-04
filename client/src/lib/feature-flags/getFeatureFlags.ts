import type { FeatureFlags } from "./types";

export async function getFeatureFlags(): Promise<FeatureFlags> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("apiUrl not defined");
    return {};
  }

  console.log(apiUrl);

  try {
    const response = await fetch(`${apiUrl}/feature-flags`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return {};
    }

    return response.json();
  } catch (error) {
    console.error("Feature flag fetch failed", error);
    return {};
  }
}
