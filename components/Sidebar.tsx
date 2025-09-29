"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Company } from "@/lib/types";
import { cn } from "@/lib/utils";
export function Sidebar({ companies }: { companies: Company[] }) {
  const { selectedCompanyId, setCompany, selectedMonth, setMonth } =
    useDashboardStore();
  const [months, setMonths] = useState<string[]>([]);
  const companyOptions = useMemo(
    () => companies.map((c) => ({ label: c.name, value: c.id })),
    [companies]
  );
  useEffect(() => {
    const s = new Set<string>();
    companies.forEach((c) => c.emissions.forEach((e) => s.add(e.yearMonth)));
    const list = Array.from(s.values()).sort();
    setMonths(list);
    if (!selectedMonth && list.length) setMonth(list[list.length - 1]);
  }, [companies, selectedMonth, setMonth]);
  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>필터</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="mb-1 text-xs text-[rgb(var(--muted))]">회사명</div>
            <Select
              options={companyOptions}
              value={selectedCompanyId}
              onChange={setCompany}
            />
          </div>
          <div>
            <div className="mb-1 text-xs text-[rgb(var(--muted))]">년-월</div>
            <select
              className="h-10 w-full rounded-md border border-brand-200/70 bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-brand-200/40 dark:bg-[rgb(var(--card))] dark:text-[rgb(var(--fg))]"
              value={selectedMonth ?? ""}
              onChange={(e) => setMonth(e.target.value || null)}
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>회사명</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {companies.map((c) => {
            const selected = selectedCompanyId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCompany(c.id)}
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-left text-sm transition-colors",
                  selected
                    ? "border-brand-500 bg-brand-200/40 text-brand-800 dark:bg-brand-800/50 dark:text-[rgb(var(--fg))]"
                    : "border-brand-200/60 bg-white hover:bg-brand-50 dark:border-brand-200/40 dark:bg-[rgb(var(--card))] dark:hover:bg-brand-800/30"
                )}
              >
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-[rgb(var(--muted))]">
                  {c.country}
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </aside>
  );
}
