import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardMetrica } from "../components/CardMetrica";
import React from "react";

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
  const { children, whileHover, whileFocus, variants, ...rest } = props;
  void whileHover; void whileFocus; void variants;
  return React.createElement("div", rest, children);
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useReducedMotion: () => false,
}));

test("renderiza o CardMetrica com titulo e valor", async function () {
  render(<CardMetrica titulo="PIB" valor="1.234.567" />);
  expect(screen.getByText("PIB")).toBeDefined();
});

test("renderiza a descrição quando fornecida", async function () {
  render(
    <CardMetrica
      titulo="PIB"
      valor="1.234.567"
      descricao="Produto Interno Bruto"
    />,
  );
  expect(screen.getByText("Produto Interno Bruto")).toBeDefined();
});

test("não renderiza a descrição quando não fornecida", async function () {
  render(<CardMetrica titulo="PIB" valor="1.234.567" />);
  expect(screen.queryByText("Produto Interno Bruto")).toBeNull();
});

test("aplica cor correta verde/amarelo/neutro", async function () {
  const { rerender } = render(
    <CardMetrica titulo="PIB" valor="1.234.567" cor="verde" />,
  );
  const valorEl = screen.getByText("1.234.567");
  expect(valorEl.getAttribute("style")).toContain("rgb(0, 179, 65)");

  rerender(<CardMetrica titulo="PIB" valor="1.234.567" cor="amarelo" />);
  expect(valorEl.getAttribute("style")).toContain("rgb(255, 223, 0)");

  rerender(<CardMetrica titulo="PIB" valor="1.234.567" cor="neutro" />);
  expect(valorEl.getAttribute("style")).toContain("rgb(161, 161, 170)");
});
