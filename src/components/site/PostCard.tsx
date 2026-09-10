import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import type { Post } from "@/data/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="grid gap-5 border-b border-border pb-8 sm:grid-cols-[240px_1fr]">
      <Link to="/posts/$slug" params={{ slug: post.slug }} className="block overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          width={1024}
          height={768}
          loading="lazy"
          className="h-40 w-full border border-border object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div>
        <h2 className="text-xl leading-snug sm:text-2xl">
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="size-3.5" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {post.date}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <Link
          to="/posts/$slug"
          params={{ slug: post.slug }}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition-transform hover:scale-105"
        >
          Read more <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
