"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Dashboard", href: "/" },
  { label: "Clientes", href: "/clientes" },
  { label: "Agendamentos", href: "/agendamentos" },
  { label: "Configurações", href: "/configuracoes" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-slate-950/80 p-4 lg:flex flex-col">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-to-tr from-emerald-400 to-yellow-300 rounded-xl flex items-center justify-center text-slate-900 text-xl font-bold">
          S
        </div>
        <div>
          <p className="text-xs text-slate-500 tracking-widest uppercase">
            Solar
          </p>
          <p className="text-sm text-slate-100 font-medium">Bot Painel</p>
        </div>
      </div>

      <nav className="space-y-1">
        {nav.map((item) => {
          const active = path === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm
                ${
                  active
                    ? "bg-slate-800 text-emerald-300"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  active ? "bg-emerald-300" : "bg-slate-600"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 text-xs text-slate-600">v1.0 • Protótipo</div>
    </aside>
  );
}
