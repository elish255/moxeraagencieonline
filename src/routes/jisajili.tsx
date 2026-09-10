import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, LogIn, X, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { JOIN_FEE_TZS, REGISTRATION_IMAGE_URL } from "@/data/posts";

export const Route = createFileRoute("/jisajili")({
  head: () => ({
    meta: [
      { title: "Jisajili | Moxera Agencies" },
      {
        name: "description",
        content:
          "Jaza taarifa zako ili kujisajili Moxera Agencies na kuendelea kwenye malipo.",
      },
      { property: "og:title", content: "Jisajili | Moxera Agencies" },
      {
        property: "og:description",
        content: "Fungua akaunti yako ya Moxera Agencies na endelea kwenye malipo.",
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
    phone: z.string().trim().regex(/^0\d{9}$/, "Namba ya simu iwe kama 0712345678"),
    country: z.string().min(2, "Chagua nchi"),
    password: z.string().min(6, "Neno la siri liwe na herufi 6 au zaidi").max(72),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Maneno ya siri hayafanani",
    path: ["confirmPassword"],
  });

type Values = z.infer<typeof schema>;

function Jisajili() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>({
    fullName: "",
    username: "",
    phone: "",
    country: "Tanzania",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function update(name: keyof Values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

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
    localStorage.setItem(
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
    <div className="min-h-screen bg-[#fffaf6]">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 py-7">
        <section className="overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_8px_30px_rgba(30,30,30,.08)] sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={REGISTRATION_IMAGE_URL}
                alt="Moxera Agencies"
                className="size-14 rounded-xl object-cover"
              />
              <div>
                <h1 className="font-display text-3xl font-extrabold text-[#29264f]">Create Account</h1>
                <p className="text-sm text-[#85818f]">Moxera Agencies</p>
              </div>
            </div>
            <span className="pt-2 text-sm text-[#85818f]">Step 1 of 1</span>
          </div>

          <div className="mt-6 rounded-2xl bg-[#fff0e3] px-5 py-4 text-sm leading-relaxed text-[#625e68]">
            Activation fee: <strong className="text-[#ff493d]">{JOIN_FEE_TZS.toLocaleString("en-US")} TZS</strong> — ya mara moja,
            inakufungulia kuchat na kulipwa.
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <Field label="Full Name" error={errors.fullName}>
              <input value={values.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Full Name" className="signup-input" />
            </Field>
            <Field label="Username" error={errors.username}>
              <input value={values.username} onChange={(e) => update("username", e.target.value)} placeholder="Username" className="signup-input" />
            </Field>
            <Field label="Phone Number" error={errors.phone}>
              <input value={values.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" placeholder="Phone Number" className="signup-input" />
            </Field>
            <Field label="Country" error={errors.country}>
              <select value={values.country} onChange={(e) => update("country", e.target.value)} className="signup-input">
                {countries.map((country) => <option key={country}>{country}</option>)}
              </select>
            </Field>
            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={values.password} onChange={(e) => update("password", e.target.value)} placeholder="Password" className="signup-input pr-12" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Onyesha password" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777386]">
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </Field>
            <Field label="Confirm Password" error={errors.confirmPassword}>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} value={values.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Confirm Password" className="signup-input pr-12" />
                <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} aria-label="Onyesha confirm password" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777386]">
                  {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </Field>

            <label className="flex items-center gap-3 pt-1 text-sm text-[#38353f]">
              <input type="checkbox" required className="size-5 rounded" />
              Nakubali <span className="font-bold text-[#ff493d]">Terms of Service</span>
            </label>

            <button type="submit" className="w-full rounded-xl bg-[#ff3f34] px-6 py-4 text-lg font-bold text-white shadow-sm transition-transform hover:scale-[1.01]">
              JISAJILI
            </button>
          </form>
        </section>
      </main>
      <SiteFooter />

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001018]/75 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-[36px] border border-[#2d8f4d] bg-[#003d1d] p-7 text-center text-white shadow-2xl">
            <button type="button" aria-label="Funga" onClick={() => setShowPopup(false)} className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="size-6" />
            </button>
            <div className="mx-auto flex size-28 items-center justify-center rounded-full bg-[#3caf2f] shadow-inner">
              <GraduationCap className="size-12" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight">Hongera kwa kuchagua fursa hii!</h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              Ili uweze kukamilisha usajili na kuanza kufundisha wazungu lugha ya Kiswahili huku ukilipwa,
              unahitaji kuwa na mtaji wa kuanzia wa:
            </p>
            <div className="mt-5 rounded-[28px] bg-gradient-to-r from-[#4ebc2c] to-[#2e9f43] px-5 py-5 shadow-lg">
              <p className="text-sm font-bold tracking-[0.18em]">MTAJI WA KUANZIA</p>
              <p className="mt-1 text-4xl font-extrabold">TSh {JOIN_FEE_TZS.toLocaleString("en-US")}</p>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/65">
              Tafadhali hakikisha una kiasi hiki tayari ili uweze kuendelea na hatua zinazofuata za usajili bila usumbufu.
            </p>
            <div className="mt-5 border-t border-white/15 pt-5">
              <button type="button" onClick={() => navigate({ to: "/malipo" })} className="w-full rounded-full bg-gradient-to-r from-[#80c52b] to-[#2ca344] px-6 py-4 font-display text-base font-bold tracking-[0.16em] text-white shadow-lg hover:brightness-105">
                <LogIn className="mr-2 inline size-5" /> JISAJILI SASA
              </button>
              <button type="button" onClick={() => setShowPopup(false)} className="mt-4 text-xs font-bold tracking-[0.2em] text-white/65">
                FUNGA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="sr-only">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
