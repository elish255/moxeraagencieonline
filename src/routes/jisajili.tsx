import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const REGISTER_URL = "https://moxeraagencies.com/register?ref=Mtukazi";

export const Route = createFileRoute("/jisajili")({
  head: () => ({
    meta: [{ title: "Jisajili | Moxera Agencies" }],
  }),
  component: JisajiliRedirect,
});

function JisajiliRedirect() {
  useEffect(() => {
    window.location.replace(REGISTER_URL);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="text-lg font-bold">Inaelekeza kwenye usajili…</p>
        <a href={REGISTER_URL} className="mt-3 inline-block font-bold text-primary underline">
          Bonyeza hapa kama haijaelekea
        </a>
      </div>
    </main>
  );
}
