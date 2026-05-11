import type { ResultadoIBGE, DesempregoData, PopulacaoData } from "./types";

export async function buscarPIB(): Promise<ResultadoIBGE[]> {
  try {
    const resposta = await fetch(
      "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/all/variaveis/37?localidades=N3[all]",
    );
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar PIB:", error);
    return [];
  }
}

export async function buscarDesemprego(): Promise<DesempregoData> {
  try {
    const resposta = await fetch("/desemprego.json");
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar Desemprego:", String(error));
    return {};
  }
}

export async function buscarPopulacao(): Promise<PopulacaoData> {
  try {
    const resposta = await fetch("/populacao.json");
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar População:", String(error));
    return {};
  }
}
