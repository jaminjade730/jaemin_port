import { withStyledPhrases } from "@/components/case/utils";
import type { Project } from "@/data/projects";

type Insight = NonNullable<Project["problemInsight"]>;

export function ProblemInsightBlock({
  insight,
  mode,
}: {
  insight: Insight;
  mode: "block" | "embedded";
}) {
  const title = insight.title ?? (mode === "block" ? "VISIT MOTIVATION" : "INSIGHT");

  const body = (
    <>
      {insight.lead ? (
        <p className="case-lead case-problem-insight__lead">{insight.lead}</p>
      ) : null}
      {mode === "block" && insight.label ? (
        <p className="case-problem-insight__label">{insight.label}</p>
      ) : null}
      <div className="case-problem-insight__shift">
        <div className="case-problem-insight__card">
          <p className="case-problem-insight__card-label">
            {insight.before.label ?? "BEFORE"}
          </p>
          <p className="case-problem-insight__card-text">{insight.before.text}</p>
        </div>
        <div className="case-problem-insight__arrow" aria-hidden>
          <span className="case-problem-insight__arrow-desktop">→</span>
          <span className="case-problem-insight__arrow-mobile">↓</span>
        </div>
        <div className="case-problem-insight__card case-problem-insight__card--after">
          <p className="case-problem-insight__card-label">
            {insight.after.label ?? "AFTER"}
          </p>
          <p className="case-problem-insight__card-text">{insight.after.text}</p>
        </div>
      </div>
      <div className="case-problem-insight__body">
        {mode === "block" && insight.insightLabel ? (
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
