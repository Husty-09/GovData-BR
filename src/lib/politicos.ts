export interface MandatoHistorico {
  nome: string;
  partido: string;
  inicio: number;
  fim: number;
}

// ── Presidentes 
export const HISTORICO_PRESIDENTES: MandatoHistorico[] = [
  { nome: "Fernando Henrique Cardoso", partido: "PSDB", inicio: 2002, fim: 2002 },
  { nome: "Lula",                      partido: "PT",   inicio: 2003, fim: 2010 },
  { nome: "Dilma Rousseff",            partido: "PT",   inicio: 2011, fim: 2015 },
  { nome: "Michel Temer",              partido: "MDB",  inicio: 2016, fim: 2018 },
  { nome: "Jair Bolsonaro",            partido: "PL",   inicio: 2019, fim: 2022 },
  { nome: "Lula",                      partido: "PT",   inicio: 2023, fim: 2026 },
];

// ── Governadores
export const HISTORICO_GOVERNADORES: Record<string, MandatoHistorico[]> = {
  AC: [
    { nome: "Jorge Viana",     partido: "PT",  inicio: 2002, fim: 2006 },
    { nome: "Arnobio Marques", partido: "PT",  inicio: 2007, fim: 2010 },
    { nome: "Tiao Viana",      partido: "PT",  inicio: 2011, fim: 2018 },
    { nome: "Gladson Cameli",  partido: "PP",  inicio: 2019, fim: 2022 },

    { nome: "Gladson Cameli", partido: "PP", inicio: 2023, fim: 2026 },
  ],
  AL: [
    { nome: "Ronaldo Lessa",         partido: "PSB",  inicio: 2002, fim: 2006 },
    { nome: "Teotonio Vilela Filho", partido: "PSDB", inicio: 2007, fim: 2014 },
    { nome: "Renan Filho",           partido: "MDB",  inicio: 2015, fim: 2022 },

    { nome: "Paulo Dantas", partido: "MDB", inicio: 2023, fim: 2026 },
  ],
  AM: [
    { nome: "Eduardo Braga", partido: "PPS",  inicio: 2002, fim: 2010 },
    { nome: "Omar Aziz",     partido: "PSD",  inicio: 2011, fim: 2014 },
    { nome: "Jose Melo",     partido: "PROS", inicio: 2015, fim: 2018 },
    { nome: "Wilson Lima",   partido: "PSC",  inicio: 2019, fim: 2022 },

    { nome: "Wilson Lima", partido: "Uniao", inicio: 2023, fim: 2026 },
  ],
  AP: [
    { nome: "Joao Capiberibe",  partido: "PSB", inicio: 2002, fim: 2002 },
    { nome: "Waldez Goes",      partido: "PDT", inicio: 2003, fim: 2010 },
    { nome: "Camilo Capiberibe",partido: "PSB", inicio: 2011, fim: 2014 },
    { nome: "Waldez Goes",      partido: "PDT", inicio: 2015, fim: 2022 },

    { nome: "Clecio Luis", partido: "Solidariedade", inicio: 2023, fim: 2026 },
  ],
  BA: [
    { nome: "Paulo Souto",   partido: "PFL", inicio: 2002, fim: 2006 },
    { nome: "Jaques Wagner", partido: "PT",  inicio: 2007, fim: 2014 },
    { nome: "Rui Costa",     partido: "PT",  inicio: 2015, fim: 2022 },

    { nome: "Jeronimo Rodrigues", partido: "PT", inicio: 2023, fim: 2026 },
  ],
  CE: [
    { nome: "Tasso Jereissati", partido: "PSDB", inicio: 2002, fim: 2002 },
    { nome: "Lucio Alcantara",  partido: "PSDB", inicio: 2003, fim: 2006 },
    { nome: "Cid Gomes",        partido: "PDT",  inicio: 2007, fim: 2014 },
    { nome: "Camilo Santana",   partido: "PT",   inicio: 2015, fim: 2022 },

    { nome: "Elmano de Freitas", partido: "PT", inicio: 2023, fim: 2026 },
  ],
  DF: [
    { nome: "Joaquim Roriz",       partido: "PMDB", inicio: 2002, fim: 2006 },
    { nome: "Jose Roberto Arruda", partido: "DEM",  inicio: 2007, fim: 2010 },
    { nome: "Agnelo Queiroz",      partido: "PT",   inicio: 2011, fim: 2014 },
    { nome: "Rodrigo Rollemberg",  partido: "PSB",  inicio: 2015, fim: 2018 },
    { nome: "Ibaneis Rocha",       partido: "MDB",  inicio: 2019, fim: 2022 },

    { nome: "Ibaneis Rocha", partido: "MDB", inicio: 2023, fim: 2026 },
  ],
  ES: [
    { nome: "Jose Ignacio Ferreira", partido: "PSDB", inicio: 2002, fim: 2002 },
    { nome: "Paulo Hartung",         partido: "PSB",  inicio: 2003, fim: 2010 },
    { nome: "Renato Casagrande",     partido: "PSB",  inicio: 2011, fim: 2014 },
    { nome: "Paulo Hartung",         partido: "PMDB", inicio: 2015, fim: 2018 },
    { nome: "Renato Casagrande",     partido: "PSB",  inicio: 2019, fim: 2022 },

    { nome: "Renato Casagrande", partido: "PSB", inicio: 2023, fim: 2026 },
  ],
  GO: [
    { nome: "Marconi Perillo",   partido: "PSDB", inicio: 2002, fim: 2006 },
    { nome: "Alcides Rodrigues", partido: "PP",   inicio: 2007, fim: 2010 },
    { nome: "Marconi Perillo",   partido: "PSDB", inicio: 2011, fim: 2018 },
    { nome: "Ronaldo Caiado",    partido: "DEM",  inicio: 2019, fim: 2022 },

    { nome: "Ronaldo Caiado", partido: "Uniao", inicio: 2023, fim: 2026 },
  ],
  MA: [
    { nome: "Jose Reinaldo",  partido: "PFL",   inicio: 2002, fim: 2006 },
    { nome: "Jackson Lago",   partido: "PDT",   inicio: 2007, fim: 2008 },
    { nome: "Roseana Sarney", partido: "PMDB",  inicio: 2009, fim: 2014 },
    { nome: "Flavio Dino",    partido: "PCdoB", inicio: 2015, fim: 2022 },

    { nome: "Carlos Brandao", partido: "PSB", inicio: 2023, fim: 2026 },
  ],
  MG: [
    { nome: "Itamar Franco",     partido: "PMDB", inicio: 2002, fim: 2002 },
    { nome: "Aecio Neves",       partido: "PSDB", inicio: 2003, fim: 2010 },
    { nome: "Antonio Anastasia", partido: "PSDB", inicio: 2011, fim: 2014 },
    { nome: "Fernando Pimentel", partido: "PT",   inicio: 2015, fim: 2018 },
    { nome: "Romeu Zema",        partido: "Novo", inicio: 2019, fim: 2022 },

    { nome: "Romeu Zema", partido: "Novo", inicio: 2023, fim: 2026 },
  ],
  MS: [
    { nome: "Zeca do PT",       partido: "PT",   inicio: 2002, fim: 2006 },
    { nome: "Andre Puccinelli", partido: "PMDB", inicio: 2007, fim: 2014 },
    { nome: "Reinaldo Azambuja",partido: "PSDB", inicio: 2015, fim: 2022 },

    { nome: "Eduardo Riedel", partido: "PSDB", inicio: 2023, fim: 2026 },
  ],
  MT: [
    { nome: "Blairo Maggi",  partido: "PPS",  inicio: 2002, fim: 2010 },
    { nome: "Silval Barbosa",partido: "PMDB", inicio: 2011, fim: 2014 },
    { nome: "Pedro Taques",  partido: "PSDB", inicio: 2015, fim: 2018 },
    { nome: "Mauro Mendes",  partido: "PSB",  inicio: 2019, fim: 2022 },

    { nome: "Mauro Mendes", partido: "Uniao", inicio: 2023, fim: 2026 },
  ],
  PA: [
    { nome: "Almir Gabriel",   partido: "PSDB", inicio: 2002, fim: 2002 },
    { nome: "Simao Jatene",    partido: "PSDB", inicio: 2003, fim: 2006 },
    { nome: "Ana Julia Carepa",partido: "PT",   inicio: 2007, fim: 2010 },
    { nome: "Simao Jatene",    partido: "PSDB", inicio: 2011, fim: 2018 },
    { nome: "Helder Barbalho", partido: "MDB",  inicio: 2019, fim: 2022 },

    { nome: "Helder Barbalho", partido: "MDB", inicio: 2023, fim: 2026 },
  ],
  PB: [
    { nome: "Cassio Cunha Lima", partido: "PSDB", inicio: 2002, fim: 2006 },
    { nome: "Jose Maranhao",     partido: "PMDB", inicio: 2007, fim: 2010 },
    { nome: "Ricardo Coutinho",  partido: "PSB",  inicio: 2011, fim: 2018 },
    { nome: "Joao Azevedo",      partido: "PSB",  inicio: 2019, fim: 2022 },

    { nome: "Joao Azevedo", partido: "PSB", inicio: 2023, fim: 2026 },
  ],
  PE: [
    { nome: "Jarbas Vasconcelos", partido: "PMDB", inicio: 2002, fim: 2006 },
    { nome: "Eduardo Campos",     partido: "PSB",  inicio: 2007, fim: 2013 },
    { nome: "Paulo Camara",       partido: "PSB",  inicio: 2014, fim: 2022 },

    { nome: "Raquel Lyra", partido: "PSDB", inicio: 2023, fim: 2026 },
  ],
  PI: [
    { nome: "Wellington Dias", partido: "PT",  inicio: 2002, fim: 2006 },
    { nome: "Wilson Martins",  partido: "PSB", inicio: 2007, fim: 2010 },
    { nome: "Wellington Dias", partido: "PT",  inicio: 2011, fim: 2022 },

    { nome: "Rafael Fonteles", partido: "PT", inicio: 2023, fim: 2026 },
  ],
  PR: [
    { nome: "Roberto Requiao", partido: "PMDB", inicio: 2002, fim: 2010 },
    { nome: "Beto Richa",      partido: "PSDB", inicio: 2011, fim: 2018 },
    { nome: "Ratinho Junior",  partido: "PSD",  inicio: 2019, fim: 2022 },

    { nome: "Ratinho Junior", partido: "PSD", inicio: 2023, fim: 2026 },
  ],
  RJ: [
    { nome: "Rosinha Garotinho", partido: "PSB",  inicio: 2002, fim: 2006 },
    { nome: "Sergio Cabral",     partido: "PMDB", inicio: 2007, fim: 2013 },
    { nome: "Luiz Pezao",        partido: "PMDB", inicio: 2014, fim: 2018 },
    { nome: "Wilson Witzel",     partido: "PSC",  inicio: 2019, fim: 2020 },
    { nome: "Claudio Castro",    partido: "PL",   inicio: 2021, fim: 2022 },

    { nome: "Claudio Castro", partido: "PL", inicio: 2023, fim: 2026 },
  ],
  RN: [
    { nome: "Garibaldi Alves", partido: "PMDB", inicio: 2002, fim: 2002 },
    { nome: "Wilma de Faria",  partido: "PSB",  inicio: 2003, fim: 2010 },
    { nome: "Rosalba Ciarlini",partido: "DEM",  inicio: 2011, fim: 2014 },
    { nome: "Robinson Faria",  partido: "PSD",  inicio: 2015, fim: 2018 },
    { nome: "Fatima Bezerra",  partido: "PT",   inicio: 2019, fim: 2022 },

    { nome: "Fatima Bezerra", partido: "PT", inicio: 2023, fim: 2026 },
  ],
  RO: [
    { nome: "Ivo Cassol",      partido: "PSDB", inicio: 2002, fim: 2010 },
    { nome: "Confucio Moura",  partido: "PMDB", inicio: 2011, fim: 2018 },
    { nome: "Marcos Rocha",    partido: "PSL",  inicio: 2019, fim: 2022 },

    { nome: "Marcos Rocha", partido: "Uniao", inicio: 2023, fim: 2026 },
  ],
  RR: [
    { nome: "Flamarion Portilho",  partido: "PSDB", inicio: 2002, fim: 2002 },
    { nome: "Ottomar Pinto",       partido: "PSDB", inicio: 2003, fim: 2006 },
    { nome: "Jose de Anchieta Jr", partido: "PSDB", inicio: 2007, fim: 2014 },
    { nome: "Suely Campos",        partido: "PP",   inicio: 2015, fim: 2018 },
    { nome: "Antonio Denarium",    partido: "PP",   inicio: 2019, fim: 2022 },

    { nome: "Arthur Henrique", partido: "MDB", inicio: 2023, fim: 2026 },
  ],
  RS: [
    { nome: "Germano Rigotto", partido: "PMDB", inicio: 2002, fim: 2006 },
    { nome: "Yeda Crusius",    partido: "PSDB", inicio: 2007, fim: 2010 },
    { nome: "Tarso Genro",     partido: "PT",   inicio: 2011, fim: 2014 },
    { nome: "Jose Ivo Sartori",partido: "PMDB", inicio: 2015, fim: 2018 },
    { nome: "Eduardo Leite",   partido: "PSDB", inicio: 2019, fim: 2022 },

    { nome: "Eduardo Leite", partido: "PSDB", inicio: 2023, fim: 2026 },
  ],
  SC: [
    { nome: "Luiz Henrique da Silveira", partido: "PMDB", inicio: 2002, fim: 2010 },
    { nome: "Raimundo Colombo",          partido: "DEM",  inicio: 2011, fim: 2018 },
    { nome: "Carlos Moises",             partido: "PSL",  inicio: 2019, fim: 2022 },

    { nome: "Jorginho Mello", partido: "PL", inicio: 2023, fim: 2026 },
  ],
  SE: [
    { nome: "Joao Alves Filho", partido: "PFL",  inicio: 2002, fim: 2006 },
    { nome: "Marcelo Deda",     partido: "PT",   inicio: 2007, fim: 2012 },
    { nome: "Jackson Barreto",  partido: "PMDB", inicio: 2013, fim: 2018 },
    { nome: "Belivaldo Chagas", partido: "PSD",  inicio: 2019, fim: 2022 },

    { nome: "Fabio Mitidieri", partido: "PSD", inicio: 2023, fim: 2026 },
  ],
  SP: [
    { nome: "Geraldo Alckmin", partido: "PSDB", inicio: 2002, fim: 2006 },
    { nome: "Jose Serra",      partido: "PSDB", inicio: 2007, fim: 2010 },
    { nome: "Geraldo Alckmin", partido: "PSDB", inicio: 2011, fim: 2018 },
    { nome: "Joao Doria",      partido: "PSDB", inicio: 2019, fim: 2022 },

    { nome: "Tarcisio de Freitas", partido: "Republicanos", inicio: 2023, fim: 2026 },
  ],
  TO: [
    { nome: "Marcelo Miranda", partido: "PMDB", inicio: 2002, fim: 2010 },
    { nome: "Siqueira Campos", partido: "DEM",  inicio: 2011, fim: 2014 },
    { nome: "Marcelo Miranda", partido: "PMDB", inicio: 2015, fim: 2018 },
    { nome: "Mauro Carlesse",  partido: "PHS",  inicio: 2019, fim: 2022 },

    { nome: "Wanderlei Barbosa", partido: "Republicanos", inicio: 2023, fim: 2026 },
  ],
};

export function getPresidente(ano: number): MandatoHistorico | null {
  return HISTORICO_PRESIDENTES.find((p) => ano >= p.inicio && ano <= p.fim) ?? null;
}

export function getGovernador(uf: string, ano: number): MandatoHistorico | null {
  const historico = HISTORICO_GOVERNADORES[uf] ?? [];
  return historico.find((g) => ano >= g.inicio && ano <= g.fim) ?? null;
}
