import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BarraNavegacao } from "../components/BarraNavegacao";
import { usePathname } from "next/navigation";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

test("renderiza a barra de navegação com os links corretos", function () {
  render(<BarraNavegacao />);
  expect(screen.getByText("Início")).toBeDefined();
  expect(screen.getByText("Painel")).toBeDefined();
  expect(screen.getByText("Sobre")).toBeDefined();
});

test("destaca o link ativo", function () {
  vi.mocked(usePathname).mockReturnValue("/painel");
  render(<BarraNavegacao />);
  const painelLink = screen.getByText("Painel");
  expect(painelLink.className).toContain("text-brand-verde-claro");
});
