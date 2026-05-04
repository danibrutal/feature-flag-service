import type { FeatureFlags } from "@/lib/feature-flags/types";

type Props = {
  flags: FeatureFlags;
  flag: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function FeatureGate({ flags, flag, children, fallback = null }: Props) {
  if (!flags[flag]) {
    return fallback;
  }

  return children;
}
