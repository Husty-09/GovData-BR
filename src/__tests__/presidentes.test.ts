import { test, expect } from "vitest";
import { getPresidente } from "../lib/politicos";

test("getPresidente deve retornar um objeto com nome e partido", function () {
  const presidente = getPresidente(2020);
  expect(presidente).toHaveProperty("nome");
  expect(presidente).toHaveProperty("partido");
});

test("getPresidente deve retornar um objeto com nome e partido do presidente atual", function () {
  const presidente = getPresidente(2023);
  expect(presidente?.nome).toBe("Lula");
  expect(presidente?.partido).toBe("PT");
});

test("getPresidente deve retornar null para um ano sem presidente", function () {
  const presidente = getPresidente(1500);
  expect(presidente).toBeNull();
});

test("getPresidente deve retornar Dilma para 2013", function () {
  const presidente = getPresidente(2013);
  expect(presidente?.nome).toBe("Dilma Rousseff");
  expect(presidente?.partido).toBe("PT");
});
