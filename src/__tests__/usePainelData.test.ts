import { test, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { usePainelData } from "../hooks/usePainelData";

// Dados mínimos que simulam a resposta real do IBGE
const PIB_MOCK = [
  {
    resultados: [
      {
        series: [
          { localidade: { nome: "São Paulo" }, serie: { "2023": "2500000", "2022": "2300000" } },
          { localidade: { nome: "Minas Gerais" }, serie: { "2023": "800000", "2022": "750000" } },
        ],
      },
    ],
  },
];

const DESEMPREGO_MOCK = {
  "2023": { "São Paulo": 7.5, "Minas Gerais": 8.2 },
  "2022": { "São Paulo": 9.1, "Minas Gerais": 9.8 },
};

const POPULACAO_MOCK = {
  "2023": { "São Paulo": 46000000, "Minas Gerais": 21000000 },
};

const BRASIL_MOCK = {
  "2023": { pib: 10000000, desemprego: 7.8, populacao: 215000000 },
  "2022": { pib: 9500000, desemprego: 9.3, populacao: 214000000 },
};

vi.mock("../lib/ibge", () => ({
  buscarPIB: vi.fn(),
  buscarDesemprego: vi.fn(),
  buscarPopulacao: vi.fn(),
  buscarBrasil: vi.fn(),
}));

// Importa os mocks tipados após o vi.mock
import * as ibge from "../lib/ibge";

beforeEach(() => {
  vi.mocked(ibge.buscarPIB).mockResolvedValue(PIB_MOCK as never);
  vi.mocked(ibge.buscarDesemprego).mockResolvedValue(DESEMPREGO_MOCK);
  vi.mocked(ibge.buscarPopulacao).mockResolvedValue(POPULACAO_MOCK);
  vi.mocked(ibge.buscarBrasil).mockResolvedValue(BRASIL_MOCK);
});

test("inicia com carregando=true e localidade=Brasil", async () => {
  const { result } = renderHook(() => usePainelData());
  expect(result.current.carregando).toBe(true);
  expect(result.current.localidade).toBe("Brasil");
  await act(async () => {});
});

test("carregando vira false apos fetches", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));
  expect(result.current.erro).toBeNull();
});

test("pibLocalidade para Brasil usa dados de brasil.json", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));
  // Brasil 2023: pib = 10000000
  expect(result.current.pibLocalidade).toBe((10000000).toLocaleString("pt-BR"));
});

test("desempregoLocalidade para Brasil usa dados de brasil.json", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));
  expect(result.current.desempregoLocalidade).toBe("7.8%");
});

test("populacaoLocalidade para Brasil usa dados de brasil.json", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));
  expect(result.current.populacaoLocalidade).toBe((215000000).toLocaleString("pt-BR"));
});

test("pibLocalidade para estado usa serie do IBGE", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));

  act(() => result.current.setLocalidade("São Paulo"));

  await waitFor(() =>
    expect(result.current.pibLocalidade).toBe((2500000).toLocaleString("pt-BR")),
  );
});

test("desempregoLocalidade para estado usa desemprego mock", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));

  act(() => result.current.setLocalidade("São Paulo"));

  await waitFor(() =>
    expect(result.current.desempregoLocalidade).toBe("7.5%"),
  );
});

test("populacaoLocalidade para estado usa populacao mock", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));

  act(() => result.current.setLocalidade("São Paulo"));

  await waitFor(() =>
    expect(result.current.populacaoLocalidade).toBe((46000000).toLocaleString("pt-BR")),
  );
});

test("ehBrasil e false quando estado selecionado", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));

  act(() => result.current.setLocalidade("São Paulo"));
  expect(result.current.ehBrasil).toBe(false);
});

test("retorna — quando localidade e null", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));

  act(() => result.current.setLocalidade(null));

  expect(result.current.pibLocalidade).toBe("—");
  expect(result.current.desempregoLocalidade).toBe("—");
  expect(result.current.populacaoLocalidade).toBe("—");
});

test("erro e preenchido quando fetch falha", async () => {
  vi.mocked(ibge.buscarPIB).mockRejectedValue(new Error("rede"));

  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));

  expect(result.current.erro).not.toBeNull();
});

test("itensDropdown tem 28 localidades", async () => {
  const { result } = renderHook(() => usePainelData());
  expect(result.current.itensDropdown).toHaveLength(28);
  await act(async () => {});
});

test("anosDisponiveis derivado do PIB recebido", async () => {
  const { result } = renderHook(() => usePainelData());
  await waitFor(() => expect(result.current.carregando).toBe(false));
  expect(result.current.itensAno.map((i) => i.value)).toEqual(["2023", "2022"]);
});
