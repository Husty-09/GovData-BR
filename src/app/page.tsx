import { InicioAnimado } from "@/components/InicioAnimado";

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

      <InicioAnimado />
    </main>
  );
}
