"use client";
import { useEffect, useMemo, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Sidebar } from "@/components/Sidebar";
import EmissionsChart from "@/components/EmissionsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/lib/types";
import { fetchCompanies, fetchCountries } from "@/lib/api";
import { CompanySummary } from "@/components/CompanySummary";
import { useDashboardStore } from "@/store/useDashboardStore";

export default function Page() {
  const [companies, setCompanies] = useState<Company[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedCompanyId } = useDashboardStore();

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchCompanies(), fetchCountries()])
      .then(([cs]) => setCompanies(cs))
      .catch((e) => setError(e.message ?? "데이터 불러오기 실패"))
      .finally(() => setLoading(false));
  }, []);

  const activeCompany = useMemo(
    () =>
      companies?.find((c) => c.id === selectedCompanyId) ??
      companies?.[0] ??
      null,
    [companies, selectedCompanyId]
  );

  return (
    <div className="min-h-screen bg-[#F2F1F1] dark:bg-[#1A2229]">
      <Topbar />
      <main className="container-gutter py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72 w-full">
            {companies ? (
              <Sidebar companies={companies} />
            ) : (
              <div className="h-72 skeleton" />
            )}
          </div>

          <div className="flex-1 space-y-6">
            {loading && <div className="h-10 skeleton w-40" />}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {activeCompany ? (
              <>
                <CompanySummary company={activeCompany} />
                <Card>
                  <CardHeader>
                    <CardTitle>배출물 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmissionsChart data={activeCompany.emissions} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-sm">회사 데이터 불러오기 실패</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
