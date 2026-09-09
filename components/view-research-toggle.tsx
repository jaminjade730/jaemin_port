"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ResearchItem = {
  title: string;
  image?: string;
  video?: string;
  body?: string[];
};

export function ViewResearchToggle({
  label = "VIEW RESEARCH",
  items,
}: {
  label?: string;
  items: ResearchItem[];
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<ResearchItem | null>(null);

  useEffect(() => {
    if (!preview?.image && !preview?.video) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [preview]);

  return (
    <div className={`case-research${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="case-research__toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <span className="case-research__icon" aria-hidden>
          <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
            <path d="M2.2 4.2h7.6L6 9.2z" />
          </svg>
        </span>
      </button>

      <div className="case-research__body" hidden={!open}>
        <div
          className={`case-research__content${
            items.length <= 2 ? " case-research__content--pair" : ""
          }`}
        >
          {items.map((item) => (
            <figure
              key={`${item.title}-${item.image ?? item.video ?? "empty"}`}
              className="case-research__item"
            >
              <figcaption className="case-research__title">{item.title}</figcaption>
              {item.video ? (
                <button
                  type="button"
                  className="case-research__media case-research__media--video"
                  aria-label={`${item.title} 크게 보기`}
                  onClick={() => setPreview(item)}
                >
                  <video
                    className="case-research__video"
                    src={item.video}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden
                  />
                  <span className="case-research__play" aria-hidden>
                    ▶
                  </span>
                </button>
              ) : item.image ? (
                <button
                  type="button"
                  className="case-research__media"
                  aria-label={`${item.title} 크게 보기`}
                  onClick={() => setPreview(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1600}
                    height={900}
                    quality={90}
                    className="case-research__img"
                    sizes="(max-width: 860px) 80vw, 240px"
                  />
                </button>
              ) : (
                <div
                  className="case-research__placeholder"
                  aria-label={`${item.title} 이미지 자리`}
                >
                  <span>이미지 추가</span>
                </div>
              )}
              {item.body?.map((paragraph) => (
                <p key={paragraph} className="case-situation__detail-body">
                  {paragraph}
                </p>
              ))}
            </figure>
          ))}
        </div>
      </div>

      {preview?.image || preview?.video ? (
        <div
          className="case-research__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={preview.title}
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            className="case-research__lightbox-close"
            aria-label="닫기"
            onClick={() => setPreview(null)}
          >
            ×
          </button>
          <div
            className="case-research__lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="case-research__lightbox-title">{preview.title}</p>
            {preview.video ? (
              <video
                className="case-research__lightbox-video"
                src={preview.video}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={preview.image}
                alt={preview.title}
                className="case-research__lightbox-img"
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
