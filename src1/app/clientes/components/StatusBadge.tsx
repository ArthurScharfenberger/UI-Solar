import { ClienteStatus } from "../types";

export function StatusBadge({ status }: { status: ClienteStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border";
  if (status === "Ativo") {
    return (
      <span
        className={`${base} bg-emerald-500/10 text-emerald-300 border-emerald-500/40`}
      >
        • Ativo
      </span>
    );
  }
  return (
    <span className={`${base} bg-slate-700/40 text-slate-200 border-slate-500/60`}>
      • Inativo
    </span>
  );
}