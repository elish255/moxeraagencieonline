import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, SMS_URL } from "@/data/posts";

export function FloatingButtons() {
  return (
    <>
      <a
        href={WHATSAPP_URL}
        aria-label="Wasiliana nasi WhatsApp"
        className="fixed bottom-5 left-5 z-50 flex size-14 items-center justify-center rounded-full bg-[oklch(0.7_0.17_150)] text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-110"
      >
        <MessageCircle className="size-7" />
      </a>
      <a
        href={SMS_URL}
        aria-label="Tuma SMS"
        className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[oklch(0.75_0.16_160)] text-sm font-bold text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:scale-110"
      >
        SMS
      </a>
    </>
  );
}
