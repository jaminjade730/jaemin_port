import type { ReactNode } from "react";

const META_LABELS = [
  "Project Type",
  "Project Goal",
  "Project Theme",
  "Key Skills",
  "Channel",
  "Period",
  "Brand",
  "Tools",
  "Role",
] as const;

export function withStyledPhrases(text: string): ReactNode {
  const phrases = [
    { value: "Live in your noize", italic: true },
    { value: "Tea-like Coffee", italic: false },
  ];
  type Segment =
    | { type: "text"; value: string }
    | { type: "phrase"; value: string; italic: boolean };

  let segments: Segment[] = [{ type: "text", value: text }];

  for (const phrase of phrases) {
    segments = segments.flatMap((segment) => {
      if (segment.type !== "text" || !segment.value.includes(phrase.value)) {
        return [segment];
      }

      const parts = segment.value.split(phrase.value);
      const next: Segment[] = [];

      parts.forEach((part, index) => {
        if (index > 0) {
          next.push({
            type: "phrase",
            value: phrase.value,
            italic: phrase.italic,
          });
        }
        if (part) next.push({ type: "text", value: part });
      });

      return next;
    });
  }

  const nodes: ReactNode[] = [];

  segments.forEach((segment, index) => {
    if (segment.type === "phrase") {
      const content = `‘${segment.value}’`;
      nodes.push(
        segment.italic ? (
          <em key={`phrase-${index}`} className="italic">
            {content}
          </em>
        ) : (
          <span key={`phrase-${index}`}>{content}</span>
        ),
      );

      const following = segments[index + 1];
      if (
        following?.type === "text" &&
        following.value &&
        !/^[\s)»\]）]/.test(following.value)
      ) {
        nodes.push(" ");
      }
      return;
    }

    nodes.push(segment.value);
  });

  return nodes;
}

export function parseMeta(item: string): { label: string; value: string } {
  const label = META_LABELS.find(
    (name) => item === name || item.startsWith(`${name} `),
  );
  if (!label) return { label: "", value: item };
  return {
    label,
    value: item.slice(label.length).trimStart(),
  };
}

export function youtubeEmbedId(video: string): string | null {
  const trimmed = video.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "").slice(0, 11);
      return id || null;
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const embed = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embed) return embed[1];
  } catch {
    return null;
  }

  return null;
}
