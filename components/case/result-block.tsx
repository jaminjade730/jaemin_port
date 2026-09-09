import { withStyledPhrases } from "@/components/case/utils";
import type { Project } from "@/data/projects";

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
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`}>
            <p className="case-panel__item-title">{item.title}</p>
            {item.body ? (
              <p className="case-panel__item-body">
                {withStyledPhrases(item.body)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProsePanel({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="case-panel">
      <h3 className="case-panel__title">{title}</h3>
      <div className="case-panel__prose">
        {paragraphs.map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 24)}`}>
            {withStyledPhrases(paragraph)}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ResultBlock({
  project,
  mode,
}: {
  project: Project;
  mode: "panel" | "solo";
}) {
  if (project.resultSections?.length) {
    const content = (
      <>
        {project.resultEyebrow ? (
          <p className="case-result__eyebrow">{project.resultEyebrow}</p>
        ) : null}
        <ul className="case-panel__list case-result-sections case-result-output">
          {project.resultSections.map((section) => (
            <li key={`${section.label ?? ""}-${section.title}`}>
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
        {project.result.length ? (
          <div className="case-result__summary">
            {project.resultSummaryLabel ? (
              <p className="case-result__summary-label">
                {project.resultSummaryLabel}
              </p>
            ) : null}
            {project.result.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 24)}`}>
                {withStyledPhrases(paragraph)}
              </p>
            ))}
          </div>
        ) : null}
      </>
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

  const resultItems = project.resultItems;

  if (resultItems?.length) {
    const items = resultItems.map((item) => ({ title: item }));
    if (mode === "solo") {
      return (
        <section className="case-block case-result-solo">
          <h3 className="case-block__title">Result</h3>
          <ul className="case-panel__list">
            {items.map((item, index) => (
              <li key={`${item.title}-${index}`}>
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
          {project.result.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>
              {withStyledPhrases(paragraph)}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return <ProsePanel title="Result" paragraphs={project.result} />;
}
