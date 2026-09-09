import Image from "next/image";
import { CaseYouTube } from "@/components/case-youtube";
import { youtubeEmbedId } from "@/components/case/utils";

export function MediaFrame({
  src,
  alt,
  accent,
  className = "",
  fit = "cover",
  containBg = "#fff",
  priority = false,
  video,
}: {
  src?: string;
  alt: string;
  accent: string;
  className?: string;
  fit?: "cover" | "contain";
  containBg?: string;
  priority?: boolean;
  video?: string;
}) {
  const youtubeId = video ? youtubeEmbedId(video) : null;

  return (
    <div
      className={`case-media${fit === "contain" ? " case-media--contain" : ""}${
        youtubeId ? " case-media--video" : ""
      } ${className}`}
      style={fit === "contain" ? { background: containBg } : undefined}
    >
      {youtubeId ? (
        <CaseYouTube videoId={youtubeId} title={alt} />
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={95}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          sizes="(max-width: 840px) 100vw, 40vw"
        />
      ) : (
        <div className="case-media__fallback" style={{ background: accent }} />
      )}
    </div>
  );
}
