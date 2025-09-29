import { clsx, type ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
export function formatMonthLabel(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${y}.${String(m).padStart(2, "0")}`;
}
export function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}
