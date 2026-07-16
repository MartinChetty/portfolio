import type { HTMLAttributes } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  readonly spacing?: "none" | "compact" | "default" | "relaxed";
}

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  compact: "py-10 sm:py-12",
  default: "py-16 sm:py-20",
  relaxed: "py-20 sm:py-24 lg:py-28",
};

export function Section({ className = "", spacing = "default", ...props }: SectionProps) {
  return <section {...props} className={`${spacingClasses[spacing]} ${className}`} />;
}
