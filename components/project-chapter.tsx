import type { ReactNode } from "react";
import Image from "next/image";
import { ActionTogglePanel } from "@/components/action-toggle-panel";
import { ActionStack } from "@/components/case/action-stack";
import { FlowTriangle } from "@/components/case/flow-triangle";
import { LearnedSection } from "@/components/case/learned-section";
import { MediaFrame } from "@/components/case/media-frame";
import { ProblemInsightBlock } from "@/components/case/problem-insight";
import { ResultBlock } from "@/components/case/result-block";
import { SituationSection } from "@/components/case/situation-section";
import { parseMeta, withStyledPhrases } from "@/components/case/utils";
import type { Project } from "@/data/projects";

function OneLiner({ text }: { text: string }) {
  const parts = text.split(/\s*→\s*/);
  const isFlow =
    parts.length > 1 && parts.every((part) => part.trim().length <= 28);

  if (!isFlow) {
    return <p className="case-header__oneliner">{text}</p>;
  }

  return (
    <p className="case-header__oneliner case-header__oneliner--flow">
      {parts
        .map((part, index) => (
          <span key={`${part}-${index}`} className="case-header__flow-part">
            {part}
          </span>
        ))
        .reduce<ReactNode[]>((nodes, part, index) => {
          if (index > 0) nodes.push(<FlowTriangle key={`arrow-${index}`} />);
          nodes.push(part);
          return nodes;
        }, [])}
    </p>
  );
}

function CaseLayouts({ project }: { project: Project }) {
  const hero = project.images?.hero;
  const mid = project.images?.mid ?? hero;
  const triptychMid = project.images?.mid;
  const actionImages = project.images?.action ?? [];
  const resultImage = project.images?.result ?? mid;
  const actionItems = project.actions;

  if (project.layout === "triptych") {
    return (
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
    );
  }

  if (project.layout === "zigzag") {
    return (
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
    );
  }

  return (
    <>
      {actionItems.length && actionImages.length ? (
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
      ) : actionItems.length ? (
        <section className="case-block">
          <ActionTogglePanel
            items={actionItems}
            title={project.actionTitle}
            journey={project.actionJourney}
            accent={project.accent}
          />
        </section>
      ) : actionImages.length ? (
        <section className="case-block case-mockups-solo">
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
      ) : null}
      <ResultBlock project={project} mode="solo" />
    </>
  );
}

export function ProjectChapter({ project }: { project: Project }) {
  const hero = project.images?.hero;

  return (
    <article
      className="case"
      style={{ ["--case-accent" as string]: project.accent }}
    >
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
          priority={project.images?.priority ?? Boolean(hero || project.video)}
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
                    {label ? <p className="case-meta__label">{label}</p> : null}
                    <p className="case-meta__value">{withStyledPhrases(value)}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>

      <SituationSection project={project} />

      {project.projectTask ? (
        <section className="case-block case-task">
          <h3 className="case-block__title">
            {project.projectTask.title ?? "TASK"}
          </h3>
          {project.projectTask.lead ? (
            <p className="case-task__lead">{project.projectTask.lead}</p>
          ) : null}
          <p className="case-task__prompt">
            {withStyledPhrases(project.projectTask.prompt)}
          </p>
          {project.projectTask.goals.length ? (
            <div className="case-task__goals">
              {project.projectTask.goalsTitle ? (
                <p className="case-task__goals-title">
                  {project.projectTask.goalsTitle}
                </p>
              ) : null}
              <div className="case-task__grid">
                {project.projectTask.goals.map((goal) => (
                  <article
                    key={goal.label}
                    className="case-surface-card case-task__card"
                  >
                    <p className="case-kicker case-task__label">{goal.label}</p>
                    <p className="case-task__title">{goal.title}</p>
                    {goal.body ? (
                      <p className="case-task__body">{goal.body}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {project.problemInsight && !project.problemInsight.inAction ? (
        <ProblemInsightBlock insight={project.problemInsight} mode="block" />
      ) : null}

      <ActionStack project={project} />
      <CaseLayouts project={project} />

      {project.learned ? <LearnedSection learned={project.learned} /> : null}

      <footer className="case-footer">© 2026 ALL RIGHTS RESERVED</footer>
    </article>
  );
}
