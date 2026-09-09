import { FlowTriangle } from "@/components/case/flow-triangle";
import { withStyledPhrases } from "@/components/case/utils";
import { ViewResearchToggle } from "@/components/view-research-toggle";
import type { Project } from "@/data/projects";

export function SituationSection({ project }: { project: Project }) {
  const prompt = project.situation[0] ?? "";
  const situationBody = project.situation.slice(1);

  const steps = project.situationSteps?.length ? (
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
  ) : null;

  if (project.situationCompare) {
    return (
      <>
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
        {steps}
      </>
    );
  }

  return (
    <>
      <section className="case-block case-situation case-situation--stack">
        <div className="case-situation__head">
          <h3 className="case-block__title">
            {project.situationTitle ?? "Situation & Task"}
          </h3>
          <p className="case-situation__prompt">{withStyledPhrases(prompt)}</p>
        </div>
        {!project.situationDetail && situationBody.length ? (
          <div className="case-situation__body">
            {situationBody.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 24)}`}>
                {withStyledPhrases(paragraph)}
              </p>
            ))}
          </div>
        ) : null}
        {project.situationFlow?.length ? (
          <div className="case-situation__flow-wrap">
            {project.situationFlowLabel ? (
              <p className="case-situation__flow-label">
                {project.situationFlowLabel}
              </p>
            ) : null}
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
            {project.situationResearch?.length ? (
              <ViewResearchToggle items={project.situationResearch} />
            ) : null}
          </div>
        ) : null}
      </section>
      {steps}
    </>
  );
}
