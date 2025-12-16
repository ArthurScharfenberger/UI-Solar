// src/app/clientes/types.ts

export type ClienteStatus = "Ativo" | "Inativo";

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
  status: ClienteStatus;
};

export type ModalMode = "create" | "edit";