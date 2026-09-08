import type { ReactNode } from "react";
import Image from "next/image";
import { ActionTogglePanel } from "@/components/action-toggle-panel";
import { CaseYouTube } from "@/components/case-youtube";
import { ViewResearchToggle } from "@/components/view-research-toggle";
import type { Project } from "@/data/projects";

const META_LABELS = [
  "Project Type",
  "Project Goal",
  "Project Theme",
  "Key Skills",
  "Channel",
  "Period",
  "Brand",
  "Tools",
  "Role",
] as const;

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

function parseMeta(item: string): { label: string; value: string } {
  const label = META_LABELS.find(
    (name) => item === name || item.startsWith(`${name} `),
  );
  if (!label) return { label: "", value: item };
  return {
    label,
    value: item.slice(label.length).trimStart(),
  };
}

function youtubeEmbedId(video: string): string | null {
  const trimmed = video.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "").slice(0, 11);
      return id || null;
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const embed = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embed) return embed[1];
  } catch {
    return null;
  }

  return null;
}

function MediaFrame({
  src,
  alt,
  accent,
  className = "",
  fit = "cover",
  containBg = "#fff",
  priority = false,
  video,
}: {
  src?: string;
  alt: string;
  accent: string;
  className?: string;
  fit?: "cover" | "contain";
  containBg?: string;
  priority?: boolean;
  video?: string;
}) {
  const youtubeId = video ? youtubeEmbedId(video) : null;

  return (
    <div
      className={`case-media${fit === "contain" ? " case-media--contain" : ""}${
        youtubeId ? " case-media--video" : ""
      } ${className}`}
      style={fit === "contain" ? { background: containBg } : undefined}
    >
      {youtubeId ? (
        <CaseYouTube videoId={youtubeId} title={alt} />
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={95}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          sizes="(max-width: 840px) 100vw, 40vw"
        />
      ) : (
        <div className="case-media__fallback" style={{ background: accent }} />
      )}
    </div>
  );
}

function FlowTriangle({
  className = "case-header__flow-arrow",
  size = 6,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 12"
      width={size}
      height={Math.round(size * 1.2)}
      aria-hidden
    >
      <path d="M1.2 1.1 8.8 6 1.2 10.9Z" fill="currentColor" />
    </svg>
  );
}

function OneLiner({ text }: { text: string }) {
  const parts = text.split(/\s*→\s*/);

  if (parts.length <= 1) {
    return <p className="case-header__oneliner">{text}</p>;
  }

  return (
    <p className="case-header__oneliner case-header__oneliner--flow">
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="case-header__flow-part">
          {part}
        </span>
      )).reduce<ReactNode[]>((nodes, part, index) => {
        if (index > 0) nodes.push(<FlowTriangle key={`arrow-${index}`} />);
        nodes.push(part);
        return nodes;
      }, [])}
    </p>
  );
}

function BulletPanel({
  title,
  items,
}: {
  title: string;
  items: { title: string; body?: string }[];
}) {
  return (
    <div className="case-panel">
      <h3 className="case-panel__title">{title}</h3>
      <ul className="case-panel__list">
        {items.map((item) => (
          <li key={item.title}>
            <p className="case-panel__item-title">{item.title}</p>
            {item.body ? (
              <p className="case-panel__item-body">{withStyledPhrases(item.body)}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProsePanel({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <div className="case-panel">
      <h3 className="case-panel__title">{title}</h3>
      <div className="case-panel__prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{withStyledPhrases(paragraph)}</p>
        ))}
      </div>
    </div>
  );
}

function ResultBlock({
  project,
  mode,
}: {
  project: Project;
  mode: "panel" | "solo";
}) {
  if (project.resultSections?.length) {
    const content = (
      <ul className="case-panel__list case-result-sections">
        {project.resultSections.map((section) => (
          <li key={section.title}>
            {section.label ? (
              <p className="case-result-section__label">{section.label}</p>
            ) : null}
            <p className="case-panel__item-title">{section.title}</p>
            {section.body ? (
              <p className="case-panel__item-body">
                {withStyledPhrases(section.body)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    );

    if (mode === "solo") {
      return (
        <section className="case-block case-result-solo">
          <h3 className="case-block__title">Result</h3>
          {content}
        </section>
      );
    }

    return (
      <div className="case-panel">
        <h3 className="case-panel__title">Result</h3>
        {content}
      </div>
    );
  }

  const resultItems =
    project.resultItems ??
    project.competencies?.map((c) => `${c.title} — ${c.body}`);

  if (resultItems?.length) {
    const items = resultItems.map((item) => ({ title: item }));
    if (mode === "solo") {
      return (
        <section className="case-block case-result-solo">
          <h3 className="case-block__title">Result</h3>
          <ul className="case-panel__list">
            {items.map((item) => (
              <li key={item.title}>
                <p className="case-panel__item-title">{item.title}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    }
    return <BulletPanel title="Result" items={items} />;
  }

  if (mode === "solo") {
    return (
      <section className="case-block case-result-solo">
        <h3 className="case-block__title">Result</h3>
        <div className="case-panel__prose">
          {project.result.map((paragraph) => (
            <p key={paragraph}>{withStyledPhrases(paragraph)}</p>
          ))}
        </div>
      </section>
    );
  }

  return <ProsePanel title="Result" paragraphs={project.result} />;
}

export function ProjectChapter({ project }: { project: Project }) {
  const prompt = project.situation[0] ?? "";
  const situationBody = project.situation.slice(1);
  const actionItems = project.actions;

  const hero = project.images?.hero;
  const mid = project.images?.mid ?? hero;
  const triptychMid = project.images?.mid;
  const actionImages = project.images?.action ?? (mid ? [mid, mid] : []);
  const resultImage = project.images?.result ?? mid;

  return (
    <article className="case">
      <header className="case-header">
        <p className="case-header__eyebrow">{project.categoryLabel}</p>
        <h2 className="case-header__title">{project.subtitle}</h2>
        {project.oneLiner ? <OneLiner text={project.oneLiner} /> : null}
        {project.links?.length ? (
          <div className="case-header__links">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="case-header__link"
              >
                <span>{link.label}</span>
                <span className="case-header__link-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="case-header__brand">{project.brand}</p>
        )}
        {project.summaryBar ? (
          <p className="case-header__summary">{project.summaryBar}</p>
        ) : null}
      </header>

      <section className="case-overview">
        <MediaFrame
          src={hero}
          alt={`${project.title} visual`}
          accent={project.accent}
          className="case-overview__media"
          fit="cover"
          video={project.video}
          priority={
            project.id === "ikea-hej-park" ||
            project.id === "lonz" ||
            project.id === "korea-travel"
          }
        />
        <div className="case-meta">
          {project.glance ? (
            <div className="case-glance">
              <p className="case-glance__title">
                {project.glance.title ?? "PROJECT AT A GLANCE"}
              </p>
              <ul className="case-glance__list">
                {project.glance.items.map((item) => (
                  <li key={item.label} className="case-glance__item">
                    <p className="case-glance__label">{item.label}</p>
                    <p className="case-glance__body">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {project.callouts?.map((callout) => (
                <div key={callout.label} className="case-callout">
                  <p className="case-meta__label">{callout.label}</p>
                  <ul className="case-callout__list">
                    {callout.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {callout.note ? (
                    <p className="case-callout__note">{callout.note}</p>
                  ) : null}
                </div>
              ))}
              {project.meta.map((item) => {
                const { label, value } = parseMeta(item);
                return (
                  <div key={item} className="case-meta__row">
                    {label ? (
                      <p className="case-meta__label">{label}</p>
                    ) : null}
                    <p className="case-meta__value">{withStyledPhrases(value)}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>

      {project.situationCompare ? (
        <section className="case-block case-situation case-situation--compare">
          <div className="case-situation__head">
            <h3 className="case-block__title">
              {project.situationTitle ?? "Situation & Task"}
            </h3>
            <p className="case-situation__prompt">{withStyledPhrases(prompt)}</p>
          </div>
          <div className="case-situation__compare">
            <div className="case-situation__card">
              <p className="case-situation__card-label">
                {project.situationCompare.left.label}
              </p>
              <p className="case-situation__card-title">
                {project.situationCompare.left.title}
              </p>
              <p className="case-situation__card-body">
                {project.situationCompare.left.body}
              </p>
            </div>
            <div className="case-situation__arrow" aria-hidden>
              <FlowTriangle className="case-situation__arrow-icon" size={12} />
            </div>
            <div className="case-situation__card">
              <p className="case-situation__card-label">
                {project.situationCompare.right.label}
              </p>
              <p className="case-situation__card-title">
                {project.situationCompare.right.title}
              </p>
              <p className="case-situation__card-body">
                {project.situationCompare.right.body}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="case-block case-situation case-situation--stack">
          <div className="case-situation__head">
            <h3 className="case-block__title">
              {project.situationTitle ?? "Situation & Task"}
            </h3>
            <p className="case-situation__prompt">{withStyledPhrases(prompt)}</p>
          </div>
          {project.situationFlow?.length ? (
            <div className="case-situation__flow" aria-label="Problem flow">
              {project.situationFlow.flatMap((step, index) => {
                const nodes = [];
                if (index > 0) {
                  nodes.push(
                    <span
                      key={`flow-arrow-${index}`}
                      className="case-situation__flow-arrow"
                      aria-hidden
                    >
                      <FlowTriangle size={8} />
                    </span>,
                  );
                }
                const isLast = index === project.situationFlow!.length - 1;
                nodes.push(
                  <span
                    key={step}
                    className={`case-situation__flow-step${isLast ? " case-situation__flow-step--focus" : ""}`}
                    style={
                      isLast
                        ? { background: project.accent, color: "#fff" }
                        : undefined
                    }
                  >
                    {step}
                  </span>,
                );
                return nodes;
              })}
            </div>
          ) : null}
          {project.situationDetail ? (
            <div className="case-situation__detail">
              <p className="case-situation__detail-label">
                {project.situationDetail.label}
              </p>
              <p className="case-situation__detail-title">
                {withStyledPhrases(project.situationDetail.title)}
              </p>
              <p className="case-situation__detail-body">
                {withStyledPhrases(project.situationDetail.body)}
              </p>
              {project.situationResearch ? (
                <ViewResearchToggle>
                  <div className="case-research__content">
                    <p className="case-research__title">
                      {project.situationResearch.title}
                    </p>
                    <div className="case-research__media">
                      <Image
                        src={project.situationResearch.image}
                        alt={project.situationResearch.title}
                        width={1600}
                        height={900}
                        quality={90}
                        className="case-research__img"
                        sizes="(max-width: 860px) 100vw, 720px"
                      />
                    </div>
                    {project.situationResearch.body?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="case-situation__detail-body"
                      >
                        {withStyledPhrases(paragraph)}
                      </p>
                    ))}
                  </div>
                </ViewResearchToggle>
              ) : null}
            </div>
          ) : situationBody.length ? (
            <div className="case-situation__body">
              {situationBody.map((paragraph) => (
                <p key={paragraph}>{withStyledPhrases(paragraph)}</p>
              ))}
            </div>
          ) : null}
        </section>
      )}

      {project.situationSteps?.length ? (
        <div className="case-situation-steps" aria-label="Process steps">
          {project.situationSteps.flatMap((step, index) => {
            const nodes = [];
            if (index > 0) {
              nodes.push(
                <div
                  key={`arrow-${step.label}`}
                  className="case-situation__arrow case-situation-steps__arrow"
                  aria-hidden
                >
                  <FlowTriangle className="case-situation__arrow-icon" size={12} />
                </div>,
              );
            }
            nodes.push(
              <section key={step.label} className="case-situation__step">
                <p className="case-situation__step-label">{step.label}</p>
                {step.title ? (
                  <p className="case-situation__step-title">{step.title}</p>
                ) : null}
                {step.body ? (
                  <p className="case-situation__step-body">{step.body}</p>
                ) : null}
              </section>,
            );
            return nodes;
          })}
        </div>
      ) : null}

      {project.layout === "triptych" ? (
        <section
          className={`case-triptych${triptychMid ? "" : " case-triptych--pair"}`}
        >
          <ActionTogglePanel
            items={actionItems}
            title={project.actionTitle}
            journey={project.actionJourney}
            accent={project.accent}
          />
          {triptychMid ? (
            <MediaFrame
              src={triptychMid}
              alt={`${project.title} detail`}
              accent={project.accent}
              className="case-triptych__media"
              fit="cover"
            />
          ) : null}
          <ResultBlock project={project} mode="panel" />
        </section>
      ) : null}

      {project.layout === "zigzag" ? (
        <>
          <section className="case-zigzag">
            <ActionTogglePanel
              items={actionItems}
              title={project.actionTitle}
              journey={project.actionJourney}
              accent={project.accent}
            />
            <MediaFrame
              src={mid}
              alt={`${project.title} action`}
              accent={project.accent}
              fit="cover"
            />
          </section>
          <section className="case-zigzag case-zigzag--flip">
            <MediaFrame
              src={resultImage}
              alt={`${project.title} result`}
              accent={project.accent}
              fit="cover"
            />
            <ResultBlock project={project} mode="panel" />
          </section>
        </>
      ) : null}

      {project.layout === "zigzag-pair" ? (
        <>
          <section className="case-zigzag case-zigzag--pair case-zigzag--mockups">
            <ActionTogglePanel
              items={actionItems}
              title={project.actionTitle}
              journey={project.actionJourney}
              accent={project.accent}
            />
            <div className="case-mockups">
              {actionImages.map((src, index) => (
                <div key={src} className="case-mockups__item">
                  <Image
                    src={src}
                    alt={`${project.title} mockup ${index + 1}`}
                    width={495}
                    height={1024}
                    quality={95}
                    className="case-mockups__img"
                    sizes="(max-width: 840px) 30vw, 160px"
                  />
                </div>
              ))}
            </div>
          </section>
          <ResultBlock project={project} mode="solo" />
        </>
      ) : null}

      {project.learned ? (
        <section className="case-block case-insight">
          <h3 className="case-block__title">What I Learned</h3>
          <div className="case-insight__body">
            <p className="case-insight__highlight">
              {withStyledPhrases(project.learned.highlight)}
            </p>
            {project.learned.body?.map((paragraph) => (
              <p key={paragraph}>{withStyledPhrases(paragraph)}</p>
            ))}
          </div>
        </section>
      ) : project.insight?.length ? (
        <section className="case-block case-insight">
          <h3 className="case-block__title">Insight</h3>
          <div className="case-insight__body">
            {project.insight.map((paragraph) => (
              <p key={paragraph}>{withStyledPhrases(paragraph)}</p>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="case-footer">© 2026 ALL RIGHTS RESERVED</footer>
    </article>
  );
}
