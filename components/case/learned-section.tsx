import { withStyledPhrases } from "@/components/case/utils";
import type { ProjectLearned } from "@/data/projects";

export function LearnedSection({ learned }: { learned: ProjectLearned }) {
  return (
    <section className="case-block case-insight">
      <h3 className="case-block__title">What I Learned</h3>
      <div className="case-insight__body">
        {learned.lead ? (
          <p className="case-lead case-insight__lead">{learned.lead}</p>
        ) : null}
        <p className="case-insight__highlight">
          {withStyledPhrases(learned.highlight)}
        </p>
        {learned.body?.map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 24)}`}>
            {withStyledPhrases(paragraph)}
          </p>
        ))}
        {learned.flow?.length ? (
          <div className="case-insight__flow-wrap">
            {learned.flowLabel ? (
              <p className="case-kicker case-insight__flow-label">
                {learned.flowLabel}
              </p>
            ) : null}
            <div
              className="case-insight__flow"
              aria-label={learned.flowLabel ?? "Thinking flow"}
            >
              {learned.flow.flatMap((step, index) => {
                const nodes = [];
                if (index > 0) {
                  nodes.push(
                    <span
                      key={`insight-arrow-${step}`}
                      className="case-insight__flow-arrow"
                      aria-hidden
                    >
                      →
                    </span>,
                  );
                }
                nodes.push(
                  <span
                    key={step}
                    className="case-surface-card case-insight__flow-step"
                  >
                    {step}
                  </span>,
                );
                return nodes;
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
