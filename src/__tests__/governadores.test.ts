import { test , expect} from "vitest";
import { getGovernador } from "../lib/politicos";

test("getGovernador deve retornar um objeto com nome e partido", function () {
  const governador = getGovernador("SP", 2020);
  expect(governador).toHaveProperty("nome");
  expect(governador).toHaveProperty("partido");
});

test("getGovernador deve retornar um objeto com nome e partido do governador atual", function () {
  const governador = getGovernador("SP", 2023);
  expect(governador?.nome).toBe("Tarcisio de Freitas");
  expect(governador?.partido).toBe("Republicanos");
});

test("getGovernador deve retornar null para um estado ou ano sem governador", function () {
  const governador = getGovernador("SP", 1500);
  expect(governador).toBeNull();
});

test("getGovernador deve retornar null para uma UF inválida", function () {
  const governador = getGovernador("XX", 2020);
  expect(governador).toBeNull();
});