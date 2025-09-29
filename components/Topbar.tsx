"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
export function Topbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-[rgb(var(--card))]/90 backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--card))]/70 dark:border-brand-200/30">
      <div className="container-gutter h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://www.hanaloop.com/images/hanaloop-logo.png"
            className="h-8"
          />
          <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1EBD7C] via-[#14B0A5] to-[#0094FF]">
            HanaLoop Carbon Dashboard
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
