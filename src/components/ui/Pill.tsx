import type { HTMLAttributes } from "react";

type PillVariant = "default" | "accent";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  readonly variant?: PillVariant;
}

const variantClasses: Record<PillVariant, string> = {
  default: "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]",
  accent: "border-[var(--brand)] bg-[var(--brand-subtle)] text-[var(--brand-strong)]",
};

export function Pill({ className = "", variant = "default", ...props }: PillProps) {
  return (
    <span
      {...props}
      className={`inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-sm font-medium ${variantClasses[variant]} ${className}`}
    />
  );
}
