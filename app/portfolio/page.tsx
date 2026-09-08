import type { ReactNode } from "react";
import { CoverSection } from "@/components/cover-section";
import { PortfolioShell } from "@/components/portfolio-shell";
import { ProjectChapter } from "@/components/project-chapter";
import { navItems } from "@/data/nav";
import { projects } from "@/data/projects";

export default function PortfolioPage() {
  const panels: Record<string, ReactNode> = Object.fromEntries(
    projects.map((project) => [
      project.id,
      <ProjectChapter key={project.id} project={project} />,
    ]),
  );

  return (
    <PortfolioShell items={navItems} panels={panels}>
      <CoverSection />
    </PortfolioShell>
  );
}
