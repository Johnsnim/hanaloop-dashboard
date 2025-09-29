"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-brand-200/70 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-brand-500/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-200/40 dark:bg-[rgb(var(--card))] dark:text-[rgb(var(--fg))] dark:placeholder:text-brand-200/80",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
export { Textarea };
