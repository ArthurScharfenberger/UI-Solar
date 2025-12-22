// src/app/clientes/components/ClientsTable.tsx
"use client";

import { Cliente, ClienteStatus } from "../types";

type ClientsTableProps = {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: string) => void;
};

function StatusBadge({ status }: { status: ClienteStatus }) {
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
    <span
      className={`${base} bg-slate-700/40 text-slate-200 border-slate-500/60`}
    >
      • Inativo
    </span>
  );
}


export function ClientsTable({ clientes, onEdit, onDelete }: ClientsTableProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {clientes.length} cliente(s) encontrado(s)
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs text-slate-500">
              <th className="py-2 pr-4">Cliente</th>
              <th className="py-2 pr-4">Contato</th>
              <th className="py-2 pr-4">Endereço</th>
              <th className="py-2 pr-4">Potência</th>
                            <th className="py-2 pr-4">Última limpeza</th>
              <th className="py-2 pr-4">Próxima revisão</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr
                key={c.id}
                className="border-b border-slate-900/60 last:border-0 hover:bg-slate-900/80 transition"
              >
                <td className="py-2 pr-4 text-slate-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{c.nome}</span>
                    <span className="text-xs text-slate-500">
                      {c.cidade} - {c.estado}
                    </span>
                  </div>
                </td>
                <td className="py-2 pr-4 text-xs text-slate-300">
                  {c.telefone}
                </td>
                <td className="py-2 pr-4 text-xs text-slate-300">
                  {c.rua}, {c.numero}
                  {c.bairro && ` - ${c.bairro}`}
                  {c.cep && ` • CEP ${c.cep}`}
                </td>
                <td className="py-2 pr-4 text-xs text-slate-200">
                  {c.potenciaKwp.toFixed(1)} kWp
                </td>
<td className="py-2 pr-4 text-xs text-slate-200">
                  {c.ultimaLimpeza}
                </td>
                <td className="py-2 pr-4 text-xs text-slate-200">
                  {c.proximaRevisao}
                </td>
                <td className="py-2 pr-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="py-2 pr-2 text-right">
                  <div className="inline-flex gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(c)}
                      className="rounded-md border border-slate-600 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-200 hover:border-emerald-400 hover:bg-emerald-500/10 transition"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(c.id)}
                      className="rounded-md border border-red-500/70 bg-red-500/10 px-2 py-1 text-[11px] text-red-200 hover:bg-red-500/20 transition"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-xs text-slate-500"
                >
                  Nenhum cliente encontrado com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
