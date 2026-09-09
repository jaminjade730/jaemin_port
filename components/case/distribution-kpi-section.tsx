import { CaseYouTube } from "@/components/case-youtube";
import { KoreaTravelKpiGrid } from "@/components/case/korea-travel-kpi-grid";
import { withStyledPhrases } from "@/components/case/utils";
import type { Project } from "@/data/projects";

export function DistributionKpiSection({
  distributionKpi,
  className = "",
}: {
  distributionKpi: NonNullable<Project["distributionKpi"]>;
  className?: string;
}) {
  return (
    <div className={`case-dist-kpi ${className}`.trim()}>
      <h4 className="case-action-stack__title">
        {distributionKpi.title ?? "DISTRIBUTION & ACHIEVED KPI"}
      </h4>
      <p className="case-lead case-dist-kpi__lead">{distributionKpi.lead}</p>
      <div className="case-dist-kpi__distribution">
        <p className="case-kicker case-dist-kpi__section-label">
          {distributionKpi.distribution.title ?? "DISTRIBUTION"}
        </p>
        <ul className="case-dist-kpi__channels">
          {distributionKpi.distribution.items.map((item) => (
            <li key={item} className="case-dist-kpi__channel">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="case-dist-kpi__kpis">
        <p className="case-kicker case-dist-kpi__section-label">
          {distributionKpi.kpis.title ?? "ACHIEVED KPI"}
        </p>
        {distributionKpi.youtube ? (
          <KoreaTravelKpiGrid fallbackItems={distributionKpi.kpis.items} />
        ) : (
          <div className="case-dist-kpi__grid">
            {distributionKpi.kpis.items.map((item) => (
              <article
                key={item.label}
                className="case-surface-card case-dist-kpi__metric"
              >
                <p className="case-dist-kpi__value">{item.value}</p>
                <p className="case-dist-kpi__metric-label">{item.label}</p>
                {item.body ? (
                  <p className="case-dist-kpi__metric-body">{item.body}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
      {distributionKpi.body ? (
        <p className="case-dist-kpi__body">
          {withStyledPhrases(distributionKpi.body)}
        </p>
      ) : null}
      {distributionKpi.showcase?.videos.length ? (
        <div className="case-dist-kpi__showcase">
          <p className="case-kicker case-dist-kpi__section-label">
            {distributionKpi.showcase.label}
          </p>
          <p className="case-dist-kpi__showcase-title">
            {distributionKpi.showcase.title}
          </p>
          <div className="case-dist-kpi__videos">
            {distributionKpi.showcase.videos.map((video) => (
              <figure key={video.id} className="case-dist-kpi__video">
                {video.label ? (
                  <figcaption className="case-dist-kpi__video-label">
                    {video.label}
                  </figcaption>
                ) : null}
                <div className="case-dist-kpi__video-frame case-media case-media--video">
                  <CaseYouTube
                    videoId={video.id}
                    title={`${video.label ?? "Campaign"} video`}
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
