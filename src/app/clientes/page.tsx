// src/app/clientes/page.tsx
"use client";

import { useMemo, useState, FormEvent } from "react";

type ClienteStatus = "Ativo" | "Inativo";
type ClienteOrigem = "WhatsApp" | "Site" | "Indicação";

type Cliente = {
  id: string;
  nome: string;
  telefone: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  potenciaKwp: number;
  origem: ClienteOrigem;
  ultimaLimpeza: string;
  proximaRevisao: string;
  status: ClienteStatus;
};

type NovoClienteForm = {
  nome: string;
  telefone: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  potenciaKwp: string;
  origem: ClienteOrigem;
  status: ClienteStatus;
};

type ModalMode = "create" | "edit";

// estados -> cidades (mock – depois dá pra trocar por API do IBGE)
const ESTADOS_CIDADES: Record<string, string[]> = {
  RS: ["Canoas", "Porto Alegre", "Novo Hamburgo", "São Leopoldo", "Gravataí"],
  SC: ["Florianópolis", "Joinville", "Blumenau"],
  PR: ["Curitiba", "Londrina", "Maringá"],
};

const CLIENTES_INICIAIS: Cliente[] = [
  {
    id: "c1",
    nome: "Carlos Silva",
    telefone: "(51) 99999-1111",
    estado: "RS",
    cidade: "Canoas",
    rua: "Rua das Flores",
    numero: "123",
    bairro: "Centro",
    cep: "92000-000",
    potenciaKwp: 5.2,
    origem: "WhatsApp",
    ultimaLimpeza: "05/06/2025",
    proximaRevisao: "05/12/2025",
    status: "Ativo",
  },
  {
    id: "c2",
    nome: "Mariana Souza",
    telefone: "(51) 98888-2222",
    estado: "RS",
    cidade: "Porto Alegre",
    rua: "Av. Ipiranga",
    numero: "500",
    bairro: "Jardim Botânico",
    cep: "90160-000",
    potenciaKwp: 7.8,
    origem: "Site",
    ultimaLimpeza: "18/04/2025",
    proximaRevisao: "18/10/2025",
    status: "Ativo",
  },
  {
    id: "c3",
    nome: "João Pereira",
    telefone: "(51) 97777-3333",
    estado: "RS",
    cidade: "Novo Hamburgo",
    rua: "Rua Bento Gonçalves",
    numero: "45",
    bairro: "Rio Branco",
    cep: "93310-000",
    potenciaKwp: 3.6,
    origem: "Indicação",
    ultimaLimpeza: "10/01/2025",
    proximaRevisao: "10/07/2025",
    status: "Inativo",
  },
  {
    id: "c4",
    nome: "Ana Costa",
    telefone: "(51) 96666-4444",
    estado: "RS",
    cidade: "São Leopoldo",
    rua: "Av. Independência",
    numero: "800",
    bairro: "Centro",
    cep: "93010-000",
    potenciaKwp: 4.3,
    origem: "WhatsApp",
    ultimaLimpeza: "22/08/2025",
    proximaRevisao: "22/02/2026",
    status: "Ativo",
  },
];

function formatDateToPtBr(isoDate: string) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function formatDatePtBrToIso(pt: string) {
  if (!pt || pt === "-") return "";
  const [day, month, year] = pt.split("/");
  if (!day || !month || !year) return "";
  return `${year}-${month}-${day}`;
}

// máscara de telefone BR (xx) xxxxx-xxxx
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11); // até 11 dígitos

  if (digits.length <= 2) return digits;
  if (digits.length <= 6)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(
      6
    )}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
    7,
    11
  )}`;
}

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

function OrigemBadge({ origem }: { origem: ClienteOrigem }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border";
  if (origem === "WhatsApp") {
    return (
      <span
        className={`${base} bg-emerald-500/10 text-emerald-300 border-emerald-500/40`}
      >
        WhatsApp
      </span>
    );
  }
  if (origem === "Site") {
    return (
      <span className={`${base} bg-sky-500/10 text-sky-300 border-sky-500/40`}>
        Site
      </span>
    );
  }
  return (
    <span
      className={`${base} bg-yellow-500/10 text-yellow-300 border-yellow-500/40`}
    >
      Indicação
    </span>
  );
}

export default function ClientesPage() {
  // ====== ESTADOS PRINCIPAIS ======
  const [clientes, setClientes] = useState<Cliente[]>(CLIENTES_INICIAIS);

  const [search, setSearch] = useState("");
  const [cidadeFilter, setCidadeFilter] = useState<string>("todas");
  const [origemFilter, setOrigemFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  // Modal (criar/editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [novoCliente, setNovoCliente] = useState<NovoClienteForm>({
    nome: "",
    telefone: "",
    estado: "RS",
    cidade: "",
    rua: "",
    numero: "",
    bairro: "",
    cep: "",
    potenciaKwp: "",
    origem: "WhatsApp",
    status: "Ativo",
  });
  const [dataUltima, setDataUltima] = useState("");
  const [dataProxima, setDataProxima] = useState("");
  const [erroForm, setErroForm] = useState("");
  const [sucessoForm, setSucessoForm] = useState("");

  // ====== DERIVADOS ======
  const cidadesUnicas = useMemo(
    () =>
      Array.from(
        new Set(clientes.map((c) => `${c.cidade} - ${c.estado}`))
      ).sort(),
    [clientes]
  );

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const cidadeEstado = `${c.cidade} - ${c.estado}`;

      const matchNome =
        search.trim().length === 0 ||
        c.nome.toLowerCase().includes(search.toLowerCase()) ||
        c.telefone.replace(/\D/g, "").includes(search.replace(/\D/g, ""));

      const matchCidade =
        cidadeFilter === "todas" || cidadeEstado === cidadeFilter;

      const matchOrigem =
        origemFilter === "todas" || c.origem === origemFilter;

      const matchStatus =
        statusFilter === "todos" || c.status === statusFilter;

      return matchNome && matchCidade && matchOrigem && matchStatus;
    });
  }, [clientes, search, cidadeFilter, origemFilter, statusFilter]);

  // ====== HANDLERS ======

  function handleExportarLista() {
    if (clientesFiltrados.length === 0) {
      alert("Não há clientes para exportar com os filtros atuais.");
      return;
    }

    const header = [
      "Nome",
      "Telefone",
      "Estado",
      "Cidade",
      "Rua",
      "Número",
      "Bairro",
      "CEP",
      "Potência (kWp)",
      "Origem",
      "Última limpeza",
      "Próxima revisão",
      "Status",
    ].join(";");

    const rows = clientesFiltrados
      .map((c) =>
        [
          c.nome,
          c.telefone,
          c.estado,
          c.cidade,
          c.rua,
          c.numero,
          c.bairro,
          c.cep,
          c.potenciaKwp.toString().replace(".", ","),
          c.origem,
          c.ultimaLimpeza,
          c.proximaRevisao,
          c.status,
        ]
          .map((value) => `"${value}"`)
          .join(";")
      )
      .join("\n");

    const csvContent = `${header}\n${rows}`;
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "clientes-solar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function abrirModalNovoCliente() {
    setModalMode("create");
    setEditingId(null);
    setErroForm("");
    setSucessoForm("");
    setDataUltima("");
    setDataProxima("");
    setNovoCliente({
      nome: "",
      telefone: "",
      estado: "RS",
      cidade: "",
      rua: "",
      numero: "",
      bairro: "",
      cep: "",
      potenciaKwp: "",
      origem: "WhatsApp",
      status: "Ativo",
    });
    setIsModalOpen(true);
  }

  function abrirModalEditarCliente(cliente: Cliente) {
    setModalMode("edit");
    setEditingId(cliente.id);
    setErroForm("");
    setSucessoForm("");

    setNovoCliente({
      nome: cliente.nome,
      telefone: cliente.telefone,
      estado: cliente.estado,
      cidade: cliente.cidade,
      rua: cliente.rua,
      numero: cliente.numero,
      bairro: cliente.bairro,
      cep: cliente.cep,
      potenciaKwp: cliente.potenciaKwp.toString().replace(".", ","),
      origem: cliente.origem,
      status: cliente.status,
    });

    setDataUltima(formatDatePtBrToIso(cliente.ultimaLimpeza));
    setDataProxima(formatDatePtBrToIso(cliente.proximaRevisao));

    setIsModalOpen(true);
  }

  function handleExcluirCliente(clienteId: string) {
    const ok = window.confirm(
      "Tem certeza que deseja excluir este cliente? Essa ação não pode ser desfeita."
    );
    if (!ok) return;

    setClientes((prev) => prev.filter((c) => c.id !== clienteId));
  }

  function handleSalvarCliente(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErroForm("");
    setSucessoForm("");

    if (
      !novoCliente.nome.trim() ||
      !novoCliente.telefone.trim() ||
      !novoCliente.estado.trim() ||
      !novoCliente.cidade.trim() ||
      !novoCliente.rua.trim() ||
      !novoCliente.numero.trim() ||
      !novoCliente.potenciaKwp.trim()
    ) {
      setErroForm("Preencha todos os campos obrigatórios (*).");
      return;
    }

    const potencia = parseFloat(
      novoCliente.potenciaKwp.replace(",", ".")
    );
    if (isNaN(potencia) || potencia <= 0) {
      setErroForm("Informe uma potência válida em kWp.");
      return;
    }

    const id =
      modalMode === "edit" && editingId ? editingId : `c-${Date.now()}`;

    const clienteNovo: Cliente = {
      id,
      nome: novoCliente.nome.trim(),
      telefone: novoCliente.telefone.trim(),
      estado: novoCliente.estado,
      cidade: novoCliente.cidade,
      rua: novoCliente.rua.trim(),
      numero: novoCliente.numero.trim(),
      bairro: novoCliente.bairro.trim(),
      cep: novoCliente.cep.trim(),
      potenciaKwp: potencia,
      origem: novoCliente.origem,
      ultimaLimpeza: dataUltima ? formatDateToPtBr(dataUltima) : "-",
      proximaRevisao: dataProxima ? formatDateToPtBr(dataProxima) : "-",
      status: novoCliente.status,
    };

    if (modalMode === "create") {
      setClientes((prev) => [clienteNovo, ...prev]);
    } else {
      setClientes((prev) =>
        prev.map((c) => (c.id === id ? clienteNovo : c))
      );
    }

    setSucessoForm(
      modalMode === "create"
        ? "Cliente cadastrado com sucesso!"
        : "Cliente atualizado com sucesso!"
    );

    setTimeout(() => {
      setIsModalOpen(false);
    }, 600);
  }

  // ====== RENDER ======
  return (
    <div className="space-y-6">
      {/* Header interno */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            Clientes cadastrados
          </h2>
          <p className="text-xs text-slate-500">
            Base de clientes atendidos pela limpeza de placas solares.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleExportarLista}
            className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition"
          >
            Exportar lista
          </button>
          <button
            type="button"
            onClick={abrirModalNovoCliente}
            className="rounded-lg border border-emerald-500/70 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-500/30 hover:border-emerald-400 transition"
          >
            Novo cliente
          </button>
        </div>
      </div>

      {/* Filtros */}
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
              onChange={(e) => setSearch(e.target.value)}
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
              onChange={(e) => setCidadeFilter(e.target.value)}
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

          {/* Origem + status */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-400">
                Origem
              </label>
              <select
                value={origemFilter}
                onChange={(e) => setOrigemFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
              >
                <option value="todas">Todas</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Site">Site</option>
                <option value="Indicação">Indicação</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-400">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
              >
                <option value="todos">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {clientesFiltrados.length} cliente(s) encontrado(s)
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
                <th className="py-2 pr-4">Origem</th>
                <th className="py-2 pr-4">Última limpeza</th>
                <th className="py-2 pr-4">Próxima revisão</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((c) => (
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
                  <td className="py-2 pr-4">
                    <OrigemBadge origem={c.origem} />
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
                        onClick={() => abrirModalEditarCliente(c)}
                        className="rounded-md border border-slate-600 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-200 hover:border-emerald-400 hover:bg-emerald-500/10 transition"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExcluirCliente(c.id)}
                        className="rounded-md border border-red-500/70 bg-red-500/10 px-2 py-1 text-[11px] text-red-200 hover:bg-red-500/20 transition"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {clientesFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
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

      {/* MODAL CRIAR / EDITAR CLIENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-xl shadow-black/60">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  {modalMode === "create" ? "Novo cliente" : "Editar cliente"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {modalMode === "create"
                    ? "Cadastre um novo cliente para acompanhar as revisões."
                    : "Atualize os dados do cliente selecionado."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-400 hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleSalvarCliente} className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    value={novoCliente.nome}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        nome: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Telefone (WhatsApp) *
                  </label>
                  <input
                    type="text"
                    value={novoCliente.telefone}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        telefone: formatPhone(e.target.value),
                      }))
                    }
                    placeholder="(51) 99999-0000"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Estado / Cidade */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Estado (UF) *
                  </label>
                  <select
                    value={novoCliente.estado}
                    onChange={(e) => {
                      const uf = e.target.value;
                      setNovoCliente((prev) => ({
                        ...prev,
                        estado: uf,
                        cidade: "",
                      }));
                    }}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  >
                    {Object.keys(ESTADOS_CIDADES).map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Cidade *
                  </label>
                  <select
                    value={novoCliente.cidade}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        cidade: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  >
                    <option value="">Selecione uma cidade</option>
                    {(ESTADOS_CIDADES[novoCliente.estado] || []).map(
                      (cidade) => (
                        <option key={cidade} value={cidade}>
                          {cidade}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Endereço */}
                <div className="md:col-span-2 grid gap-3 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-slate-400">
                      Rua / Logradouro *
                    </label>
                    <input
                      type="text"
                      value={novoCliente.rua}
                      onChange={(e) =>
                        setNovoCliente((prev) => ({
                          ...prev,
                          rua: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-400">
                      Número *
                    </label>
                    <input
                      type="text"
                      value={novoCliente.numero}
                      onChange={(e) =>
                        setNovoCliente((prev) => ({
                          ...prev,
                          numero: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={novoCliente.bairro}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        bairro: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={novoCliente.cep}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        cep: e.target.value,
                      }))
                    }
                    placeholder="00000-000"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Potência (kWp) *
                  </label>
                  <input
                    type="text"
                    value={novoCliente.potenciaKwp}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        potenciaKwp: e.target.value,
                      }))
                    }
                    placeholder="Ex.: 5,2"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Origem
                  </label>
                  <select
                    value={novoCliente.origem}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        origem: e.target.value as ClienteOrigem,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Site">Site</option>
                    <option value="Indicação">Indicação</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Status
                  </label>
                  <select
                    value={novoCliente.status}
                    onChange={(e) =>
                      setNovoCliente((prev) => ({
                        ...prev,
                        status: e.target.value as ClienteStatus,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Última limpeza
                  </label>
                  <input
                    type="date"
                    value={dataUltima}
                    onChange={(e) => setDataUltima(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Próxima revisão
                  </label>
                  <input
                    type="date"
                    value={dataProxima}
                    onChange={(e) => setDataProxima(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {erroForm && (
                <p className="text-[11px] text-red-400">{erroForm}</p>
              )}
              {sucessoForm && (
                <p className="text-[11px] text-emerald-400">
                  {sucessoForm}
                </p>
              )}

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg border border-emerald-500 bg-emerald-500/90 px-3 py-1.5 text-xs font-medium text-emerald-950 hover:bg-emerald-400"
                >
                  {modalMode === "create"
                    ? "Salvar cliente"
                    : "Salvar alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
