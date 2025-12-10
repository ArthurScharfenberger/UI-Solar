// src/app/clientes/types.ts

export type ClienteStatus = "Ativo" | "Inativo";
export type ClienteOrigem = "WhatsApp" | "Site" | "Indicação";

export type Cliente = {
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

export type NovoClienteForm = {
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

export type ModalMode = "create" | "edit";
