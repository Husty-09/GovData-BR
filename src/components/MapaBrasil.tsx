"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { geoPath, geoMercator } from "d3-geo";
import type { FeatureCollection } from "geojson";
import type { ResultadoIBGE } from "@/lib/types";

interface PropsEstado {
  name: string;
}

export default function MapaBrasil({
  dados,
  localidadeSelecionada,
  onLocalidadeClick,
  ano,
}: {
  dados: ResultadoIBGE[];
  localidadeSelecionada?: string | null;
  onLocalidadeClick?: (nome: string) => void;
  ano: string;
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

  const projecao = useMemo(
    () => (mapa ? geoMercator().fitSize([800, 600], mapa) : null),
    [mapa],
  );

  const caminho = useMemo(
    () => (projecao ? geoPath(projecao) : null),
    [projecao],
  );

  const getPIB = useMemo(() => {
    const series = dados[0]?.resultados[0]?.series ?? [];
    return (nomeEstado: string): number => {
      const serie = series.find((s) => s.localidade.nome === nomeEstado);
      return Number(serie?.serie?.[ano] ?? 0);
    };
  }, [dados, ano]);

  const pibMax = useMemo(() => {
    if (!mapa) return 1;
    const max = Math.max(
      ...mapa.features.map((f) => getPIB((f.properties as PropsEstado).name)),
    );
    return max || 1;
  }, [mapa, getPIB]);

  if (!mapa || !caminho) return <div>Carregando...</div>;

  function mostrarTooltip(nome: string, pib: number) {
    if (tooltipRef.current) tooltipRef.current.style.display = "block";
    if (tooltipNomeRef.current) tooltipNomeRef.current.textContent = nome;
    if (tooltipPibRef.current)
      tooltipPibRef.current.textContent =
        "PIB (" + ano + "): R$ " + pib.toLocaleString("pt-BR");
  }

  function esconderTooltip() {
    if (tooltipRef.current) tooltipRef.current.style.display = "none";
  }

  function moverTooltip(e: React.MouseEvent<SVGPathElement>) {
    const svg = e.currentTarget.closest("svg");
    if (!svg || !tooltipRef.current) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 800 / rect.width;
    const scaleY = 600 / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    const tooltipX = mouseX > 620 ? mouseX - 190 : mouseX + 12;
    const tooltipY = mouseY > 480 ? mouseY - 70 : mouseY + 12;
    tooltipRef.current.setAttribute("x", String(tooltipX));
    tooltipRef.current.setAttribute("y", String(tooltipY));
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <style>{`
        .estado-path { transition: filter 0.3s ease; }
        .estado-path:hover { filter: url(#glow) brightness(1.4); }
        .estado-path:focus-visible { outline: 2px solid #00b341; outline-offset: 2px; }
      `}</style>
      <svg
        viewBox="0 0 800 600"
        style={{ width: "100%", height: "100%" }}
        role="img"
        aria-label="Mapa do Brasil - selecione um estado"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {mapa.features.map((estado) => {
          const nome = (estado.properties as PropsEstado).name;
          const pib = getPIB(nome);
          const selecionado = localidadeSelecionada === nome;
          const label =
            nome +
            " - PIB " +
            ano +
            ": R$ " +
            pib.toLocaleString("pt-BR") +
            (selecionado ? " (selecionado)" : "");

          return (
            <path
              key={nome}
              className="estado-path"
              stroke="#0a0a0a"
              strokeWidth={0.2}
              d={caminho(estado) ?? undefined}
              fill={
                "rgba(0, 156, 59, " +
                (0.15 + 0.85 * (pib / pibMax)) +
                ")"
              }
              role="button"
              tabIndex={0}
              aria-label={label}
              aria-pressed={selecionado}
              style={{
                cursor: "pointer",
                transition: "filter 0.3s ease",
                filter: selecionado
                  ? "brightness(1.8) drop-shadow(0 0 6px rgba(0,180,70,0.8))"
                  : "brightness(1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.6)";
                mostrarTooltip(nome, pib);
              }}
              onMouseMove={moverTooltip}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = selecionado
                  ? "brightness(1.8) drop-shadow(0 0 6px rgba(0,180,70,0.8))"
                  : "brightness(1)";
                esconderTooltip();
              }}
              onClick={() => onLocalidadeClick?.(nome)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onLocalidadeClick?.(nome);
                }
              }}
            />
          );
        })}
        <foreignObject
          ref={tooltipRef}
          x={0}
          y={0}
          width="190"
          height="60"
          style={{ display: "none", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "6px 10px",
            }}
          >
            <p
              ref={tooltipNomeRef}
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                margin: 0,
              }}
            />
            <p
              ref={tooltipPibRef}
              style={{ color: "#00b341", fontSize: 11, margin: "2px 0 0" }}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
