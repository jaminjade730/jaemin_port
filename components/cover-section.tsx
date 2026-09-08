import { PortfolioNav } from "@/components/portfolio-nav";
import { SiteNav } from "@/components/site-nav";

export function CoverSection() {
  return (
    <div className="home-stage home-stage--board">
      <SiteNav />

      <h1 className="sr-only">이재민 · 작업물</h1>

      <div className="home-board home-board--works-only" id="works">
        <PortfolioNav />
      </div>

      <p className="home-rights">© 2026 ALL RIGHTS RESERVED</p>
    </div>
  );
}
