import * as React from "react";
import { cn } from "@/lib/utils";
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-200/60 bg-[rgb(var(--card))] shadow-elevated dark:border-brand-200/40",
        className
      )}
      {...props}
    />
  );
}
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-4 border-b border-brand-200/50 dark:border-brand-200/30",
        className
      )}
      {...props}
    />
  );
}
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}
