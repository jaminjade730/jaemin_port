"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { NavItem } from "@/data/nav";

export type PortfolioContextValue = {
  openId: string | null;
  openPanel: (id: string) => void;
  items: NavItem[];
};

export const PortfolioContext = createContext<PortfolioContextValue | null>(
  null,
);

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within PortfolioShell");
  }
  return ctx;
}

export function PortfolioProvider({
  value,
  children,
}: {
  value: PortfolioContextValue;
  children: ReactNode;
}) {
  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
