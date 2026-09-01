import { useState } from "react";
import { Play } from "lucide-react";
import { Reveal, SlideIn } from "@/components/site/Reveal";
import { cmsClass } from "@/lib/cms-style";
import type { VideosContent } from "@/lib/cms-defaults";

/** Turns a YouTube / Vimeo watch URL into an embeddable one. Returns null for direct files. */
function embedUrl(url: string): string | null {
  const u = url.trim();
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return null;
}

function VideoCard({ v, idx }: { v: VideosContent["items"][number]; idx: number }) {
  const [playing, setPlaying] = useState(false);
  const embed = embedUrl(v.url ?? "");

  return (
    <div className="group bg-background border border-black/5 overflow-hidden">
      <div className="relative aspect-video bg-ink/90 overflow-hidden">
        {playing && embed ? (
          <iframe
            src={embed}
            title={v.title || `Video ${idx + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : playing ? (
          <video src={v.url} poster={v.poster || undefined} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <button
            type="button"
            aria-label={`Play ${v.title || "video"}`}
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full"
          >
            {v.poster && (
              <img
                src={v.poster}
                alt={v.title || ""}
                loading="lazy"
                className={`${cmsClass("home_videos", `items.${idx}.poster`)} w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105`}
              />
            )}
            <span className="absolute inset-0 bg-ink/25 group-hover:bg-ink/15 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 text-ink flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>
      {(v.title || v.caption) && (
        <div className="p-5 md:p-6">
          {v.title && (
            <div className={`${cmsClass("home_videos", `items.${idx}.title`)} font-display text-xl md:text-2xl text-ink`}>{v.title}</div>
          )}
          {v.caption && (
            <p className={`${cmsClass("home_videos", `items.${idx}.caption`)} text-sm text-muted-foreground mt-2 leading-relaxed`}>{v.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}

/** Homepage video section — hidden entirely until videos are added in the CMS. */
export function VideoSection({ content }: { content: VideosContent }) {
  // Keep the original index so saved per-field styles stay attached to the right video.
  const items = (content.items ?? [])
    .map((v, idx) => ({ v, idx }))
    .filter(({ v }) => (v?.url ?? "").trim().length > 0);
  if (items.length === 0) return null;

  return (
    <section className="bg-background border-b border-black/5">
      <div className="container-x mx-auto max-w-7xl py-20 md:py-32">
        <Reveal>
          {content.eyebrow && (
            <div className={`${cmsClass("home_videos", "eyebrow")} text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand mb-5 md:mb-6`}>
              <span className="inline-block w-6 md:w-8 h-px bg-brand align-middle mr-3" />
              {content.eyebrow}
            </div>
          )}
          {content.heading && (
            <h2 className={`${cmsClass("home_videos", "heading")} font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] max-w-3xl`}>
              {content.heading}
            </h2>
          )}
          {content.subheading && (
            <p className={`${cmsClass("home_videos", "subheading")} mt-5 text-muted-foreground leading-relaxed max-w-2xl`}>
              {content.subheading}
            </p>
          )}
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-12 md:mt-16">
          {items.map(({ v, idx }) => (
            <SlideIn key={`${v.url}-${idx}`} from={idx % 2 === 0 ? "left" : "right"} delay={(idx % 2) * 0.1}>
              <VideoCard v={v} idx={idx} />
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
