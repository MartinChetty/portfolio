import type { HTMLAttributes } from "react";

type BadgeVariant = "neutral" | "brand" | "success" | "warning";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  readonly variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-[var(--surface-subtle)] text-[var(--text-muted)]",
  brand: "bg-[var(--brand-subtle)] text-[var(--brand-strong)]",
  success: "bg-[var(--success-subtle)] text-[var(--success)]",
  warning: "bg-[var(--warning-subtle)] text-[var(--warning)]",
};

export function Badge({ className = "", variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex min-h-6 items-center rounded px-2 py-0.5 text-xs font-semibold ${variantClasses[variant]} ${className}`}
    />
  );
}
