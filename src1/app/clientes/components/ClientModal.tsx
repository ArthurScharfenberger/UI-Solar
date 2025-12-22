// src/app/clientes/components/ClientModal.tsx
"use client";

import { FormEvent } from "react";
import { ESTADOS_CIDADES } from "../constants";
import { ClienteStatus, ModalMode, NovoClienteForm } from "../types";
import { formatPhone } from "../utils";

type ClientModalProps = {
  isOpen: boolean;
  mode: ModalMode;
  novoCliente: NovoClienteForm;
  dataUltima: string;
  dataProxima: string;
  erroForm: string;
  sucessoForm: string;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChangeNovoCliente: (
    updater: (prev: NovoClienteForm) => NovoClienteForm
  ) => void;
  setDataUltima: (value: string) => void;
  setDataProxima: (value: string) => void;
};

export function ClientModal({
  isOpen,
  mode,
  novoCliente,
  dataUltima,
  dataProxima,
  erroForm,
  sucessoForm,
  onClose,
  onSubmit,
  onChangeNovoCliente,
  setDataUltima,
  setDataProxima,
}: ClientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-xl shadow-black/60">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              {mode === "create" ? "Novo cliente" : "Editar cliente"}
            </h3>
            <p className="text-[11px] text-slate-500">
              {mode === "create"
                ? "Cadastre um novo cliente para acompanhar as revisões."
                : "Atualize os dados do cliente selecionado."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-400 hover:bg-slate-800"
          >
            Fechar
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-400">
                Nome completo *
              </label>
              <input
                type="text"
                value={novoCliente.nome}
                onChange={(e) =>
                  onChangeNovoCliente((prev) => ({
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
                  onChangeNovoCliente((prev) => ({
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
                  onChangeNovoCliente((prev) => ({
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
                  onChangeNovoCliente((prev) => ({
                    ...prev,
                    cidade: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-emerald-400"
              >
                <option value="">Selecione uma cidade</option>
                {(ESTADOS_CIDADES[novoCliente.estado] || []).map((cidade) => (
                  <option key={cidade} value={cidade}>
                    {cidade}
                  </option>
                ))}
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
                    onChangeNovoCliente((prev) => ({
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
                    onChangeNovoCliente((prev) => ({
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
                  onChangeNovoCliente((prev) => ({
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
                  onChangeNovoCliente((prev) => ({
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
                  onChangeNovoCliente((prev) => ({
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
                Status
              </label>
              <select
                value={novoCliente.status}
                onChange={(e) =>
                  onChangeNovoCliente((prev) => ({
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

          {erroForm && <p className="text-[11px] text-red-400">{erroForm}</p>}
          {sucessoForm && (
            <p className="text-[11px] text-emerald-400">{sucessoForm}</p>
          )}

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg border border-emerald-500 bg-emerald-500/90 px-3 py-1.5 text-xs font-medium text-emerald-950 hover:bg-emerald-400"
            >
              {mode === "create" ? "Salvar cliente" : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
