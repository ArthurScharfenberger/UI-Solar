// src/app/clientes/components/Filters.tsx
"use client";

type FiltersProps = {
  search: string;
  cidadeFilter: string;
  statusFilter: string;
  cidadesUnicas: string[];
  onSearchChange: (value: string) => void;
  onCidadeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
};

export function Filters({
  search,
  cidadeFilter,
  statusFilter,
  cidadesUnicas,
  onSearchChange,
  onCidadeFilterChange,
  onStatusFilterChange,
}: FiltersProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
      <div className="grid gap-3 md:grid-cols-4">
        {/* Busca */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-slate-400">
            Buscar por nome ou telefone
          </label>
          <input
            type="text"
            placeholder="Ex.: Carlos, (51) 99999-1111"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 outline-none focus:border-emerald-400"
          />
        </div>

        {/* Cidade */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">
            Cidade
          </label>
          <select
            value={cidadeFilter}
            onChange={(e) => onCidadeFilterChange(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
          >
            <option value="todas">Todas</option>
            {cidadesUnicas.map((cidadeEstado) => (
              <option key={cidadeEstado} value={cidadeEstado}>
                {cidadeEstado}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-400">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
          >
            <option value="todos">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      </div>
    </section>
  );
}
