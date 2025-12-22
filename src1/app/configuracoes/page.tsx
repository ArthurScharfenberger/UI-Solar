"use client";

import { useState } from "react";
import Modal from "../components/Modal";

export default function ConfiguracoesPage() {
  const [whatsNumero, setWhatsNumero] = useState<string>("(51) 99999-0000");
  const [apiUrl, setApiUrl] = useState<string>("https://api.whatsapp-bot.com");
  const [apiToken, setApiToken] = useState<string>("***");
  const [horarioInicial, setHorarioInicial] = useState<string>("08:00");
  const [horarioFinal, setHorarioFinal] = useState<string>("18:00");
  const [mensagemBoasVindas, setMensagemBoasVindas] = useState<string>(
    "Olá! 👋 Somos a equipe de limpeza de placas solares. Como podemos te ajudar?"
  );
  const [mensagemAposAgendamento, setMensagemAposAgendamento] =
    useState<string>(
      "Seu agendamento foi registrado com sucesso. Qualquer alteração, responda esta mensagem. ☀️"
    );

  const [salvoComSucesso, setSalvoComSucesso] = useState(false);
  const [testeConexaoAberto, setTesteConexaoAberto] = useState(false);
  const [resultadoTeste, setResultadoTeste] = useState<
    "ok" | "erro" | null
  >(null);

  function salvarConfiguracoes() {
    console.log("Simulação: salvar configurações", {
      whatsNumero,
      apiUrl,
      apiToken,
      horarioInicial,
      horarioFinal,
      mensagemBoasVindas,
      mensagemAposAgendamento,
    });
    setSalvoComSucesso(true);
    setTimeout(() => setSalvoComSucesso(false), 4000);
  }

  function testarConexao() {
    // Simula chamada de API (aqui depois entra a integração real)
    setTesteConexaoAberto(true);

    // Simulação de sucesso/erro
    const deuBom = Math.random() > 0.2;
    setResultadoTeste(deuBom ? "ok" : "erro");
    console.log("Simulação: teste de conexão com API WhatsApp:", deuBom);
  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">
              Configurações do bot
            </h1>
            <p className="text-xs text-slate-400">
              Ajustes de integração com WhatsApp e mensagens automáticas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={testarConexao}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-medium text-emerald-200 hover:bg-emerald-500/20"
            >
              Testar conexão WhatsApp
            </button>
            <button
              onClick={salvarConfiguracoes}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-800"
            >
              Salvar configurações
            </button>
          </div>
        </div>

        {salvoComSucesso && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
            Configurações salvas (simulação). No ambiente real, esses dados
            seriam persistidos no banco/arquivo de configuração.
          </div>
        )}

        {/* Bloco: dados da integração */}
        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
          <h2 className="text-sm font-semibold text-slate-50">
            Integração com WhatsApp
          </h2>

          <div className="grid grid-cols-1 gap-3 text-xs md:grid-cols-2">
            <div>
              <label className="mb-1 block text-slate-400">
                Número oficial do WhatsApp
              </label>
              <input
                value={whatsNumero}
                onChange={(e) => setWhatsNumero(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Esse é o número exibido aos clientes nas mensagens.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-slate-400">URL da API</label>
              <input
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Endpoint do provedor que faz a ponte com o WhatsApp (ex. Z-API,
                Meta, etc.).
              </p>
            </div>

            <div>
              <label className="mb-1 block text-slate-400">
                Token / chave de API
              </label>
              <input
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Não exibimos o valor completo em produção (apenas máscara).
              </p>
            </div>

            <div>
              <label className="mb-1 block text-slate-400">
                Janela de atendimento
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={horarioInicial}
                  onChange={(e) => setHorarioInicial(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
                />
                <input
                  type="time"
                  value={horarioFinal}
                  onChange={(e) => setHorarioFinal(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Fora desse horário, o bot pode responder com mensagem de
                ausência.
              </p>
            </div>
          </div>
        </section>

        {/* Bloco: mensagens automáticas */}
        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-950/40">
          <h2 className="text-sm font-semibold text-slate-50">
            Mensagens automáticas
          </h2>

          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
            <div>
              <label className="mb-1 block text-slate-400">
                Mensagem de boas-vindas
              </label>
              <textarea
                value={mensagemBoasVindas}
                onChange={(e) => setMensagemBoasVindas(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Enviada automaticamente quando o cliente chama no WhatsApp pela
                primeira vez.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-slate-400">
                Mensagem após agendamento confirmado
              </label>
              <textarea
                value={mensagemAposAgendamento}
                onChange={(e) => setMensagemAposAgendamento(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-400"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Enviada assim que o agendamento é criado ou confirmado pelo
                atendente.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Modal teste de conexão */}
      <Modal
        open={testeConexaoAberto}
        onClose={() => setTesteConexaoAberto(false)}
        title="Teste de conexão com a API do WhatsApp"
        cancelLabel="Fechar"
      >
        {resultadoTeste === "ok" && (
          <div className="space-y-2 text-xs text-emerald-200">
            <p>
              ✅ Conexão simulada com sucesso. O painel conseguiu se comunicar
              com a URL configurada.
            </p>
            <p className="text-slate-400">
              Em produção, aqui mostraríamos resposta real da API (status,
              latência, número conectado, etc.).
            </p>
          </div>
        )}
        {resultadoTeste === "erro" && (
          <div className="space-y-2 text-xs text-red-200">
            <p>
              ⚠️ Simulação de falha na conexão. Verifique a URL da API, token e
              se o servidor está acessível.
            </p>
            <p className="text-slate-400">
              Em produção, exibiríamos o código de erro retornado pelo
              provedor.
            </p>
          </div>
        )}
        {resultadoTeste === null && (
          <p className="text-xs text-slate-300">
            Rodando simulação de teste... (clique em testar novamente se
            precisar)
          </p>
        )}
      </Modal>
    </>
  );
}
