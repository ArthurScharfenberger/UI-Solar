"use client";

import { useState } from "react";
import Modal from "./components/Modal";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
};

type AppointmentStatus = "Agendado" | "Concluído" | "Pendente" | "Cancelado";

type Appointment = {
  id: string;
  cliente: string;
  data: string;
  horario: string;
  cidade: string;
  status: AppointmentStatus;
  origem: "WhatsApp" | "Indicação" | "Site";
};

type Conversation = {
  id: string;
  cliente: string;
  ultimaMensagem: string;
  horario: string;
  novo: boolean;
};

const stats: StatCardProps[] = [
  { label: "Leads hoje", value: "18", helper: "+32% vs ontem" },
  { label: "Agendamentos na semana", value: "27", helper: "5 pendentes de confirmação" },
  { label: "Mensagens não lidas", value: "7", helper: "Responder até 18:00" },
  { label: "Taxa de resposta", value: "92%", helper: "Média nas últimas 24h" },
];

const appointments: Appointment[] = [
  {
    id: "1",
    cliente: "Carlos Silva",
    data: "09/12/2025",
    horario: "14:00",
    cidade: "Canoas - RS",
    status: "Agendado",
    origem: "WhatsApp",
  },
  {
    id: "2",
    cliente: "Mariana Souza",
    data: "10/12/2025",
    horario: "09:30",
    cidade: "Porto Alegre - RS",
    status: "Pendente",
    origem: "Site",
  },
  {
    id: "3",
    cliente: "João Pereira",
    data: "10/12/2025",
    horario: "16:00",
    cidade: "Novo Hamburgo - RS",
    status: "Concluído",
    origem: "Indicação",
  },
  {
    id: "4",
    cliente: "Ana Costa",
    data: "11/12/2025",
    horario: "11:00",
    cidade: "São Leopoldo - RS",
    status: "Agendado",
    origem: "WhatsApp",
  },
];

const conversations: Conversation[] = [
  {
    id: "c1",
    cliente: "Eduardo Lima",
    ultimaMensagem: "Tenho placas desde 2021, qual a frequência ideal de limpeza?",
    horario: "Hoje • 10:42",
    novo: true,
  },
  {
    id: "c2",
    cliente: "Fernanda Dias",
    ultimaMensagem: "Pode me mandar valores para 12 placas?",
    horario: "Hoje • 09:15",
    novo: true,
  },
  {
    id: "c3",
    cliente: "Pedro Rocha",
    ultimaMensagem: "Fechamos para sexta, pode confirmar o horário?",
    horario: "Ontem • 18:23",
    novo: false,
  },
  {
    id: "c4",
    cliente: "Condomínio Solar Vista",
    ultimaMensagem: "Precisamos de orçamento para 80 placas.",
    horario: "Ontem • 16:10",
    novo: false,
  },
];

function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-50">{value}</p>
      {helper && <p className="mt-1 text-xs text-slate-400">{helper}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border";
  switch (status) {
    case "Agendado":
      return (
        <span className={`${base} bg-emerald-500/10 text-emerald-300 border-emerald-500/30`}>
          • Agendado
        </span>
      );
    case "Concluído":
      return (
        <span className={`${base} bg-sky-500/10 text-sky-300 border-sky-500/30`}>
          • Concluído
        </span>
      );
    case "Pendente":
      return (
        <span className={`${base} bg-yellow-500/10 text-yellow-300 border-yellow-500/30`}>
          • Pendente
        </span>
      );
    case "Cancelado":
    default:
      return (
        <span className={`${base} bg-red-500/10 text-red-300 border-red-500/30`}>
          • Cancelado
        </span>
      );
  }
}

export default function DashboardPage() {
  const [novoAgendamentoAberto, setNovoAgendamentoAberto] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Cards de estatísticas */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              helper={stat.helper}
            />
          ))}
        </section>

        {/* Tabela + conversas */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Próximos agendamentos */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">
                  Próximos agendamentos
                </h2>
                <p className="text-xs text-slate-500">
                  Visão rápida dos serviços programados.
                </p>
              </div>
              <button
                onClick={() => setNovoAgendamentoAberto(true)}
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 hover:bg-emerald-500/20 transition"
              >
                Novo agendamento
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-xs text-slate-500">
                    <th className="py-2 pr-4">Cliente</th>
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Cidade</th>
                    <th className="py-2 pr-4">Origem</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-slate-900/60 last:border-0 hover:bg-slate-900/60"
                    >
                      <td className="py-2 pr-4 text-slate-100">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {app.cliente}
                          </span>
                          <span className="text-xs text-slate-500">
                            {app.horario}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4 text-sm text-slate-200">
                        {app.data}
                      </td>
                      <td className="py-2 pr-4 text-sm text-slate-200">
                        {app.cidade}
                      </td>
                      <td className="py-2 pr-4 text-xs text-slate-400">
                        {app.origem}
                      </td>
                      <td className="py-2">
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Últimas conversas */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">
                  Últimas conversas
                </h2>
                <p className="text-xs text-slate-500">
                  Chats recentes do WhatsApp da empresa.
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
                {conversations.filter((c) => c.novo).length} novas
              </span>
            </div>

            <div className="space-y-3">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3 text-left text-sm hover:border-emerald-400/50 hover:bg-slate-900 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-50">
                      {conv.cliente}
                    </p>
                    <span className="text-[11px] text-slate-500">
                      {conv.horario}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                    {conv.ultimaMensagem}
                  </p>
                  {conv.novo && (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                      Novo
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Modal de novo agendamento */}
      <Modal
        open={novoAgendamentoAberto}
        onClose={() => setNovoAgendamentoAberto(false)}
        title="Novo agendamento"
        description="Preencha os dados para simular a criação de um agendamento."
        confirmLabel="Salvar (simulação)"
        onConfirm={() => {
          console.log("Simulação de criação de agendamento");
        }}
      >
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div>
            <label className="mb-1 block text-slate-400">Cliente</label>
            <input
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              placeholder="Nome do cliente"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-slate-400">Data</label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-400">Horário</label>
              <input
                type="time"
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-slate-400">Cidade</label>
            <input
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              placeholder="Ex.: Canoas - RS"
            />
          </div>
          <div>
            <label className="mb-1 block text-slate-400">Origem</label>
            <select className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400">
              <option>WhatsApp</option>
              <option>Site</option>
              <option>Indicação</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}
