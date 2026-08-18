import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { useSection } from "@/hooks/useContent";
import { cmsClass } from "@/lib/cms-style";
import { RichText } from "@/components/site/RichText";
import type { BlogPost } from "@/lib/cms-defaults";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogDetail,
  head: () => ({
    meta: [
      { title: "Article | AM Concepts Architects & Interiors Journal" },
      {
        name: "description",
        content: "Insights on architecture, interiors and building in Kerala from AM Concepts Architects & Interiors.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-x mx-auto max-w-3xl pt-40 pb-32">
      <h1 className="font-display text-4xl">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm hover:text-brand">
        <ArrowLeft className="w-4 h-4" /> Back to journal
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x mx-auto max-w-3xl pt-40 pb-32" role="alert">
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function formatDate(d?: string) {
  if (!d) return "";
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function BlogDetail() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const blog = useSection<{ items: BlogPost[] }>("blog");
  const posts = blog.items ?? [];
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = postIndex >= 0 ? posts[postIndex] : undefined;

  if (!post) {
    if (posts.length === 0) {
      return <div className="container-x mx-auto max-w-3xl pt-40 pb-32 text-muted-foreground">Loading…</div>;
    }
    throw notFound();
  }

  return (
    <article>
      <section className="container-x mx-auto max-w-3xl pt-32 md:pt-40 pb-8">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand">
            <ArrowLeft className="w-3.5 h-3.5" /> Journal
          </Link>
          <h1 className={`${cmsClass("blog", `items.${postIndex}.title`)} mt-6 font-display text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]`}>
            {post.title}
          </h1>
          <div className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {post.author} · {formatDate(post.publishedAt)}
          </div>
        </Reveal>
      </section>

      {post.cover && (
        <section className="container-x mx-auto max-w-5xl pb-10">
          <Reveal>
            <img
              src={post.cover}
              alt={post.title}
              className={`${cmsClass("blog", `items.${postIndex}.cover`)} w-full aspect-[16/9] object-cover`}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </section>
      )}

      <section className="container-x mx-auto max-w-3xl pb-28">
        <Reveal>
          <RichText
            html={post.body}
            className={`${cmsClass("blog", `items.${postIndex}.body`)} prose-am text-[17px] leading-relaxed text-foreground/90 space-y-5`}
          />
        </Reveal>
      </section>
    </article>
  );
}
