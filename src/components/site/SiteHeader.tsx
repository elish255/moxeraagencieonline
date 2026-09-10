import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Home, Play, UserPlus } from "lucide-react";
import logoOrange from "@/assets/moxera-logo-orange.jpg";
import { REGISTER_URL } from "@/data/posts";

const socials = [
  { Icon: Facebook, label: "Facebook", cls: "bg-[oklch(0.5_0.2_260)]" },
  { Icon: Twitter, label: "Twitter", cls: "bg-[oklch(0.7_0.14_230)]" },
  { Icon: Instagram, label: "Instagram", cls: "bg-[oklch(0.6_0.22_10)]" },
];

export function SiteHeader() {
  return (
    <header>
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5">
          <nav className="flex items-center gap-5 text-sm">
            <Link to="/" className="transition-opacity hover:opacity-70">
              Home
            </Link>
            <Link to="/about" className="transition-opacity hover:opacity-70">
              About
            </Link>
            <Link to="/contact" className="transition-opacity hover:opacity-70">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, label, cls }) => (
              <a
                key={label}
                href={REGISTER_URL}
                aria-label={label}
                className={`flex size-7 items-center justify-center rounded-full ${cls} transition-transform hover:scale-110`}
              >
                <Icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row">
            <Link to="/" className="shrink-0">
              <span className="font-display text-3xl font-extrabold tracking-tight">
                MOXERA <span className="text-accent">AGENCIES</span>
              </span>
            </Link>

            <div
              className="flex w-full flex-col items-center gap-4 rounded-xl px-5 py-4 sm:flex-row sm:justify-between"
              style={{ background: "var(--gradient-banner)" }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={logoOrange}
                  alt="Nembo ya Moxera Agencies"
                  width={1088}
                  height={608}
                  className="size-16 rounded-full bg-background object-cover"
                />
                <p className="font-display text-sm font-bold text-primary-foreground sm:text-base">
                  Jiunge Na Moxera Agencies Leo
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-105"
                >
                  <UserPlus className="size-4" /> Jisajili
                </a>
                <a
                  href={REGISTER_URL}
                  className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-ink-foreground transition-transform hover:scale-105"
                >
                  <Play className="size-4" /> Pakua App
                </a>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3 border-t border-primary-foreground/20 pt-5">
            <Link
              to="/"
              aria-label="Nyumbani"
              className="flex size-10 items-center justify-center rounded-md bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
            >
              <Home className="size-4" />
            </Link>
            <a href={REGISTER_URL} className="font-display text-sm font-bold tracking-wide">
              JISAJILI HAPA
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
