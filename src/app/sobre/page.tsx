import { SobreAnimado } from "@/components/SobreAnimado";

export default function Sobre() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 pt-24 pb-16">
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
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Brilho de fundo */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 20%, rgba(255,223,0,0.06) 0%, transparent 70%)",
        }}
      />

      <SobreAnimado />
    </main>
  );
}
