export async function buscarPIB(): Promise<unknown[]> { 
const resposta = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/all/variaveis/37?localidades=N3[all]');
const dados = await resposta.json();
return dados; 
}

// TODO: endpoint retornando 500
export async function buscarDesemprego(): Promise<unknown[]> {
const resposta = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6405/periodos/2022/variaveis/4097?localidades=N3[all]');
const dados = await resposta.json();
return dados; 
}
