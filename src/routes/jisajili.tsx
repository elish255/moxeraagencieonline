import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, LogIn, X } from "lucide-react";
import { z } from "zod";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionTitle } from "@/components/site/SectionTitle";
import { JOIN_FEE_TZS } from "@/data/posts";

export const Route = createFileRoute("/jisajili")({
  head: () => ({
    meta: [
      { title: "Jisajili | Moxera Agencies" },
      {
        name: "description",
        content:
          "Jaza taarifa zako ili kujisajili Moxera Agencies na kuanza kujiingizia kipato kwa simu yako.",
      },
      { property: "og:title", content: "Jisajili | Moxera Agencies" },
      {
        property: "og:description",
        content: "Fungua akaunti yako ya Moxera Agencies kwa dakika mbili.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Jisajili,
});

const countries = [
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "Burundi",
  "DR Congo",
  "Zambia",
  "Malawi",
  "Msumbiji",
];

const schema = z
  .object({
    fullName: z.string().trim().min(3, "Jaza jina lako kamili").max(80),
    username: z
      .string()
      .trim()
      .min(3, "Username iwe na herufi 3 au zaidi")
      .max(30)
      .regex(/^[a-zA-Z0-9_.]+$/, "Username itumie herufi na namba tu"),
    phone: z
      .string()
      .trim()
      .regex(/^0\d{9}$/, "Namba ya simu iwe kama 0712345678"),
    country: z.string().min(2, "Chagua nchi"),
    password: z.string().min(6, "Neno la siri liwe na herufi 6 au zaidi").max(72),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Maneno ya siri hayafanani",
    path: ["confirmPassword"],
  });

const fields = [
  { name: "fullName", label: "Jina Kamili", type: "text", placeholder: "James Moxera" },
  { name: "username", label: "Username", type: "text", placeholder: "jamesm" },
  { name: "phone", label: "Namba Ya Simu", type: "tel", placeholder: "0712345678" },
  { name: "password", label: "Neno La Siri", type: "password", placeholder: "••••••" },
  {
    name: "confirmPassword",
    label: "Rudia Neno La Siri",
    type: "password",
    placeholder: "••••••",
  },
] as const;

function Jisajili() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    phone: "",
    country: "Tanzania",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPopup, setShowPopup] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    sessionStorage.setItem(
      "moxera_signup",
      JSON.stringify({
        fullName: parsed.data.fullName,
        username: parsed.data.username,
        phone: parsed.data.phone,
        country: parsed.data.country,
      }),
    );
    setShowPopup(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 py-10">
        <SectionTitle title="USAJILI" />
        <h1 className="mt-7 text-3xl">Jisajili Moxera Agencies</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Jaza taarifa zako kwa usahihi. Namba ya simu utakayoweka ni ile itakayotumika kwa malipo.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-7 space-y-4 rounded-xl border border-border p-5 shadow-[var(--shadow-card)]"
        >
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="text-sm font-semibold">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {errors[f.name] && (
                <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="country" className="text-sm font-semibold">
              Chagua Nchi
            </label>
            <select
              id="country"
              value={values.country}
              onChange={(e) => setValues((v) => ({ ...v, country: e.target.value }))}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors["country"] && (
              <p className="mt-1 text-xs text-destructive">{errors["country"]}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            JISAJILI
          </button>
        </form>
      </main>
      <SiteFooter />

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4">
          <div className="relative w-full max-w-md rounded-3xl border border-[oklch(0.5_0.13_150)] bg-[oklch(0.19_0.05_150)] p-7 text-center text-ink-foreground shadow-[var(--shadow-card)]">
            <button
              type="button"
              aria-label="Funga"
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-ink-foreground/10 transition-colors hover:bg-ink-foreground/20"
            >
              <X className="size-5" />
            </button>
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[oklch(0.6_0.17_150)]">
              <GraduationCap className="size-9" />
            </div>
            <h2 className="mt-5 text-2xl leading-snug">Hongera kwa kuchagua fursa hii!</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/80">
              Ili uweze kukamilisha usajili na kuanza kufanya kazi huku ukilipwa, unahitaji kuwa na
              mtaji wa kuanzia wa:
            </p>
            <div className="mt-5 rounded-2xl bg-[oklch(0.62_0.17_150)] px-5 py-4">
              <p className="text-xs font-bold tracking-[0.2em]">MTAJI WA KUANZIA</p>
              <p className="mt-1 font-display text-3xl font-extrabold">
                TSh {JOIN_FEE_TZS.toLocaleString("en-US")}
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/75">
              Tafadhali hakikisha una kiasi hiki tayari ili uweze kuendelea na hatua zinazofuata za
              usajili bila usumbufu.
            </p>
            <div className="mt-5 border-t border-ink-foreground/15 pt-5">
              <button
                type="button"
                onClick={() => navigate({ to: "/malipo" })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[oklch(0.7_0.18_145)] px-6 py-3.5 font-display font-bold tracking-[0.15em] text-ink transition-transform hover:scale-[1.02]"
              >
                <LogIn className="size-5" /> JISAJILI SASA
              </button>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="mt-3 text-xs font-bold tracking-[0.2em] text-ink-foreground/60"
              >
                FUNGA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
