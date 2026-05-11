import { test, expect } from "vitest";
import { buscarPIB } from "../lib/ibge";

test("buscarPIB deve retornar um array não vazio", async () => {
  const dados = await buscarPIB();
  expect(Array.isArray(dados)).toBe(true);
});
