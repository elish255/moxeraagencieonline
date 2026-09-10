import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { getPost, posts, REGISTER_URL } from "@/data/posts";

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Habari"} | Moxera Agencies` },
      { name: "description", content: loaderData?.excerpt ?? "Habari za Moxera Agencies" },
      { property: "og:title", content: loaderData?.title ?? "Moxera Agencies" },
      { property: "og:description", content: loaderData?.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="size-4" /> Rudi Nyumbani
        </Link>
        <h1 className="mt-4 text-3xl leading-tight">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="size-3.5" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {post.date}
          </span>
        </div>
        <img
          src={post.image}
          alt={post.title}
          width={1024}
          height={768}
          className="mt-6 w-full border border-border object-cover"
        />
        <div className="mt-6 space-y-4 leading-relaxed">
          {post.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <a
          href={REGISTER_URL}
          className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
        >
          JISAJILI HAPA
        </a>

        <h2 className="mt-12 text-xl">Habari Nyingine</h2>
        <ul className="mt-3 space-y-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                to="/posts/$slug"
                params={{ slug: o.slug }}
                className="text-sm font-semibold text-primary hover:underline"
              >
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
