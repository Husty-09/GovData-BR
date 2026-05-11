"use client";

import { useState, useEffect, useRef } from "react";
import { geoPath, geoMercator } from "d3-geo";
import type { FeatureCollection } from "geojson";
import type { ResultadoIBGE } from "@/lib/types";

export default function MapaBrasil({
  dados,
  estadoSelecionado,
  onEstadoClick,
}: {
  dados: ResultadoIBGE[];
  estadoSelecionado?: string | null;
  onEstadoClick?: (nome: string) => void;
}) {
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
    <>
      <style>{`
        .estado-path { transition: filter 0.3s ease; }
        .estado-path:hover { filter: url(#glow) brightness(1.4); }
      `}</style>
      <div style={{ width: "100%", height: "100%" }}>
        <svg viewBox="0 0 800 600" style={{ width: "100%", height: "100%" }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {mapa.features.map((estado, i) => (
            <path
              key={i}
              className="estado-path"
              stroke="#0a0a0a"
              strokeWidth={0.2}
              d={caminho(estado) ?? undefined}
              fill={`rgba(0, 156, 59, ${0.15 + 0.85 * (getPIB((estado.properties as { name: string }).name) / pibMax)})`}
              style={{
                cursor: "pointer",
                transition: "filter 0.3s ease",
                filter: estadoSelecionado === (estado.properties as { name: string }).name
                  ? "brightness(1.8) drop-shadow(0 0 6px rgba(0,180,70,0.8))"
                  : "brightness(1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.6)";
                const nome = (estado.properties as { name: string }).name;
                const pib = getPIB(nome);
                if (tooltipRef.current) tooltipRef.current.style.display = "block";
                if (tooltipNomeRef.current) tooltipNomeRef.current.textContent = nome;
                if (tooltipPibRef.current) tooltipPibRef.current.textContent = `PIB: R$ ${pib.toLocaleString("pt-BR")}`;
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.closest("svg")!.getBoundingClientRect();
                if (tooltipRef.current) {
                  const scaleX = 800 / rect.width;
                  const scaleY = 600 / rect.height;
                  const mouseX = (e.clientX - rect.left) * scaleX;
                  const mouseY = (e.clientY - rect.top) * scaleY;
                  const tooltipX = mouseX > 620 ? mouseX - 190 : mouseX + 12;
                  const tooltipY = mouseY > 480 ? mouseY - 70 : mouseY + 12;
                  tooltipRef.current.setAttribute("x", String(tooltipX));
                  tooltipRef.current.setAttribute("y", String(tooltipY));
                }
              }}
              onMouseLeave={(e) => {
                const nome = (estado.properties as { name: string }).name;
                e.currentTarget.style.filter =
                  estadoSelecionado === nome
                    ? "brightness(1.8) drop-shadow(0 0 6px rgba(0,180,70,0.8))"
                    : "brightness(1)";
                if (tooltipRef.current) tooltipRef.current.style.display = "none";
              }}
              onClick={() => {
                const nome = (estado.properties as { name: string }).name;
                onEstadoClick?.(nome);
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
      </div>
    </>
  );
}
