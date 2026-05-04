import type { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={[styles.badge, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
