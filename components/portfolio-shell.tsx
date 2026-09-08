"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { PortfolioProvider } from "@/components/portfolio-context";
import type { NavItem } from "@/data/nav";

function PanelChrome({
  title,
  onClose,
  children,
}: {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="panel-close absolute right-4 top-4 z-20 px-3"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}

export function PortfolioShell({
  items,
  panels,
  children,
}: {
  items: NavItem[];
  panels: Record<string, ReactNode>;
  children: ReactNode;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const openPanel = useCallback((id: string) => {
    setOpenId(id);
  }, []);

  const closePanel = useCallback(() => {
    setOpenId(null);
  }, []);

  useEffect(() => {
    if (!openId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openId, closePanel]);

  const value = useMemo(
    () => ({ openId, openPanel, items }),
    [openId, openPanel, items],
  );

  const panel = openId ? panels[openId] : null;
  const title = items.find((item) => item.id === openId)?.label;

  return (
    <PortfolioProvider value={value}>
      {children}

      {panel ? (
        <PanelChrome title={title} onClose={closePanel}>
          {panel}
        </PanelChrome>
      ) : null}
    </PortfolioProvider>
  );
}
