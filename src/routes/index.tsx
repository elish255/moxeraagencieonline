import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Folder, User } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { SectionTitle } from "@/components/site/SectionTitle";
import { PostCard } from "@/components/site/PostCard";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moxera Agencies | Jiingizie Kipato Kwa Simu Yako" },
      {
        name: "description",
        content:
          "Moxera Agencies ni platform salama ya kujiingizia kipato kwa mtaji mdogo. Jisajili leo na anza kupata malipo kwenye simu yako.",
      },
      { property: "og:title", content: "Moxera Agencies | Jiingizie Kipato Kwa Simu Yako" },
      {
        property: "og:description",
        content: "Jisajili Moxera Agencies leo na anza kujiingizia kipato kwa mtaji mdogo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = posts[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <section>
          <SectionTitle
            title="RECENT POSTS"
            action={
              <Link
                to="/"
                className="inline-flex items-center gap-1 rounded bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground"
              >
                VIEW ALL <ArrowRight className="size-3" />
              </Link>
            }
          />
          <h1 className="sr-only">Moxera Agencies - habari na maelezo ya platform</h1>
          <div className="mt-7 space-y-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-6">
            <span className="inline-flex size-8 items-center justify-center bg-secondary text-sm font-bold text-secondary-foreground">
              1
            </span>
          </div>
        </section>

        <aside>
          <SectionTitle title="FEATURED POST" />
          <div className="mt-6">
            <Link to="/posts/$slug" params={{ slug: featured.slug }} className="relative block">
              <span className="absolute top-3 left-3 flex size-8 items-center justify-center rounded bg-secondary text-secondary-foreground">
                <Folder className="size-4" />
              </span>
              <img
                src={featured.image}
                alt={featured.title}
                width={1088}
                height={608}
                className="w-full border border-border object-cover"
              />
            </Link>
            <h2 className="mt-4 text-xl leading-snug">
              <Link
                to="/posts/$slug"
                params={{ slug: featured.slug }}
                className="transition-colors hover:text-primary"
              >
                {featured.title}
              </Link>
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="size-3.5" />
                {featured.author}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3.5" />
                {featured.date}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
          </div>
        </aside>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
