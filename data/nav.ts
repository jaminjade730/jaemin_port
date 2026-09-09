import { projects } from "./projects";

export type NavItem = {
  id: string;
  label: string;
  short: string;
  color: string;
  tag: string;
  preview?: string;
  previewFit?: "cover" | "contain";
  previewBg?: string;
  /** Use project accent as preview background */
  previewUseAccent?: boolean;
  previewMode?: "image" | "brand";
  brandLabel?: string;
};

const navExtras: Record<
  string,
  Pick<
    NavItem,
    "label" | "preview" | "previewFit" | "previewBg" | "previewUseAccent" | "previewMode" | "brandLabel"
  >
> = {
  lonz: {
    label: "CAFE LONZ",
    preview: "/projects/lonz/logo.png",
    previewFit: "cover",
    previewBg: "#ffffff",
  },
  "ikea-hej-park": {
    label: "HEJ! PARK",
    preview: "/projects/ikea-hej-park/02-hero.png",
    previewFit: "contain",
    previewUseAccent: true,
  },
  "korea-travel": {
    label: "KOREA TRAVEL",
    preview: "/projects/korea-travel/preview.jpg",
    previewFit: "cover",
  },
  variway: {
    label: "VARIWAY",
    preview: "/projects/variway/hero.jpg",
    previewFit: "contain",
    previewBg: "#ffffff",
  },
  "lov3-room": {
    label: "LOV3_ROOM",
    preview: "/projects/lov3-room/instagram.svg",
    previewFit: "contain",
    previewBg: "#ffffff",
    previewMode: "brand",
    brandLabel: "LOV3_ROOM",
  },
};

export const navItems: NavItem[] = projects.map((project) => {
  const extra = navExtras[project.id] ?? {};
  return {
    id: project.id,
    label: extra.label ?? project.title,
    short: project.number,
    color: project.accent,
    tag: project.categoryLabel,
    preview: extra.preview,
    previewFit: extra.previewFit ?? "cover",
    previewBg: extra.previewBg,
    previewUseAccent: extra.previewUseAccent,
    previewMode: extra.previewMode ?? "image",
    brandLabel: extra.brandLabel,
  };
});
