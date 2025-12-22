// src/app/components/ModalFooter.tsx
import React from "react";

type Props = {
  onCancel: () => void;
  onSave?: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  saveDisabled?: boolean;
};

export default function ModalFooter({
  onCancel,
  onSave,
  cancelLabel = "Cancelar",
  saveLabel = "Salvar",
  saveDisabled = false,
}: Props) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button
        onClick={onCancel}
        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
        type="button"
        aria-label="Cancelar"
      >
        {cancelLabel}
      </button>
      {onSave && (
        <button
          onClick={onSave}
          disabled={saveDisabled}
          className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-emerald-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          aria-label="Salvar"
        >
          {saveLabel}
        </button>
      )}
    </div>
  );
}
