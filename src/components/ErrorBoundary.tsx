"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  erro: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: false };

  static getDerivedStateFromError(): State {
    return { erro: true };
  }

  render() {
    if (this.state.erro) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center px-6">
            <p className="text-4xl">⚠️</p>
            <p className="text-neutral-200 font-semibold text-lg">
              Algo deu errado
            </p>
            <p className="text-neutral-500 text-sm max-w-xs">
              Ocorreu um erro inesperado ao renderizar esta pagina.
            </p>
            <button
              onClick={() => this.setState({ erro: false })}
              className="mt-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-300 hover:bg-white/5 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
