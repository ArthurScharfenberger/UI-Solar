"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // ← IMPORT NECESSÁRIO

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
        
        {/* LOGO */}
        <div className="h-10 w-10 relative">
          <Image
            src="/icon.png"        // coloquei sua logo aqui
            alt="Logo Solar"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* TEXTOS */}
        <div>
          <p className="text-xs text-slate-500 tracking-widest uppercase">
            Solar
          </p>
          <p className="text-sm text-slate-100 font-medium">Bot Painel</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-1">
        {nav.map((item) => {
          const active = path === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm
                ${active
                  ? "bg-slate-800 text-emerald-300"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"}
              `}
            >
              <span
                className={`
                  h-1.5 w-1.5 rounded-full 
                  ${active ? "bg-emerald-300" : "bg-slate-600"}
                `}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 text-xs text-slate-600">
        v1.0 • Protótipo
      </div>
    </aside>
  );
}
