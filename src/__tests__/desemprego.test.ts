import { test, expect, vi, beforeEach} from "vitest";
import { buscarDesemprego } from "../lib/ibge";

  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ "2023": { "São Paulo": 8.5 } }),
    } as Response);
  });

test("buscarDesemprego deve retornar os dados do IBGE", async function () {
  const DesempregoData = await buscarDesemprego();
  expect(DesempregoData).toBeDefined();
  expect(typeof DesempregoData).toBe("object");
});

  test("buscarDesemprego deve lançar erro quando fetch falha por rede", async function () {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Erro de rede"));
    await expect(buscarDesemprego()).rejects.toThrow("Erro de rede");
  });

  test("buscarDesemprego deve lançar erro quando resposta HTTP não é ok", async function () {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: false, status: 404 } as Response);
    await expect(buscarDesemprego()).rejects.toThrow("HTTP 404");
  });
