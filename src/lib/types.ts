export interface SeriePIB {
  localidade: { nome: string };
  serie: Record<string, string>;
}

export interface ResultadoIBGE {
  resultados: { series: SeriePIB[] }[];
}
