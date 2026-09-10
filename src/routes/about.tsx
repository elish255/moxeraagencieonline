import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { SectionTitle } from "@/components/site/SectionTitle";
import { REGISTER_URL } from "@/data/posts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Kuhusu Sisi | Moxera Agencies" },
      {
        name: "description",
        content:
          "Moxera Agencies ni platform ya kidijitali inayowasaidia Watanzania kujiingizia kipato kwa kutumia simu zao.",
      },
      { property: "og:title", content: "Kuhusu Sisi | Moxera Agencies" },
      {
        property: "og:description",
        content: "Fahamu Moxera Agencies ni nini na jinsi inavyofanya kazi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const points = [
  {
    title: "Usajili Rahisi",
    text: "Unahitaji jina, namba ya simu na neno la siri. Dakika mbili tu na akaunti yako iko tayari.",
  },
  {
    title: "Malipo Ya Uhakika",
    text: "Malipo yanatumwa kwenye simu yako kupitia M-Pesa, Airtel Money, Mixx by Yas na Halopesa.",
  },
  {
    title: "Mafunzo Ya Bure",
    text: "Kila mwanachama anapata mwongozo wa hatua kwa hatua wa kufanya kazi mtandaoni.",
  },
  {
    title: "Msaada Wa Timu",
    text: "Timu yetu inapatikana kila siku kukusaidia kwenye WhatsApp na SMS.",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <SectionTitle title="KUHUSU SISI" />
        <h1 className="mt-7 text-3xl">Moxera Agencies</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Moxera Agencies ni platform ya kidijitali iliyoanzishwa kuwasaidia Watanzania kuingiza
          kipato kwa kutumia simu ya mkononi, kwa mtaji mdogo na muda wao wenyewe. Tunaamini kila
          mtu anapaswa kupata fursa ya kujitegemea kiuchumi.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-border p-5 shadow-[var(--shadow-card)]"
            >
              <h2 className="text-lg">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
        <a
          href={REGISTER_URL}
          className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
        >
          JISAJILI HAPA
        </a>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
