"use client";

import { motion, type Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export interface CardMetricaProps {
  titulo: string;
  valor: string | number;
  descricao?: string;
  cor?: "verde" | "amarelo" | "neutro";
}

export function CardMetrica({
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
      whileFocus={{
        y: -3,
        transition: { type: "spring", stiffness: 300, damping: 24 },
      }}
      tabIndex={0}
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
      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">
        {titulo}
      </p>
      <p
        className="text-2xl font-extrabold tracking-tight"
        style={{ color: estilo.accentColor }}
      >
        {valor}
      </p>
      {descricao && (
        <p className="text-xs text-neutral-600 mt-0.5">{descricao}</p>
      )}
    </motion.div>
  );
}
