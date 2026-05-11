"use client";

import { useState, useEffect, useRef } from "react";
import { geoPath, geoMercator } from "d3-geo";
import type { FeatureCollection } from "geojson";
import type { ResultadoIBGE } from "@/lib/types";

export default function MapaBrasil({ dados }: { dados: ResultadoIBGE[] }) {
  const [mapa, setMapa] = useState<FeatureCollection | null>(null);
  const tooltipRef = useRef<SVGForeignObjectElement>(null);
  const tooltipNomeRef = useRef<HTMLParagraphElement>(null);
  const tooltipPibRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    fetch("/brazil-states.json")
      .then((r) => r.json())
      .then((data) => setMapa(data));
  }, []);

  if (!mapa) return <div>Carregando...</div>;
  const projecao = geoMercator().fitSize([800, 600], mapa);
  const caminho = geoPath(projecao);

  function getPIB(nomeEstado: string): number {
    const series = dados[0]?.resultados[0]?.series ?? [];
    const serie = series.find((s) => s.localidade.nome === nomeEstado);
    return Number(serie?.serie?.["2023"] ?? 0);
  }

  const pibMax = Math.max(
    ...mapa.features.map((f) =>
      getPIB((f.properties as { name: string }).name),
    ),
  );

  return (
    <svg width="800" height="600">
      {mapa.features.map((estado, i) => (
        <path
          key={i}
          d={caminho(estado) ?? undefined}
          fill={`rgba(0, 156, 59, ${0.15 + 0.85 * (getPIB((estado.properties as { name: string }).name) / pibMax)})`}
          onMouseEnter={() => {
            const nome = (estado.properties as { name: string }).name;
            const pib = getPIB(nome);
            if (tooltipRef.current) tooltipRef.current.style.display = "block";
            if (tooltipNomeRef.current) tooltipNomeRef.current.textContent = nome;
            if (tooltipPibRef.current) tooltipPibRef.current.textContent = `PIB: R$ ${pib.toLocaleString("pt-BR")}`;
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.closest("svg")!.getBoundingClientRect();
            if (tooltipRef.current) {
              tooltipRef.current.setAttribute("x", String(e.clientX - rect.left + 10));
              tooltipRef.current.setAttribute("y", String(e.clientY - rect.top - 30));
            }
          }}
          onMouseLeave={() => {
            if (tooltipRef.current) tooltipRef.current.style.display = "none";
          }}
          style={{ cursor: "pointer", transition: "fill 0.2s" }}
          onClick={() => {
            const nome = (estado.properties as { name: string }).name;
            const pib = getPIB(nome);
            alert(`Estado: ${nome}\nPIB: R$ ${pib.toLocaleString("pt-BR")}`);
          }}
        />
      ))}
      <foreignObject
        ref={tooltipRef}
        x={0}
        y={0}
        width="180"
        height="60"
        style={{ display: "none", pointerEvents: "none" }}
      >
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "6px 10px",
          }}
        >
          <p ref={tooltipNomeRef} style={{ color: "#fff", fontSize: 12, fontWeight: 700, margin: 0 }} />
          <p ref={tooltipPibRef} style={{ color: "#00b341", fontSize: 11, margin: "2px 0 0" }} />
        </div>
      </foreignObject>
    </svg>
  );
}
