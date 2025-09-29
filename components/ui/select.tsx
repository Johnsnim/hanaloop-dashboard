"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
export interface SelectOption {
  label: string;
  value: string;
}
export function Select({
  options,
  value,
  onChange,
  className,
}: {
  options: SelectOption[];
  value: string | null;
  onChange: (v: string | null) => void;
  className?: string;
}) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-brand-200/70 bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-brand-200/40 dark:bg-[rgb(var(--card))] dark:text-[rgb(var(--fg))]",
        className
      )}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="">전체</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
