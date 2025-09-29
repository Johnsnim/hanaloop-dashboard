"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-brand-200/70 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-brand-500/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-200/40 dark:bg-[rgb(var(--card))] dark:text-[rgb(var(--fg))] dark:placeholder:text-brand-200/80",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };
