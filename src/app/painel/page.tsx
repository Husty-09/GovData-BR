"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { buscarPIB, buscarDesemprego } from "@/lib/ibge";
import MapaBrasil from "@/components/MapaBrasil";
import { MotionDropdown } from "@/components/MotionDropdown";
import type { ResultadoIBGE } from "@/lib/types";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

interface CardMetricaProps {
  titulo: string;
  valor: string | number;
  descricao?: string;
  cor?: "verde" | "amarelo" | "neutro";
}

function CardMetrica({
  titulo,
  valor,
  descricao,
  cor = "neutro",
}: CardMetricaProps) {
  const estilos = {
    verde: {
      borderColor: "rgba(0,156,59,0.25)",
      boxShadow: "0 0 16px rgba(0,156,59,0.1)",
      accentColor: "#00b341",
      hoverBg: "rgba(0,156,59,0.08)",
    },
    amarelo: {
      borderColor: "rgba(255,223,0,0.25)",
      boxShadow: "0 0 16px rgba(255,223,0,0.1)",
      accentColor: "#ffdf00",
      hoverBg: "rgba(255,223,0,0.08)",
    },
    neutro: {
      borderColor: "rgba(255,255,255,0.08)",
      boxShadow: "none",
      accentColor: "#a1a1aa",
      hoverBg: "rgba(255,255,255,0.04)",
    },
  };

  const estilo = estilos[cor];

  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -3,
        transition: { type: "spring", stiffness: 300, damping: 24 },
      }}
      className="relative overflow-hidden rounded-xl border backdrop-blur-md px-5 py-4 bg-white/2"
      style={{
        borderColor: estilo.borderColor,
        boxShadow: estilo.boxShadow,
        willChange: "transform",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: estilo.hoverBg }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent pointer-events-none -z-10" />
      <p className="text-[11px] text-neutral-500 uppercase tracking-widest mb-1">
        {titulo}
      </p>
      <p
        className="text-2xl font-extrabold tracking-tight"
        style={{ color: estilo.accentColor }}
      >
        {valor}
      </p>
      {descricao && (
        <p className="text-[10px] text-neutral-600 mt-0.5">{descricao}</p>
      )}
    </motion.div>
  );
}

const estados = [
  { nome: "Acre", sigla: "AC" },
  { nome: "Alagoas", sigla: "AL" },
  { nome: "Amapá", sigla: "AP" },
  { nome: "Amazonas", sigla: "AM" },
  { nome: "Bahia", sigla: "BA" },
  { nome: "Ceará", sigla: "CE" },
  { nome: "Distrito Federal", sigla: "DF" },
  { nome: "Espírito Santo", sigla: "ES" },
  { nome: "Goiás", sigla: "GO" },
  { nome: "Maranhão", sigla: "MA" },
  { nome: "Mato Grosso", sigla: "MT" },
  { nome: "Mato Grosso do Sul", sigla: "MS" },
  { nome: "Minas Gerais", sigla: "MG" },
  { nome: "Pará", sigla: "PA" },
  { nome: "Paraíba", sigla: "PB" },
  { nome: "Paraná", sigla: "PR" },
  { nome: "Pernambuco", sigla: "PE" },
  { nome: "Piauí", sigla: "PI" },
  { nome: "Rio de Janeiro", sigla: "RJ" },
  { nome: "Rio Grande do Norte", sigla: "RN" },
  { nome: "Rio Grande do Sul", sigla: "RS" },
  { nome: "Rondônia", sigla: "RO" },
  { nome: "Roraima", sigla: "RR" },
  { nome: "Santa Catarina", sigla: "SC" },
  { nome: "São Paulo", sigla: "SP" },
  { nome: "Sergipe", sigla: "SE" },
  { nome: "Tocantins", sigla: "TO" },
];

export default function Painel() {

  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(
    null,
  );

  const [dados, setDados] = useState<{
    pib: ResultadoIBGE[];
    desemprego: ResultadoIBGE[];
  }>({ pib: [], desemprego: [] });

  useEffect(() => {
    buscarPIB().then((pib) => setDados((prev) => ({ ...prev, pib })));
    buscarDesemprego().then((desemprego) =>
      setDados((prev) => ({ ...prev, desemprego })),
    );
  }, []);

  const itensDropdown = estados.map((e) => ({
    label: `${e.nome} (${e.sigla})`,
    value: e.sigla,
    onClick: () => setEstadoSelecionado(e.nome),
  }));

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 pt-28 pb-16">
      {/* Grid de fundo */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
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
        {/* Cabeçalho */}
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
              ao vivo
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            Dados do IBGE cruzados com mandatos políticos brasileiros por estado
          </p>
        </motion.div>

        {/*Layout principal:*/}
        <motion.div
          variants={item}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Mapa — 3/4 da largura */}
          <div
            className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md overflow-hidden flex items-center justify-center"
            style={{ minHeight: "520px" }}
          >
            <MapaBrasil dados={dados.pib} />
          </div>

          {/* Coluna direita — dropdown + cards */}
          <div className="flex flex-col gap-4">
            {/* Dropdown de estados */}
            <div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">
                Estado
              </p>
              {/* label dinâmico: mostra o estado escolhido ou texto padrão */}
              <MotionDropdown
                label={estadoSelecionado ?? "Selecionar estado"}
                items={itensDropdown}
                className="w-full"
              />
            </div>

            {/* Cards de métricas */}
            <div className="flex flex-col gap-3">
              <CardMetrica
                titulo="Estados"
                valor="27"
                descricao="todas as UFs"
                cor="verde"
              />
              <CardMetrica
                titulo="Indicadores IBGE"
                valor="12"
                descricao="séries históricas"
                cor="amarelo"
              />
              <CardMetrica titulo="Mandatos" valor="—" descricao="a integrar" />

              <CardMetrica titulo="Período" valor="—" descricao="a integrar" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
