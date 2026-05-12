export interface Politico {
  nome: string;
  partido: string;
  mandato: string;
}

export const GOVERNADORES: Record<string, Politico> = {
  AC: { nome: "Gladson Cameli",      partido: "PP",            mandato: "2023-2026" },
  AL: { nome: "Paulo Dantas",        partido: "MDB",           mandato: "2023-2026" },
  AM: { nome: "Wilson Lima",         partido: "Uniao",         mandato: "2023-2026" },
  AP: { nome: "Clecio Luis",         partido: "Solidariedade", mandato: "2023-2026" },
  BA: { nome: "Jeronimo Rodrigues",  partido: "PT",            mandato: "2023-2026" },
  CE: { nome: "Elmano de Freitas",   partido: "PT",            mandato: "2023-2026" },
  DF: { nome: "Ibaneis Rocha",       partido: "MDB",           mandato: "2023-2026" },
  ES: { nome: "Renato Casagrande",   partido: "PSB",           mandato: "2023-2026" },
  GO: { nome: "Ronaldo Caiado",      partido: "Uniao",         mandato: "2023-2026" },
  MA: { nome: "Carlos Brandao",      partido: "PSB",           mandato: "2023-2026" },
  MG: { nome: "Romeu Zema",          partido: "Novo",          mandato: "2023-2026" },
  MS: { nome: "Eduardo Riedel",      partido: "PSDB",          mandato: "2023-2026" },
  MT: { nome: "Mauro Mendes",        partido: "Uniao",         mandato: "2023-2026" },
  PA: { nome: "Helder Barbalho",     partido: "MDB",           mandato: "2023-2026" },
  PB: { nome: "Joao Azevedo",        partido: "PSB",           mandato: "2023-2026" },
  PE: { nome: "Raquel Lyra",         partido: "PSDB",          mandato: "2023-2026" },
  PI: { nome: "Rafael Fonteles",     partido: "PT",            mandato: "2023-2026" },
  PR: { nome: "Ratinho Junior",      partido: "PSD",           mandato: "2023-2026" },
  RJ: { nome: "Claudio Castro",      partido: "PL",            mandato: "2023-2026" },
  RN: { nome: "Fatima Bezerra",      partido: "PT",            mandato: "2023-2026" },
  RO: { nome: "Marcos Rocha",        partido: "Uniao",         mandato: "2023-2026" },
  RR: { nome: "Arthur Henrique",     partido: "MDB",           mandato: "2023-2026" },
  RS: { nome: "Eduardo Leite",       partido: "PSDB",          mandato: "2023-2026" },
  SC: { nome: "Jorginho Mello",      partido: "PL",            mandato: "2023-2026" },
  SE: { nome: "Fabio Mitidieri",     partido: "PSD",           mandato: "2023-2026" },
  SP: { nome: "Tarcisio de Freitas", partido: "Republicanos",  mandato: "2023-2026" },
  TO: { nome: "Wanderlei Barbosa",   partido: "Republicanos",  mandato: "2023-2026" },
};

export const PRESIDENTE: Politico = {
  nome: "Luiz Inacio Lula da Silva",
  partido: "PT",
  mandato: "2023-2026",
};
