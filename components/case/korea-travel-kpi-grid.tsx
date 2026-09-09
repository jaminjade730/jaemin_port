"use client";

import { useEffect, useState } from "react";
import type { KoreaTravelKpiItem, KoreaTravelKpiPayload } from "@/lib/korea-travel-kpis";

export function KoreaTravelKpiGrid({
  fallbackItems,
}: {
  fallbackItems: KoreaTravelKpiItem[];
}) {
  const [items, setItems] = useState(fallbackItems);
  const [meta, setMeta] = useState<Pick<KoreaTravelKpiPayload, "source" | "updatedAt"> | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/korea-travel-kpis", {
          cache: "default",
        });
        if (!response.ok) return;
        const data = (await response.json()) as KoreaTravelKpiPayload;
        if (cancelled || !data.items?.length) return;
        setItems(data.items);
        setMeta({ source: data.source, updatedAt: data.updatedAt });
      } catch {
        // Keep fallback items on network errors.
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="case-dist-kpi__grid">
        {items.map((item) => (
          <article
            key={item.label}
            className="case-surface-card case-dist-kpi__metric"
          >
            <p className="case-dist-kpi__value">{item.value}</p>
            <p className="case-dist-kpi__metric-label">{item.label}</p>
            {item.body ? (
              <p className="case-dist-kpi__metric-body">{item.body}</p>
            ) : null}
          </article>
        ))}
      </div>
      {meta?.source === "youtube" ? (
        <p className="case-dist-kpi__sync">
          YouTube 조회수 기준 · 하루 약 3회 갱신
          {meta.updatedAt
            ? ` · ${new Date(meta.updatedAt).toLocaleString("ko-KR", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : null}
        </p>
      ) : null}
    </>
  );
}
