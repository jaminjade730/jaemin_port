"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type PreviewSlide = {
  title?: string;
  images: string[];
};

export function ConceptFlowVisual({
  flow,
  outdoorPreviews = [],
}: {
  flow: string[];
  outdoorPreviews?: PreviewSlide[];
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!previewOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
      if (event.key === "ArrowRight" && outdoorPreviews.length > 1) {
        setActiveIndex((i) => (i + 1) % outdoorPreviews.length);
      }
      if (event.key === "ArrowLeft" && outdoorPreviews.length > 1) {
        setActiveIndex(
          (i) => (i - 1 + outdoorPreviews.length) % outdoorPreviews.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewOpen, outdoorPreviews.length]);

  const outdoorLabel = flow[1] ?? "OUTDOOR HEJ! PARK";
  const active = outdoorPreviews[activeIndex];
  const activeImages = active?.images ?? [];

  return (
    <>
      <div className="case-concept__flow" aria-label="Concept flow">
        <div className="case-concept__pair">
          <span className="case-concept__step">{flow[0]}</span>
          <span className="case-concept__pair-arrow" aria-hidden>
            ↕
          </span>
          <div className="case-concept__step-wrap">
            <button
              type="button"
              className="case-concept__step case-concept__step--accent case-concept__step--preview"
              onClick={() => {
                if (!outdoorPreviews.length) return;
                setActiveIndex(0);
                setPreviewOpen(true);
              }}
              disabled={!outdoorPreviews.length}
              aria-label={`${outdoorLabel} 프리뷰 보기`}
            >
              <span>{outdoorLabel}</span>
              {outdoorPreviews.length ? (
                <span className="case-concept__preview-hint">PREVIEW</span>
              ) : null}
            </button>
          </div>
        </div>
        {flow.slice(2).map((step) => (
          <div key={step} className="case-concept__stack">
            <span className="case-concept__down" aria-hidden>
              ↓
            </span>
            <span className="case-concept__step">{step}</span>
          </div>
        ))}
      </div>

      {previewOpen && active && activeImages.length ? (
        <div
          className="case-research__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={outdoorLabel}
          onClick={() => setPreviewOpen(false)}
        >
          <button
            type="button"
            className="case-research__lightbox-close"
            aria-label="닫기"
            onClick={() => setPreviewOpen(false)}
          >
            ×
          </button>
          <div
            className="case-concept__lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="case-concept__lightbox-head">
              <p className="case-research__lightbox-title">
                {active.title ?? outdoorLabel}
              </p>
              {outdoorPreviews.length > 1 ? (
                <p className="case-concept__lightbox-count">
                  {activeIndex + 1} / {outdoorPreviews.length}
                </p>
              ) : null}
            </div>
            <div
              className={`case-concept__lightbox-stage${activeImages.length > 1 ? " case-concept__lightbox-stage--pair" : ""}`}
            >
              {activeImages.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={active.title ?? outdoorLabel}
                  className="case-concept__lightbox-img"
                />
              ))}
            </div>
            {outdoorPreviews.length > 1 ? (
              <div className="case-concept__lightbox-thumbs">
                {outdoorPreviews.map((item, index) => (
                  <button
                    key={`${item.title ?? "preview"}-${item.images[0]}`}
                    type="button"
                    className={`case-concept__thumb${index === activeIndex ? " is-active" : ""}${item.images.length > 1 ? " case-concept__thumb--pair" : ""}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={item.title ?? `프리뷰 ${index + 1}`}
                  >
                    {item.images.length > 1 ? (
                      <span className="case-concept__thumb-pair">
                        {item.images.map((src) => (
                          <Image
                            key={src}
                            src={src}
                            alt=""
                            width={120}
                            height={160}
                            className="case-concept__thumb-img"
                          />
                        ))}
                      </span>
                    ) : (
                      <Image
                        src={item.images[0]}
                        alt=""
                        width={240}
                        height={160}
                        className="case-concept__thumb-img"
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
