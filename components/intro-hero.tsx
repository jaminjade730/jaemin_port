import Link from "next/link";
import { DotField } from "@/components/dot-field";
import { SiteNav } from "@/components/site-nav";

export function IntroHero() {
  return (
    <main className="intro">
      <DotField />
      <SiteNav />

      <div className="intro__center">
        <h1 className="intro__title">
          <span className="intro__title-soft">소비자를 읽고,</span>
          <span className="intro__title-bold">실행하다.</span>
        </h1>

        <p className="intro__desc">
          고객과 데이터를 통해 문제를 발견하고,
          <br />
          콘텐츠와 마케팅 액션으로 직접 실행하며 개선합니다.
        </p>

        <Link href="/profile" className="intro__cta">
          <span className="intro__cta-glow" aria-hidden />
          <span className="intro__cta-label">Join our World</span>
        </Link>
      </div>

      <footer className="intro__strip">
        <p className="intro__rights">© 2026 ALL RIGHTS RESERVED</p>
      </footer>
    </main>
  );
}
