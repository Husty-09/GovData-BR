"use client";

import { useState, useEffect } from "react";
import { geoPath, geoMercator } from "d3-geo";
import type { FeatureCollection } from "geojson";
import type { ResultadoIBGE } from "@/lib/types";

export default function MapaBrasil({ dados }: { dados: ResultadoIBGE[] }) {
  const [mapa, setMapa] = useState<FeatureCollection | null>(null);

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

  const pibMax = Math.max(...mapa.features.map((f) =>
    getPIB((f.properties as { name: string }).name)
  ));

  return (
    <svg width="800" height="600">
      {mapa.features.map((estado, i) => (
        <path
          key={i}
          d={caminho(estado) ?? undefined}
          fill={`rgba(0, 156, 59, ${0.15 + 0.85 * (getPIB((estado.properties as { name: string }).name) / pibMax)})`}
        />
      ))}
    </svg>
  );
}
