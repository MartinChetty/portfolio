import type { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  readonly orientation?: "horizontal" | "vertical";
}

export function Divider({ className = "", orientation = "horizontal", ...props }: DividerProps) {
  const orientationClass = orientation === "horizontal" ? "h-px w-full" : "h-full w-px self-stretch";

  return (
    <div
      {...props}
      aria-orientation={orientation}
      className={`shrink-0 bg-[var(--border)] ${orientationClass} ${className}`}
      role="separator"
    />
  );
}
