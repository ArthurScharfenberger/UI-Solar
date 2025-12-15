"use client";

import { useState } from "react";
import Modal from "../components/Modal";

type AppointmentStatus = "Agendado" | "Concluído" | "Pendente" | "Cancelado";

type Appointment = {
  id: string;
  cliente: string;
  telefone: string;
  data: string;
  horario: string;
  cidade: string;
  origem: "WhatsApp" | "Indicação" | "Site";
  status: AppointmentStatus;
};

const agendamentosMock: Appointment[] = [
  {
    id: "1",
    cliente: "Carlos Silva",
    telefone: "(51) 99999-0001",
    data: "09/12/2025",
    horario: "14:00",
    cidade: "Canoas - RS",
    origem: "WhatsApp",
    status: "Agendado",
  },
  {
    id: "2",
    cliente: "Mariana Souza",
    telefone: "(51) 98888-0002",
    data: "10/12/2025",
    horario: "09:30",
    cidade: "Porto Alegre - RS",
    origem: "Site",
    status: "Pendente",
  },
  {
    id: "3",
    cliente: "João Pereira",
    telefone: "(51) 97777-0003",
    data: "10/12/2025",
    horario: "16:00",
    cidade: "Novo Hamburgo - RS",
    origem: "Indicação",
    status: "Concluído",
  },
  {
    id: "4",
    cliente: "Ana Costa",
    telefone: "(51) 96666-0004",
    data: "11/12/2025",
    horario: "11:00",
    cidade: "São Leopoldo - RS",
    origem: "WhatsApp",
    status: "Agendado",
  },
];

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

export default function AgendamentosPage() {
  const [statusFiltro, setStatusFiltro] = useState<AppointmentStatus | "Todos">(
    "Todos"
  );
  const [selecionado, setSelecionado] = useState<Appointment | null>(null);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalLembreteAberto, setModalLembreteAberto] = useState(false);
  const [modalReagendarAberto, setModalReagendarAberto] = useState(false);
  const [agendamentos, setAgendamentos] = useState<Appointment[]>(agendamentosMock);

  const emptyNovo: Omit<Appointment, "id"> = {
    cliente: "",
    telefone: "",
    data: "",
    horario: "",
    cidade: "",
    origem: "WhatsApp",
    status: "Pendente",
  };

  const [novoForm, setNovoForm] = useState<Omit<Appointment, "id">>(emptyNovo);
  const [modalNovoAberto, setModalNovoAberto] = useState(false);

  function abrirNovoAgendamento() {
    setNovoForm(emptyNovo);
    setModalNovoAberto(true);
  }

  function salvarNovoAgendamento() {
    if (!novoForm.cliente.trim()) return;
    const novo: Appointment = {
      id: String(Date.now()),
      ...novoForm,
    };
    setAgendamentos((prev) => [novo, ...prev]);
    setModalNovoAberto(false);
  }


  const agendamentosFiltrados =
    statusFiltro === "Todos"
      ? agendamentos
      : agendamentos.filter((a) => a.status === statusFiltro);

  function abrirDetalhes(a: Appointment) {
    setSelecionado(a);
    setModalDetalhesAberto(true);
  }

  function abrirLembrete(a: Appointment) {
    setSelecionado(a);
    setModalLembreteAberto(true);
  }

  function abrirReagendar(a: Appointment) {
    setSelecionado(a);
    setModalReagendarAberto(true);
  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">
              Agendamentos
            </h1>
            <p className="text-xs text-slate-400">
              Controle das visitas de limpeza e revisões agendadas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setStatusFiltro("Todos")}
              className={`rounded-full border px-3 py-1 ${
                statusFiltro === "Todos"
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              Todos
            </button>
            {(["Agendado", "Pendente", "Concluído"] as AppointmentStatus[]).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setStatusFiltro(s)}
                  className={`rounded-full border px-3 py-1 ${
                    statusFiltro === s
                      ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {s}
                </button>
              )
            )}
          
            <button
              onClick={abrirNovoAgendamento}
              className="ml-1 inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-200 hover:bg-emerald-500/20 transition"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
</svg>
              Novo agendamento
            </button>
</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
          <div className="mb-3 flex justify-between text-xs text-slate-400">
            <span>{agendamentosFiltrados.length} registros encontrados.</span>
            <span>Simulação – dados fixos em memória.</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-500">
                  <th className="py-2 pr-4">Cliente</th>
                  <th className="py-2 pr-4">Data</th>
                  <th className="py-2 pr-4">Cidade</th>
                  <th className="py-2 pr-4">Origem</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {agendamentosFiltrados.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-slate-900/60 last:border-0 hover:bg-slate-900/60"
                  >
                    <td className="py-2 pr-4 text-slate-100">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{a.cliente}</span>
                        <span className="text-xs text-slate-500">
                          {a.telefone}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-xs text-slate-200">
                      {a.data} • {a.horario}
                    </td>
                    <td className="py-2 pr-4 text-xs text-slate-300">
                      {a.cidade}
                    </td>
                    <td className="py-2 pr-4 text-xs text-slate-400">
                      {a.origem}
                    </td>
                    <td className="py-2 pr-4">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="py-2 text-right text-xs">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => abrirDetalhes(a)}
                          className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300 hover:bg-slate-800"
                        >
                          Detalhes
                        </button>
                        <button
                          onClick={() => abrirLembrete(a)}
                          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-emerald-200 hover:bg-emerald-500/20"
                        >
                          Enviar lembrete
                        </button>
                        <button
                          onClick={() => abrirReagendar(a)}
                          className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300 hover:bg-slate-800"
                        >
                          Reagendar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal detalhes */}
      <Modal
        open={modalDetalhesAberto && !!selecionado}
        onClose={() => setModalDetalhesAberto(false)}
        title="Detalhes do agendamento"
        cancelLabel="Fechar"
      >
        {selecionado && (
          <div className="space-y-2 text-xs text-slate-300">
            <p>
              <span className="text-slate-500">Cliente: </span>
              {selecionado.cliente}
            </p>
            <p>
              <span className="text-slate-500">Telefone: </span>
              {selecionado.telefone}
            </p>
            <p>
              <span className="text-slate-500">Data e horário: </span>
              {selecionado.data} às {selecionado.horario}
            </p>
            <p>
              <span className="text-slate-500">Cidade: </span>
              {selecionado.cidade}
            </p>
            <p>
              <span className="text-slate-500">Origem: </span>
              {selecionado.origem}
            </p>
            <p>
              <span className="text-slate-500">Status atual: </span>
              {selecionado.status}
            </p>
            <p className="pt-2 text-slate-400">
              Aqui depois podemos exibir histórico de mensagens do WhatsApp
              relacionadas a este agendamento.
            </p>
          </div>
        )}
      </Modal>

      {/* Modal lembrete WhatsApp */}
      <Modal
        open={modalLembreteAberto && !!selecionado}
        onClose={() => setModalLembreteAberto(false)}
        title="Enviar lembrete via WhatsApp"
        description="Simulação de envio. No futuro essa ação vai chamar a API oficial do bot."
        confirmLabel="Enviar (simulação)"
        onConfirm={() =>
          console.log(
            "Simulação: enviar lembrete WhatsApp para agendamento",
            selecionado?.id
          )
        }
      >
        {selecionado && (
          <div className="space-y-2 text-xs text-slate-300">
            <p>
              Enviar lembrete para <strong>{selecionado.cliente}</strong> em{" "}
              <strong>{selecionado.data}</strong> às{" "}
              <strong>{selecionado.horario}</strong>.
            </p>
            <p className="text-slate-400">
              Mensagem padrão (exemplo de como ficará):
            </p>
            <div className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-[11px] text-slate-200">
              Olá {selecionado.cliente.split(" ")[0]}, tudo bem? 👋{" "}
              {"\n"}
              Passando para lembrar do seu agendamento de limpeza de placas
              solares no dia {selecionado.data} às {selecionado.horario}.{" "}
              {"\n"}
              Qualquer alteração é só responder esta mensagem.
            </div>
          </div>
        )}
      </Modal>

      {/* Modal reagendar */}
      <Modal
        open={modalReagendarAberto && !!selecionado}
        onClose={() => setModalReagendarAberto(false)}
        title="Reagendar visita"
        description="Reagendamento simulado. Depois podemos atualizar a data real via API."
        confirmLabel="Salvar novo horário (simulação)"
        onConfirm={() =>
          console.log(
            "Simulação: reagendar agendamento",
            selecionado?.id
          )
        }
      >
        {selecionado && (
          <div className="grid grid-cols-1 gap-3 text-xs">
            <p className="text-slate-300">
              Cliente: <strong>{selecionado.cliente}</strong>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-slate-400">Nova data</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-slate-400">Novo horário</label>
                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={modalNovoAberto} title="Novo Agendamento" onClose={() => setModalNovoAberto(false)}>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-50">Novo agendamento</h3>
          <p className="text-xs text-slate-400">Crie um agendamento rapidamente.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-slate-400 text-xs">Cliente</label>
            <input
              value={novoForm.cliente}
              onChange={(e) => setNovoForm((p) => ({ ...p, cliente: e.target.value }))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-400 text-xs">Telefone</label>
            <input
              value={novoForm.telefone}
              onChange={(e) => setNovoForm((p) => ({ ...p, telefone: e.target.value }))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              placeholder="(DDD) 99999-9999"
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-400 text-xs">Data</label>
            <input
              type="date"
              value={novoForm.data}
              onChange={(e) => setNovoForm((p) => ({ ...p, data: e.target.value }))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-400 text-xs">Horário</label>
            <input
              type="time"
              value={novoForm.horario}
              onChange={(e) => setNovoForm((p) => ({ ...p, horario: e.target.value }))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-400 text-xs">Cidade</label>
            <input
              value={novoForm.cidade}
              onChange={(e) => setNovoForm((p) => ({ ...p, cidade: e.target.value }))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              placeholder="Ex: São Paulo"
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-400 text-xs">Origem</label>
            <select
              value={novoForm.origem}
              onChange={(e) => setNovoForm((p) => ({ ...p, origem: e.target.value as Appointment["origem"] }))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Site">Site</option>
              <option value="Indicação">Indicação</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={() => setModalNovoAberto(false)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
            type="button"
          >
            Cancelar
          </button>
          <button
            onClick={salvarNovoAgendamento}
            className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-emerald-950 hover:bg-emerald-400"
            type="button"
          >
            Salvar
          </button>
        </div>
      </Modal>

    </>
  );
}
