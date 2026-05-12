import { test, expect, vi, beforeEach} from "vitest";
import { buscarDesemprego } from "../lib/ibge";

  beforeEach(() => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: async () => ({ "2023": { "São Paulo": 8.5 } }),
    } as Response);
  });

test("buscarDesemprego deve retornar os dados do IBGE", async function () {
  const DesempregoData = await buscarDesemprego();
  expect(DesempregoData).toBeDefined();
  expect(typeof DesempregoData).toBe("object");
});

  test("buscarDesemprego deve retornar [] quando fetch falha", async function () {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Erro de rede"));
    const DesempregoData = await buscarDesemprego();
    expect(DesempregoData).toEqual({});
  });
