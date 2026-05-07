"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

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

const card: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
};

const stack = [
  "Next.js 15", "React 18", "TypeScript", "Tailwind CSS",
  "Framer Motion", "React Leaflet", "HustyCore UI",
];

const fontes = [
  {
    nome: "IBGE — Séries Históricas",
    href: "https://www.ibge.gov.br/estatisticas/downloads-estatisticas.html",
    cor: "verde",
  },
  {
    nome: "TSE — Dados Eleitorais",
    href: "https://dadosabertos.tse.jus.br",
    cor: "amarelo",
  },
  {
    nome: "Portal Brasileiro de Dados Abertos",
    href: "https://dados.gov.br",
    cor: "neutro",
  },
];

export default function Sobre() {
  return (
    <main className="h-screen bg-[#0a0a0a] px-6 pt-24 pb-8 overflow-hidden">

      {/* Grid de fundo */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Brilho de fundo */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 30% at 50% 20%, rgba(255,223,0,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >

        {/* Badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-6"
          style={{
            borderColor: "rgba(255,223,0,0.25)",
            background: "rgba(255,223,0,0.08)",
            color: "#ffdf00",
            boxShadow: "0 0 15px rgba(255,223,0,0.2)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffdf00]" />
          Sobre o Projeto
        </motion.div>

        {/* Título */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4"
        >
          <span className="bg-clip-text text-transparent bg-linear-to-r from-neutral-100 to-neutral-400">
            O que é o{" "}
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #009c3b, #ffdf00)" }}
          >
            GovData-BR?
          </span>
        </motion.h1>

        {/* Descrição */}
        <motion.p
          variants={item}
          className="text-neutral-400 text-base leading-relaxed mb-6"
        >
          Plataforma de visualização de dados que cruza indicadores econômicos
          do IBGE com mandatos políticos brasileiros. O objetivo é facilitar
          a análise histórica do impacto de gestões públicas nos estados
          brasileiros, tornando dados complexos acessíveis a qualquer cidadão.
        </motion.p>

        {/* Cards */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          {/* Missão */}
          <motion.div
            variants={card}
            whileHover={{ y: -4, backgroundColor: "rgba(0,156,59,0.08)", transition: { type: "spring", stiffness: 300, damping: 24 } }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-6 transition-colors duration-300"
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,156,59,0.06) 0%, transparent 60%)" }} />
            <h3 className="text-sm font-semibold mb-2" style={{ color: "#00b341" }}>🎯 Missão</h3>
            <p className="text-sm text-neutral-400">
              Democratizar o acesso à informação governamental através de
              visualizações claras e cruzamentos de dados históricos.
            </p>
          </motion.div>

          {/* Fontes */}
          <motion.div
            variants={card}
            whileHover={{ y: -4, backgroundColor: "rgba(255,223,0,0.08)", transition: { type: "spring", stiffness: 300, damping: 24 } }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-6 transition-colors duration-300"
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,223,0,0.05) 0%, transparent 60%)" }} />
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#ffdf00" }}>📡 Fontes de Dados</h3>
            <ul className="space-y-2">
              {fontes.map((f) => (
                <li key={f.nome}>
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-150"
                  >
                    <span
                      className="h-1 w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: f.cor === "verde" ? "#009c3b" : f.cor === "amarelo" ? "#ffdf00" : "#52525b" }}
                    />
                    {f.nome}
                    <span className="text-[10px] text-neutral-600 ml-auto">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stack */}
          <motion.div
            variants={card}
            whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.04)", transition: { type: "spring", stiffness: 300, damping: 24 } }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-6 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent pointer-events-none" />
            <h3 className="text-sm font-semibold text-neutral-300 mb-3">⚙️ Stack</h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded-md text-xs border border-white/8 text-neutral-400 bg-white/3">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Autor */}
          <motion.div
            variants={card}
            whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.04)", transition: { type: "spring", stiffness: 300, damping: 24 } }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-6 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent pointer-events-none" />
            <h3 className="text-sm font-semibold text-neutral-300 mb-2">👤 Autor</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Matheus — estudante apaixonado por cenários econômicos e história.
              O GovData-BR nasceu da vontade de unir o interesse em dados públicos
              com desenvolvimento web, criando uma ferramenta visual, simples e
              interativa para explorar a economia brasileira.
            </p>
          </motion.div>

        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="flex gap-4">
          <Link
            href="/painel"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-shadow duration-300"
            style={{ background: "linear-gradient(135deg, #009c3b, #007a2e)", boxShadow: "0 0 20px rgba(0,156,59,0.35)" }}
          >
            Ir ao painel →
          </Link>
          <a
            href="https://github.com/Husty-09"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-white/10 text-neutral-300 hover:bg-white/5 transition-colors duration-300"
          >
            GitHub →
          </a>
        </motion.div>

      </motion.div>
    </main>
  );
}
