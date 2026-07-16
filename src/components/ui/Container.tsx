import type { HTMLAttributes } from "react";

type ContainerSize = "narrow" | "default" | "wide";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({ className = "", size = "default", ...props }: ContainerProps) {
  return <div {...props} className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`} />;
}
