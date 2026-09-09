import Image from "next/image";
import { CaseYouTube } from "@/components/case-youtube";
import { ConceptFlowVisual } from "@/components/concept-flow-visual";
import { ProblemInsightBlock } from "@/components/case/problem-insight";
import { TargetStrategySection } from "@/components/target-strategy-section";
import { CreativeMaterialsToggle } from "@/components/creative-materials-toggle";
import { withStyledPhrases, youtubeEmbedId } from "@/components/case/utils";
import type { Project } from "@/data/projects";

function hasActionStack(project: Project) {
  return Boolean(
    project.concept ||
      project.targetStrategy ||
      project.lockInStrategy ||
      project.problemInsight?.inAction ||
      project.interactiveConcept ||
      project.interactiveJourney ||
      project.aiCreative ||
      project.creativeStrategy ||
      project.mediaStrategy,
  );
}

export function ActionStack({ project }: { project: Project }) {
  if (!hasActionStack(project)) return null;

  const leftVideoId = project.interactiveConcept?.left.video
    ? youtubeEmbedId(project.interactiveConcept.left.video)
    : null;
  const rightVideoId = project.interactiveConcept?.right.video
    ? youtubeEmbedId(project.interactiveConcept.right.video)
    : null;

  return (
    <section className="case-block case-action-stack">
      <h3 className="case-block__title">{project.actionTitle ?? "Action"}</h3>

      {project.problemInsight?.inAction ? (
        <ProblemInsightBlock insight={project.problemInsight} mode="embedded" />
      ) : null}

      {project.interactiveConcept ? (
        <div className="case-interactive case-action-stack__section">
          <h4 className="case-action-stack__title">
            {project.interactiveConcept.title ?? "INTERACTIVE CONCEPT"}
          </h4>
          <p className="case-interactive__headline">
            {project.interactiveConcept.headline}
          </p>
          <div className="case-interactive__compare">
            <article className="case-interactive__card">
              <p className="case-interactive__label">
                {project.interactiveConcept.left.label}
              </p>
              <p className="case-interactive__name">
                {project.interactiveConcept.left.title}
              </p>
              <p className="case-interactive__detail">
                {project.interactiveConcept.left.body}
              </p>
              {leftVideoId ? (
                <div className="case-interactive__video case-media case-media--video">
                  <CaseYouTube
                    videoId={leftVideoId}
                    title={`${project.interactiveConcept.left.title} video`}
                  />
                </div>
              ) : null}
            </article>
            <div className="case-interactive__versus" aria-hidden>
              {project.interactiveConcept.versus ?? "VS"}
            </div>
            <article className="case-interactive__card case-interactive__card--accent">
              <p className="case-interactive__label">
                {project.interactiveConcept.right.label}
              </p>
              <p className="case-interactive__name">
                {project.interactiveConcept.right.title}
              </p>
              <p className="case-interactive__detail">
                {project.interactiveConcept.right.body}
              </p>
              {rightVideoId ? (
                <div className="case-interactive__video case-media case-media--video">
                  <CaseYouTube
                    videoId={rightVideoId}
                    title={`${project.interactiveConcept.right.title} video`}
                  />
                </div>
              ) : null}
            </article>
          </div>
          <p className="case-interactive__body">
            {withStyledPhrases(project.interactiveConcept.body)}
          </p>
        </div>
      ) : null}

      {project.interactiveJourney ? (
        <div className="case-ijourney case-action-stack__section">
          <h4 className="case-action-stack__title">
            {project.interactiveJourney.title ?? "INTERACTIVE JOURNEY"}
          </h4>
          <p className="case-lead case-ijourney__lead">
            {project.interactiveJourney.lead}
          </p>
          {project.interactiveJourney.body ? (
            <p className="case-ijourney__desc">
              {withStyledPhrases(project.interactiveJourney.body)}
            </p>
          ) : null}
          <div className="case-ijourney__flow" aria-label="Interactive journey">
            {project.interactiveJourney.steps.flatMap((step, index) => {
              const nodes = [];
              if (index > 0) {
                nodes.push(
                  <span
                    key={`ijourney-arrow-${step.label}`}
                    className="case-ijourney__arrow"
                    aria-hidden
                  >
                    →
                  </span>,
                );
              }
              nodes.push(
                <article key={step.label} className="case-ijourney__step">
                  <p className="case-kicker case-ijourney__label">{step.label}</p>
                  <p className="case-ijourney__title">{step.title}</p>
                  <p className="case-ijourney__body">{step.body}</p>
                </article>,
              );
              return nodes;
            })}
          </div>
        </div>
      ) : null}

      {project.creativeStrategy ? (
        <div className="case-creative-strategy case-action-stack__section">
          <h4 className="case-action-stack__title">
            {project.creativeStrategy.title ?? "CREATIVE STRATEGY"}
          </h4>
          {project.creativeStrategy.lead ? (
            <p className="case-lead case-creative-strategy__lead">
              {project.creativeStrategy.lead}
            </p>
          ) : null}
          <div className="case-creative-strategy__grid">
            {project.creativeStrategy.items.map((item) => (
              <article
                key={item.label}
                className="case-surface-card case-creative-strategy__card"
              >
                <p className="case-kicker case-creative-strategy__label">
                  {item.label}
                </p>
                <p className="case-creative-strategy__title">{item.title}</p>
                {item.body ? (
                  <p className="case-creative-strategy__body">{item.body}</p>
                ) : null}
              </article>
            ))}
          </div>
          {project.creativeStrategy.materials?.groups.length ? (
            <CreativeMaterialsToggle
              label={
                project.creativeStrategy.materials.label ?? "VIEW CREATIVE"
              }
              groups={project.creativeStrategy.materials.groups}
            />
          ) : null}
        </div>
      ) : null}

      {project.mediaStrategy ? (
        <div className="case-media-strategy case-action-stack__section">
          <h4 className="case-action-stack__title">
            {project.mediaStrategy.title ?? "MEDIA STRATEGY"}
          </h4>
          <p className="case-lead case-media-strategy__lead">
            {project.mediaStrategy.lead}
          </p>
          {project.mediaStrategy.body ? (
            <p className="case-media-strategy__desc">
              {withStyledPhrases(project.mediaStrategy.body)}
            </p>
          ) : null}
          <div className="case-media-strategy__grid">
            {project.mediaStrategy.channels.map((channel) => (
              <article
                key={channel.label}
                className="case-surface-card case-media-strategy__card"
              >
                <div className="case-media-strategy__card-top">
                  <p className="case-kicker case-media-strategy__label">
                    {channel.label}
                  </p>
                  <p className="case-media-strategy__share">{channel.share}</p>
                </div>
                <p className="case-media-strategy__stage">{channel.stage}</p>
                <p className="case-media-strategy__body">{channel.body}</p>
              </article>
            ))}
          </div>
          <div className="case-media-strategy__mix">
            <p className="case-kicker case-media-strategy__mix-label">
              {project.mediaStrategy.mix.title ?? "MEDIA MIX"}
            </p>
            <p className="case-media-strategy__mix-shares">
              {project.mediaStrategy.mix.shares}
            </p>
            <p className="case-media-strategy__mix-flow">
              {project.mediaStrategy.mix.flow}
            </p>
            {project.mediaStrategy.mix.note ? (
              <p className="case-media-strategy__mix-note">
                {project.mediaStrategy.mix.note}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {project.aiCreative ? (
        <div className="case-ai-creative case-action-stack__section">
          <h4 className="case-action-stack__title">
            {project.aiCreative.title ?? "AI CREATIVE"}
          </h4>
          <p className="case-lead case-ai-creative__lead">
            {project.aiCreative.lead}
          </p>
          {project.aiCreative.body ? (
            <p className="case-ai-creative__desc">
              {withStyledPhrases(project.aiCreative.body)}
            </p>
          ) : null}
          <div
            className={`case-ai-creative__layout${
              project.aiCreative.images?.length
                ? " case-ai-creative__layout--split"
                : ""
            }`}
          >
            <div className="case-ai-creative__stack">
              {project.aiCreative.items.map((item) => (
                <article
                  key={item.label}
                  className="case-surface-card case-ai-creative__card"
                >
                  <p className="case-kicker case-ai-creative__label">
                    {item.label}
                  </p>
                  <p className="case-ai-creative__title">{item.title}</p>
                  <p className="case-ai-creative__body">{item.body}</p>
                </article>
              ))}
            </div>
            {project.aiCreative.images?.length ? (
              <div className="case-ai-creative__visuals">
                {project.aiCreative.images.map((image) => (
                  <figure key={image.src} className="case-ai-creative__shot">
                    {image.label ? (
                      <figcaption className="case-kicker case-ai-creative__shot-label">
                        {image.label}
                      </figcaption>
                    ) : null}
                    <div className="case-ai-creative__shot-frame">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={95}
                        className="object-cover"
                        sizes="(max-width: 839px) 100vw, 48vw"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {project.concept ? (
        <div className="case-concept case-action-stack__section">
          <h4 className="case-action-stack__title">
            {project.concept.title ?? "CONCEPT"}
          </h4>
          <div className="case-concept__hero">
            <p className="case-concept__name">{project.concept.name}</p>
            <p className="case-concept__tagline">{project.concept.tagline}</p>
            <p className="case-concept__body">
              {withStyledPhrases(project.concept.body)}
            </p>
          </div>
          {project.concept.flow.length ? (
            <ConceptFlowVisual
              flow={project.concept.flow}
              outdoorPreviews={project.concept.outdoorPreviews}
            />
          ) : null}
        </div>
      ) : null}

      {project.targetStrategy ? (
        <TargetStrategySection
          title={project.targetStrategy.title}
          lead={project.targetStrategy.lead}
          badge={project.targetStrategy.badge}
          targets={project.targetStrategy.targets}
          embedded
        />
      ) : null}

      {project.lockInStrategy ? (
        <div className="case-lockin case-action-stack__section">
          <h4 className="case-action-stack__title">
            {project.lockInStrategy.title ?? "LOCK-IN STRATEGY"}
          </h4>
          <div className="case-lockin__grid">
            {project.lockInStrategy.columns.map((column) => (
              <article key={column.label} className="case-lockin__col">
                <p className="case-lockin__label">{column.label}</p>
                <p className="case-lockin__headline">{column.headline}</p>
                <div className="case-lockin__flow" aria-label={column.headline}>
                  {column.flow.map((step, index) => (
                    <div key={step} className="case-lockin__step-wrap">
                      {index > 0 ? (
                        <span className="case-lockin__arrow" aria-hidden>
                          →
                        </span>
                      ) : null}
                      <span className="case-lockin__step">{step}</span>
                    </div>
                  ))}
                  {column.loop ? (
                    <span className="case-lockin__loop" aria-hidden>
                      ↺
                    </span>
                  ) : null}
                </div>
                <p className="case-lockin__body">
                  {withStyledPhrases(column.body)}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
