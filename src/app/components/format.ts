// src/app/components/format.ts
export function onlyDigits(v: string): string { return v.replace(/\D+/g, ""); }

export function formatPhoneBR(v: string): string {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) => c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`);
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) => c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`);
}
export function formatCPF(v: string): string {
  const d = onlyDigits(v).slice(0, 11);
  return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
export function formatCNPJ(v: string): string {
  const d = onlyDigits(v).slice(0, 14);
  return d.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}
export function formatCEP(v: string): string {
  const d = onlyDigits(v).slice(0, 8);
  return d.replace(/(\d{5})(\d{0,3})/, (_, a, b) => (b ? `${a}-${b}` : a));
}

// Datas e horários (DD/MM/AAAA e HH:MM). Mantemos apenas dígitos e inserimos separadores.
// Não valida calendário; serve para guiar digitação.
export function formatDateBR(v: string): string {
  const d = onlyDigits(v).slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return d.replace(/(\d{2})(\d{0,2})/, "$1/$2");
  return d.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
}

export function formatTimeHHMM(v: string): string {
  const d = onlyDigits(v).slice(0, 4);
  if (d.length <= 2) return d;
  return d.replace(/(\d{2})(\d{0,2})/, "$1:$2");
}
