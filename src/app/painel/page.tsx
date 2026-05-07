"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const item = {
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
    verde:   { borderColor: "rgba(0,156,59,0.25)",   boxShadow: "0 0 20px rgba(0,156,59,0.12)",   accentColor: "#00b341" },
    amarelo: { borderColor: "rgba(255,223,0,0.25)",  boxShadow: "0 0 20px rgba(255,223,0,0.12)",  accentColor: "#ffdf00" },
    neutro:  { borderColor: "rgba(255,255,255,0.08)", boxShadow: "none",                           accentColor: "#a1a1aa" },
  };

  const estilo = estilos[cor];

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 24 } }}
      className="relative overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-md p-6 hover:bg-white/[0.04] transition-colors duration-300"
      style={{ borderColor: estilo.borderColor, boxShadow: estilo.boxShadow }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none -z-10" />
      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">{titulo}</p>
      <p className="text-3xl font-extrabold tracking-tight" style={{ color: estilo.accentColor }}>
        {valor}
      </p>
      {descricao && <p className="text-xs text-neutral-500 mt-1">{descricao}</p>}
    </motion.div>
  );
}

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
        <motion.div variants={item} className="mb-10">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
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

        {/* Cards de métricas */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <CardMetrica titulo="Estados analisados" valor="27" descricao="todas as UFs" cor="verde" />
          <CardMetrica titulo="Indicadores IBGE" valor="12" descricao="séries históricas" cor="amarelo" />
          <CardMetrica titulo="Mandatos mapeados" valor="—" descricao="a integrar" />
          <CardMetrica titulo="Período coberto" valor="—" descricao="a integrar" />
        </motion.div>

        {/* Área principal */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Mapa — 2/3 */}
          <div
            className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md overflow-hidden flex items-center justify-center"
            style={{ minHeight: "420px" }}
          >
            <div className="text-center text-neutral-600">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="text-sm">Mapa interativo — React Leaflet</p>
              <p className="text-xs text-neutral-700 mt-1">componente a integrar</p>
            </div>
          </div>

          {/* Lista lateral — 1/3 */}
          <div
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md p-6 overflow-y-auto"
            style={{ maxHeight: "420px" }}
          >
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
              Estados
            </h2>
            <div className="space-y-1">
              {[
                "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia",
                "Ceará", "Distrito Federal", "Espírito Santo", "Goiás",
                "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
                "Minas Gerais", "Pará", "Paraíba", "Paraná",
                "Pernambuco", "Piauí", "Rio de Janeiro",
                "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
                "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins",
              ].map((estado) => (
                <button
                  key={estado}
                  className="w-full flex justify-between items-center text-xs py-2 px-2 rounded-lg border border-transparent text-neutral-400 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-neutral-200 transition-all duration-150"
                >
                  <span>{estado}</span>
                  <span style={{ color: "#009c3b" }}>→</span>
                </button>
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </main>
  );
}
