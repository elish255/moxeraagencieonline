import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MOBILIPA_BASE = "https://api.mobilipa.store";

const pushSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^0\d{9}$/, "Namba ya simu si sahihi"),
  amount: z.number().int().min(500).max(5_000_000),
});

export type PushResult = {
  ok: boolean;
  message: string;
  orderId?: string;
};

export const sendMobilipaPush = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => pushSchema.parse(data))
  .handler(async ({ data }): Promise<PushResult> => {
    const apiKey = process.env["MOBILIPA_API_KEY"];
    if (!apiKey) {
      return { ok: false, message: "Mfumo wa malipo haujakamilika. Wasiliana na msimamizi." };
    }

    try {
      const res = await fetch(`${MOBILIPA_BASE}/v1/payment/create_order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-KEY": apiKey },
        body: JSON.stringify({
          buyer_name: data.name,
          buyer_email: `${data.phone}@moxera.co.tz`,
          buyer_phone: data.phone,
          amount: data.amount,
          currency: "TZS",
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error(`Mobilipa create_order failed [${res.status}]: ${text}`);
        return { ok: false, message: "Malipo hayakuanza. Jaribu tena baada ya muda mfupi." };
      }

      const body = JSON.parse(text) as {
        message?: string;
        data?: { order_id?: string };
        order_id?: string;
      };
      const orderId = body.data?.order_id ?? body.order_id;
      return {
        ok: true,
        message: body.message ?? "Angalia simu yako na weka PIN kukamilisha malipo.",
        ...(orderId ? { orderId } : {}),
      };
    } catch (err) {
      console.error("Mobilipa request error", err);
      return { ok: false, message: "Tatizo la mtandao. Jaribu tena." };
    }
  });

export const checkMobilipaStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ orderId: z.string().min(1).max(120) }).parse(data))
  .handler(async ({ data }): Promise<{ status: string }> => {
    const apiKey = process.env["MOBILIPA_API_KEY"];
    if (!apiKey) return { status: "UNKNOWN" };
    try {
      const res = await fetch(
        `${MOBILIPA_BASE}/v1/payment/status?order_id=${encodeURIComponent(data.orderId)}`,
        { headers: { "X-API-KEY": apiKey } },
      );
      const text = await res.text();
      if (!res.ok) {
        console.error(`Mobilipa status failed [${res.status}]: ${text}`);
        return { status: "UNKNOWN" };
      }
      const body = JSON.parse(text) as {
        data?: { payment_status?: string; status?: string };
        transaction?: { payment_status?: string; status?: string };
      };
      const t = body.data ?? body.transaction ?? {};
      return { status: t.payment_status ?? t.status ?? "PENDING" };
    } catch (err) {
      console.error("Mobilipa status error", err);
      return { status: "UNKNOWN" };
    }
  });
