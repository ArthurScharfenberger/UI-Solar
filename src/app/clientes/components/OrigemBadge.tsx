import { ClienteOrigem } from "../types";

export function OrigemBadge({ origem }: { origem: ClienteOrigem }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border";
  if (origem === "WhatsApp") {
    return (
      <span
        className={`${base} bg-emerald-500/10 text-emerald-300 border-emerald-500/40`}
      >
        WhatsApp
      </span>
    );
  }
  if (origem === "Site") {
    return (
      <span className={`${base} bg-sky-500/10 text-sky-300 border-sky-500/40`}>
        Site
      </span>
    );
  }
  return (
    <span className={`${base} bg-yellow-500/10 text-yellow-300 border-yellow-500/40`}>
      Indicação
    </span>
  );
}