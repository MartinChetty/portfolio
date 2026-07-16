import type { HTMLAttributes } from "react";

type CardVariant = "default" | "subtle" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default: "border-[var(--border)] bg-[var(--surface)] shadow-sm",
  subtle: "border-transparent bg-[var(--surface-subtle)]",
  outlined: "border-[var(--border)] bg-transparent",
};

export function Card({ className = "", variant = "default", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-lg border p-5 sm:p-6 ${variantClasses[variant]} ${className}`}
    />
  );
}
