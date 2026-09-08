import { projects } from "./projects";

export type NavItem = {
  id: string;
  label: string;
  short: string;
  color: string;
  tag: string;
  preview?: string;
};

const labels: Record<string, string> = {
  lonz: "CAFE LONZ",
  "ikea-hej-park": "HEJI PARK",
  "korea-travel": "KOREA TRAVEL",
  variway: "VARIWAY",
  "lov3-room": "LOV3_ROOM",
};

const previews: Record<string, string> = {
  lonz: "/projects/lonz/logo.png",
  "ikea-hej-park": "/projects/ikea-hej-park/02-hero.png",
  "korea-travel": "/projects/korea-travel/preview.jpg",
  variway: "/projects/variway/hero.jpg",
  "lov3-room": "/projects/lov3-room/instagram.svg",
};

export const navItems: NavItem[] = projects.map((project) => ({
  id: project.id,
  label: labels[project.id] ?? project.title,
  short: project.number,
  color: project.accent,
  tag: project.categoryLabel,
  preview: previews[project.id],
}));
