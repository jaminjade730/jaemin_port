"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

function journeyLoopPoint(
  progress: number,
  box: { x: number; y: number; w: number; h: number; r: number },
) {
  const { x, y, w, h, r } = box;
  const straightX = Math.max(w - 2 * r, 0);
  const straightY = Math.max(h - 2 * r, 0);
  const arc = (Math.PI * r) / 2;
  const segments = [
    { len: straightX, type: "top" as const },
    { len: arc, type: "tr" as const },
    { len: straightY, type: "right" as const },
    { len: arc, type: "br" as const },
    { len: straightX, type: "bottom" as const },
    { len: arc, type: "bl" as const },
    { len: straightY, type: "left" as const },
    { len: arc, type: "tl" as const },
  ];
  const total = segments.reduce((sum, segment) => sum + segment.len, 0);
  let distance = ((progress % 1) + 1) % 1 * total;

  for (const segment of segments) {
    if (distance > segment.len) {
      distance -= segment.len;
      continue;
    }

    const t = segment.len === 0 ? 0 : distance / segment.len;

    switch (segment.type) {
      case "top":
        return { x: x + r + straightX * t, y, tx: 1, ty: 0 };
      case "tr": {
        const a = -Math.PI / 2 + t * (Math.PI / 2);
        return {
          x: x + w - r + Math.cos(a) * r,
          y: y + r + Math.sin(a) * r,
          tx: -Math.sin(a),
          ty: Math.cos(a),
        };
      }
      case "right":
        return { x: x + w, y: y + r + straightY * t, tx: 0, ty: 1 };
      case "br": {
        const a = t * (Math.PI / 2);
        return {
          x: x + w - r + Math.cos(a) * r,
          y: y + h - r + Math.sin(a) * r,
          tx: -Math.sin(a),
          ty: Math.cos(a),
        };
      }
      case "bottom":
        return {
          x: x + w - r - straightX * t,
          y: y + h,
          tx: -1,
          ty: 0,
        };
      case "bl": {
        const a = Math.PI / 2 + t * (Math.PI / 2);
        return {
          x: x + r + Math.cos(a) * r,
          y: y + h - r + Math.sin(a) * r,
          tx: -Math.sin(a),
          ty: Math.cos(a),
        };
      }
      case "left":
        return {
          x,
          y: y + h - r - straightY * t,
          tx: 0,
          ty: -1,
        };
      case "tl": {
        const a = Math.PI + t * (Math.PI / 2);
        return {
          x: x + r + Math.cos(a) * r,
          y: y + r + Math.sin(a) * r,
          tx: -Math.sin(a),
          ty: Math.cos(a),
        };
      }
    }
  }

  return { x: x + r, y, tx: 1, ty: 0 };
}

const JOURNEY_LOOP_BOX = { x: 48, y: 36, w: 544, h: 208, r: 34 };
const JOURNEY_LOOP_VIEW = { w: 640, h: 280 };

function journeyLoopMetrics(box: {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}) {
  const straightX = Math.max(box.w - 2 * box.r, 0);
  const straightY = Math.max(box.h - 2 * box.r, 0);
  const arc = (Math.PI * box.r) / 2;
  const total = 2 * straightX + 2 * straightY + 4 * arc;
  return { straightX, straightY, arc, total };
}

/** 직사각형 루프: 1·3은 좌·우, 2는 상단, 4·5는 하단 */
function journeySlotProgress(
  index: number,
  count: number,
  box: { x: number; y: number; w: number; h: number; r: number },
) {
  const { straightX, straightY, arc, total } = journeyLoopMetrics(box);

  if (count === 5) {
    const topAt = (t: number) => straightX * t;
    const rightAt = (t: number) => straightX + arc + straightY * t;
    const bottomAt = (t: number) =>
      straightX + arc + straightY + arc + straightX * t;
    const leftAt = (t: number) =>
      straightX + arc + straightY + arc + straightX + arc + straightY * t;
    // clockwise: left → top → right → bottom → left
    const distances = [
      leftAt(0.68), // 01 EXPERIENCE — left (upper)
      topAt(0.5), // 02 INTEREST — top
      rightAt(0.32), // 03 PURCHASE — right (upper)
      bottomAt(0.18), // 04 REMIND — bottom right
      bottomAt(0.82), // 05 REVISIT — bottom left
    ];
    return distances[index] / total;
  }

  if (count === 4) {
    const topAt = (t: number) => straightX * t;
    const bottomAt = (t: number) =>
      straightX + arc + straightY + arc + straightX * t;
    const distances = [topAt(1 / 4), topAt(3 / 4), bottomAt(1 / 4), bottomAt(3 / 4)];
    return distances[index] / total;
  }

  return (index + 0.5) / count;
}

function journeyArrowProgress(
  index: number,
  count: number,
  box: { x: number; y: number; w: number; h: number; r: number },
) {
  const a = journeySlotProgress(index, count, box);
  const b = journeySlotProgress((index + 1) % count, count, box);
  return b > a ? (a + b) / 2 : (a + b + 1) / 2 % 1;
}

type ActionItem = {
  label?: string;
  title: string;
  summary?: string;
  body: string[];
};

function withStyledPhrases(text: string): ReactNode {
  const phrases = [
    { value: "Live in your noize", italic: true },
    { value: "Tea-like Coffee", italic: false },
  ];
  type Segment =
    | { type: "text"; value: string }
    | { type: "phrase"; value: string; italic: boolean };

  let segments: Segment[] = [{ type: "text", value: text }];

  for (const phrase of phrases) {
    segments = segments.flatMap((segment) => {
      if (segment.type !== "text" || !segment.value.includes(phrase.value)) {
        return [segment];
      }

      const parts = segment.value.split(phrase.value);
      const next: Segment[] = [];

      parts.forEach((part, index) => {
        if (index > 0) {
          next.push({
            type: "phrase",
            value: phrase.value,
            italic: phrase.italic,
          });
        }
        if (part) next.push({ type: "text", value: part });
      });

      return next;
    });
  }

  const nodes: ReactNode[] = [];

  segments.forEach((segment, index) => {
    if (segment.type === "phrase") {
      const content = `‘${segment.value}’`;
      nodes.push(
        segment.italic ? (
          <em key={`phrase-${index}`} className="italic">
            {content}
          </em>
        ) : (
          <span key={`phrase-${index}`}>{content}</span>
        ),
      );

      const following = segments[index + 1];
      if (
        following?.type === "text" &&
        following.value &&
        !/^[\s)»\]）]/.test(following.value)
      ) {
        nodes.push(" ");
      }
      return;
    }

    nodes.push(segment.value);
  });

  return nodes;
}

export function ActionTogglePanel({
  items,
  title = "Action",
  journey,
  accent,
}: {
  items: ActionItem[];
  title?: string;
  journey?: { label: string; title: string }[];
  accent?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="case-panel">
      <h3 className="case-panel__title">{title}</h3>
      {journey?.length ? (
        <div
          className="case-journey case-journey--cycle"
          style={
            {
              ...(accent ? { "--journey-accent": accent } : {}),
              "--journey-count": journey.length,
            } as CSSProperties
          }
        >
          <div className="case-journey__canvas">
            <svg
              className="case-journey__ring"
              viewBox={`0 0 ${JOURNEY_LOOP_VIEW.w} ${JOURNEY_LOOP_VIEW.h}`}
              preserveAspectRatio="none"
              aria-hidden
            >
              <rect
                className="case-journey__ring-track"
                x={JOURNEY_LOOP_BOX.x}
                y={JOURNEY_LOOP_BOX.y}
                width={JOURNEY_LOOP_BOX.w}
                height={JOURNEY_LOOP_BOX.h}
                rx={JOURNEY_LOOP_BOX.r}
                ry={JOURNEY_LOOP_BOX.r}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {journey.map((_, tick) => {
                const point = journeyLoopPoint(
                  journeyArrowProgress(tick, journey.length, JOURNEY_LOOP_BOX),
                  JOURNEY_LOOP_BOX,
                );
                const size = 7;
                const ax = point.x + point.tx * size;
                const ay = point.y + point.ty * size;
                const bx =
                  point.x -
                  point.tx * size * 0.55 -
                  point.ty * size * 0.7;
                const by =
                  point.y -
                  point.ty * size * 0.55 +
                  point.tx * size * 0.7;
                const cx =
                  point.x -
                  point.tx * size * 0.55 +
                  point.ty * size * 0.7;
                const cy =
                  point.y -
                  point.ty * size * 0.55 -
                  point.tx * size * 0.7;
                return (
                  <path
                    key={tick}
                    className="case-journey__ring-arrow"
                    d={`M${ax} ${ay} L${bx} ${by} L${cx} ${cy} Z`}
                    fill="currentColor"
                  />
                );
              })}
            </svg>

            <div className="case-journey__core">
              <strong className="case-journey__core-title">LOCK-IN</strong>
              <span className="case-journey__core-sub">CYCLE</span>
            </div>

            <ol className="case-journey__orbit">
              {journey.map((step, index) => {
                const point = journeyLoopPoint(
                  journeySlotProgress(index, journey.length, JOURNEY_LOOP_BOX),
                  JOURNEY_LOOP_BOX,
                );
                return (
                  <li
                    key={step.label}
                    className="case-journey__step"
                    style={
                      {
                        left: `${(point.x / JOURNEY_LOOP_VIEW.w) * 100}%`,
                        top: `${(point.y / JOURNEY_LOOP_VIEW.h) * 100}%`,
                      } as CSSProperties
                    }
                  >
                    <div className="case-journey__node">
                      <span className="case-journey__index" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="case-journey__label">
                        {step.label.replace(/^\d+\s+/, "")}
                      </span>
                      <span className="case-journey__title">{step.title}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      ) : null}
      {items.length ? (
      <ul className="case-panel__list case-action-list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `action-panel-${index}`;

          return (
            <li key={item.title} className={isOpen ? "is-open" : undefined}>
              <button
                type="button"
                className="case-action__toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="case-action__heading">
                  {item.label ? (
                    <span className="case-action__label">{item.label}</span>
                  ) : null}
                  <span className="case-action__title">{item.title}</span>
                </span>
                <span className="case-action__icon" aria-hidden>
                  <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
                    <path d="M2.2 4.2h7.6L6 9.2z" />
                  </svg>
                </span>
              </button>

              {item.summary ? (
                <p className="case-action__summary">
                  {withStyledPhrases(item.summary)}
                </p>
              ) : null}

              <div
                id={panelId}
                className="case-action__body"
                hidden={!isOpen}
              >
                {item.body.map((paragraph) => (
                  <p key={paragraph}>{withStyledPhrases(paragraph)}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      ) : null}
    </div>
  );
}
