// src/app/clientes/utils.ts

// yyyy-mm-dd -> dd/mm/yyyy
export function formatDateToPtBr(isoDate: string) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

// dd/mm/yyyy -> yyyy-mm-dd
export function formatDatePtBrToIso(pt: string) {
  if (!pt || pt === "-") return "";
  const [day, month, year] = pt.split("/");
  if (!day || !month || !year) return "";
  return `${year}-${month}-${day}`;
}

// máscara de telefone BR (xx) xxxxx-xxxx
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11); // até 11 dígitos

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}
