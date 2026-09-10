import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Lock, ShieldCheck, Zap } from "lucide-react";
import { JOIN_FEE_TZS } from "@/data/posts";
import { sendMobilipaPush, checkMobilipaStatus } from "@/lib/payments.functions";

export const Route = createFileRoute("/malipo")({
  head: () => ({
    meta: [
      { title: "Malipo Salama | Moxera Agencies" },
      {
        name: "description",
        content:
          "Kamilisha malipo ya usajili wa Moxera Agencies kwa USSD Push kupitia namba yako ya simu.",
      },
      { property: "og:title", content: "Malipo Salama | Moxera Agencies" },
      {
        property: "og:description",
        content: "Lipa mtaji wa kuanzia kwa USSD Push moja kwa moja kwenye simu yako.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Malipo,
});

function Malipo() {
  const push = useServerFn(sendMobilipaPush);
  const checkStatus = useServerFn(checkMobilipaStatus);

  const [name, setName] = useState("Mteja wa Moxera");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const orderId = useRef<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("moxera_signup");
    if (!raw) return;
    try {
      const s = JSON.parse(raw) as { fullName?: string; phone?: string };
      if (s.phone) setPhone(s.phone);
      if (s.fullName) setName(s.fullName);
    } catch {
      /* ignore malformed value */
    }
  }, []);

  useEffect(() => {
    if (!orderId.current || ["COMPLETED", "SUCCESS", "FAILED", "CANCELLED", "REJECTED"].includes(String(status).toUpperCase())) return;
    const id = orderId.current;
    let tries = 0;
    const timer = setInterval(async () => {
      tries += 1;
      const res = await checkStatus({ data: { orderId: id } });
      const normalizedStatus = String(res.status).toUpperCase();
      setStatus(normalizedStatus);
      if (["COMPLETED", "SUCCESS", "FAILED", "CANCELLED", "REJECTED"].includes(normalizedStatus)) {
        clearInterval(timer);
        setNote(
          normalizedStatus === "COMPLETED" || normalizedStatus === "SUCCESS"
            ? { kind: "ok", text: "Malipo yamekamilika! Karibu Moxera Agencies." }
            : { kind: "err", text: "Malipo hayakukamilika. Tafadhali jaribu tena." },
        );
      }
      if (tries >= 60) clearInterval(timer);
    }, 5000);
    return () => clearInterval(timer);
  }, [status, checkStatus]);

  async function onPay() {
    if (!/^0\d{9}$/.test(phone.trim())) {
      setNote({ kind: "err", text: "Weka namba ya simu sahihi, mfano 0712345678." });
      return;
    }
    setLoading(true);
    setNote(null);
    const res = await push({
      data: { name: name.trim() || "Mteja wa Moxera", phone: phone.trim(), amount: JOIN_FEE_TZS },
    });
    setLoading(false);
    setNote({ kind: res.ok ? "ok" : "err", text: res.message });
    if (res.ok && res.orderId) {
      orderId.current = res.orderId;
      setStatus("PENDING");
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-[oklch(0.28_0.07_160)] text-ink-foreground">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-5">
          <h1 className="font-display text-xl font-extrabold tracking-tight">
            MOXERA <span className="text-accent">MALIPO</span>
          </h1>
          <span className="rounded-full bg-ink-foreground/10 px-4 py-2 text-xs font-bold tracking-wide">
            MALIPO SALAMA
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-5 px-4 py-6">
        <div className="flex gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <ShieldCheck className="size-6 text-destructive" />
          </span>
          <div>
            <h2 className="text-sm font-bold tracking-wide text-destructive">LINDA PESA YAKO</h2>
            <p className="mt-1 text-sm leading-relaxed text-destructive/90">
              Lipia kupitia mfumo huu pekee. Malipo nje ya mfumo huu ni batili na hayatakubaliwa.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.28_0.07_160)] px-5 py-3 text-sm font-semibold text-ink-foreground">
          🇹🇿 Tanzania
        </span>

        <section className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4 border-b border-border p-5">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-[oklch(0.95_0.05_150)]">
              <Zap className="size-6 text-accent" />
            </span>
            <div>
              <h2 className="text-lg">Tanzania</h2>
              <p className="text-sm text-muted-foreground">Lipia moja kwa moja kwa USSD Push</p>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between rounded-xl bg-[oklch(0.96_0.03_150)] px-4 py-4">
              <span className="text-sm text-muted-foreground">Kiasi cha kulipa</span>
              <span className="font-display text-xl font-extrabold text-[oklch(0.35_0.1_160)]">
                {JOIN_FEE_TZS.toLocaleString("en-US")} TZS
              </span>
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-semibold text-muted-foreground">
                Namba ya simu
              </label>
              <div className="mt-1 flex overflow-hidden rounded-xl border border-input">
                <span className="flex items-center gap-1 border-r border-input px-4 py-3 text-sm text-muted-foreground">
                  🇹🇿 +255
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
                  placeholder="0712345678"
                  className="w-full bg-background px-4 py-3 text-base outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onPay}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.32_0.09_160)] px-6 py-4 font-display text-base font-bold tracking-wide text-ink-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              <Lock className="size-5" /> {loading ? "INATUMA..." : "LIPA SASA"}
            </button>

            {note && (
              <p
                className={`text-sm ${note.kind === "ok" ? "text-[oklch(0.45_0.13_155)]" : "text-destructive"}`}
              >
                {note.text}
              </p>
            )}
            {status === "PENDING" && (
              <p className="text-xs text-muted-foreground">
                Inasubiri uthibitisho... weka PIN yako kwenye simu.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
