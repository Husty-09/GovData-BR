import type { ResultadoIBGE, DesempregoData, PopulacaoData, BrasilData} from "./types";

export async function buscarPIB(): Promise<ResultadoIBGE[]> {
  const resposta = await fetch(
    "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/all/variaveis/37?localidades=N3[all]",
  );
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar PIB: HTTP ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarDesemprego(): Promise<DesempregoData> {
  const resposta = await fetch("/desemprego.json");
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar Desemprego: HTTP ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarPopulacao(): Promise<PopulacaoData> {
  const resposta = await fetch("/populacao.json");
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar População: HTTP ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarBrasil(): Promise<BrasilData> {
  const resposta = await fetch("/brasil.json");
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar dados do Brasil: HTTP ${resposta.status}`);
  }
  return resposta.json();
}