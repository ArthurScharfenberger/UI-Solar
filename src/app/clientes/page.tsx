// src/app/clientes/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";

import { ClientModal } from "./components/ClientModal";
import { ClientsTable } from "./components/ClientTable";
import { Filters } from "./components/Filters";
import { CLIENTES_INICIAIS } from "./constants";
import { Cliente, ModalMode, NovoClienteForm } from "./types";
import { formatDatePtBrToIso, formatDateToPtBr } from "./utils";

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
      Array.from(new Set(clientes.map((c) => `${c.cidade} - ${c.estado}`))).sort(),
    [clientes]
  );

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const cidadeEstado = `${c.cidade} - ${c.estado}`;

      const matchNome =
        search.trim().length === 0 ||
        c.nome.toLowerCase().includes(search.toLowerCase()) ||
        c.telefone.replace(/\D/g, "").includes(search.replace(/\D/g, ""));

      const matchCidade = cidadeFilter === "todas" || cidadeEstado === cidadeFilter;
      const matchOrigem = origemFilter === "todas" || c.origem === origemFilter;
      const matchStatus = statusFilter === "todos" || c.status === statusFilter;

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
    ];

    const rows = clientesFiltrados.map((c) => [
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
    ]);

    const csvContent = [header, ...rows].map((r) => r.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "clientes_solarx.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function abrirModalNovoCliente() {
    setModalMode("create");
    setEditingId(null);
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
    setDataUltima("");
    setDataProxima("");
    setErroForm("");
    setSucessoForm("");
    setIsModalOpen(true);
  }

  function abrirModalEditarCliente(cliente: Cliente) {
    setModalMode("edit");
    setEditingId(cliente.id);
    setNovoCliente({
      nome: cliente.nome,
      telefone: cliente.telefone,
      estado: cliente.estado,
      cidade: cliente.cidade,
      rua: cliente.rua,
      numero: cliente.numero,
      bairro: cliente.bairro,
      cep: cliente.cep,
      potenciaKwp: String(cliente.potenciaKwp).replace(".", ","),
      origem: cliente.origem,
      status: cliente.status,
    });

    setDataUltima(
      cliente.ultimaLimpeza && cliente.ultimaLimpeza !== "-"
        ? formatDatePtBrToIso(cliente.ultimaLimpeza)
        : ""
    );
    setDataProxima(
      cliente.proximaRevisao && cliente.proximaRevisao !== "-"
        ? formatDatePtBrToIso(cliente.proximaRevisao)
        : ""
    );

    setErroForm("");
    setSucessoForm("");
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

    const potencia = parseFloat(novoCliente.potenciaKwp.replace(",", "."));
    if (isNaN(potencia) || potencia <= 0) {
      setErroForm("Informe uma potência válida em kWp.");
      return;
    }

    const id = modalMode === "edit" && editingId ? editingId : `c-${Date.now()}`;

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
      setClientes((prev) => prev.map((c) => (c.id === id ? clienteNovo : c)));
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
          <h2 className="text-lg font-semibold text-slate-50">Clientes cadastrados</h2>
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

      <Filters
        search={search}
        cidadeFilter={cidadeFilter}
        origemFilter={origemFilter}
        statusFilter={statusFilter}
        cidadesUnicas={cidadesUnicas}
        onSearchChange={setSearch}
        onCidadeFilterChange={setCidadeFilter}
        onOrigemFilterChange={setOrigemFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <ClientsTable
        clientes={clientesFiltrados}
        onEdit={abrirModalEditarCliente}
        onDelete={handleExcluirCliente}
      />

      <ClientModal
        isOpen={isModalOpen}
        mode={modalMode}
        novoCliente={novoCliente}
        dataUltima={dataUltima}
        dataProxima={dataProxima}
        erroForm={erroForm}
        sucessoForm={sucessoForm}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSalvarCliente}
        onChangeNovoCliente={setNovoCliente}
        setDataUltima={setDataUltima}
        setDataProxima={setDataProxima}
      />
    </div>
  );
}
