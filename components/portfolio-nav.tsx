"use client";

import { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/components/portfolio-context";

export function PortfolioNav() {
  const { items, openId, openPanel } = usePortfolio();
  const [previewId, setPreviewId] = useState<string | null>(null);

  const previewItem =
    items.find((item) => item.id === previewId) ??
    items.find((item) => item.id === openId) ??
    items[0] ??
    null;

  const containPreview =
    previewItem?.preview?.includes("logo") ||
    previewItem?.id === "ikea-hej-park" ||
    previewItem?.id === "variway" ||
    previewItem?.id === "lov3-room";

  return (
    <nav aria-label="작업 목록" className="works-nav">
      <div
        className={`bento-cell board-cell board-preview${
          containPreview ? " board-preview--contain" : ""
        }`}
        aria-hidden={!previewItem}
        style={
          previewItem?.id === "ikea-hej-park"
            ? { background: previewItem.color }
            : previewItem?.id === "variway" ||
                previewItem?.id === "lonz" ||
                previewItem?.id === "lov3-room"
              ? { background: "#ffffff" }
              : undefined
        }
      >
        {previewItem?.id === "lov3-room" && previewItem.preview ? (
          <div className="board-preview__brand">
            <Image
              src={previewItem.preview}
              alt=""
              width={72}
              height={72}
              priority
              className="board-preview__brand-logo"
            />
            <p className="board-preview__brand-label">LOV3_ROOM</p>
          </div>
        ) : previewItem?.preview ? (
          <Image
            src={previewItem.preview}
            alt=""
            fill
            priority
            quality={95}
            className={containPreview ? "object-contain p-5" : "object-cover"}
            sizes="(max-width: 860px) 100vw, 45vw"
          />
        ) : null}
      </div>

      <div className="bento-cell board-cell board-works">
        <p className="profile-cell__pill">WORKS</p>
        <div className="board-works__list">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`board-works__link${
                previewId === item.id || openId === item.id ? " is-active" : ""
              }`}
              aria-current={openId === item.id ? "true" : undefined}
              onClick={() => openPanel(item.id)}
              onMouseEnter={() => setPreviewId(item.id)}
              onFocus={() => setPreviewId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
