"use client";

import { motion, type Variants } from "framer-motion";
import { usePainelData } from "@/hooks/usePainelData";
import MapaBrasil from "@/components/MapaBrasil";
import { MotionDropdown } from "@/components/MotionDropdown";
import { CardMetrica } from "@/components/CardMetrica";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function Painel() {
  const {
    localidade,
    setLocalidade,
    anoSelecionado,
    carregando,
    erro,
    dados,
    ehBrasil,
    itensDropdown,
    itensAno,
    pibLocalidade,
    desempregoLocalidade,
    populacaoLocalidade,
    governador,
    presidente,
  } = usePainelData();

  if (erro) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] px-6 pt-28 pb-16 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-neutral-200 font-semibold mb-2">Falha ao carregar dados</p>
          <p className="text-neutral-500 text-sm">{erro}</p>
        </div>
      </main>
    );
  }

  return (
    <ErrorBoundary>
    <main className="min-h-screen bg-[#0a0a0a] px-6 pt-28 pb-16">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          maskImage:
            "radial-gradient(ellipse at top, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, black 30%, transparent 70%)",
        }}
      />
      <motion.div
        className="max-w-7xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-100 to-neutral-400">
              Painel de Dados
            </h1>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium border"
              style={{
                borderColor: "rgba(0,156,59,0.3)",
                background: "rgba(0,156,59,0.1)",
                color: "#00b341",
              }}
            >
              Dados IBGE
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            Dados do IBGE cruzados com mandatos políticos brasileiros por
            localidade e ano
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          <div
            className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md overflow-hidden flex items-center justify-center"
            style={{ minHeight: "520px" }}
          >
            <MapaBrasil
              dados={dados.pib}
              localidadeSelecionada={localidade}
              onLocalidadeClick={setLocalidade}
              ano={anoSelecionado}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                Localidade
              </p>
              <MotionDropdown
                label={localidade ?? "Selecionar localidade"}
                items={itensDropdown}
                className="w-full"
              />
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">
                Ano
              </p>
              <MotionDropdown
                label={anoSelecionado}
                items={itensAno}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              <CardMetrica
                titulo="PIB"
                valor={pibLocalidade}
                descricao={
                  localidade
                    ? `R$ milhões (${anoSelecionado})`
                    : "selecione uma localidade"
                }
                cor="verde"
                carregando={carregando}
              />
              <CardMetrica
                titulo="População"
                valor={populacaoLocalidade}
                descricao={
                  localidade
                    ? `habitantes (${anoSelecionado})`
                    : "selecione uma localidade"
                }
                carregando={carregando}
              />
              <CardMetrica
                titulo="Desemprego"
                valor={desempregoLocalidade}
                descricao={
                  localidade
                    ? `taxa % (${anoSelecionado} T4)`
                    : "selecione uma localidade"
                }
                cor="amarelo"
                carregando={carregando}
              />

              {localidade && (
                <motion.div
                  variants={item}
                  className="rounded-xl border border-white/8 backdrop-blur-md px-5 py-4 bg-white/2"
                >
                  {ehBrasil ? (
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">
                        Executivo Federal
                      </p>
                      <p className="text-xs text-neutral-600 uppercase tracking-widest mb-0.5">
                        Presidente
                      </p>
                      <p className="text-sm font-bold text-neutral-200 leading-tight">
                        {presidente?.nome ?? "—"}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {presidente
                          ? `${presidente.partido} ${presidente.inicio}–${presidente.fim}`
                          : "sem dados"}
                      </p>
                    </div>
                  ) : governador ? (
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">
                        Executivo Estadual
                      </p>
                      <p className="text-xs text-neutral-600 uppercase tracking-widest mb-0.5">
                        Governador(a)
                      </p>
                      <p className="text-sm font-bold text-neutral-200 leading-tight">
                        {governador.nome}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {governador.partido} {governador.inicio}–
                        {governador.fim}
                      </p>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
    </ErrorBoundary>
  );
}
