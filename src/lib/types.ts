export interface SeriePIB {
  localidade: { nome: string };
  serie: Record<string, string>;
}

export interface ResultadoIBGE {
  resultados: { series: SeriePIB[] }[];
}

// Desemprego estático: { "2023": { "São Paulo": 7.8, ... }, ... }
export type DesempregoData = Record<string, Record<string, number>>;

// População estática: { "2023": { "São Paulo": 44411238, ... }, ... }
export type PopulacaoData = Record<string, Record<string, number>>;
