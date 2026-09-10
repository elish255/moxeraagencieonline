import type { ReactNode } from "react";

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-stretch bg-ink">
      <span className="ribbon text-sm">{title}</span>
      <span className="flex flex-1 items-center justify-end pr-2">{action}</span>
    </div>
  );
}
