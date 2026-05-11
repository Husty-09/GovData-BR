import type { ResultadoIBGE } from "./types";

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

// TODO: endpoint retornando 500
export async function buscarDesemprego(): Promise<unknown[]> {
  try {
    const resposta = await fetch(
      "https://servicodados.ibge.gov.br/api/v3/agregados/6405/periodos/2022/variaveis/4097?localidades=N3[all]",
    );
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar Desemprego:", error);
    return [];
  }
}
