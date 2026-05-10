"use client";

import { motion, type Variants } from "framer-motion";

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

function CardMetrica({ titulo, valor, descricao, cor = "neutro" }: CardMetricaProps) {
  const estilos = {
    verde:   { borderColor: "rgba(0,156,59,0.25)",    boxShadow: "0 0 16px rgba(0,156,59,0.1)",   accentColor: "#00b341",  hoverBg: "rgba(0,156,59,0.08)"   },
    amarelo: { borderColor: "rgba(255,223,0,0.25)",   boxShadow: "0 0 16px rgba(255,223,0,0.1)",  accentColor: "#ffdf00",  hoverBg: "rgba(255,223,0,0.08)"  },
    neutro:  { borderColor: "rgba(255,255,255,0.08)", boxShadow: "none",                           accentColor: "#a1a1aa",  hoverBg: "rgba(255,255,255,0.04)" },
  };

  const estilo = estilos[cor];

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 24 } }}
      className="relative overflow-hidden rounded-xl border backdrop-blur-md px-4 py-3 bg-white/2"
      style={{ borderColor: estilo.borderColor, boxShadow: estilo.boxShadow, willChange: "transform" }}
    >

      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: estilo.hoverBg }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-white/3 to-transparent pointer-events-none -z-10" />
      <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-0.5">{titulo}</p>
      <p className="text-xl font-extrabold tracking-tight" style={{ color: estilo.accentColor }}>
        {valor}
      </p>
      {descricao && <p className="text-[10px] text-neutral-600 mt-0.5">{descricao}</p>}
    </motion.div>
  );
}

const estados = [
  { nome: "Acre",                sigla: "AC" },
  { nome: "Alagoas",             sigla: "AL" },
  { nome: "Amapá",               sigla: "AP" },
  { nome: "Amazonas",            sigla: "AM" },
  { nome: "Bahia",               sigla: "BA" },
  { nome: "Ceará",               sigla: "CE" },
  { nome: "Distrito Federal",    sigla: "DF" },
  { nome: "Espírito Santo",      sigla: "ES" },
  { nome: "Goiás",               sigla: "GO" },
  { nome: "Maranhão",            sigla: "MA" },
  { nome: "Mato Grosso",         sigla: "MT" },
  { nome: "Mato Grosso do Sul",  sigla: "MS" },
  { nome: "Minas Gerais",        sigla: "MG" },
  { nome: "Pará",                sigla: "PA" },
  { nome: "Paraíba",             sigla: "PB" },
  { nome: "Paraná",              sigla: "PR" },
  { nome: "Pernambuco",          sigla: "PE" },
  { nome: "Piauí",               sigla: "PI" },
  { nome: "Rio de Janeiro",      sigla: "RJ" },
  { nome: "Rio Grande do Norte", sigla: "RN" },
  { nome: "Rio Grande do Sul",   sigla: "RS" },
  { nome: "Rondônia",            sigla: "RO" },
  { nome: "Roraima",             sigla: "RR" },
  { nome: "Santa Catarina",      sigla: "SC" },
  { nome: "São Paulo",           sigla: "SP" },
  { nome: "Sergipe",             sigla: "SE" },
  { nome: "Tocantins",           sigla: "TO" },
];

export default function Painel() {
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
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 30%, transparent 70%)",
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
              style={{ borderColor: "rgba(0,156,59,0.3)", background: "rgba(0,156,59,0.1)", color: "#00b341" }}
            >
              ao vivo
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            Dados do IBGE cruzados com mandatos políticos brasileiros por estado
          </p>
        </motion.div>

        {/* Cards de métricas — compactos */}
        <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <CardMetrica titulo="Estados" valor="27" descricao="todas as UFs" cor="verde" />
          <CardMetrica titulo="Indicadores IBGE" valor="12" descricao="séries históricas" cor="amarelo" />
          <CardMetrica titulo="Mandatos" valor="—" descricao="a integrar" />
          <CardMetrica titulo="Período" valor="—" descricao="a integrar" />
        </motion.div>

        {/* Área principal: mapa maior + lista lateral */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Mapa — 3/4 */}
          <div
            className="lg:col-span-3 rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md overflow-hidden flex items-center justify-center"
            style={{ minHeight: "520px" }}
          >
            <div className="text-center text-neutral-600">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="text-sm">Mapa interativo — React Leaflet</p>
              <p className="text-xs text-neutral-700 mt-1">componente a integrar</p>
            </div>
          </div>

          {/* Lista lateral — 1/4 */}
          <div
            className="rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-4 overflow-y-auto"
            style={{ maxHeight: "520px" }}
          >
            <h2 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3">
              Estados
            </h2>
            <div className="space-y-0.5">
              {estados.map((e) => (
                <button
                  key={e.sigla}
                  className="w-full flex justify-between items-center text-xs py-1.5 px-2 rounded-lg border border-transparent text-neutral-400 hover:border-white/8 hover:bg-white/4 hover:text-neutral-200 transition-all duration-150"
                >
                  <span>{e.nome}</span>
                  <span className="text-neutral-600 font-mono text-[10px]">{e.sigla}</span>
                </button>
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </main>
  );
}
