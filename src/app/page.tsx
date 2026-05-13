"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { containerVariants, itemVariants, cardVariants } from "@/lib/motion";

export default function Inicio() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-16 overflow-hidden bg-[#0a0a0a]">

      {/* Grid de fundo */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Brilho de fundo verde */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(0,156,59,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="z-10 text-center max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >

        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#009c3b]/30 bg-[#009c3b]/10 text-[#00b341] text-xs font-medium mb-6"
          style={{ boxShadow: "0 0 15px rgba(0,156,59,0.25)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#00b341] animate-pulse"
            style={{ boxShadow: "0 0 8px #009c3b" }}
          />
          Dados abertos do governo brasileiro
        </motion.div>

        {/* Título */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl font-extrabold tracking-tighter mb-4"
        >
          <span className="bg-clip-text text-transparent bg-linear-to-r from-neutral-100 to-neutral-400">
            Gov
          </span>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #009c3b, #ffdf00)" }}
          >
            Data-BR
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl mx-auto text-lg text-neutral-400 mt-4 mb-10"
        >
          Dashboard interativo que cruza dados econômicos do IBGE com mandatos
          políticos brasileiros por estado e período histórico.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/painel"
            className="px-6 py-3 rounded-lg font-semibold text-white transition-shadow duration-300"
            style={{
              background: "linear-gradient(135deg, #009c3b, #007a2e)",
              boxShadow: "0 0 20px rgba(0,156,59,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px rgba(0,156,59,0.65)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,156,59,0.4)";
            }}
          >
            Ver painel →
          </Link>
          <Link
            href="/sobre"
            className="px-6 py-3 rounded-lg font-semibold border border-white/10 text-neutral-300 hover:bg-white/5 duration-300"
          >
            Sobre o projeto
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          {/* Card 1 — IBGE */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 24 } }}
            whileFocus={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 24 } }}
            tabIndex={0}
            className="relative overflow-hidden rounded-2xl border border-white/8 backdrop-blur-md p-6 bg-white/2"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)", willChange: "transform" }}
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: "rgba(0,156,59,0.08)" }} />
            <div className="absolute inset-0 bg-linear-to-br from-[#009c3b]/5 to-transparent pointer-events-none" />
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#009c3b]/25 bg-[#009c3b]/10 text-[#00b341] mb-3">
              Dados Econômicos
            </span>
            <h3 className="text-lg font-bold text-white mb-2">IBGE por Estado</h3>
            <p className="text-sm text-neutral-400">
              PIB, desemprego, IDH e indicadores regionais organizados por
              período histórico e unidade federativa.
            </p>
          </motion.div>

          {/* Card 2 — Políticos */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 24 } }}
            whileFocus={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 24 } }}
            tabIndex={0}
            className="relative overflow-hidden rounded-2xl border border-white/8 backdrop-blur-md p-6 bg-white/2"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.3)", willChange: "transform" }}
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: "rgba(255,223,0,0.08)" }} />
            <div className="absolute inset-0 bg-linear-to-br from-[#ffdf00]/5 to-transparent pointer-events-none" />
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-[#ffdf00]/25 bg-[#ffdf00]/10 text-[#ffdf00] mb-3">
              Mandatos Políticos
            </span>
            <h3 className="text-lg font-bold text-white mb-2">Governos e Mandatos</h3>
            <p className="text-sm text-neutral-400">
              Cruzamento de gestões estaduais e federais com os indicadores
              econômicos de cada período.
            </p>
          </motion.div>
        </motion.div>

      </motion.div>
    </main>
  );
}
