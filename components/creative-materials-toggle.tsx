"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";

export type CreativeMaterialItem = {
  title: string;
  image?: string;
  video?: string;
  body?: string[];
};

export type CreativeMaterialGroup = {
  title: string;
  items: CreativeMaterialItem[];
};

function MaterialSlide({
  item,
  onPreview,
}: {
  item: CreativeMaterialItem;
  onPreview: (item: CreativeMaterialItem) => void;
}) {
  if (item.video) {
    return (
      <button
        type="button"
        className="case-mat-slide__media case-mat-slide__media--video"
        aria-label={`${item.title} 크게 보기`}
        onClick={() => onPreview(item)}
      >
        <video
          className="case-mat-slide__video"
          src={item.video}
          muted
          playsInline
          preload="metadata"
          aria-hidden
        />
        <span className="case-mat-slide__play" aria-hidden>
          ▶
        </span>
      </button>
    );
  }

  if (item.image) {
    return (
      <button
        type="button"
        className="case-mat-slide__media"
        aria-label={`${item.title} 크게 보기`}
        onClick={() => onPreview(item)}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={1600}
          height={900}
          quality={90}
          className="case-mat-slide__img"
          sizes="(max-width: 860px) 88vw, 420px"
        />
      </button>
    );
  }

  return (
    <div className="case-mat-slide__placeholder" aria-label={`${item.title} 자리`}>
      <span>이미지 추가</span>
    </div>
  );
}

function MaterialGroupSlider({
  group,
  onPreview,
}: {
  group: CreativeMaterialGroup;
  onPreview: (item: CreativeMaterialItem) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = group.items.length;
  const labelId = useId();

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      const track = trackRef.current;
      if (!track) return;
      const slide = track.children[clamped] as HTMLElement | undefined;
      slide?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setIndex(clamped);
    },
    [total],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const width = track.clientWidth;
      if (!width) return;
      const next = Math.round(track.scrollLeft / width);
      setIndex(Math.max(0, Math.min(total - 1, next)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <section className="case-mat-group" aria-labelledby={labelId}>
      <div className="case-mat-group__header">
        <h5 id={labelId} className="case-mat-group__title">
          {group.title}
        </h5>
        <p className="case-mat-group__count" aria-live="polite">
          {index + 1} / {total}
        </p>
      </div>

      <div className="case-mat-group__stage">
        {total > 1 ? (
          <button
            type="button"
            className="case-mat-group__nav case-mat-group__nav--prev"
            aria-label="이전 소재"
            disabled={index <= 0}
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>
        ) : null}

        <div
          ref={trackRef}
          className="case-mat-group__track"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={group.title}
          onKeyDown={onKeyDown}
        >
          {group.items.map((item) => (
            <figure key={`${item.title}-${item.image ?? item.video}`} className="case-mat-slide">
              <figcaption className="case-mat-slide__title">{item.title}</figcaption>
              <MaterialSlide item={item} onPreview={onPreview} />
              {item.body?.map((paragraph) => (
                <p key={paragraph} className="case-situation__detail-body">
                  {paragraph}
                </p>
              ))}
            </figure>
          ))}
        </div>

        {total > 1 ? (
          <button
            type="button"
            className="case-mat-group__nav case-mat-group__nav--next"
            aria-label="다음 소재"
            disabled={index >= total - 1}
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="case-mat-group__dots" role="tablist" aria-label={`${group.title} 페이지`}>
          {group.items.map((item, itemIndex) => (
            <button
              key={`${item.title}-dot`}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`${itemIndex + 1}번째 소재`}
              className={`case-mat-group__dot${
                itemIndex === index ? " is-active" : ""
              }`}
              onClick={() => goTo(itemIndex)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function CreativeMaterialsToggle({
  label = "VIEW CREATIVE",
  groups,
}: {
  label?: string;
  groups: CreativeMaterialGroup[];
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<CreativeMaterialItem | null>(null);

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

  if (!groups.length) return null;

  return (
    <div className={`case-research case-mat${open ? " is-open" : ""}`}>
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

      <div className="case-research__body case-mat__body" hidden={!open}>
        <div className="case-mat__groups">
          {groups.map((group) => (
            <MaterialGroupSlider
              key={group.title}
              group={group}
              onPreview={setPreview}
            />
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
