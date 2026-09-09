"use client";

import { useEffect, useState } from "react";

type PersonaFlowStep = {
  label: string;
  text: string;
};

type PersonaTarget = {
  name: string;
  body: string;
  flow: PersonaFlowStep[];
  slide?: {
    title?: string;
    image: string;
  };
};

export function TargetStrategySection({
  title = "TARGET STRATEGY",
  lead,
  badge,
  targets,
  embedded = false,
}: {
  title?: string;
  lead: string;
  badge?: string;
  targets: PersonaTarget[];
  embedded?: boolean;
}) {
  const [preview, setPreview] = useState<{
    title: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    if (!preview) return;

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

  const content = (
    <>
      <h3 className={embedded ? "case-action-stack__title" : "case-block__title"}>
        {title}
      </h3>
      <p className="case-targets__lead">{lead}</p>
      {badge ? <p className="case-targets__badge">{badge}</p> : null}
      <div className="case-targets__grid">
        {targets.map((target) => (
          <article key={target.name} className="case-targets__item">
            <div className="case-targets__item-head">
              <p className="case-targets__name">{target.name}</p>
              {target.slide ? (
                <button
                  type="button"
                  className="case-targets__slide-toggle"
                  onClick={() =>
                    setPreview({
                      title: target.slide?.title ?? target.name,
                      image: target.slide!.image,
                    })
                  }
                  aria-label={`${target.name} 장표 보기`}
                >
                  VIEW SLIDE
                </button>
              ) : null}
            </div>
            <p className="case-targets__body">{target.body}</p>
            {target.flow?.length ? (
              <div
                className="case-targets__flow"
                aria-label={`${target.name} strategy flow`}
              >
                {target.flow.map((step, index) => (
                  <div key={step.label} className="case-targets__step-wrap">
                    {index > 0 ? (
                      <span className="case-targets__arrow" aria-hidden>
                        →
                      </span>
                    ) : null}
                    <div className="case-targets__step">
                      <p className="case-targets__step-label">{step.label}</p>
                      <p className="case-targets__step-text">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </>
  );

  return (
    <>
      {embedded ? (
        <div className="case-targets case-action-stack__section">{content}</div>
      ) : (
        <section className="case-block case-targets">{content}</section>
      )}

      {preview ? (
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
            className="case-concept__lightbox-panel case-targets__lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="case-research__lightbox-title">{preview.title}</p>
            <img
              src={preview.image}
              alt={preview.title}
              className="case-research__lightbox-img case-targets__lightbox-img"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
