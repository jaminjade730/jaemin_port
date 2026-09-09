import { withStyledPhrases } from "@/components/case/utils";
import type { Project } from "@/data/projects";

type Insight = NonNullable<Project["problemInsight"]>;

function InsightCard({
  side,
  accent,
}: {
  side: Insight["before"];
  accent?: boolean;
}) {
  return (
    <div
      className={`case-problem-insight__card${
        accent ? " case-problem-insight__card--after" : ""
      }`}
    >
      <p className="case-problem-insight__card-label">
        {side.label ?? (accent ? "AFTER" : "BEFORE")}
      </p>
      {side.title ? (
        <p className="case-problem-insight__card-title">{side.title}</p>
      ) : null}
      <p className="case-problem-insight__card-text">{side.text}</p>
    </div>
  );
}

export function ProblemInsightBlock({
  insight,
  mode,
}: {
  insight: Insight;
  mode: "block" | "embedded";
}) {
  const title =
    insight.title ?? (mode === "block" ? "VISIT MOTIVATION" : "INSIGHT");

  const body = (
    <>
      {insight.lead ? (
        <p className="case-lead case-problem-insight__lead">{insight.lead}</p>
      ) : null}
      {mode === "block" && insight.label ? (
        <p className="case-problem-insight__label">{insight.label}</p>
      ) : null}
      <div className="case-problem-insight__shift">
        <InsightCard side={insight.before} />
        <div className="case-problem-insight__arrow" aria-hidden>
          <span className="case-problem-insight__arrow-desktop">→</span>
          <span className="case-problem-insight__arrow-mobile">↓</span>
        </div>
        <InsightCard side={insight.after} accent />
      </div>
      <div className="case-problem-insight__body">
        {insight.insightLabel ? (
          <p className="case-problem-insight__body-label">
            {insight.insightLabel}
          </p>
        ) : null}
        <p className="case-problem-insight__body-text">
          {withStyledPhrases(insight.body)}
        </p>
      </div>
    </>
  );

  if (mode === "embedded") {
    return (
      <div className="case-problem-insight case-action-stack__section">
        <h4 className="case-action-stack__title">{title}</h4>
        {body}
      </div>
    );
  }

  return (
    <section className="case-block case-problem-insight">
      <h3 className="case-block__title">{title}</h3>
      {body}
    </section>
  );
}
