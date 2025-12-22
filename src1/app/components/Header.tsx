"use client";

import { usePathname } from "next/navigation";

function getTitle(path: string) {
  if (path === "/") return "Dashboard";
  if (path.startsWith("/clientes")) return "Clientes";
  if (path.startsWith("/agendamentos")) return "Agendamentos";
  if (path.startsWith("/configuracoes")) return "Configurações do Bot";
  return "Painel";
}

export default function Header() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="flex justify-between items-center border-b border-slate-800 bg-slate-950/80 px-4 py-3 lg:px-8">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-xs text-slate-500">
          Sistema de gestão e automação via WhatsApp
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
          Bot Ativo
        </span>

        <div className="flex items-center gap-2">
          <div className="text-right text-xs">
            <p className="font-medium">Arthur</p>
            <p className="text-slate-500">Admin</p>
          </div>
          <div className="h-9 w-9 bg-slate-800 rounded-full flex justify-center items-center text-xs">
            AS
          </div>
        </div>
      </div>
    </header>
  );
}
