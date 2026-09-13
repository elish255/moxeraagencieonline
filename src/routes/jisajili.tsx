import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { REGISTER_URL } from "@/data/posts";

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
  useEffect(() => {
    window.location.replace(REGISTER_URL);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="text-lg font-bold">Inaelekeza kwenye ukurasa wa usajili…</p>
        <a href={REGISTER_URL} className="mt-3 inline-block font-bold text-primary underline">
          Bonyeza hapa kama haijaelekea
        </a>
      </div>
    </main>
  );
}
