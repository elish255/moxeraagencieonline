import { Link } from "@tanstack/react-router";
import { REGISTER_URL } from "@/data/posts";

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg">MOXERA AGENCIES</h3>
            <p className="mt-2 text-sm text-ink-foreground/70">
              Platform ya kujiingizia kipato kwa kutumia simu yako, kwa mtaji mdogo.
            </p>
          </div>
          <div>
            <h3 className="text-sm tracking-wide">KURASA</h3>
            <ul className="mt-2 space-y-1 text-sm text-ink-foreground/70">
              <li>
                <Link to="/" className="hover:text-ink-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-ink-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ink-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm tracking-wide">ANZA LEO</h3>
            <a
              href={REGISTER_URL}
              className="mt-3 inline-flex rounded-md bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition-transform hover:scale-105"
            >
              JISAJILI HAPA
            </a>
          </div>
        </div>
        <p className="mt-8 border-t border-ink-foreground/15 pt-5 text-xs text-ink-foreground/60">
          Created By WARDEN TECH CO.LTD | Sponsored By MOXERA AGENCIES
        </p>
      </div>
    </footer>
  );
}
