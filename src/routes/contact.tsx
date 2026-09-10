import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { SectionTitle } from "@/components/site/SectionTitle";
import { WHATSAPP_URL, SMS_URL } from "@/data/posts";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Wasiliana Nasi | Moxera Agencies" },
      {
        name: "description",
        content:
          "Wasiliana na timu ya Moxera Agencies kwa WhatsApp, SMS au barua pepe kwa msaada wa usajili na malipo.",
      },
      { property: "og:title", content: "Wasiliana Nasi | Moxera Agencies" },
      {
        property: "og:description",
        content: "Pata msaada wa usajili na malipo kutoka timu ya Moxera Agencies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <SectionTitle title="WASILIANA NASI" />
        <h1 className="mt-7 text-3xl">Tuko Hapa Kukusaidia</h1>
        <p className="mt-3 text-muted-foreground">
          Kwa maswali ya usajili, malipo au ushirikiano, tumia njia yoyote hapa chini.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <a
            href={WHATSAPP_URL}
            className="rounded-lg border border-border p-5 shadow-[var(--shadow-card)] transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="size-6 text-primary" />
            <h2 className="mt-3 text-base">WhatsApp</h2>
            <p className="mt-1 text-sm text-muted-foreground">Chat na timu yetu</p>
          </a>
          <a
            href={SMS_URL}
            className="rounded-lg border border-border p-5 shadow-[var(--shadow-card)] transition-transform hover:scale-[1.02]"
          >
            <Phone className="size-6 text-primary" />
            <h2 className="mt-3 text-base">SMS</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tuma ujumbe mfupi</p>
          </a>
          <a
            href="mailto:info@moxera.org"
            className="rounded-lg border border-border p-5 shadow-[var(--shadow-card)] transition-transform hover:scale-[1.02]"
          >
            <Mail className="size-6 text-primary" />
            <h2 className="mt-3 text-base">Barua Pepe</h2>
            <p className="mt-1 text-sm text-muted-foreground">info@moxera.org</p>
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Namba ya simu na barua pepe hapa ni za mfano — nitumie taarifa zako halisi nizibadilishe.
        </p>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
