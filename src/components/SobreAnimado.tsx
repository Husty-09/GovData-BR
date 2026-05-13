"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SobreCards } from "./SobreCards";
import { containerVariants, itemVariants } from "@/lib/motion";

export function SobreAnimado() {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-6"
        style={{
          borderColor: "rgba(255,223,0,0.25)",
          background: "rgba(255,223,0,0.08)",
          color: "#ffdf00",
          boxShadow: "0 0 15px rgba(255,223,0,0.2)",
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand-amarelo" />
        Sobre o Projeto
      </motion.div>

      {/* Título */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4"
      >
        <span className="bg-clip-text text-transparent bg-linear-to-r from-neutral-100 to-neutral-400">
          O que é o{" "}
        </span>
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, #009c3b, #ffdf00)",
          }}
        >
          GovData-BR?
        </span>
      </motion.h1>

      {/* Descrição */}
      <motion.p
        variants={itemVariants}
        className="text-neutral-400 text-base leading-relaxed mb-6"
      >
        Plataforma de visualização de dados que cruza indicadores econômicos
        do IBGE com mandatos políticos brasileiros. O objetivo é facilitar a
        análise histórica do impacto de gestões públicas no Brasil, tornando
        dados complexos acessíveis a qualquer cidadão.
      </motion.p>

      {/* Cards */}
      <motion.div variants={itemVariants}>
        <SobreCards />
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <Link
          href="/painel"
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-shadow duration-300"
          style={{
            background: "linear-gradient(135deg, #009c3b, #007a2e)",
            boxShadow: "0 0 20px rgba(0,156,59,0.35)",
          }}
        >
          Ir ao painel →
        </Link>
        <a
          href="https://github.com/Husty-09"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-white/10 text-neutral-300 hover:bg-white/5 duration-300"
        >
          GitHub →
        </a>
      </motion.div>
    </motion.div>
  );
}
