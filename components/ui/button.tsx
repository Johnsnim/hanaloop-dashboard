"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};
const variants: Record<string, string> = {
  default: "bg-brand-500 hover:bg-brand-800 text-white",
  outline:
    "border border-brand-200 text-brand-800 hover:bg-brand-50 dark:border-brand-200/50 dark:text-[rgb(var(--fg))] dark:hover:bg-brand-800/40",
  ghost: "hover:bg-brand-50 dark:hover:bg-brand-800/40",
};
const sizes: Record<string, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
};
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
