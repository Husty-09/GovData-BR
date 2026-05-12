import { test, expect, vi, beforeEach } from "vitest";
import { buscarPopulacao } from "../lib/ibge";

beforeEach(() => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({ "2023": { "São Paulo": 8.5 } }),
  } as Response);
});

test("buscarPopulacao deve retornar os dados do IBGE", async function () {
  const PopulacaoData = await buscarPopulacao();
  expect(PopulacaoData).toBeDefined();
  expect(typeof PopulacaoData).toBe("object");
});

test("buscarPopulacao deve lançar erro quando fetch falha por rede", async function () {
  vi.spyOn(global, "fetch").mockRejectedValue(new Error("Erro de rede"));
  await expect(buscarPopulacao()).rejects.toThrow("Erro de rede");
});

test("buscarPopulacao deve lançar erro quando resposta HTTP não é ok", async function () {
  vi.spyOn(global, "fetch").mockResolvedValue({ ok: false, status: 503 } as Response);
  await expect(buscarPopulacao()).rejects.toThrow("HTTP 503");
});
