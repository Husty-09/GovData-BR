import { test, expect, vi, beforeEach } from "vitest";
import { buscarBrasil,} from "../lib/ibge";

beforeEach(() => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({ "2023": { "São Paulo": 8.5 } }),
  } as Response);
});

test("buscarBrasil deve retornar os dados do IBGE", async function () {
  const BrasilData = await buscarBrasil();
  expect(BrasilData).toBeDefined();
  expect(typeof BrasilData).toBe("object");
});

test("buscarBrasil deve lançar erro quando fetch falha por rede", async function () {
  vi.spyOn(global, "fetch").mockRejectedValue(new Error("Erro de rede"));
  await expect(buscarBrasil()).rejects.toThrow("Erro de rede");
});

test("buscarBrasil deve lançar erro quando resposta HTTP não é ok", async function () {
  vi.spyOn(global, "fetch").mockResolvedValue({ ok: false, status: 500 } as Response);
  await expect(buscarBrasil()).rejects.toThrow("HTTP 500");
});
