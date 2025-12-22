"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type ReactNode } from "react";
import Modal from "./components/Modal";

/* =========================
   Icon set (inline SVG)
   - no extra deps
========================= */
function Icon({
  name,
  className = "h-4 w-4",
}: {
  name:
    | "plus"
    | "calendar"
    | "users"
    | "inbox"
    | "alert"
    | "fire"
    | "message"
    | "check"
    | "x"
    | "pencil"
    | "external"
    | "clock";
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <path d="M8 3v3M16 3v3" />
          <path d="M4 8h16" />
          <path d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <path d="M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.5 5h13L22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7l3.5-7z" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.3 3.3 1.9 17.6A2 2 0 0 0 3.6 20h16.8a2 2 0 0 0 1.7-2.4L13.7 3.3a2 2 0 0 0-3.4 0z" />
        </svg>
      );
    case "fire":
      return (
        <svg {...common}>
          <path d="M12 22c4.4 0 8-3.1 8-7 0-4-3.4-6.5-5-9-1.2 2.2-3.7 3.5-3 7-1-1-2.4-2.7-2.5-5.5C7.4 10 4 12 4 15c0 3.9 3.6 7 8 7z" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 3h7v7" />
          <path d="M10 14 21 3" />
          <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
  }
}

/* =======================
   Types
======================= */

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
};

type AppointmentStatus = "Agendado" | "Concluído" | "Pendente" | "Cancelado";

type Appointment = {
  id: string;
  cliente: string;
  cidade: string;
  data: string; // dd/mm/yyyy
  horario: string; // hh:mm
  status: AppointmentStatus;
};

type OutboundStatus = "Enviado" | "Entregue" | "Lido" | "Falhou";

type OutboundMessage = {
  id: string;
  cliente: string;
  texto: string;
  horario: string;
  autor: "Bot" | "Humano";
  status: OutboundStatus;
  tempoResposta?: string;
};

/* =======================
   Seed data (mock)
======================= */

const stats = [
  { label: "Mensagens recebidas (24h)", value: "12", helper: "Entradas via WhatsApp e site", icon: <Icon name="inbox" /> },
  { label: "Agendamentos (semana)", value: "9", helper: "Visitas e instalações", icon: <Icon name="calendar" /> },
  { label: "Mensagens lidas (24h)", value: "7", helper: "Fila de atendimento", icon: <Icon name="message" /> },
  { label: "Taxa de entrega (24h)", value: "92%", helper: "Meta: acima de 90%", icon: <Icon name="clock" /> },
];

const appointmentsSeed: Appointment[] = [
];

const outboundSeed: OutboundMessage[] = [
  {
    id: "m1",
    cliente: "Eduardo Lima",
    texto: "Recomendamos limpeza a cada 6 meses para manter a eficiência das placas.",
    horario: "Hoje • 10:42",
    autor: "Bot",
    status: "Entregue",
    tempoResposta: "12s",
  },
  {
    id: "m2",
    cliente: "Fernanda Dias",
    texto: "Segue orçamento para 12 placas com instalação. Posso agendar uma visita?",
    horario: "Hoje • 09:15",
    autor: "Humano",
    status: "Lido",
    tempoResposta: "4m",
  },
  {
    id: "m3",
    cliente: "Pedro Rocha",
    texto: "Confirmamos seu horário para sexta-feira. Qual período prefere?",
    horario: "Ontem • 18:23",
    autor: "Bot",
    status: "Falhou",
    tempoResposta: "8s",
  },
  {
    id: "m4",
    cliente: "Condomínio Solar Vista",
    texto: "Recebido! Vou encaminhar o orçamento para 80 placas ainda hoje.",
    horario: "Ontem • 16:10",
    autor: "Humano",
    status: "Enviado",
  },
];

/* =======================
   UI components
======================= */

function StatCard({ label, value, helper, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col p-4 shadow-sm shadow-slate-950/40">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className="mt-1 text-xl font-semibold text-slate-50">{value}</p>
          {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
        </div>
        {icon && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2 text-slate-200">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const cls =
    status === "Agendado"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : status === "Concluído"
      ? "border-sky-500/40 bg-sky-500/10 text-sky-200"
      : status === "Pendente"
      ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-200"
      : "border-red-500/40 bg-red-500/10 text-red-200";

  return <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
}

function OutboundBadge({ status }: { status: OutboundStatus }) {
  const cls =
    status === "Entregue" || status === "Lido"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : status === "Enviado"
      ? "border-sky-500/40 bg-sky-500/10 text-sky-200"
      : "border-red-500/40 bg-red-500/10 text-red-200";

  return <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
}

function IconButton({
  title,
  onClick,
  icon,
  variant = "neutral",
}: {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  variant?: "neutral" | "good" | "info" | "danger";
}) {
  const cls =
    variant === "good"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
      : variant === "info"
      ? "border-sky-500/40 bg-sky-500/10 text-sky-200 hover:bg-sky-500/20"
      : variant === "danger"
      ? "border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/20"
      : "border-slate-700 bg-slate-950/40 text-slate-200 hover:bg-slate-900/70";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition ${cls}`}
      title={title}
      aria-label={title}
    >
      {icon}
      <span className="hidden sm:inline">{title}</span>
    </button>
  );
}

/* =======================
   Helpers
======================= */
function parseBrDate(d: string) {
  // dd/mm/yyyy
  const [dd, mm, yyyy] = d.split("/").map(Number);
  return new Date(yyyy, mm - 1, dd);
}

/* =======================
   Page
======================= */

type ApptFilter = "pendentes" | "hoje" | "semana" | "todos";
type MsgFilter = "todas" | "falhas";

export default function Dashboard() {
  const agendamentosRef = useRef<HTMLDivElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const [filtro, setFiltro] = useState<ApptFilter>("pendentes");
  const [msgFiltro, setMsgFiltro] = useState<MsgFilter>("todas");

  const [novoAgendamentoAberto, setNovoAgendamentoAberto] = useState(false);
  const [editarAgendamentoAberto, setEditarAgendamentoAberto] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsSeed);
  const [outboundMessages, setOutboundMessages] = useState<OutboundMessage[]>(outboundSeed);

  const emptyForm = {
    cliente: "",
    cidade: "",
    data: "",
    horario: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const pendentesCount = appointments.filter((a) => a.status === "Pendente").length;
  const falhasCount = outboundMessages.filter((m) => m.status === "Falhou").length;

  const scrollToAgendamentos = () => {
    agendamentosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const listaAgendamentos = useMemo(() => {
    const now = new Date();

    const isToday = (d: Date) =>
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    let filtered = [...appointments];

    if (filtro === "pendentes") filtered = filtered.filter((a) => a.status === "Pendente");
    if (filtro === "hoje") filtered = filtered.filter((a) => isToday(parseBrDate(a.data)));
    if (filtro === "semana")
      filtered = filtered.filter((a) => {
        const d = parseBrDate(a.data);
        return d >= startOfWeek && d < endOfWeek;
      });

    // prioridade: pendente -> agendado -> concluído -> cancelado, depois data/hora
    const weight: Record<AppointmentStatus, number> = {
      Pendente: 0,
      Agendado: 1,
      Concluído: 2,
      Cancelado: 3,
    };

    filtered.sort((a, b) => {
      const wa = weight[a.status];
      const wb = weight[b.status];
      if (wa !== wb) return wa - wb;

      const da = parseBrDate(a.data).getTime();
      const db = parseBrDate(b.data).getTime();
      if (da !== db) return da - db;

      return a.horario.localeCompare(b.horario);
    });

    return filtered;
  }, [appointments, filtro]);

  const listaMensagens = useMemo(() => {
    const arr = [...outboundMessages];
    if (msgFiltro === "falhas") return arr.filter((m) => m.status === "Falhou");
    return arr;
  }, [outboundMessages, msgFiltro]);

  const quickActions = [
    {
      kind: "button",
      label: "Novo agendamento",
      icon: <Icon name="plus" className="h-4 w-4" />,
      onClick: () => {
        setForm(emptyForm);
        setEditingId(null);
        setNovoAgendamentoAberto(true);
      },
      className:
        "rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20 transition inline-flex items-center gap-2",
    },
    {
      kind: "link",
      label: "Novo cliente",
      icon: <Icon name="users" className="h-4 w-4" />,
      href: "/clientes",
      className:
        "rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900/70 transition inline-flex items-center gap-2",
    },
    {
      kind: "button",
      label: "Ver pendências",
      icon: <Icon name="alert" className="h-4 w-4" />,
      onClick: () => {
        setFiltro("pendentes");
        scrollToAgendamentos();
      },
      className:
        "rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900/70 transition inline-flex items-center gap-2",
    },
  ] as const;

  const filtroBtn = (key: ApptFilter, label: string, hint?: string) => {
    const active = filtro === key;
    return (
      <button
        key={key}
        onClick={() => setFiltro(key)}
        className={[
          "inline-flex h-7 items-center justify-center rounded-full border px-3 text-xs font-medium transition",
          active
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : "border-slate-800 bg-slate-900/30 text-slate-300 hover:border-emerald-400/40 hover:text-slate-100",
        ].join(" ")}
        title={hint}
        type="button"
      >
        {label}
      </button>
    );
  };

  const msgFiltroBtn = (key: MsgFilter, label: string) => {
    const active = msgFiltro === key;
    return (
      <button
        key={key}
        onClick={() => setMsgFiltro(key)}
        className={[
          "inline-flex h-7 items-center justify-center rounded-full border px-3 text-xs font-medium transition",
          active
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
            : "border-slate-800 bg-slate-900/30 text-slate-300 hover:border-emerald-400/40 hover:text-slate-100",
        ].join(" ")}
        type="button"
      >
        {label}
      </button>
    );
  };

  const openEdit = (app: Appointment) => {
    setEditingId(app.id);
    setForm({
      cliente: app.cliente,
      cidade: app.cidade,
      data: app.data,
      horario: app.horario,
    });
    setEditarAgendamentoAberto(true);
  };

  const openWhatsApp = (cliente: string) => {
    // Sem telefone ainda: abre WhatsApp Web e deixa uma dica para integração futura
    window.open("https://web.whatsapp.com/", "_blank", "noopener,noreferrer");
    setToast(`Abrindo WhatsApp para ${cliente}…`);
    window.setTimeout(() => setToast(null), 2200);
  };

  const updateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setToast(`Status atualizado para "${status}".`);
    window.setTimeout(() => setToast(null), 2200);
  };

  const saveNew = () => {
    if (!form.cliente.trim() || !form.data.trim() || !form.horario.trim()) {
      setToast("Preencha Cliente, Data e Horário.");
      window.setTimeout(() => setToast(null), 2200);
      return;
    }

    const newItem: Appointment = {
      id: `a${Date.now()}`,
      cliente: form.cliente.trim(),
      cidade: form.cidade.trim() || "-",
      data: form.data,
      horario: form.horario,
      status: "Pendente",
    };

    setAppointments((prev) => [newItem, ...prev]);
    setNovoAgendamentoAberto(false);
    setFiltro("pendentes");
    scrollToAgendamentos();
    setToast("Agendamento criado como Pendente.");
    window.setTimeout(() => setToast(null), 2200);
  };

  const saveEdit = () => {
    if (!editingId) return;
    if (!form.cliente.trim() || !form.data.trim() || !form.horario.trim()) {
      setToast("Preencha Cliente, Data e Horário.");
      window.setTimeout(() => setToast(null), 2200);
      return;
    }

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === editingId
          ? {
              ...a,
              cliente: form.cliente.trim(),
              cidade: form.cidade.trim() || "-",
              data: form.data,
              horario: form.horario,
            }
          : a
      )
    );
    setEditarAgendamentoAberto(false);
    setEditingId(null);
    setToast("Agendamento atualizado.");
    window.setTimeout(() => setToast(null), 2200);
  };

  const markMessageReviewed = (id: string) => {
    setOutboundMessages((prev) =>
      prev.map((m) => (m.id === id && m.status === "Falhou" ? { ...m, status: "Enviado" } : m))
    );
    setToast("Marcado para reenvio (mock).");
    window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-slate-800 bg-slate-950/80 px-4 py-2 text-xs text-slate-100 shadow-sm shadow-slate-950/40 backdrop-blur">
          {toast}
        </div>
      )}

      <div className="space-y-6">
        {/* Ações rápidas + atenção agora */}
<section className="grid gap-4 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 lg:min-h-[230px] xl:min-h-[260px] shadow-sm shadow-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Atenção agora</h2>
                <p className="text-xs text-slate-500">Pendências e riscos que travam operação e vendas.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {quickActions.map((a) =>
                  a.kind === "link" ? (
                    <Link key={a.label} href={a.href} className={a.className}>
                      {a.icon}
                      {a.label}
                    </Link>
                  ) : (
                    <button key={a.label} onClick={a.onClick} className={a.className} type="button">
                      {a.icon}
                      {a.label}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              <button
                type="button"
                onClick={() => {
                  setToast("Abrindo fila de atendimento (em breve)...");
                  window.setTimeout(() => setToast(null), 2200);
                }}
                className="text-left rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:bg-slate-950/60 transition"
              >
                <p className="text-xs text-slate-500 inline-flex items-center gap-2">
                  <Icon name="message" />
                  Mensagens recebidas (1h)
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-50">7</p>
                <p className="text-xs text-slate-400">Responder até 18:00</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFiltro("pendentes");
                  scrollToAgendamentos();
                }}
                className="text-left rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:bg-slate-950/60 transition"
              >
                <p className="text-xs text-slate-500 inline-flex items-center gap-2">
                  <Icon name="alert" />
                  Conversas janela 24h
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-50">{pendentesCount}</p>
                <p className="text-xs text-slate-400">Agendamentos sem confirmação</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMsgFiltro("falhas");
                  scrollToFeed();
                }}
                className="text-left rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:bg-slate-950/60 transition"
              >
                <p className="text-xs text-slate-500 inline-flex items-center gap-2">
                  <Icon name="x" />
                  Falhas no envio
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-50">{falhasCount}</p>
                <p className="text-xs text-slate-400">Mensagens com erro de envio</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setToast("Abrindo leads quentes (em breve)...");
                  window.setTimeout(() => setToast(null), 2200);
                }}
                className="text-left rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:bg-slate-950/60 transition"
              >
                <p className="text-xs text-slate-500 inline-flex items-center gap-2">
                  <Icon name="fire" />
                  Leads quentes
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-50">3</p>
                <p className="text-xs text-slate-400">Orçamento / visita hoje</p>
              </button>
            </div>
          </div>

          {/* Cards de estatísticas */}
          <div className="lg:col-span-1 w-full grid self-center gap-4 md:grid-cols-2 lg:grid-cols-2">
            {stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} helper={stat.helper} icon={stat.icon} />
            ))}
          </div>
        </section>

        {/* Tabela + feed */}
        <section className="grid gap-4 lg:grid-cols-3 lg:items-start">
          {/* Próximos agendamentos */}
          <div ref={agendamentosRef} className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40 lg:h-[520px] overflow-hidden flex flex-col">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">
                  Próximos agendamentos
                  <span className="ml-2 text-xs font-medium text-slate-500">• {listaAgendamentos.length}</span>
                </h2>
                <p className="text-xs text-slate-500">Prioridade por pendência e data. Ações rápidas na linha.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {filtroBtn("todos", "Todos")}
                {filtroBtn("hoje", "Hoje")}
                {filtroBtn("semana", "Semana")}
                {filtroBtn("pendentes", "Pendentes")}
                <button
                  onClick={() => {
                    setForm(emptyForm);
                    setEditingId(null);
                    setNovoAgendamentoAberto(true);
                  }}
                  className="ml-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20 transition inline-flex items-center gap-2"
                  type="button"
                >
                  <Icon name="plus" className="h-4 w-4" />
                  Novo
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b border-slate-800 text-xs text-slate-500 bg-slate-900/60 backdrop-blur">
                    <th className="py-2 pr-4">Cliente</th>
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Cidade</th>
                                        <th className="py-2 pr-4">Status</th>
                    <th className="py-2 text-right">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {listaAgendamentos.map((app) => (
                    <tr key={app.id} className="group border-b border-slate-800/70 last:border-b-0 hover:bg-slate-900/40 transition">
                      <td className="py-3 pr-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-50 truncate">{app.cliente}</p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {app.data} • {app.horario}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-slate-200">{app.data}</td>
                      <td className="py-3 pr-4 text-slate-200">{app.cidade}</td>
<td className="py-3 pr-4">
                        <StatusBadge status={app.status} />
                      </td>

                      <td className="py-3 text-right">
                        <div className="inline-flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
                          <IconButton
                            title="WhatsApp"
                            onClick={() => openWhatsApp(app.cliente)}
                            icon={<Icon name="message" className="h-4 w-4" />}
                            variant="neutral"
                          />
                          <IconButton
                            title="Editar"
                            onClick={() => openEdit(app)}
                            icon={<Icon name="pencil" className="h-4 w-4" />}
                            variant="info"
                          />
                          {app.status === "Pendente" ? (
                            <IconButton
                              title="Confirmar"
                              onClick={() => updateStatus(app.id, "Agendado")}
                              icon={<Icon name="check" className="h-4 w-4" />}
                              variant="good"
                            />
                          ) : app.status === "Agendado" ? (
                            <IconButton
                              title="Concluir"
                              onClick={() => updateStatus(app.id, "Concluído")}
                              icon={<Icon name="check" className="h-4 w-4" />}
                              variant="good"
                            />
                          ) : (
                            <IconButton
                              title="Cancelar"
                              onClick={() => updateStatus(app.id, "Cancelado")}
                              icon={<Icon name="x" className="h-4 w-4" />}
                              variant="danger"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {listaAgendamentos.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-sm text-slate-500">
                        Nenhum agendamento para este filtro.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Últimas respostas enviadas */}
          <div ref={feedRef} className="lg:col-span-1 w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40 lg:h-[520px] overflow-hidden flex flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Últimas respostas enviadas</h2>
                <p className="text-xs text-slate-500">Auditoria de bot/time + status de entrega.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {msgFiltroBtn("todas", "Todas")}
                {msgFiltroBtn("falhas", `Falhas (${falhasCount})`)}
              </div>
            </div>

            <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-1 pb-1">
              {listaMensagens.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:bg-slate-950/60 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-50 truncate">{m.cliente}</p>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">{m.texto}</p>
                    </div>
                    <span className="text-xs text-slate-500 shrink-0">{m.horario}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/50 px-2.5 py-0.5 text-xs text-slate-200">
                        {m.autor === "Bot" ? <Icon name="inbox" className="h-4 w-4" /> : <Icon name="users" className="h-4 w-4" />}
                        {m.autor}
                      </span>
                      {m.tempoResposta && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                          <Icon name="clock" className="h-4 w-4" />
                          {m.tempoResposta}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <OutboundBadge status={m.status} />
                      <button
                        type="button"
                        onClick={() => openWhatsApp(m.cliente)}
                        className="rounded-md border border-slate-700 bg-slate-950/40 px-2 py-1 text-xs text-slate-200 hover:bg-slate-900/70 transition inline-flex items-center gap-1.5"
                        title="Abrir WhatsApp"
                      >
                        <Icon name="external" className="h-4 w-4" />
                        Abrir
                      </button>
                      {m.status === "Falhou" && (
                        <button
                          type="button"
                          onClick={() => markMessageReviewed(m.id)}
                          className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-200 hover:bg-emerald-500/20 transition inline-flex items-center gap-1.5"
                          title="Marcar para reenvio (mock)"
                        >
                          <Icon name="check" className="h-4 w-4" />
                          Reenviar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {listaMensagens.length === 0 && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-6 text-sm text-slate-500">
                  Nenhum item para este filtro.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Modal: Novo agendamento */}
      <Modal
        open={novoAgendamentoAberto}
        onClose={() => setNovoAgendamentoAberto(false)}
        title="Novo agendamento"
        description="Cadastre um novo serviço. Ele entra como Pendente para confirmação."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-slate-400">Cliente</label>
            <input
              value={form.cliente}
              onChange={(e) => setForm((p) => ({ ...p, cliente: e.target.value }))}
              placeholder="Nome do cliente"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-400">Cidade</label>
            <input
              value={form.cidade}
              onChange={(e) => setForm((p) => ({ ...p, cidade: e.target.value }))}
              placeholder="Ex.: São Paulo"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>
          <div>
</div>
          <div>
            <label className="mb-1 block text-slate-400">Data</label>
            <input
              value={form.data}
              onChange={(e) => setForm((p) => ({ ...p, data: e.target.value }))}
              placeholder="dd/mm/aaaa"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-400">Horário</label>
            <input
              value={form.horario}
              onChange={(e) => setForm((p) => ({ ...p, horario: e.target.value }))}
              placeholder="hh:mm"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>

          <div className="md:col-span-2 mt-2 flex items-center justify-end gap-2">
            <button
              onClick={() => setNovoAgendamentoAberto(false)}
              className="rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900/70 transition"
              type="button"
            >
              Cancelar
            </button>
            <button
              onClick={saveNew}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
              type="button"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Editar agendamento */}
      <Modal
        open={editarAgendamentoAberto}
        onClose={() => setEditarAgendamentoAberto(false)}
        title="Editar agendamento"
        description="Atualize dados do cliente, data/horário."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-slate-400">Cliente</label>
            <input
              value={form.cliente}
              onChange={(e) => setForm((p) => ({ ...p, cliente: e.target.value }))}
              placeholder="Nome do cliente"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-400">Cidade</label>
            <input
              value={form.cidade}
              onChange={(e) => setForm((p) => ({ ...p, cidade: e.target.value }))}
              placeholder="Ex.: Campinas"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>
          <div>
</div>
          <div>
            <label className="mb-1 block text-slate-400">Data</label>
            <input
              value={form.data}
              onChange={(e) => setForm((p) => ({ ...p, data: e.target.value }))}
              placeholder="dd/mm/aaaa"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-400">Horário</label>
            <input
              value={form.horario}
              onChange={(e) => setForm((p) => ({ ...p, horario: e.target.value }))}
              placeholder="hh:mm"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>

          <div className="md:col-span-2 mt-2 flex items-center justify-end gap-2">
            <button
              onClick={() => setEditarAgendamentoAberto(false)}
              className="rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900/70 transition"
              type="button"
            >
              Cancelar
            </button>
            <button
              onClick={saveEdit}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
              type="button"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
