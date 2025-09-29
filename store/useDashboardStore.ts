"use client";
import { create } from "zustand";
type DashboardState = {
  selectedCompanyId: string | null;
  selectedMonth: string | null;
  setCompany: (id: string | null) => void;
  setMonth: (ym: string | null) => void;
};
export const useDashboardStore = create<DashboardState>((set) => ({
  selectedCompanyId: null,
  selectedMonth: null,
  setCompany: (id) => set({ selectedCompanyId: id }),
  setMonth: (ym) => set({ selectedMonth: ym }),
}));
