import type { Metadata } from "next";
import "./globals.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Painel Solar Bot",
  description:
    "Dashboard da automação de WhatsApp para limpeza de placas solares.",
  icons: {
    icon: "/icon.ico",      // ← seu favicon correto
    shortcut: "/icon.ico",
    apple: "/icon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen bg-slate-950">
          <Sidebar />

          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
