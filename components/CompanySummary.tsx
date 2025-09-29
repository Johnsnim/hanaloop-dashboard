import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/lib/types";
import { sum } from "@/lib/utils";
function Arrow({ dir }: { dir: "up" | "down" | "flat" }) {
  if (dir === "flat")
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="text-[rgb(var(--muted))]"
        fill="currentColor"
      >
        <path d="M4 12h16v2H4z" />
      </svg>
    );
  const cls = dir === "up" ? "text-good" : "text-bad";
  const d =
    dir === "up" ? "M12 4l6 6h-4v10h-4V10H6z" : "M12 20l-6-6h4V4h4v10h4z";
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      className={cls}
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  );
}
export function CompanySummary({ company }: { company: Company }) {
  const total = sum(company.emissions.map((e) => e.emissions));
  const avg = total / (company.emissions.length || 1);
  const latest = company.emissions[company.emissions.length - 1];
  const latestVal = latest?.emissions ?? 0;
  const diff = latestVal - avg;
  const pct = avg ? (diff / avg) * 100 : 0;
  const dir = diff === 0 ? "flat" : diff > 0 ? "up" : "down";
  const colorCls =
    dir === "flat"
      ? "text-[rgb(var(--muted))]"
      : dir === "up"
      ? "text-good"
      : "text-bad";
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>연간 누계(YTD)</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {total.toFixed(0)} tCO₂e
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>월평균</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {avg.toFixed(1)} tCO₂e
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>최근기록 ({latest?.yearMonth} 기준)</CardTitle>
        </CardHeader>
        <CardContent className="flex items-baseline gap-3">
          <div className="text-2xl font-semibold">{latestVal} tCO₂e</div>
          <div
            className={
              "inline-flex items-center gap-1 text-sm font-medium " + colorCls
            }
          >
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md
                   bg-white/100 ring-1 ring-black/5 backdrop-blur-sm"
            >
              <Arrow dir={dir} />
              <span>
                {diff > 0 ? "+" : diff < 0 ? "" : "±"}
                {Math.abs(diff).toFixed(1)} t
              </span>
              <span>
                ({diff > 0 ? "+" : diff < 0 ? "" : "±"}
                {Math.abs(pct).toFixed(1)}%)
              </span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
