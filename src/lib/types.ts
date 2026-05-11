export interface SeriePIB {
  localidade: { nome: string };
  serie: Record<string, string>;
}

export interface ResultadoIBGE {
  resultados: { series: SeriePIB[] }[];
}

export type DesempregoData = Record<string, Record<string, number>>;

export type PopulacaoData = Record<string, Record<string, number>>;
