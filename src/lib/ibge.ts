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

export async function buscarDesemprego(): Promise<ResultadoIBGE[]> {
  try {
    const resposta = await fetch(
      "https://servicodados.ibge.gov.br/api/v3/agregados/6318/periodos/20224/variaveis/4099?localidades=N3[all]",
    );
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar Desemprego:", error);
    return [];
  }
}
