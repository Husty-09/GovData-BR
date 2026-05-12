import { test, expect, vi, beforeEach } from "vitest";
import { buscarPIB } from "../lib/ibge";

beforeEach(() => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    json: async () => [
      {
        resultados: [
          {
            series: [
              {
                localidade: { nome: "São Paulo" },
                serie: { "2023": "100000" },
              },
            ],
          },
        ],
      },
    ],
  } as Response);
});

test("buscarPIB deve retornar os dados do IBGE", async function () {
  const data = await buscarPIB();
  expect(data[0].resultados[0].series[0].serie["2023"]).toBe("100000");
});

test("buscarPIB deve retornar [] quando fetch falha", async function () {
  vi.spyOn(global, "fetch").mockRejectedValue(new Error("Erro de rede"));
  const data = await buscarPIB();
  expect(data).toEqual([]);
});
