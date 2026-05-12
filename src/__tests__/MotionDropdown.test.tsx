import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionDropdown } from "../components/MotionDropdown";
import React from "react";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) =>
      React.createElement("div", props, children),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useReducedMotion: () => false,
}));

test("renderiza o dropdown com os itens corretos", function () {
  render(<MotionDropdown label={"Localidade/Ano"} />);
  expect(screen.getByText("Localidade/Ano")).toBeDefined();
});

test("abre e fecha o dropdown ao clicar no rótulo", function () {
  render(
    <MotionDropdown
      label={"Localidade/Ano"}
      items={[{ label: "São Paulo", value: "SP", onClick: vi.fn() }]}
    />,
  );
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByText("São Paulo")).toBeDefined();
});

test("clicar no item do dropdown chama a função onClick", async function () {
  const user = userEvent.setup();
  const onClickMock = vi.fn();
  render(
    <MotionDropdown
      label={"Localidade/Ano"}
      items={[{ label: "São Paulo", value: "SP", onClick: onClickMock }]}
    />,
  );
  await user.click(screen.getByRole("button"));
  await user.click(screen.getByText("São Paulo"));
  expect(onClickMock).toHaveBeenCalled();
});

test("fecha o dropdown ao clicar fora", async function () {
  render(
    <MotionDropdown
      label={"Localidade/Ano"}
      items={[{ label: "São Paulo", value: "SP", onClick: vi.fn() }]}
    />,
  );
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByText("São Paulo")).toBeDefined();
  fireEvent.mouseDown(document);
  expect(screen.queryByText("São Paulo")).toBeNull();
});

test("fecha o dropdown ao pressionar Escape", function () {
  render(
    <MotionDropdown
      label={"Localidade/Ano"}
      items={[{ label: "São Paulo", value: "SP", onClick: vi.fn() }]}
    />,
  );
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByText("São Paulo")).toBeDefined();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByText("São Paulo")).toBeNull();
});