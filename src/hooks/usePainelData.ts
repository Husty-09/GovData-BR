"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buscarPIB,
  buscarDesemprego,
  buscarPopulacao,
  buscarBrasil,
} from "@/lib/ibge";
import { getPresidente, getGovernador } from "@/lib/politicos";
import { LOCALIDADES, getIndicador } from "@/lib/constants";
import type {
  ResultadoIBGE,
  DesempregoData,
  PopulacaoData,
  BrasilData,
} from "@/lib/types";

interface DadosPainel {
  brasil: BrasilData;
  pib: ResultadoIBGE[];
  desemprego: DesempregoData;
  populacao: PopulacaoData;
}

const DADOS_INICIAIS: DadosPainel = {
  brasil: {},
  pib: [],
  desemprego: {},
  populacao: {},
};

export function usePainelData() {
  const [localidade, setLocalidade] = useState<string | null>("Brasil");
  const [anoSelecionado, setAnoSelecionado] = useState<string>("2023");
  const [carregando, setCarregando] = useState(true); // true desde o início — sem set síncrono no effect
  const [dados, setDados] = useState<DadosPainel>(DADOS_INICIAIS);

  // Todos os fetches em paralelo
  useEffect(() => {
    Promise.all([
      buscarPIB(),
      buscarDesemprego(),
      buscarPopulacao(),
      buscarBrasil(),
    ])
      .then(([pib, desemprego, populacao, brasil]) => {
        setDados({ pib, desemprego, populacao, brasil });
      })
      .finally(() => setCarregando(false));
  }, []);

  // Derivações memoizadas
  const siglaUF = useMemo(
    () => LOCALIDADES.find((l) => l.nome === localidade)?.sigla ?? null,
    [localidade],
  );

  const anosDisponiveis = useMemo(
    () =>
      Object.keys(dados.pib[0]?.resultados[0]?.series[0]?.serie ?? {}).sort(
        (a, b) => Number(b) - Number(a),
      ),
    [dados.pib],
  );

  const itensDropdown = useMemo(
    () =>
      LOCALIDADES.map((e) => ({
        label: `${e.nome} (${e.sigla})`,
        value: e.sigla,
        onClick: () => setLocalidade(e.nome),
      })),
    [],
  );

  const itensAno = useMemo(
    () =>
      anosDisponiveis.map((ano) => ({
        label: ano,
        value: ano,
        onClick: () => setAnoSelecionado(ano),
      })),
    [anosDisponiveis],
  );

  // Indicadores derivados
  const ehBrasil = localidade === "Brasil";
  const brasilAno = dados.brasil[anoSelecionado] as
    | Record<string, number>
    | undefined;

  const pibLocalidade = useMemo(() => {
    if (!localidade) return "—";
    if (ehBrasil)
      return brasilAno?.pib != null
        ? Number(brasilAno.pib).toLocaleString("pt-BR")
        : "—";
    return getIndicador(dados.pib, localidade, anoSelecionado);
  }, [localidade, ehBrasil, brasilAno, dados.pib, anoSelecionado]);

  const desempregoLocalidade = useMemo(() => {
    if (!localidade) return "—";
    if (ehBrasil)
      return brasilAno?.desemprego != null
        ? `${Number(brasilAno.desemprego).toFixed(1)}%`
        : "—";
    const val = dados.desemprego[anoSelecionado]?.[localidade];
    return val != null ? `${val.toFixed(1)}%` : "—";
  }, [localidade, ehBrasil, brasilAno, dados.desemprego, anoSelecionado]);

  const populacaoLocalidade = useMemo(() => {
    if (!localidade) return "—";
    if (ehBrasil)
      return brasilAno?.populacao != null
        ? Number(brasilAno.populacao).toLocaleString("pt-BR")
        : "—";
    const val = dados.populacao[anoSelecionado]?.[localidade];
    return val != null ? val.toLocaleString("pt-BR") : "—";
  }, [localidade, ehBrasil, brasilAno, dados.populacao, anoSelecionado]);

  const ano = Number(anoSelecionado);
  const governador =
    siglaUF && siglaUF !== "BR" ? getGovernador(siglaUF, ano) : null;
  const presidente = ehBrasil ? getPresidente(ano) : null;

  return {
    // Estado
    localidade,
    setLocalidade,
    anoSelecionado,
    carregando,
    dados,
    // Derivados
    siglaUF,
    ehBrasil,
    itensDropdown,
    itensAno,
    pibLocalidade,
    desempregoLocalidade,
    populacaoLocalidade,
    governador,
    presidente,
  };
}
