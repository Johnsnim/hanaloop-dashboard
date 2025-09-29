"use client";
import * as React from "react";
import { GhgEmission } from "@/lib/types";
import { formatMonthLabel } from "@/lib/utils";

type Props = { data: GhgEmission[]; height?: number };

export default function EmissionsChart({ data, height = 240 }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const [hover, setHover] = React.useState<number | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const width = 600;
  const padding = { left: 40, right: 12, top: 16, bottom: 40 };
  const values = data.map((d) => d.emissions);
  const total = values.reduce((a, b) => a + b, 0);
  const avg = total / (values.length || 1);
  const max = Math.max(1, ...values);
  const barW = (width - padding.left - padding.right) / (data.length || 1);

  return (
    <div className="w-full overflow-x-auto">
      <div className="relative inline-block">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="Emissions bar chart"
        >
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="rgb(var(--card))"
            rx={12}
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="rgb(var(--grid))"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="rgb(var(--grid))"
          />

          {data.map((d, i) => {
            const h =
              (d.emissions / max) * (height - padding.top - padding.bottom);
            const x = padding.left + i * barW + 8;
            const y = height - padding.bottom - h;
            const isHover = hover === i;
            const prev = i > 0 ? data[i - 1].emissions : null;
            const diffAvg = d.emissions - avg;
            const pctAvg = avg ? (diffAvg / avg) * 100 : 0;
            const diffPrev = prev !== null ? d.emissions - prev : null;
            const insideY = h >= 18 ? height - padding.bottom - 6 : y - 4;
            const insideFill = h >= 18 ? "#ffffff" : "rgb(var(--fg))";

            return (
              <g
                key={d.yearMonth}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover((h) => (h === i ? null : h))}
              >
                <rect
                  x={x}
                  y={y}
                  width={barW - 16}
                  height={h}
                  rx={6}
                  className="bar bar-pulse"
                  style={{
                    transform: `scaleY(${mounted ? 1 : 0})`,
                    transition: `transform 700ms ${
                      200 + i * 40
                    }ms cubic-bezier(.22,.61,.36,1)`,
                    transformOrigin: "bottom",
                    fill: "rgb(var(--accent))",
                    opacity: isHover ? 1 : undefined,
                  }}
                />
                <text
                  x={x + (barW - 16) / 2}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgb(var(--muted))"
                >
                  {formatMonthLabel(d.yearMonth)}
                </text>
                <text
                  x={x + (barW - 16) / 2}
                  y={insideY}
                  textAnchor="middle"
                  fontSize="10"
                  fill={insideFill}
                >
                  {d.emissions}t
                </text>
                {isHover && (
                  <g pointerEvents="none">
                    {(() => {
                      const font = 11;
                      const padX = 8;
                      const boxH = 20;
                      const gap = 4;
                      const offset = 2;
                      const xC = x + (barW - 16) / 2;

                      const signAvg =
                        diffAvg > 0 ? "+" : diffAvg < 0 ? "" : "±";
                      const line1 = `평균대비 ${signAvg}${Math.abs(
                        diffAvg
                      ).toFixed(1)} (${Math.abs(pctAvg).toFixed(1)}%)`;

                      const signPrev =
                        diffPrev === null
                          ? ""
                          : diffPrev > 0
                          ? "+"
                          : diffPrev < 0
                          ? ""
                          : "±";
                      const line2 = `전월대비 ${
                        diffPrev === null
                          ? "—"
                          : signPrev + Math.abs(diffPrev).toFixed(1)
                      }`;

                      const measure = (s: string) =>
                        Math.max(44, s.length * (font * 0.62) + padX * 2);
                      const w1 = measure(line1);
                      const w2 = measure(line2);

                      const minTop = padding.top + 2;
                      const maxBottom = height - padding.bottom - 2;

                      const canPlaceAbove =
                        y - offset - (boxH * 2 + gap) >= minTop;
                      let box1Y: number, box2Y: number;

                      if (canPlaceAbove) {
                        box2Y = y - offset - boxH;
                        box1Y = box2Y - gap - boxH;
                        if (box1Y < minTop) {
                          const delta = minTop - box1Y;
                          box1Y += delta;
                          box2Y += delta;
                        }
                      } else {
                        box1Y = y + offset;
                        box2Y = box1Y + gap + boxH;
                        const overflow = box2Y + boxH - maxBottom;
                        if (overflow > 0) {
                          box1Y -= overflow;
                          box2Y -= overflow;
                        }
                      }

                      const clampCx = (cx: number, w: number) =>
                        Math.max(
                          padding.left + w / 2,
                          Math.min(cx, width - padding.right - w / 2)
                        );
                      const cx1 = clampCx(xC, w1);
                      const cx2 = clampCx(xC, w2);

                      return (
                        <>
                          <rect
                            x={cx1 - w1 / 2}
                            y={box1Y}
                            width={w1}
                            height={boxH}
                            rx={6}
                            fill="rgb(var(--card))"
                            stroke="rgb(var(--grid))"
                            strokeWidth={1}
                            fillOpacity={0.95}
                          />
                          <text
                            x={cx1}
                            y={box1Y + boxH / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={font}
                            fill="rgb(var(--fg))"
                          >
                            {line1}
                          </text>

                          <rect
                            x={cx2 - w2 / 2}
                            y={box2Y}
                            width={w2}
                            height={boxH}
                            rx={6}
                            fill="rgb(var(--card))"
                            stroke="rgb(var(--grid))"
                            strokeWidth={1}
                            fillOpacity={0.95}
                          />
                          <text
                            x={cx2}
                            y={box2Y + boxH / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={font}
                            fill="rgb(var(--fg))"
                          >
                            {line2}
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}
              </g>
            );
          })}

          <text
            x={padding.left - 8}
            y={padding.top + 8}
            textAnchor="end"
            fontSize="10"
            fill="rgb(var(--muted))"
          >
            {max.toFixed(0)}t
          </text>
        </svg>
      </div>
    </div>
  );
}
