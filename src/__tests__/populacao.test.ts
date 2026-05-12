import { test, expect, vi, beforeEach } from "vitest";
import { buscarPopulacao } from "../lib/ibge";

beforeEach(() => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    json: async () => ({ "2023": { "São Paulo": 8.5 } }),
  } as Response);
});

test("buscarPopulacao deve retornar os dados do IBGE", async function () {
  const PopulacaoData = await buscarPopulacao();
  expect(PopulacaoData).toBeDefined();
  expect(typeof PopulacaoData).toBe("object");
});

test("buscarPopulacao deve retornar [] quando fetch falha", async function () {
  vi.spyOn(global, "fetch").mockRejectedValue(new Error("Erro de rede"));
  const PopulacaoData = await buscarPopulacao();
  expect(PopulacaoData).toEqual({});
});
